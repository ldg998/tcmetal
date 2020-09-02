////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    select_modal_box();
    datepickerInput_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {

}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}



function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 320, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    $(this).dialog("close");

                }

            },
            {
                text: '취소',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    $(this).dialog("close");

                }

            }

        ]
    })
}

function select_modal_box() {
    $('#select_modal1').select2();
    $('#select_modal2').select2();
    $('#select_modal3').select2();
    $('#select_modal4').select2();
    $('#select_modal5').select2();
    $('#select_modal6').select2();
    $('#select_modal7').select2();
    $('#select_modal8').select2();
}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);

}