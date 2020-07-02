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

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "합형작업일지 | MES",
        colNames: ['업체','기종','품명','품번','단중','제품LOT'],
        colModel: [
            {name: '', index: '', sortable:false, width: 60,  key: true,fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true}

        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',

        onCellSelect: function (rowid, icol, cellcontent, e) {},
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
