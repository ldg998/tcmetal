// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawBasic);


/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {

    send_data: {},
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    jqgridPagerIcons();
    modal_start1();
    suppModal_start();
});

////////////////////////////클릭 함수/////////////////////////////////////
function test() {

    $("#addDialog").dialog('open'); // 모달 열기
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword = '2';
    main_data.send_data.keyword2 = '';
    main_data.send_data.keyword3 = '3';
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: "/",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

    google.setOnLoadCallback(drawChart);

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
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
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
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdErrorList"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $('#1_select').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "고객지급품관리 | MES",
        colNames: ['업체','기종','품번','품명','단중','첨자','재질','형종류','중지수','지급품도면','제작업체','입고일','비고','등록자','수정일'],
        colModel: [
            {name: '', index: '', sortable:false, width: 80,  key: true,fixed:true},
            {name: '', index: '', sortable:false, width: 80, fixed:true},
            {name: '', index: '', sortable:false, width: 80, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 120, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',

        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창

        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}
