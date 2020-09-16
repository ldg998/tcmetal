////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUpdate_btn() {
    if (confirm('내용을 수정하시겠습니까?')) {
        var add_data = value_return(".modal_value");
        var formData = new FormData();
        var check1;
        var check2;
        var check4;
        formData.append("supp_code", add_data.supp_code);
        formData.append("part_kind", add_data.part_kind);
        formData.append("part_code", add_data.part_code);
        formData.append("remark2", add_data.remark2);
        formData.append('file1',add_data.file1);
        formData.append('file2',add_data.file2);
        formData.append('file4',add_data.file4);

        if ($("#file_01").prop("files")[0] == null) {
            check1 = 0;
            formData.append("check1", check1);
        } else {
            check1 = 1;
            formData.append("files1", $("#file_01").prop("files")[0]);
            formData.append("check1", check1);
        }
        if ($("#file_02").prop("files")[0] == null) {
            check2 = 0;
            formData.append("check2", check2);
        } else {
            check2 = 1;
            formData.append("files2", $("#file_02").prop("files")[0]);
            formData.append("check2", check2);
        }
        if ($("#file_04").prop("files")[0] == null) {
            check4 = 0;
            formData.append("check4", check4);
        } else {
            check4 = 1;
            formData.append("files4", $("#file_04").prop("files")[0]);
            formData.append("check4", check4);
        }

        // if(confirm("등록 하시겠습니까?")){
            wrapWindowByMask2();
            ccn_file_ajax("/sysSPartDrawingAdd", formData).then(function (data) {
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
        // }

    }
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
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

function file_change2(e){
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){

        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }
}

function file_change3(e){
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){

        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }
}

function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 500, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
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
    })
}