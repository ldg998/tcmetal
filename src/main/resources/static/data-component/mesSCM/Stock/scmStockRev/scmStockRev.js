/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth:{},
    readonly: ['part_type_name','part_code','part_name','unit_name','stock_qty']
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    authcheck();
    selectBox();
    modal_start1();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////
function test(){
    $("#addDialog").dialog('open');
}

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/scmStockRevGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/scmStockRevGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.part_code;
        ccn_ajax('/scmStockRevOneGet',{keyword: send_data.keyword}).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#rev_code option:eq(0)").prop("selected", true).trigger("change");
            $("#rev_qty").val('');
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name": "scmOutList",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#datepicker2').val().replace(/-/gi, "")
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
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "scmStockRev"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox(){
    $("#part_type_select").select2();
   }

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['구분','품번','품명','규격','단위','재고량'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 100,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 100,fixed:true, key:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 150,fixed:true},
            {name: 'stock_qty', index: 'stock_qty', sortable: false, width: 150,fixed:true,align:'right',formatter:'integer'},

        ],
        caption: "재고조정 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        }
    });
}


