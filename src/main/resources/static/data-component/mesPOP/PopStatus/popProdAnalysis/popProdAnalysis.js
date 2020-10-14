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

    $("#mes_grid").setGridParam({
        url: '/popProdAnalysisGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function main_select_change1(value) {
    select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},"").then(function (data) {});

}
////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdAnalysis"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['작업일자','생산중량','작업공수','시간당 생산량'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed:true,formatter: formmatterDate2},
            {name: 'work_weight', index: 'work_weight', sortable: false, width: 150,fixed:true ,formatter:'integer', align: 'right'},
            {name: 'wk_qty_hr', index: 'wk_qty_hr', sortable: false, width: 150,fixed:true ,formatter:'integer', align: 'right'},
            {name: 'prod_mhr', index: 'prod_mhr', sortable: false, width: 150,fixed:true ,formatter:'integer', align: 'right'}

        ],
        caption: "생산량분석 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 1000,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    select_makes_base("#select1", "/sysCommonAllGet","code_value","code_name1",{keyword:'LINE_GROUP'},'').then(function (data) {
        select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'Y').then(function (data2) {
        });

    });


}