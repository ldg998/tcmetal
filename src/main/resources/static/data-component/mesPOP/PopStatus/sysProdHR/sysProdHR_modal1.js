////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    select_modal_box();
    datepickerInput_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {


    var data = value_return('.modal_value')
    data.keyword = main_data.check;
    var text = msg_object.TBMES_Q002.msg_name1;
    if (main_data.check === "U") {
        text = msg_object.TBMES_Q003.msg_name1;
    }
    if (confirm(text)) {
    wrapWindowByMask2();
    ccn_ajax('/sysProdHrAdd', data).then(function (data2) {
        if (data2.result === 'NG') {
            alert(data2.message);
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
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}



function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 320, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();

                }

            },
            {
                text: '취소',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    $(this).dialog("close");

                }

            }

        ],open: function () {
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
    })
}

function select_modal_box() {
    select_makes_base("#line_select_modal", "/sysCommonAllGet","code_value","code_name1",{keyword:'LINE_GROUP'},'').then(function (data) {});

}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);

}