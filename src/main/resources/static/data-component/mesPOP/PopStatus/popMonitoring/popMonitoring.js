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
    authcheck();
    selectBox();
    jqgridPagerIcons();
    get_btn(1);

});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    // main_data.send_data = value_return(".condition_main");
    // main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    // main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    // main_data.send_data.keyword = 'B'
    // $("#mes_grid").setGridParam({
    //     url: '/popProdList1Get',
    //     datatype: "json",
    //     page: page,
    //     postData: main_data.send_data
    // }).trigger("reloadGrid");
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popMonitoring"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    select_makes_sub("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'Y');

}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['공정','계획번호','현장','구분','구분','규격','수량','계획명','상태'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true}
        ],
        caption: "생산 모니터링 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

}
