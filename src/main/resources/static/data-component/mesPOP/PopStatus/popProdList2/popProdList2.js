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
    //             "row1":$('#part_type_select').val(),
    //             "row2":$('#part_group1_select').val(),
    //             "row3":$('#part_group2_select').val()
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
    ccn_ajax("/menuAuthGet", {keyword: "popProdList1"}).then(function (data) {
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
        colNames: ['작업일자','공정','업체','기종','품번','품명','단중','지시수량','생산수량','등록자','등록일시'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
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
        caption: "공정별 생산현황 | MES",
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