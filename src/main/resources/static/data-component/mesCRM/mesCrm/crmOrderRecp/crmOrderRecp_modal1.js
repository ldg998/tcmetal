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

function select_change_modal1(value) {
    if (value !== ""){
        select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"N").then(function (data) {
            $('#modal_select3').empty();
            var option2 = $("<option></option>").text('선택안함').val('');
            $('#modal_select3').append(option2);
            $('#modal_select3').select2();
        });
    } else {
        $('#modal_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal_select2').append(option);
        $('#modal_select2').select2();

        $('#modal_select3').empty();
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
    }
}

function select_change_modal2(value) {
    if (value !== ""){
        select_makes_base("#modal_select3","/sysSpartAllGet","part_code","part_name",{keyword:$("#modal_select1").val(),keyword2:value},"N").then(function (data) {

        });
    } else {

        $('#modal_select3').empty();
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
    }
}

function select_change_modal3(value) {
            console.log($("#modal_select1").val());
            console.log($("#modal_select2").val());
            console.log(value);

    if (value !== ""){
        ccn_ajax('/sysSpartOneGet',  {keyword:$("#modal_select1").val(),keyword2:$("#modal_select2").val(),keyword3:value}).then(function (data) {
            console.log(data.part_code);
            $("input[name=part_code]").val(data.part_code);


        });
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
        width: 'auto',
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
    $('#modal_select1').select2();
}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);
}
function selectBox_modal1() {
    select_makes_base("#modal_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N").then(function (data) {
        $('#modal_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal_select2').append(option);
        $('#modal_select2').select2();

        $('#modal_select3').empty();
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
    });
}