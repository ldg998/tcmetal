/**
 * various.js 와 연동
 */
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    select_box();
});


////////////////////////////클릭 함수//////////////////////////////////


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    main_data.send_data.keyword = 'B'
    $("#mes_grid").setGridParam({
        url: '/popProdList1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdAnalysis"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['작업일자','생산중량','작업공수','시간당 생산량'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true}

        ],
        caption: "생산량분석 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {

}