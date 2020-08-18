/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    modal_make1();

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


////////////////////////////호출 함수/////////////////////////////////////

//모달 메세지 설정
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
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

function selectBox_modal1() {
    $('#select_modal1').select2();
    $('#select_modal2').select2();
/* 키워드
* KEYWORD:  사용유무
* KEYWORD2: 업체
* KEYWORD3: 기종
* KEYWORD4: 제품코드
*  */
    select_makes_base("#modal_select1","/outsSelectGet","supp_code","supp_name",{keyword:'Y',keyword2:'',keyword3:'',keyword4:''},"N").then(function (data) {

        $('#modal_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal_select2').append(option);
        $('#modal_select2').select2();

        $('#modal_select3').empty();
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
        main_data.check2 = 'Y'
    });
}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);

}


function select_change_modal1(value) {
    if (main_data.check2 === 'Y'){
        if (value !== ""){
            select_makes_base("#modal_select2","/outsSelectGet","part_kind","part_kind",{keyword:'Y',keyword2:value,keyword3:'',keyword4:''},"N").then(function (data) {
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
            $("input[name=part_code]").val("");
            $("input[name=part_weight]").val("");
        }


    }
}


function select_change_modal2(value) {
    if (main_data.check2 === 'Y') {
        if (value !== "") {
            var supp_code = $('#modal_select1').val();
            select_makes_base("#modal_select3", "/outsSelectGet", "part_code", "part_name", {keyword:'Y',keyword2:supp_code,keyword3:value,keyword4:''}, "N").then(function (data) {
            });
        } else {
            $('#modal_select3').empty();
            var option2 = $("<option></option>").text('선택안함').val('');
            $('#modal_select3').append(option2);
            $('#modal_select3').select2();
        }
        $("input[name=part_code]").val("");
        $("input[name=part_weight]").val("");

    }
}

function select_change_modal3(value) {
    if (main_data.check2 === 'Y') {
        if (value !== "") {
            ccn_ajax('/outsSelectGet', {
                keyword: 'Y',
                keyword2: $("#modal_select1").val(),
                keyword3: $("#modal_select2").val(),
                keyword4: value
            }).then(function (data) {
               console.log(data)
                $("input[name=part_code]").val(data[0].part_code);
                $("input[name=part_weight]").val((data[0].part_weight + "").replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ","));


            });
        } else {
            $("input[name=part_code]").val("");
            $("input[name=part_weight]").val("");
        }
    }
}
