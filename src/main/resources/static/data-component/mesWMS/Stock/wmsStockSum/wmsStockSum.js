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
    // jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    header_make();
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/wmsStockSumGet',
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
                "name":"wmsStockSumList",
                "row0":main_data.send_data.work_date,
                "row1":main_data.send_data.keyword,
                "row2":main_data.send_data.keyword2
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
    datepicker_makes("#datepicker", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsStockSum"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    // arrtSetting = function (rowId, val, rawObject, cm) {
    //     var attr = rawObject.attr[cm.name], result;
    //     if (attr.rowspan) {
    //         result = ' rowspan=' + '"' + attr.rowspan + '"';
    //     } else if (attr.display) {
    //         result = ' style="display:' + attr.display + '"';
    //     }
    //     return result;
    // };


    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['','업체', '기종', '품번','품명', '단중','수량','중량','수량','중량','수량','중량','수량','중량','수량','중량'],
        colModel: [
            {name:'rownum', index: 'rownum', hidden:true, fixed:true},
            {name:'supp_name', index: 'supp_name', width: 130, fixed:true},
            {name:'part_kind', index: 'part_kind',  width: 110, fixed:true},
            {name:'part_code', index: 'part_code',  width: 130, fixed:true},
            {name:'part_name', index: 'part_name',  width: 190, fixed:true},
                {name:'part_weight', index: 'part_weight',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'prev_qty', index: 'prev_qty',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'prev_weight', index: 'prev_weight',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'in_qty', index: 'in_qty',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'in_weight', index: 'in_weight',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'out_qty', index: 'out_qty',  width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'out_weight', index: 'out_weight', width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'ng_qty', index: 'ng_qty', width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'ng_weight', index: 'ng_weight', width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'qty', index: 'qty', width: 90, fixed:true,formatter:'integer', align:'right'},
            {name:'weight', index: 'weight',  width: 90, fixed:true,formatter:'integer', align:'right'}

        ],
        caption: '제품재고현황 | MES',
        autowidth: true,
        shrinkToFit:false,
        height: 532,
        pager: '#mes_grid_pager',
        rowNum: 100,
        overflow:'visible',
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        loadComplete:function(data){
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.supp_name === '합계'){
                    $("#mes_grid").setRowData(idsfor.rownum, false, {background:"rgb(155, 185, 239)"}) ;
                }
            });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

        });


    // $("#mes_grid").jqGrid('setGroupHeaders', {
    //     useColSpanStyle: true,
    //     groupHeaders: [
    //         { startColumnName:"as", numberOfColumns: 2, titleText:"test" }
    //     ]
    // });

    // var newWidth = $("#mes_grid_5").width() + $("#mes_grid_6").outerWidth(true); 해더 행합치기
    // $("#mes_grid").jqGrid("setLabel", "5", "<em>전일재고</em>", "", {
    //     style: "width: " + newWidth + "px;",
    //     colspan: "2"
    // });
    // $("#mes_grid").jqGrid("setLabel", "6", "", "", {style: "display: none"});


}
function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'prev_qty', numberOfColumns: 2, titleText: '<center>전일재고</center>'},
            {startColumnName: 'in_qty', numberOfColumns: 2, titleText: '<center>금일입고</center>'},
            {startColumnName: 'out_qty', numberOfColumns: 2, titleText: '<center>금일출고</center>'},
            {startColumnName: 'ng_qty', numberOfColumns: 2, titleText: '<center>자체불량</center>'},
            {startColumnName: 'qty', numberOfColumns: 2, titleText: '<center>재고</center>'}

            ]
    })
}

function selectBox() {
    $('#part_kind_select').select2();
    $('#part_code_select').select2();

    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();

        $('#part_code_select').empty();
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_code_select').append(option2);
        $('#part_code_select').select2();
    }
}

function select_change2(value) {
    if (value !== "") {
        select_makes_base("#part_code_select", "/sysSpartAllGet", "part_code", "part_name", {
            keyword: $("#supp_select").val(),
            keyword2: value
        }, "Y").then(function (data) {

        });
    } else {

        $('#part_code_select').empty();
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_code_select').append(option2);
        $('#part_code_select').select2();
    }

}