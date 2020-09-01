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
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    selectBox();
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

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsProdErrorList",
                "row0":main_data.send_data.start_date,
                "row1":main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.keyword3
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdList"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $('#select1').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "생산진행현황 | MES",
        colNames: ['생산지시일자','지시번호','업체','PO','기종','품번','품명','단중','수량','상태','생산일자','입고일자','출고일자','등록자','등록일시'],
        colModel: [
            {name: '', index: '', sortable:false, width: 120,  key: true,fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 80, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},


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
