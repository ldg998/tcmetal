////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    modal_make1();

}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2();
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysUserAdd", modal_objact).then(function (data) {
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
                closeWindowByMask();

            }).catch(function (err) {
                closeWindowByMask();
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }
}

function add_click_btn() {
    $(document).on("keypress",'.modal_value',function (e) {
        if (e.which == 13){
            addUdate_btn();
        }
    });
}

//비밀번호 초기화버튼
function pwReset_btn() {
    var modal_objact = value_return(".modal_value");
    if (confirm(msg_object.TBMES_Q015.msg_name1)) { //초기화하시겠습니까?
        modal_objact.keyword = main_data.check; // U
        wrapWindowByMask2();  //마스크
        ccn_ajax("/sysUserPwdReset", modal_objact).then(function (data) {
            alert(data.message);
            get_btn_post($("#mes_grid").getGridParam('page'));
            closeWindowByMask(); //마스크해제
            $("#addDialog").dialog('close'); //창닫기
        }).catch(function (err) {
            closeWindowByMask(); //마스크해제
            alert(msg_object.TBMES_E008.msg_name1); //비밀번호가 변경되었습니다
        });
    }
}
////////////////////////////호출 함수/////////////////////////////////////
//메세지함수
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
    msgGet_auth("TBMES_Q015");
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.user_code === '') {
        alert("사용자코드를 입력해주세요");
        return false;
    } else if (modal_objact.user_name === '') {
        alert("사용자명을 입력해주세요");
        return false;
    } else if (modal_objact.dept_code === '') {
        alert("부서를 선택해주세요");
        return false;
    } else if (modal_objact.duty_code === '') {
        alert("직책을 선택해주세요");
        return false;
    } else if (modal_objact.auth_code === '') {
        alert("권한을 선택해주세요");
        return false;
    }  else {
        return true;
    }
}


function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 400,
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
            },
            {
                text: "암호 초기화",
                "class": "btn btn-minier pwd-reset",
                click: function () {
                    pwReset_btn();
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

function selectBox_modal1() {
    select_makes("#dept_select2", "/sysDeptAllGet", "dept_code", "dept_name");
    select_makes("#duty_select", "/sysCommonDutyGet", "code_value", "code_name1");
    select_makes("#auth_select", "/sysAuthAllGet", "auth_code", "auth_name");
    $('#use_yn').select2();
}