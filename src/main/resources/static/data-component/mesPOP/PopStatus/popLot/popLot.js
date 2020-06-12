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
    jqgridPagerIcons();


});


////////////////////////////클릭 함수//////////////////////////////////

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popMonitoring"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['생산일자','지시번호','제품명','계획량','생산량','용도','생산구분','품목군','제품군','생산자','생산일시','Remark','비고'],
        colModel: [
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
            {name: '', index: '', sortable: false, width: 60},
        ],
        caption: "LOT별 원자재 현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

}
