/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUpdate_btn() {
    var text = msg_object.TBMES_Q002.msg_name1;
    if (main_data.check === "U") {
        text = msg_object.TBMES_Q003.msg_name1;
    }
    if (confirm(text)) {
        var add_data = value_return(".modal_value");
        var formData = new FormData();
        var check;

        formData.append("machine_code", add_data.machine_code);
        formData.append("machine_name", add_data.machine_name);
        formData.append("device_no", add_data.device_no);
        formData.append("capa", add_data.capa);
        formData.append("spec", add_data.spec);
        formData.append("correct_corp_name", add_data.correct_corp_name);
        formData.append("correct_date", add_data.correct_date);
        formData.append("end_date", add_data.end_date);
        formData.append("alarm_day", add_data.alarm_day);
        formData.append("keyword", main_data.check);

        if ($("#file_01").prop("files")[0] == null) {
            check = 0;
            formData.append("check", check);
        } else {
            check = 1;
            formData.append("file1", $("#file_01").prop("files")[0]);
            formData.append("check", check);
        }
        wrapWindowByMask2();
        ccn_file_ajax("/qmsInspMachineAdd", formData).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            }
            closeWindowByMask();
            $("#addDialog").dialog('close');
            $('#mes_grid').trigger('reloadGrid')

        }).catch(function (err) {
            closeWindowByMask();
            $("#addDialog").dialog('close');
        });
    }
}
////////////////////////////호출 함수/////////////////////////////////////
//모달 메세지 설정
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){

        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 350,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUpdate_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}