
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBox_modal1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function selectBox_modal1() {
    select_makes_sub("#result_select", "/sysCommonAllGet","code_value","code_name1",{keyword:'MACHINE_REG_RESULT'},'N');
    $('#check_yn').select2();
}


function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q003.msg_name1;
        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            modal_objact.work_date = modal_objact.work_date.replace(/\-/g, '');
            ccn_ajax("/tpmMachineRegCompAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    get_btn_post($("#mes_grid").getGridParam('page'));
                }
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }
}

function select_change1(value) {
    if(value === 'Y') {
        $('#result_select').prop("disabled", false).trigger("change");
        $('#measure_name').prop("readonly", false).trigger("change");
    } else {
        $('#result_select').val('');
        $('#measure_name').val('');
        $('#result_select').prop("disabled", true).trigger("change");
        $('#measure_name').prop("readonly", true).trigger("change");
    }
}
////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        autoOpen:false,
        modal: true,
        width: 'auto',
        height: 'auto',
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ],
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

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.line_code === '') {
        alert("공정을 선택해주세요");
        return false;
    } else if (modal_objact.machine_code === '') {
        alert("설비를 선택해주세요");
        return false;
    } else {
        return true;
    }
}

