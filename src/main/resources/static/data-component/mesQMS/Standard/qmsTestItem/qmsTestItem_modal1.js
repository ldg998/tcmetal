////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
}
////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var send_data = value_return(".modal_value");
    if (effectiveness1(send_data)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        send_data.keyword = main_data.check;
        if (confirm(text)) {
            ccn_ajax('/qmsQcItemAdd', send_data).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                    }
                    $("#addDialog").dialog('close');
                }
            });
        }
    }


}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
}

function selectBox_modal1(){
    $('#select_modal1').select2();
    $('#select_modal2').select2();
    $('#use_yn').select2();

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
        ]
    })
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.qc_name === '') {
        alert("검사명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}
function select_change_modal1(value){
    if(value == 1){
        $('#select_modal2').empty();
        var option = $("<option></option>").text('불량유형').val(1);
        $('#select_modal2').append(option);
        $('#select_modal2').select2();
    }else if(value ==2){
        $('#select_modal2').empty();
        var option = $("<option></option>").text('검사항목').val(1);
        var option2 = $("<option></option>").text('폐기사유').val(2);
        $('#select_modal2').append(option);
        $('#select_modal2').append(option2);
        $('#select_modal2').select2();
    }else if(value ==3){
        $('#select_modal2').empty();
        var option = $("<option></option>").text('검사항목').val(1);
        $('#select_modal2').append(option);
        $('#select_modal2').select2();
    }else if(value ==4){
        $('#select_modal2').empty();
        var option = $("<option></option>").text('부적합 분류').val(1);
        $('#select_modal2').append(option);
        $('#select_modal2').select2();
    }else if(value ==5){
        $('#select_modal2').empty();
        var option = $("<option></option>").text('수정').val(1);
        var option2 = $("<option></option>").text('패기').val(2);
        $('#select_modal2').append(option);
        $('#select_modal2').append(option2);
        $('#select_modal2').select2();
    }else {
        $('#select_modal2').empty();
        var option = $("<option></option>").text('선택없음').val('');
        $('#select_modal2').append(option);
        $('#select_modal2').select2();
    }

}