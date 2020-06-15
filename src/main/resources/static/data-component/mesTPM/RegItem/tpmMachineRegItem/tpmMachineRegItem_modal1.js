////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {

            modal_objact.keyword = main_data.check;

            ccn_ajax("/tpmMachineRegItemAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if(main_data.check ==='I'){
                        get_btn(1);
                    }
                    $('#mes_grid').trigger("reloadGrid");
                }
                $("#addDialog").dialog('close');

            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
                $("#addDialog").dialog('close');
            });
        }
    }

}

////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function effectiveness1(modal_objact) { // 유효성 검사
     if (modal_objact.qc_name === '') {
        alert("점검항목명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}

function selectBox_modal1() {
    $('#use_yn_modal').select2();
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
    });
}
