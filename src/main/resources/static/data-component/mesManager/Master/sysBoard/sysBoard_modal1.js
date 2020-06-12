////////////////////////////시작 함수/////////////////////////////////////

function modal_start1() {
    msg_get_modal1();
    modal_make1();
    add_click_btn();

}

////////////////////////////클릭 함수/////////////////////////////////////
//저장,수정 버튼
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (modal_objact.files === ''){
        modal_objact.files = 0;
    }

    if (modal_objact.file_size === ''){
        modal_objact.file_size = 0;
    }
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        if (confirm(text)) {
            wrapWindowByMask2();
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysBoardAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                closeWindowByMask();
                $("#addDialog").dialog('close');
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
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

//모달생성
function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 400,
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
// 유효성 검사
function effectiveness1(modal_objact) {
  if (modal_objact.board_en === '') {
        alert("영문명을 입력해주세요");
        return false;
    } else if (modal_objact.board_kr === '') {
        alert("한글명을 입력해주세요");
        return false;
    } else {
        return true;
    }
}

