/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var modal2_data = {};
////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2(); // 모달 생성

}

////////////////////////////클릭 함수/////////////////////////////////////

// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn2() {
    var update_qty = parseInt($('input[name=update_qty]').val().replace(/[^0-9]/g,''));

    if (effectiveness2(update_qty)) {

        var text = msg_object.TBMES_Q003.msg_name1;

        if (confirm(text)) {
            wrapWindowByMask2();
            modal2_data.update_qty = update_qty;
            ccn_ajax("/wmsOutOrderUpdate", modal2_data).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                    $("#mes_grid").trigger("reloadGrid");
                    $("#addDialog2").dialog('close');
                } else {

                   $("#mes_grid").trigger("reloadGrid");
                    $("#addDialog2").dialog('close');

                }
                closeWindowByMask();
            }).catch(function (err) {
                closeWindowByMask();
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }

}


////////////////////////////호출 함수/////////////////////////////////////


//유효성 검사
function effectiveness2(update_qty) { // 유효성 검사
    if (modal2_data.ord_qty - modal2_data.prev_qty+ modal2_data.qty < update_qty ) {
        alert("최대수량을 초과했습니다.");
        return false;
    }

    if(modal2_data.wms_qty - modal2_data.comp_qty - modal2_data.qty < 0){
        if((modal2_data.wms_qty - modal2_data.comp_qty - modal2_data.qty)*-1 > update_qty){
            alert("최수수량을 미달했습니다.");
            return false;
        }

    }

    if (update_qty < 0 ) {
        alert("0보다 큰수를 입력해주세요.");
        return false;
    }else {
        return true;
    }

}

// DIALOG 모달창 설정
function modal_make2() {
    $("#addDialog2").dialog({
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
                    addUdate_btn2();
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
