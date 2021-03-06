/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth:{}
};


////////////////////////////시작 함수/////////////////////////////////////


$(document).ready(function () {
    msg_get();
    authcheck();
    datepickerInput();

    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');


    // SP_SCM_IO_LIST_GET
    $("#mes_grid").setGridParam({
        url: '/scmIOListGet',
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
                "name": "scmIOList",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2": $('#part_code').val()
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

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmIOList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['seq','품번','품명','규격','단위','일자','수량','구분'],
        colModel: [
            {name: 'seq', index: 'seq',sortable: false,key:true,hidden:true},
            {name: 'part_code', index: 'part_code',sortable: false, fixed:true, width:130},
            {name: 'part_name', index: 'part_name',sortable: false, fixed:true, width:190},
            {name: 'spec', index: 'spec',sortable: false, fixed:true, width:150},
            {name: 'unit_name', index: 'unit_name',sortable: false, fixed:true, width:60},
            {name: 'work_date', index: 'work_date',sortable: false,formatter:formmatterDate2, fixed:true, width:90},
            {name: 'qty', index: 'qty',sortable: false,formatter:'integer', align:'right', fixed:true, width:90},
            {name: 'remark', index: 'remark',sortable: false, fixed:true, width:50},
        ],
        caption: "자재입출고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete : function(data) {
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.work_date === '소계'){
                    $("#mes_grid").setRowData(idsfor.seq, false, {background:"rgb(155, 185, 239)"}) ;
                }
            });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },

    });
}
