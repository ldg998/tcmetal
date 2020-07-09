/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth: {}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    suppModal_start();
    modal_start1();
});

////////////////////////////클릭 함수/////////////////////////////////////

function test(){
    $("#addDialog").dialog('open'); // 모달 열기
}

function get_btn(page) {

    main_data.send_data = value_return2(".condition_main");
    console.log(value_return2(".condition_main"));

    $("#mes_grid").setGridParam({
        url: '/wmsOutReadyGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}


function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"wmsOutReady",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
                "row2":$('#supp_code_main').val()
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

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsStockRev"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['조정일자','조정번호','업체','기종','품명','품번','단중','상태','조정사유','등록자','등록일시'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true},
            {name: '', index: '', sortable: false, width: 150, fixed:true}

        ],
        caption: '제품재고 조정현황 | MES',
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

    });
}
function selectBox() {
    $('#select1').select2();
}