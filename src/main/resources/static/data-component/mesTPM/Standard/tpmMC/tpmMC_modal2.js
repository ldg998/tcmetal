var modal2_data = {
    check:'I',
    readonly: ['part_name'],
}

////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    msg_get_modal2(); //메세지 함수
    modal_make2(); //모달창 생성

}

////////////////////////////클릭 함수/////////////////////////////////////

// 설비부품을 조회한다
function modal2_get_btn() {
    $("#mes_modal_grid").setGridParam({ // 그리드 조회
        url: '/tpmMCPartAllGet',
        datatype: "json",
        postData: {keyword:$("#machine_code").val()} //설비코드
    }).trigger("reloadGrid"); // 강제 reload
}


function modal2_addUdate_btn() {
    var modal_objact = value_return(".modal_value2"); //값을 가져옴
    if (effectiveness2(modal_objact)) { // 유효성검사
        var text = msg_object.TBMES_Q002.msg_name1; //저장할?
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1; //수정할?
        }
        if (confirm(text)) {
            wrapWindowByMask2(); //클릭방지 마스크
            modal_objact.keyword = modal2_data.check;
            modal_objact.machine_code = $("#machine_code").val(); //설비코드
            ccn_ajax("/tpmMCPartAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') { //NG일시
                    alert(data.message); //message
                } else { //성공시
                    if(modal2_data.check ==='I'){
                        modal2_get_btn(1);
                        $("#addDialog2").dialog('close');
                    }else {
                        $("#addDialog2").dialog('close');
                        $('#mes_modal_grid').trigger("reloadGrid");
                    }

                }
                closeWindowByMask(); //마스크해제
            }).catch(function (err) {
                closeWindowByMask(); //마스크해제
                alert(msg_object.TBMES_E008.msg_name1); //경고창
            });
        }
    }
}

function  modal2_update_btn(jqgrid_data) {
    modal_reset(".modal_value2", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
    modal2_data.check = 'U'; // 수정인지 체크

    ccn_ajax('/tpmMCPartOneGet', {machine_code:$("#machine_code").val(),part_name:jqgrid_data.part_name}).then(function (data) { // user의 하나 출력
        modal_edits('.modal_value2', modal2_data.readonly, data); // response 값 출력

        $("#addDialog2").dialog('open'); //모달창 오픈
    });
}


////////////////////////////호출 함수/////////////////////////////////////
//메세지 함수
function msg_get_modal2() {
    msgGet_auth("TBMES_Q002"); //저장하시겠습니까?
    msgGet_auth("TBMES_Q003"); //수정하시겠습니까?
    msgGet_auth("TBMES_E008"); //데이터 등록에 실패
}

//모달창 설정
function modal_make2() {
    $("#addDialog2").dialog({
        modal: true, //모달성정 , 마스크로 덮음
        width: 400, //가로
        height: 'auto', //세로
        autoOpen: false, //자동오픈해제
        resizable: false, //크기조절불가
        buttons: [ //모달 하단 버튼 설정
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    modal2_addUdate_btn();
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


function effectiveness2(modal_objact) { // 유효성 검사
    if (modal_objact.part_name === '') {
        alert("품명을 입력해주세요");
        return false;
    } else if (modal_objact.spec === '') {
        alert("규격을 입력해주세요");
        return false;
    }  else if (modal_objact.qty === '') {
        alert("수량을 입력해주세요");
        return false;
    } else if (modal_objact.buy_corp_name === '') {
        alert("구매처를 입력해주세요");
        return false;
    } else if (modal_objact.corp_tel_no === '') {
        alert("연락처를 입력해주세요");
        return false;
    }else {
        return true;
    }
}