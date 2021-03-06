////////////////////////////시작 함수/////////////////////////////////////
function modal2_start() {

    modal2_make();
    modal2_jqGrid();
    datepickerInput_modal2();
    selectBox_modal2();
    jqGridResize("#mes_modal2_grid1", $('#mes_modal2_grid1').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////

function modal2_get_btn(page) {
    var modal2_send_data = value_return(".modal_value2");
    $("#mes_modal2_grid1").setGridParam({
        url: '/crmShippingWmsOutGet',
        datatype: "json",
        page: page,
        postData: modal2_send_data,
    }).trigger("reloadGrid");
}

function modal2_check() {
    if ($("#mes_modal2_grid1").getGridParam("selrow")) {
        var ids = $("#mes_modal2_grid1").getGridParam("selrow");
        var idsdata = $('#mes_modal2_grid1').jqGrid('getRowData', ids);
        ccn_ajax('/crmShippingWmsOutOneGet', {keyword:idsdata.out_no}).then(function (data) {
            data.weight=data.all_weight;
            modal_edits(".modal_value",[],data);
            modal2_close();
        });
        }else {
            alert("선택하십시오");
        }
}


function modal2_close() {
    modal_reset(".modal_value2",[]);
    datepicker_makes("#datepicker_modal", -30);
    datepicker_makes("#datepicker2_modal", 0);
    $("#mes_modal2_grid1").jqGrid('clearGridData');
    $("#addDialog2").dialog('close');
}

////////////////////////////호출 함수/////////////////////////////////////



function modal2_make() {
    $("#addDialog2").dialog({
        autoOpen:false,
        modal: true,
        width:'1300',
        height: 'auto',
        resizable: false,
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }

    });
}

function modal2_jqGrid() {
    $('#mes_modal2_grid1').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "출하조회 | MES",
        colNames: ['','rownum','출고일자','선적일자','출고전표','업체','기종','품명','품번','단중','운송수단','수량','중량','차량번호'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false,width:30,fixed: true, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#mes_modal2_grid1\''+','+'\''+rowObject.out_no+'\''+');"/>';
            }},
            {name: 'rownum', index: 'rownum', sortable: false,key:true,hidden:true,width:120,fixed: true},
            {name: 'out_date', index: 'out_date', sortable: false,formatter: formmatterDate2,width:80,fixed: true},
            {name: 'ship_date', index: 'ship_date', sortable: false,formatter: formmatterDate2,width:80,fixed: true},
            {name: 'out_no', index: 'out_no', sortable: false,width:120,fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false,width:120,fixed: true},
            {name: 'part_kind', index: 'part_kind', sortable: false,width:120,fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false,width:200,fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false,width:120,fixed: true},
            {name: 'part_weight', index: 'part_weight', sortable: false, align: 'right', formatter:'integer',width:100,fixed: true},
            {name: 'trans_name', index: 'trans_name', sortable: false,width:100,fixed: true},
            {name: 'qty', index: 'qty', sortable: false, align: 'right', formatter:'integer',width:100,fixed: true},
            {name: 'weight', index: 'weight', sortable: false, align: 'right', formatter:'integer',width:100,fixed: true},
            {name: 'car_no', index: 'car_no', sortable: false,width:120,fixed: true,hidden:true},
        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        pager: '#mes_modal2_grid1_pager',
        jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            modal2_check();
        },
        loadComplete:function(data){// 그리드 LOAD가 완료 되었을 때

            var req_no = "";
            var background2 =  "rgb(249,253,255)";
            var check = "Y";
            data.rows.forEach(function (idsfor, s) {
                if (s == 0){
                    req_no = idsfor.req_no;
                } else {
                    if (idsfor.req_no !== req_no){
                        req_no = idsfor.req_no;
                        if (check === 'Y'){
                            background2 =  "rgb(254,255,229)";
                            check = "N";
                        } else {
                            background2 =  "rgb(249,253,255)";
                            check = "Y";
                        }
                    }
                }

                $("#mes_modal2_grid1").setRowData(idsfor.rownum, false, {background:background2}) ;



            });


            if ($("#mes_modal2_grid1").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}

function datepickerInput_modal2() {
    datepicker_makes("#datepicker_modal", -30);
    datepicker_makes("#datepicker2_modal", 0);
}

function selectBox_modal2() {
    select_makes_base("#modal2_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {

    });

}
