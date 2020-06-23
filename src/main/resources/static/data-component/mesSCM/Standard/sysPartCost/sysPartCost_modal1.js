////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    add_click_btn();// 키설정
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
            wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysPartNameAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                closeWindowByMask(); // 마스크 종료
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                closeWindowByMask(); // 마스크 종료
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }

}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}

function effectiveness1(modal_objact) { // 유효성 검사
     if (modal_objact.part_name === '') {
        alert("품목명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}

function add_click_btn() { // 엔터키를 통한 버튼 활성화
     $(document).on("keypress",'.modal_value',function (e) {
         if (e.which == 13){
             addUdate_btn();
         }
     });
}

function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 300, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: "저장",
                'id': "addUdate_btn",
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