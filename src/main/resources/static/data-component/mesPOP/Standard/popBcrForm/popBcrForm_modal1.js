
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.bcr_contents = $("#bcr_contents").val();
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        if (confirm(text)) {
            modal_objact.keyword = main_data.check;
            ccn_ajax("/popBcrFormAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function modal_make1() {
    $("#addDialog").dialog({
        autoOpen:false,
        modal: true,
        width: 'auto',
        height: 'auto',
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
    });
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.bcr_form_code === '') {
        alert("양식코드를 입력해주세요");
        return false;
    }
    else if (modal_objact.bcr_form_name === '') {
        alert("양식명을 입력해주세요");
        return false;
    } else {
        return true;
    }
}


