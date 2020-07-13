/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth: {}
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    datepickerInput();
    selectBox();
    jqgridPagerIcons();
  //  get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/scmStockSumMonthListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmStockSumMonthListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "scmStockSumMonth",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#part_type_select').val()
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function datepickerInput() {
    datepicker_makes("#datepicker", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmStockSumMonth"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() { //구분영역에 들어갈 select데이터 호출
    select_makes_base("#part_type_select", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'Y').then(function (data) {});
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['구분','품번','품명','규격','단위','전월재고','금월입고','금월출고','재고'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', width: 100,sortable:false,fixed:true},
            {name: 'part_code', index: 'part_code', width: 100,sortable:false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 150,sortable:false,fixed:true},
            {name: 'spec', index: 'spec', width: 150,sortable:false,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 120,sortable:false,fixed:true},
            {name: 'prev_qty', index: 'prev_qty', width: 120,sortable:false,fixed:true,align:'right',formatter:'integer'},
            {name: 'in_qty', index: 'in_qty', width: 120,sortable:false,fixed:true,align:'right',formatter:'integer'},
            {name: 'out_qty', index: 'out_qty', width: 120,sortable:false,fixed:true,align:'right',formatter:'integer'},
            {name: 'qty', index: 'qty', width: 120,sortable:false,fixed:true,align:'right',formatter:'integer'}

        ],
        caption: "자재 월원장 | MES",
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


