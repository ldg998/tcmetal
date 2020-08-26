/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    modal_make1();
    datepickerInput_modal();
}


////////////////////////////클릭 함수/////////////////////////////////////

// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
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

            ccn_ajax("/qmsMoldWashAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        $("#addDialog").dialog('close');
                        get_btn(1);
                    } else {
                        $("#addDialog").dialog('close');
                        $('#mes_grid').trigger("reloadGrid"); //화면 리로딩
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
    var timeRegExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;

    if(timeRegExp.test(modal_objact.time1) == false){
        alert("1차 측정시간을 확인해주세요")
        return false;
    }else if(timeRegExp.test(modal_objact.time2)==false){
        alert("2차 측정시간을 확인해주세요")
        return false;
    }else if(timeRegExp.test(modal_objact.time3) == false){
        alert("3차 측정시간을 확인해주세요")
        return false;
    }else if(timeRegExp.test(modal_objact.time4) == false){
        alert("4차 측정시간을 확인해주세요")
        return false;
    }else {
        return true
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
                "class": "btn btn-minier",
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

function selectBox_modal1() {
    select_makes_sub("#modal_select1","/sysUserAllGet","user_code","user_name",{keyword:"",keyword2:"Y"},"Y")
    select_makes_sub("#modal_select2","/sysUserAllGet","user_code","user_name",{keyword:"",keyword2:"Y"},"Y")
    select_makes_sub("#modal_select3","/sysUserAllGet","user_code","user_name",{keyword:"",keyword2:"Y"},"Y")
    select_makes_sub("#modal_select4","/sysUserAllGet","user_code","user_name",{keyword:"",keyword2:"Y"},"Y")



}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal",0);
}
