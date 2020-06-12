/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{},
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    datepickerInput();
    suppModal_start();
    modal_start1();
    selectBox();

    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: "/crmMoneyGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: "/crmMoneyGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    $("#addDialog").dialog('open'); // 모달 열기
}

function complete_btn() {
    if(main_data.auth.check_edit != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); //ORD_NO

        if (ids.length === 0) {
            alert("완료처리하는 데이터를 선택해주세요");
        } else {
            if (confirm("완료처리 하시겠습니까?")) {
                wrapWindowByMask2();
                ccn_ajax("/crmMoneyComp", {keyword: ids.join(gu5)}).then(function (data){
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    $('#mes_grid2').jqGrid('clearGridData');
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
            $('#mes_grid').jqGrid("resetSelection");
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function supp_btn(what) {
    main_data.supp_check = what;
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {

        ccn_ajax('/sysSuppOneGet', {keyword:code}).then(function (data) {
            $("#supp_name_modal").val(name);
            $("#supp_code_modal").val(code);
            $("#supp_user_name").val(data.emp_name);
            $("#supp_tel_no").val(data.emp_tel);
        });

    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

////////////////////////////호출 함수/////////////////////////////////////
function selectBox() {
    $("#status_select_main").select2();
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmMoney"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['수주일자','수주번호','업체명','현장명','담당자','연락처','수주내용','상태','납품일자','수주금액(VAT포함)','결제1','결제2','결제3','결제4','잔액','비고','등록자','등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date',sortable: false,formatter:formmatterDate2, width: 100, fixed: true},
            {name: 'ord_no', index: 'ord_no',sortable: false,key:true, width: 150, fixed: true},
            {name: 'supp_name', index: 'supp_name',sortable: false, width: 100, fixed: true},
            {name: 'place_name', index: 'place_name',sortable: false, width: 150, fixed: true},
            {name: 'emp_name', index: 'emp_name',sortable: false, width: 100, fixed: true},
            {name: 'emp_tel', index: 'emp_tel',sortable: false, width: 150, fixed: true},
            {name: 'ord_name', index: 'ord_name',sortable: false, width: 150, fixed: true},
            {name: 'status_name', index: 'status_name',sortable: false, width: 150, fixed: true},
            {name: 'end_date', index: 'end_date',sortable: false,formatter:formmatterDate2, width: 100, fixed: true},
            {name: 'order_amount', index: 'order_amount',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'amount1', index: 'amount1',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'amount2', index: 'amount2',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'amount3', index: 'amount3',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'amount4', index: 'amount4',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'balance', index: 'balance',sortable: false,align:'right',formatter:'integer', width: 150, fixed: true},
            {name: 'remark', index: 'remark',sortable: false, width: 300, fixed: true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 100, fixed: true},
            {name: 'update_date', index: 'update_date',sortable: false,formatter:formmatterDate, width: 140, fixed: true}
        ],
        caption: "수금관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            // var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    });
}



