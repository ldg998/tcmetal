/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{} // 권한 체크 후 권한 data 담는 용도
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
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/outsErrorGet',
        datatype: "json",
        page: page
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset('.modal_value',[])
        $("#select_modal1").prop("disabled", false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#select_modal2").prop("disabled", false).trigger("change");//셀렉트박스 잠금으로 체인지
        datepickerInput_modal();
        $("#addDialog").dialog('open'); // 모달 열기

    }
}

// 그리는 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/sysDeptOneGet', {keyword: jqgrid_data.dept_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/sysDeptDelete", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
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
    ccn_ajax("/menuAuthGet", {keyword: "outsError"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['불량등록일자','업체','기종','품번','품명','단중','제품LOT','불량유형','수정','폐기','등록','등록일시'],
        colModel : [
            {name:'create_date',index:'create_date',key: true ,sortable: false,width:100,fixed: true,formatter:formmatterDate2},
            {name:'supp_name',index:'supp_name',sortable: false,width:100,fixed: true},
            {name:'part_kind',index:'part_kind',sortable: false,width:100,fixed: true},
            {name:'part_code',index:'part_code',sortable: false,width:150,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:100,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:150,fixed: true},
            {name:'lot_no',index:'lot_no',sortable: false,width:200,fixed: true},
            {name:'qc_result',index:'qc_result',sortable: false,width:100,fixed: true},
            {name:'result_code2',index:'result_code2',sortable: false,width:150,fixed: true},
            {name:'result_code3',index:'result_code3',sortable: false,width:100,fixed: true},
            {name:'user_name',index:'user_name',sortable: false,width:150,fixed: true},
            {name:'create_date',index:'create_date',formatter:formmatterDate,sortable: false,width:180,fixed: true}
        ],
        multiselect: true,
        caption: "외주불량 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
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
    $('#select1').select2();
    select_makes_base("#main_select3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"");

}
function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}