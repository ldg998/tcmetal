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
        url: '/sysProdSumGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').empty();
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
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
        colNames: ['업체','기종','품명','품번','단중','생산누계','기초재고','구분', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
        colModel: [
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},
            {name: '', index: '', sortable: false, width: 60,fixed:true},

        ],
        caption: "수량집계표 | MES",
        shrinkToFit:false,
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        overflow:'visible',
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
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#part_kind_select').select2();

}