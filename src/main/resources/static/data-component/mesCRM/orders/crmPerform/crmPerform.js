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
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '실적현황 | MES',
        colNames: ['수주일자','전표번호','업체','PO','기종','품번','품명','단중','화폐단위','단가','수량','총금액','납품(선적)1','납품(선적)2','납품(선적)3','납품(선적)4','납품(선적)5','납품(선적)6','납품(선적)7','납품(선적)8','납품(선적)9','납품(선적)10',],
        colModel: [
            {name:'work_date',index:'work_date' ,sortable: false,width:80,fixed: true,formatter:formmatterDate2},
            {name:'ord_no',index:'ord_no',sortable: false,key: true,width:160,fixed: true},
            {name:'supp_name',index:'supp_name',sortable: false,width:100,fixed: true},
            {name:'po_no',index:'po_no',sortable: false,width:80,fixed: true},
            {name:'part_kind',index:'part_kind',sortable: false,width:100,fixed: true},
            {name:'part_code',index:'part_code',sortable: false,width:100,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:100,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name:'money_unit',index:'money_unit',sortable: false,width:60,fixed: true},
            {name:'unit_cost',index:'unit_cost',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name:'qty',index:'qty',sortable: false,width:100,fixed: true, align: 'right',formatter:'integer'},
            {name: 'price_amount', index: 'price_amount', sortable: false,fixed: true, width: 100, align: 'right',formatter:'integer'},
            {name: 'date1', index: 'date1', sortable: false, fixed:true, width:110},
            {name: 'date2', index: 'date2', sortable: false, fixed:true, width:110},
            {name: 'date3', index: 'date3', sortable: false, fixed:true, width:110},
            {name: 'date4', index: 'date4', sortable: false, fixed:true, width:110},
            {name: 'date5', index: 'date5', sortable: false, fixed:true, width:110},
            {name: 'date6', index: 'date6', sortable: false, fixed:true, width:110},
            {name: 'date7', index: 'date7', sortable: false, fixed:true, width:110},
            {name: 'date8', index: 'date8', sortable: false, fixed:true, width:110},
            {name: 'date9', index: 'date9', sortable: false, fixed:true, width:110},
            {name: 'date10', index: 'date10', sortable: false, fixed:true, width:110}

        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
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
            loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });

}

