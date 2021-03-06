/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth:{},
    readonly: ['plan_year','plan1','plan2','plan3','plan4','plan5','plan6','plan7','plan8','plan9','plan10','plan11','plan12','remark']
};

////////////////////////////시작 함수/////////////////////////////////
$(document).ready(function () {
    authcheck();
    datepickerInput();
    msg_get();
    selectBox();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    // modal_start1();
});



////////////////////////////클릭 함수////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/crmPerformGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}




function add_btn() {
    $("#addDialog").dialog('open');
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


function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"crmPerform",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2
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

////////////////////////////호출 함수////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmPerform"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}




function selectBox() {
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#ship_select').select2();
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '실적현황 | MES',
        colNames: ['수주일자','전표번호','업체','PO','기종','품번','품명','단중','화폐단위','단가','수량','중량','총금액','납품(선적)1','납품(선적)2','납품(선적)3','납품(선적)4','납품(선적)5','납품(선적)6','납품(선적)7','납품(선적)8','납품(선적)9','납품(선적)10',],
        colModel: [
            {name:'work_date',index:'work_date' ,width:90,fixed: true,formatter:formmatterDate2},
            {name:'ord_no',index:'ord_no',key: true,width:120,fixed: true},
            {name:'supp_name',index:'supp_name',width:130,fixed: true},
            {name:'po_no',index:'po_no',width:120,fixed: true},
            {name:'part_kind',index:'part_kind',width:110,fixed: true},
            {name:'part_code',index:'part_code',width:120,fixed: true},
            {name:'part_name',index:'part_name',width:190,fixed: true},
            {name:'part_weight',index:'part_weight',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name:'money_unit',index:'money_unit',width:60,fixed: true},
            {name:'unit_cost',index:'unit_cost',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name:'qty',index:'qty',width:90,fixed: true, align: 'right',formatter:'integer'},
             {name:'weight',index:'weight',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name: 'price_amount', index: 'price_amount', fixed: true, width: 110, align: 'right',formatter:'integer'},
            {name: 'date1', index: 'date1',  fixed:true, width:100},
            {name: 'date2', index: 'date2',  fixed:true, width:100},
            {name: 'date3', index: 'date3',  fixed:true, width:100},
            {name: 'date4', index: 'date4',  fixed:true, width:100},
            {name: 'date5', index: 'date5',  fixed:true, width:100},
            {name: 'date6', index: 'date6',  fixed:true, width:100},
            {name: 'date7', index: 'date7',  fixed:true, width:100},
            {name: 'date8', index: 'date8',  fixed:true, width:100},
            {name: 'date9', index: 'date9',  fixed:true, width:100},
            {name: 'date10', index: 'date10',  fixed:true, width:100}

        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {// 클릭


            },
        ondblClickRow: function (rowid, iRow, iCol, e) {  // 더블클릭
            update_btn(rowid);
            },
            loadComplete:function(data){
                data.rows.forEach(function (idsfor, s) {
                    if (idsfor.work_date === '통계'){
                        $("#mes_grid").setRowData(idsfor.ord_no, false, {background:"rgb(155, 185, 239)"}) ;
                    }
                });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });

}

function msg_get() {
    msgGet_auth("TBMES_Q014");
}