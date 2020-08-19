/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    check2: 'Y',
    auth:{},
    readonly:["lot_no"]
};

////////////////////////////시작 함수/////////////////////////////////////
$(document).ready(function () {
    msg_get();
    authcheck();
    selectBox();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    modal_start1();
});


////////////////////////////클릭 함수/////////////////////////////////////

function test() {
    $('#addDialog').dialog('open');
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date="";
    main_data.send_data.end_date="";
    $("#mes_grid").setGridParam({
        url: "/wmsStockRevGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}



function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 수정인지 체크
        modal_reset(".modal_value", []);
        $("#modal_select1  option:eq(0)").prop("selected", true).trigger("change");
        $("#modal_select4  option:eq(0)").prop("selected", true).trigger("change");
        $("#modal_select5  option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"N");
        modalValuePush2("#main_select3","#outs_supp_code","#outs_supp_name");
        $("#addDialog").dialog('open'); // 모달 열기
    }
}

function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        main_data.check2 = 'N'; // 수정인지 체크
        ccn_ajax('/wmsStockRevOneGet', {keyword: rowid}).then(function (data) { // user의 하나 출력
            disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"Y");
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:data.supp_code},"N").then(function (data2) {
                $("#modal_select2").val(data.part_kind).trigger("change");
                select_makes_base("#modal_select3","/sysSpartAllGet","part_code","part_name",{keyword:data.supp_code,keyword2:data.part_kind},"N").then(function (data3) {
                    $("#modal_select3").val(data.part_code).trigger("change");
                    main_data.check2 = 'Y';
                    $("#addDialog").dialog('open');
                });
            });

        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsSumRev"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
       caption: "제품재고조정 | MES",
       colNames: ['rev_no','업체','기종','품명','품번','단중','제품LOT','등록자','등록일시'],
       colModel: [
           {name: 'rev_no', index: 'rev_no', sortable: false,fixed:true,width:150, key:true,hidden:true},
           {name: 'supp_name', index: 'supp_name', sortable: false,fixed:true,width:120},
           {name: 'part_kind', index: 'part_kind', sortable: false,fixed:true,width:120},
           {name: 'part_name', index: 'part_name', sortable: false,fixed:true,width:120},
           {name: 'part_code', index: 'part_code', sortable: false,fixed:true,width:120},
           {name: 'part_weight', index: 'part_weight', sortable: false,fixed:true,width:100,align:'right',formatter:'integer'},
           {name: 'lot_no', index: 'lot_no', sortable: false,fixed:true,width:100},
           {name: 'user_name', index: 'user_name', sortable: false,fixed:true,width:70},
           {name: 'update_date', index: 'update_date', sortable: false,fixed:true,width:150,formatter: formmatterDate}
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

                $myGrid.setRowData(save_rowid, false, {background:"#FFFFFF"}) ;
                save_rowid = rowid;
                $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
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


function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}


function selectBox() {
    $('#part_kind_select').select2();
    $('#status').select2();
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
