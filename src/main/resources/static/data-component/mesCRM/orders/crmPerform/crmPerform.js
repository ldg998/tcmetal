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
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    // modal_start1();
});



////////////////////////////클릭 함수////////////////////////////////
function get_btn(page) {

}




function add_btn() {
    $("#addDialog").dialog('open');
}

////////////////////////////호출 함수////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmPerform"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", 0);
    datepicker_makes("#datepicker2", 0);

}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '실적현황 | MES',
        colNames: ['수주일자','전표번호','업체','PO','기종','품번','품명','단중','화폐단위','단가','수량','총금액','납품(선적)1','납품(선적)2','납품(선적)3','납품(선적)4','납품(선적)5','납품(선적)6','납품(선적)7','납품(선적)8','납품(선적)9','납품(선적)10',],
        colModel: [
            {name: '', index: '', sortable: false, formatter:formatterYear, key:true, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:150},
            {name: '', index: '', sortable: false, fixed:true, width:150},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, fixed:true, width:130},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150},
            {name: '', index: '', sortable: false, formatter:formmatterDate, fixed:true, width:150}
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

