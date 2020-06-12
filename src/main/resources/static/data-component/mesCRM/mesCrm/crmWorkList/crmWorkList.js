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

    modal_start1();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    get_btn(1);
});



////////////////////////////클릭 함수////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = $("#datepicker").val().replace('년','');
    main_data.send_data.end_date = $("#datepicker2").val().replace('년','');
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: "/crmPlanGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    modal_text_reset_lee(".table_main");

}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/crmPlanGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

// function update_btn(rowid) {
    // ccn_ajax('/crmWorkListOneGet', {ord_no: rowid}).then(function (data) {
    //     data.price= comma(data.price);
    //     data.unit_price= comma(data.unit_price);
    //     modal_edits(".main_value", [], data);
    // });
//     $("#addDialog").dialog('open');
// }

function add_btn() {
    $("#addDialog").dialog('open');
}

function under_get(rowid){
    // console.log(rowid);
    ccn_ajax("/crmPlanOneGet", {plan_year:rowid} ).then(function (data){
        data.plan1 = data.plan1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan2 = data.plan2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan3 = data.plan3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan4 = data.plan4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan5 = data.plan5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan6 = data.plan6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan7 = data.plan7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan8 = data.plan8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan9 = data.plan9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan10 = data.plan10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan11 = data.plan11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.plan12 = data.plan12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        data.work1 = data.work1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work2 = data.work2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work3 = data.work3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work4 = data.work4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work5 = data.work5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work6 = data.work6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work7 = data.work7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work8 = data.work8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work9 = data.work9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work10 = data.work10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work11 = data.work11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.work12 = data.work12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        data.in1 = data.in1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in2 = data.in2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in3 = data.in3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in4 = data.in4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in5 = data.in5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in6 = data.in6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in7 = data.in7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in8 = data.in8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in9 = data.in9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in10 = data.in10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in11 = data.in11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        data.in12 = data.in12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        modal_edits(".table_main",[],data);
    })
}


function update_btn(rowid){
    if (main_data.auth.check_edit !="N") {
        ccn_ajax("/crmPlanOneGet", {plan_year:rowid} ).then(function (data){
            data.plan_year = data.plan_year.toString()+'년';
            data.plan1 = data.plan1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan2 = data.plan2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan3 = data.plan3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan4 = data.plan4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan5 = data.plan5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan6 = data.plan6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan7 = data.plan7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan8 = data.plan8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan9 = data.plan9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan10 = data.plan10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan11 = data.plan11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.plan12 = data.plan12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            data.work1 = data.work1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work2 = data.work2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work3 = data.work3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work4 = data.work4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work5 = data.work5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work6 = data.work6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work7 = data.work7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work8 = data.work8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work9 = data.work9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work10 = data.work10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work11 = data.work11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.work12 = data.work12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            data.in1 = data.in1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in2 = data.in2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in3 = data.in3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in4 = data.in4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in5 = data.in5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in6 = data.in6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in7 = data.in7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in8 = data.in8.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in9 = data.in9.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in10 = data.in10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in11 = data.in11.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.in12 = data.in12.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            modal_edits(".modal_value",main_data.readonly,data);
            main_data.check = 'U';
            $("#addDialog").dialog('open');
        });
    }
}


////////////////////////////호출 함수////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmWorkList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    var date = new Date();
    date.setDate(date.getDate());
    var date2 = new Date();
    date2.setFullYear(date.getFullYear()-1);

    $('#datepicker').datepicker({
        autoclose: true,
        format:'yyyy'+'년',
        language: "kr",
        minViewMode: 'years',
    }).datepicker('setDate',date2);

    $('#datepicker2').datepicker({
        autoclose: true,
        format:'yyyy'+'년',
        language: "kr",
        minViewMode: 'years',
    }).datepicker('setDate',date);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: 'local',
        caption: '실적관리 | MES',
        colNames: ['계획년도','계획금액','실적금액','등록자','등록일시'],
        colModel: [
            {name: 'plan_year', index: 'plan_year', sortable: false, formatter:formatterYear, key:true, fixed:true, width:130},
            {name: 'plan_total', index: 'plan_total', sortable: false, align:'right',formatter:'integer', fixed:true, width:150},
            {name: 'work_total', index: 'work_total', sortable: false, align:'right',formatter:'integer', fixed:true, width:150},
            {name: 'user_name', index: 'user_name', sortable: false, fixed:true, width:130},
            {name: 'update_date', index: 'update_date', sortable: false, formatter:formmatterDate, fixed:true, width:150}
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
            $(this).jqGrid("setSelection", rowid);
            under_get(rowid);
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





function modal_text_reset_lee(class_name) {
    $(class_name).each(function(i){
        $(class_name).val("");
    });
}