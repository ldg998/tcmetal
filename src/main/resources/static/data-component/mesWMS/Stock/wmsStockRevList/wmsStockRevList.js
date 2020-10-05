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

});

////////////////////////////클릭 함수/////////////////////////////////////


function get_btn(page) {

    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/wmsStockRevGet',
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
                "name":"wmsStockRevList",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.keyword3

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
        colNames: ['조정일자','조정번호','업체','기종','품명','품번','단중','조정전재고','조정후재고','등록자','등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 90, fixed:true,formatter: formmatterDate2},
            {name: 'rev_no', index: 'rev_no', sortable: false, width: 120, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 110, fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190, fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'stock_qty_prev', index: 'stock_qty_prev', sortable: false, width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'stock_qty', index: 'stock_qty', sortable: false, width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60, fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 140, fixed:true,formatter: formmatterDate}

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
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    select_makes_base_tc("#main_select3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"").then(function (data) {});

}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}
