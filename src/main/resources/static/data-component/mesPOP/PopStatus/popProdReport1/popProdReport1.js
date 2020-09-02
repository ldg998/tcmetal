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
    modal_start1();
});


////////////////////////////클릭 함수//////////////////////////////////
function test(){

    $("#addDialog").dialog('open'); // 모달 열기

    jqGridResize("#mes_add_grid" , $('#mes_add_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_add_grid2" , $('#mes_add_grid2').closest('[class*="col-"]'));

}


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/popProdReport1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdReport1"}).then(function (data) {
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
        colNames: ['생산지시일자','CHAGE','업체','PO','기종','품번','품명','단중','수량','등록자','등록일시'],
        colModel: [
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 100,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true}

        ],
        caption: "주입일보현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    $('#select1').select2();
    $('#select2').select2();

}