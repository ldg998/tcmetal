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


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/popMonitoringGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popMonitoring"}).then(function (data) {
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
        colNames: ['공정','업체','기종','품명','품번','단중','제품LOT','등록자','등록일시'],
        colModel: [

            {name: 'line_name', index: 'line_name', sortable: false, width: 70,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 120,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 100,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'lot_no', index: 'lot', sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 140,fixed:true,formatter: formmatterDate}

        ],
        caption: "생산모니터링 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
