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
    modal_objact.part_weight = modal_objact.part_weight.replace(/\,/g, '');
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if(modal_objact.result_code2 == ''){
    modal_objact.qc_result = 3
    }else {
    modal_objact.qc_result = 2
    }
        if(select_ck(modal_objact)) {
            if (result_code_ck(modal_objact)) {
                if (confirm(text)) {

                    wrapWindowByMask2();
                    modal_objact.keyword = main_data.check;
                    ccn_ajax("/outsErrorAdd", modal_objact).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            if (main_data.check === "I") {
                                $("#addDialog").dialog('close');
                                get_btn(1);
                            } else {
                                $("#addDialog").dialog('close');
                                $('#mes_grid').trigger("reloadGrid");
                            }
                        }
                        closeWindowByMask();

                    }).catch(function (err) {
                        closeWindowByMask();
                        alert(msg_object.TBMES_E008.msg_name1);
                    });
                }
            } else {
                alert('불량유형을 한가지만 선택해주세요.');
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

    select_makes_base('#select_modal1','/sysQcItemCdAll','qc_code','qc_name',{keyword:5,keyword2:1},'N').then(function(data){

    });
    select_makes_base('#select_modal2','/sysQcItemCdAll','qc_code','qc_name',{keyword:2,keyword2:2},'N').then(function(data){

    });

    /* 키워드
    * KEYWORD:  사용유무
    * KEYWORD2: 업체
    * KEYWORD3: 기종
    * KEYWORD4: 제품코드
    *  */
    select_makes_base("#modal_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N").then(function (data) {

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


function result_code_ck(data){
    var ck = true;
    if(data.result_code2 !="" && data.result_code3 !=""){
        ck =false;
    }
    if(data.result_code2 =="" && data.result_code3 ==""){
        ck =false;
    }
    return ck
}

function select_ck(data){
   if(data.supp_code ==""){
       alert('업체를 선택해주세요');
       return false
    }else if(data.part_kind ==""){
        alert('기종을 선택해주세요');
       return false
    }else if(data.part_code ==""){
        alert('품명을 선택해주세요');
       return false
    }else if(data.lot_no ==""){
       alert('제품LOT를 작성해주세요');
       return false
    }else {
       return true
   }

}


/*

function select_change_modal4(value) {

    if(value == '') {

    }else {
        $("#select_modal2").prop("disabled", true).trigger("change");//셀렉트박스 잠금으로 체인지
    }

}

function select_change_modal5(value) {
    if(value == ''){

    }else {
        $("#select_modal1").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
    }
}
*/
