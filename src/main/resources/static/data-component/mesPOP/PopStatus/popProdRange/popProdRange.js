/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth: {}
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
        url: '/popProdRangeGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function excel_download() {
    // if (confirm(msg_object.TBMES_Q014.msg_name1)) {
    //     var $preparingFileModal = $("#preparing-file-modal");
    //     $preparingFileModal.dialog({modal: true});
    //     $("#progressbar").progressbar({value: false});
    //     $.fileDownload("/excel_download", {
    //         httpMethod: 'POST',
    //         data: {
    //             "name": "wmsStockIOSumMonth",
    //             "row0":$('#datepicker').val().replace(/-/gi,""),
    //             "row0":$('#datepicker2').val().replace(/-/gi,"")
    //         },
    //         successCallback: function (url) {
    //             $preparingFileModal.dialog('close');
    //         },
    //         failCallback: function (responseHtml, url) {
    //             $preparingFileModal.dialog('close');
    //             $("#error-modal").dialog({modal: true});
    //         }
    //     });
    //     return false;
    // }
}


function select_change_modal1(value) {
    select_makes_base("#part_kind_select","/outsSelectGet","part_kind","part_kind",{keyword:'Y',keyword2:value,keyword3:'',keyword4:''},"N").then(function (data) {});


}


////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdRange"}).then(function (data) {
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
        colNames: ['업체','기종','품번','품명','단중','생산수량'],
        colModel: [
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 150,fixed:true},
            {name: 'part_code', index: 'plan_code', sortable: false, width: 150,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 150,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'qty', index: 'qty', sortable: false, width: 150,fixed:true,align: 'right', formatter: 'integer'}

        ],
        caption: "기간별 생산실적 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}


function select_box() {
    select_makes_base("#supp_code_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });

    select_makes_base("#select1", "/sysCommonAllGet","code_value","code_name1",{keyword:'LINE_GROUP'},'').then(function (data) {});
}