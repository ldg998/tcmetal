////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); //모달 메세지 설정
    modal_make1(); // 모달생성
    add_click_btn(); //키설정
}


////////////////////////////클릭 함수/////////////////////////////////////

// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    var modal_objact = value_return(".modal_value"); //해당 클레스네임 객체에 value name 할당
    if (effectiveness1(modal_objact)) {    //유효성 검사
        var text = msg_object.TBMES_Q002.msg_name1; //해당키워드 따라 메세지출력
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1; //해당키워드 따라 메세지출력
        }

        if (confirm(text)) { //실행여부
            wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
            modal_objact.keyword = main_data.check; //프로시저에서 키워드에따라 insert 인지 update 인지 구분한다
            ccn_ajax("/sysLocAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') { //프로시져 메세지가 ng라면
                    alert(data.message); //오류출력
                } else {
                    if (main_data.check === "I") { // 추가였다면
                        get_btn(1);  // 재조회
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page')); //재조회
                    }
                }
                closeWindowByMask(); // 마스크 종료
                $("#addDialog").dialog('close'); //모달 창닫기
            }).catch(function (err) {
                closeWindowByMask(); // 마스크 종료
                alert(msg_object.TBMES_E008.msg_name1); //메세지 출력
            });
        }
    }

}

function add_click_btn() { //엔터키 활성화
    $(document).on("keypress",'.modal_value',function (e) {
        if (e.which == 13){
            addUdate_btn();
        }
    });
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");//저장여부
    msgGet_auth("TBMES_Q003");//수정여부
    msgGet_auth("TBMES_E008");//데이터 등록 실패
}

function modal_make1() {

    $("#addDialog").dialog({
        modal: true, //모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 'auto', // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가 설정
        buttons: [ //모달 하단 버튼설정
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
     if (modal_objact.loc_name === '') {
        alert("위치명을 입력해주세요");
        return false;
    } else {
        return true;
    }
}