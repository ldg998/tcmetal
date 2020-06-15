////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
    datepickerInput_modal1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value"); //8개
    modal_objact.line_code= $('#line_select2').val();
    modal_objact.work_date=modal_objact.work_date.replace(/\-/g, '');
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2()
            modal_objact.keyword = main_data.check;

            ccn_ajax("/tpmMachineErrorAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        $("#addDialog").dialog('close');
                        get_btn(1);
                    } else {
                        $("#addDialog").dialog('close');
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                }
               closeWindowByMask()
            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }
}

function select_change2(value) {
    if (main_data.check === "I"){
        $('#machine_select2').empty();
        select_makes_sub_ajax("#machine_select2","/tpmMachineAllGet","machine_code","machine_name",{keyword:value}).then(function (data) {
            if ($("#machine_select").val() !== ''){
                $("#machine_select2").val($("#machine_select").val()).trigger("change");
                if ($("#machine_select2").val() === null){
                    $("#machine_select2 option:eq(0)").prop("selected", true).trigger("change");
                }
            }else {
                $("#machine_select2 option:eq(0)").prop("selected", true).trigger("change");
            }

        });
    }
}



////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function selectBox_modal1() {
    select_makes_sub_ajax("#line_select2", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''}).then(function (data){

    });

    select_makes3("#type_select", "/sysCommonAllGet","code_value","code_name1",{keyword:'MACHINE_ERROR_TYPE'});
    select_makes3("#result_select", "/sysCommonAllGet","code_value","code_name1",{keyword:'MACHINE_ERROR_RESULT'});

    $('#stop_yn').select2();
}

function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
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



    if (modal_objact.work_date === '') {
        alert("점검일을 선택해주세요");
        return false;
    } else if (modal_objact.line_name === '' || modal_objact.line_name ===null )  {
        alert("라인을 선택해주세요");
        return false;
    } else if (modal_objact.machine_code === '' || modal_objact.machine_code ===null) {
        alert("설비명을 선택해주세요");
        return false;
    } else if (modal_objact.stop_time === '') {
        alert("고장시간(분)을 입력해주세요");
        return false;
    }

    else {

        return true;
    }
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);

}