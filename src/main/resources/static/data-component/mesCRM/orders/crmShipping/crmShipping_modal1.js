/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    modal_make1();
   // datepickerInput_modal();
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
            ccn_ajax("/sysDeptAdd", modal_objact).then(function (data) {
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

// 엔터키를 통한 저장버튼 활성화
function add_click_btn() {
    $(document).on("keypress",'.modal_value',function (e) {
        if (e.which == 13){
            addUdate_btn();
        }
    });
}

function num_keyup_comma_ship(e) {
    $(e).val($(e).val().replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")).trigger("change");
    // $(e).val($(e).val()).trigger("change");
    // sum_qty_keyup();
    sum_unit_cost();
}

function wood_select_btn(value,num) {
    if (value !== ""){
        ccn_ajax('/sysWoodOneGet', {keyword:value}).then(function (data) { // user의 하나 출력
            $("input[name=wood_cost"+num+"]").val(data[0].unit_cost);
            sum_unit_cost();
        });
    } else {
        $("input[name=wood_cost"+num+"]").val("");
        sum_unit_cost();
    }
}

function sum_unit_cost() {
    var value_data = value_return(".modal_value");
    var sum_cost =
        parseInt(value_data.ship_cost)+
        parseInt(value_data.port_cost1)+
        parseInt(value_data.port_cost2)+
        parseInt(value_data.port_cost3)+
        parseInt(value_data.port_cost4)+
        parseInt(value_data.port_cost5)+
        parseInt(value_data.unloading_cost)+
        parseInt(value_data.landing_ost)+
        parseInt(value_data.harbor_facility)+
        parseInt(value_data.local_cost)+
        parseInt(value_data.customs_fee)+
        (parseInt(value_data.wood_qty1)*parseInt(value_data.wood_cost1))+
        (parseInt(value_data.wood_qty2)*parseInt(value_data.wood_cost2))+
        (parseInt(value_data.wood_qty3)*parseInt(value_data.wood_cost3));

    $("input[name=unit_cost]").val((sum_cost+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));

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
        width: '600',
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

function selectBox_modal1() {
    select_makes_base("#modal1_select1", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');
    select_makes_base("#modal1_select2", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');
    select_makes_base("#modal1_select3", "/sysWoodAllGet","wood_code","wood_code",{keyword:''},'N');

}

// function datepickerInput_modal() {
//     datepicker_makes("#datepicker_modal", -30);
//     datepicker_makes("#datepicker_modal2", 30);
// }

