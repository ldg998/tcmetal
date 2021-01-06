/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    send_data_post: {},
    auth: {},
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    authcheck();
   selectBox();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    datepickerInput();
});


////////////////////////////클릭 함수//////////////////////////////////



function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');

    $("#mes_grid").setGridParam({
        url: '/scmStockSumDayListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"scmStockSumDayList",
                "row0":$('#datepicker').val(),
            "row1":$('#part_type_select').val(),
            "row2":$('#part_no').val()

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

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmStockList"}).then(function (data) {
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
        colNames: ['구분','품번','품명','규격','단위','전일재고','금일입고','금일출고','재고'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', width: 50,fixed:true},
            {name: 'part_code', index: 'part_code', width: 130,fixed:true},
            {name: 'part_name', index: 'part_name', width: 190,fixed:true},
            {name: 'spec', index: 'spec', width: 150,fixed:true},
            {name: 'unit_name', index: 'unit_name', width: 60,fixed:true},
            {name: 'prev_qty', index: 'prev_qty', width: 90,fixed:true,align:'right',formatter:'integer'},
            {name: 'in_qty', index: 'in_qty', width: 90,fixed:true,align:'right',formatter:'integer'},
            {name: 'out_qty', index: 'out_qty', width: 90,fixed:true,align:'right',formatter:'integer'},
            {name: 'qty', index: 'qty', width: 90,fixed:true,align:'right',formatter:'integer'},
        ],
        caption: "재고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},

        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}


function datepickerInput() {

    datepicker_makes("#datepicker", 0);
}