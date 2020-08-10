/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{}, // 권한 체크 후 권한 data 담는 용도
    send_data:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    msg_get();
    selectBox();
    datepickerInput();
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수

    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

});

////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword2 ='';
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysERateGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset('.modal_value',[]);
        $('#modal_select1 option:eq(0)').prop("selected", true).trigger("change");
        $("#addDialog").dialog('open'); // 모달 열기
        datepickerInput_modal();

    }
}

// 그리는 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        jqgrid_data.start_date = jqgrid_data.start_date.replace(/\-/g, ''); //날짜 모양 가공 2020-06-06 = 20200606
        console.log(jqgrid_data);
        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/sysERateOneGet', {keyword:jqgrid_data.currency_code,keyword2:jqgrid_data.start_date}).then(function (data) { // user의 하나 출력
            data.rows[0].start_date =formmatterDate2(data.rows[0].start_date);
            data.rows[0].stop_date =formmatterDate2(data.rows[0].stop_date);
            modal_edits('.modal_value', main_data.readonly, data.rows[0]); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords = [];
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(var i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    data.start_date = data.start_date.replace(/\-/g, '');
                    keywords.push(data.currency_code+gu4+data.start_date);

                }//11|12|13|
                code_list=keywords.join(gu5);
                wrapWindowByMask2();
                ccn_ajax("/sysERateDel", {keyword:code_list}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $("#mes_grid").trigger("reloadGrid");
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysERate"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['','','화폐단위','시작일','종료일','환율','등록자','수정일'],
        colModel : [
            {name:'rownum',index:'rownum',key:true,hidden:true,sortable: false,fixed: true},
            {name:'currency_code',index:'currency_code',hidden:true,sortable: false,fixed: true},
            {name:'code_name1',index:'code_name1',sortable: false,width:100,fixed: true},
            {name:'start_date',index:'start_date',sortable: false,width:100,fixed: true,formatter:formmatterDate2},
            {name:'stop_date',index:'stop_date',sortable: false,width:150,fixed: true,formatter:formmatterDate2},
            {name:'exch_rate',index:'exch_rate',sortable: false,width:100,fixed: true,align: 'right'},
            {name:'user_name',index:'user_name',sortable: false,width:150,fixed: true},
            {name:'update_date',index:'update_date',formatter:formmatterDate,sortable: false,width:180,fixed: true}
        ],
        caption: "환율관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    select_makes_base("#select1", "/sysCommonAllGet","code_value","code_name1",{keyword:'CURRENCY_TYPE'},'Y');

}
function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}