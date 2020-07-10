/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); // 모달 메세지 설정
    modal_make1(); // 모달 생성

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

            ccn_ajax("/sysAuthAdd", modal_objact).then(function (data) {
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

////////////////////////////호출 함수/////////////////////////////////////

//모달 메세지 설정
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); // 저장여부
    msgGet_auth("TBMES_Q003"); // 수정여부
    msgGet_auth("TBMES_E008"); // 데이터 등록 실패
}

//유효성 검사
function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.auth_name === '') {
        alert("권한그룹명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}

// DIALOG 모달창 설정
function modal_make1() {
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 300, // 가로 설정
        height: 'auto', // 세로 설정
        autoOpen: false, // 자동 오픈 해제
        resizable: false, // 크기 조절 불가 설정
        buttons: [ // 모달 하단 버튼 설정
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
        ]
    })
}
