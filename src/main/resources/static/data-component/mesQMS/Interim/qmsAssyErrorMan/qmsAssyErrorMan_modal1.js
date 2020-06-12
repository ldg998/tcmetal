
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBox_modal1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addupdate_btn() {
    if (confirm('내용을 수정하시겠습니까?')) {
        var add_data = value_return(".modal_value");
        var formData = new FormData();
        var check2;
        var check3;
        console.log(add_data);
        formData.append("qc_no", add_data.qc_no);
        formData.append("part_code", add_data.part_code);
        formData.append("act_type", add_data.act_type);
        if ($("#file_02").prop("files")[0] == null) {
            check2 = 0;
            formData.append("check2", check2);
        } else {
            check2 = 1;
            formData.append("file2", $("#file_02").prop("files")[0]);
            formData.append("check2", check2);
        }
        if ($("#file_03").prop("files")[0] == null) {
            check3 = 0;
            formData.append("check3", check3);
        } else {
            check3 = 1;
            formData.append("file3", $("#file_03").prop("files")[0]);
            formData.append("check3", check3);
        }

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: "/qmsAssyErrorManAdd",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $('#addDialog').dialog('close');
                $('#mes_grid').trigger('reloadGrid');
            },
            error: function (e) {
                alert('업로드에 실패하였습니다.');
                closeWindowByMask();
                console.log("ERROR : ", e);
            }
        });
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function selectBox_modal1(){
    $('#act_type_modal').select2();
}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){
        //var filename2 = filename[2].substr(0,13) + "..";

        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }
}

function modal_make1() {
    $("#addDialog").dialog({
        autoOpen:false,
        modal: true,
        width: 600,
        height: 'auto',
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addupdate_btn();
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
    });
}



