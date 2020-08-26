/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    datepicker_modal1();
    select_modal_start();
}


////////////////////////////클릭 함수/////////////////////////////////////

// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.startup_date = modal_objact.startup_date.replace(/\-/g, '');
    modal_objact.part_weight = modal_objact.part_weight.replace(/\,/g, '');
    modal_objact.gross_weight = modal_objact.gross_weight.replace(/\,/g, '');

    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2();
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysSpartAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        $("#addDialog").dialog('close');
                        get_btn(1);
                    } else {
                        $("#addDialog").dialog('close');
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                closeWindowByMask();

            }).catch(function (err) {
                closeWindowByMask();
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }

}

////////////////////////////호출 함수/////////////////////////////////////

//모달 메세지 설정
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.dept_name === '') {
        alert("부서명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}


function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 600,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        // 모달 창에서의 select2() 의 검색기능을 활성화
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


function datepicker_modal1() {
    datepicker_makes("#datepicker_modal1", 0); //모달 초기날짜 설정
}
function select_modal_start(){

    select_makes_base("#supp_modal_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'});
    select_makes_base("#select_modal1", "/sysCommonAllGet","code_value","code_name1",{keyword:'CURRENCY_TYPE'});
    $('#select_modal2').select2();
    select_makes_base("#select_modal3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"N");
    select_makes_base("#select_modal4", "/sysCommonAllGet","code_value","code_name1",{keyword:'TRANS_TYPE'});
    $('#select_modal5').select2();
    select_makes_base("#select_modal6", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');
    select_makes_base("#select_modal7", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');
    select_makes_base("#select_modal8", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');
    $('#select_modal9').select2();

}
