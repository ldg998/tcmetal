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
    var add_data = value_return(".modal_value");
    var formData = new FormData();
    var check;
    formData.append("supp_code", add_data.supp_code);
    formData.append("part_kind", add_data.part_kind);
    formData.append("part_code", add_data.part_code);

    if ($("#file_01").prop("files")[0] == null) {
        check = 0;
        formData.append("check", check);
    } else {
        check = 1;
        formData.append("file5", $("#file_01").prop("files")[0]);
        formData.append("check", check);
    }
    if(confirm("등록 하시겠습니까?")) {
        wrapWindowByMask2();
        ccn_file_ajax("/sysSPartFile1Add", formData).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            }
            closeWindowByMask();
            $("#addDialog").dialog('close');
            $('#mes_grid').trigger('reloadGrid');
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
        width: 550,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUpdate_btn();
                }
            },
            {
                text: "취소",
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}
