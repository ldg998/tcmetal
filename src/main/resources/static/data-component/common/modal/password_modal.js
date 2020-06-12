////////////////////////////시작 함수/////////////////////////////////////
function password_modal_start() {
    password_modal_make();
}


////////////////////////////클릭 함수/////////////////////////////////////
function password_addUdate_btn() {
    var modal_objact = value_return(".password_value");
    if (password_effectiveness(modal_objact)) {
        if (confirm('수정하겠습니까?')) {
            ccn_ajax("/userInformationChange", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    alert(data.message);
                    location.href='/logout';
                    $("#passwordDialog").dialog('close');
                }
            }).catch(function (err) {
                alert("저장실패");
            });
        }
    }

}

////////////////////////////호출 함수/////////////////////////////////////
function password_effectiveness(modal_objact) { // 유효성 검사
    if (modal_objact.password === '') {
        alert("현재 비밀번호를 입력해주세요");
        return false;
    } else if (modal_objact.password_new === '') {
        alert("신규 비밀번호를 입력해주세요");
        return false;
    }  else if (modal_objact.password_confirm === '') {
        alert("비밀번호 확인을 입력해주세요");
        return false;
    }  else if (modal_objact.password === modal_objact.password_new) {
        alert("현재와 신규의 비빌번호가 같습니다.");
        return false;
    } else if (modal_objact.password_new !== modal_objact.password_confirm) {
        alert("비밀번호 확인을 다시 입력해주세요.");
        return false;
    } else {
        return true;
    }
}


function password_modal_make() {
    $("#passwordDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    password_addUdate_btn();
                }
            },
            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}
