////////////////////////////시작 함수/////////////////////////////////////
function crmModal_start() {

    crmModal_make();
    crmModal_jqGrid();
    crm_datepickerInput_modal();
    jqGridResize("#crmSearchGrid", $('#crmSearchGrid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////

function crmModal_get_btn(page) {
    var crm_send_data = value_return(".crm_condition");
    crm_send_data.start_date = crm_send_data.start_date.replace(/\-/g, '');
    crm_send_data.end_date = crm_send_data.end_date.replace(/\-/g, '');
    crm_send_data.keyword2 = "";
    crm_send_data.keyword3 = "";

    $("#crmSearchGrid").setGridParam({
        url: '/crmOrderRecpGet',
        datatype: "json",
        page: page,
        postData: crm_send_data,
    }).trigger("reloadGrid");
}

function crmModal_check() {
    if ($("#crmSearchGrid").getGridParam("selrow")) {
        var ids = $("#crmSearchGrid").getGridParam("selrow");

        ccn_ajax('/crmOrderRecpOneGet', {keyword:ids}).then(function (data) {

            crmModal_bus(data);
            $("#crm-search-dialog").dialog('close');
        });
        }else {
            alert("선택하십시오");
        }
}


function crmModal_close() {
    modal_reset(".crm_condition",[]);
    $("#crmSearchGrid").jqGrid('clearGridData');
    $("#crm-search-dialog").dialog('close');
    crmModal_close_bus();
}

////////////////////////////호출 함수/////////////////////////////////////



function crmModal_make() {
    $("#crm-search-dialog").dialog({
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

function crmModal_jqGrid() {
    $('#crmSearchGrid').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "수주번호조회 | MES",
        colNames: ['','수주일자','업체명','수주번호','현장명','담당자','연락처','수주내용'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#crmSearchGrid\''+','+'\''+rowObject.ord_no+'\''+');"/>';
            }},
            {name: 'work_date', index: 'work_date', sortable: false,formatter: formmatterDate2},
            {name: 'supp_name', index: 'supp_name', sortable: false},
            {name: 'ord_no', index: 'ord_no', sortable: false,key:true},
            {name: 'place_name', index: 'place_name', sortable: false},
            {name: 'emp_name', index: 'emp_name', sortable: false},
            {name: 'emp_tel', index: 'emp_tel', sortable: false},
            {name: 'ord_name', index: 'ord_name', sortable: false}
        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        pager: '#crmSearchGridPager',
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
            crmModal_check();
        }
    });
}

function crm_datepickerInput_modal() {
    datepicker_makes("#crm_datepicker", -1);
    datepicker_makes("#crm_datepicker2", 0);
}


