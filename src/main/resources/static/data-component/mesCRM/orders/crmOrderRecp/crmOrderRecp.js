/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    check2: 'Y',
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{} // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    msg_get();
    datepickerInput();
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    selectBox();
    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

});

////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/crmOrderRecpGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 수정인지 체크
        modal_reset(".modal_value", []);
        $("#modal_select1").val($("#supp_select").val()).trigger("change");
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"N");
        $("#addDialog").dialog('open'); // 모달 열기
    }
}

// 그리는 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        main_data.check2 = 'N'; // 수정인지 체크
        ccn_ajax('/crmOrderRecpOneGet', {keyword: jqgrid_data.ord_no}).then(function (data) { // user의 하나 출력
            disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"Y");
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:data.supp_code},"N").then(function (data2) {
                $("#modal_select2").val(data.part_kind).trigger("change");
                select_makes_base("#modal_select3","/sysSpartAllGet","part_code","part_name",{keyword:data.supp_code,keyword2:data.part_kind},"N").then(function (data3) {
                    $("#modal_select3").val(data.part_code).trigger("change");
                    main_data.check2 = 'Y';
                    $("#addDialog").dialog('open');
                });
            });

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
                ccn_ajax("/crmOrderRecpDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
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
    ccn_ajax("/menuAuthGet", {keyword: "crmOrderRecp"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['수주일자','전표번호','업체','PO','기종','품번','품명','단중','단가','수량','금액','등록자','등록일시'],
        colModel : [
            {name:'work_date',index:'work_date' ,sortable: false,width:80,fixed: true,formatter:formmatterDate2},
            {name:'ord_no',index:'ord_no',sortable: false,key: true,width:200,fixed: true},
            {name:'supp_name',index:'supp_name',sortable: false,width:100,fixed: true},
            {name:'',index:'',sortable: false,width:150,fixed: true},
            {name:'part_kind',index:'part_kind',sortable: false,width:100,fixed: true},
            {name:'part_code',index:'part_code',sortable: false,width:100,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:100,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name:'unit_cost',index:'unit_cost',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name:'qty',index:'qty',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name: 'price_amount', index: 'price_amount', sortable: false,fixed: true, width: 100, align: 'right',formatter:'integer'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 130,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150, formatter: formmatterDate,fixed:true}
        ],
        caption: "수주정보관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
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

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
    });
}