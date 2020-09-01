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
    ccn_ajax("/menuAuthGet", {keyword: "popLotTracking"}).then(function (data) {
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
        colNames: ['계획일자','CHARGE','업체','기종','품명','단중','C','Si','Mn','P','S','Cr','Ni','Cu','Sn','작업자','등록일시'],
        colModel: [
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 140,fixed:true},
        ],
        caption: "성분분석 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    $('#select1').select2();
    $('#select2').select2();

}