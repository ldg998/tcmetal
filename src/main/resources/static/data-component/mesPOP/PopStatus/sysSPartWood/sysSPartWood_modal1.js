////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    select_modale_box();
    datepickerInput();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUpdate_btn() {
    if (confirm('내용을 수정하시겠습니까?')) {
        var add_data = value_return(".modal_value");
        var formData = new FormData();
        var check;

        formData.append("supp_code", add_data.supp_code);
        formData.append("part_kind", add_data.part_kind);
        formData.append("part_code", add_data.part_code);
        formData.append("remark", add_data.remark);

        if ($("#file_02").prop("files")[0] == null) {
            check = 0;
            formData.append("check", check);
        } else {
            check = 1;
            formData.append("file3", $("#file_03").prop("files")[0]);
            formData.append("check", check);
        }
        // wrapWindowByMask2();
        // ccn_file_ajax("/sysSPartDrawingAdd", formData).then(function (data) {
        //     if (data.result === 'NG') {
        //         alert(data.message);
        //     }
        //     closeWindowByMask();
        //     $("#addDialog").dialog('close');
        //     $('#mes_grid').trigger('reloadGrid')
        //
        // }).catch(function (err) {
        //     closeWindowByMask();
        //     $("#addDialog").dialog('close');
        // });
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

function select_modale_box(){
    select_makes_base("#supp_select_modal","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });
}

function datepickerInput() {
    datepicker_makes("#wood_in_date_modal1", 0);
}
