/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    msg_get_modal1();
    select_modal_start();
}


////////////////////////////클릭 함수/////////////////////////////////////


////////////////////////////호출 함수/////////////////////////////////////

function addUdate_btn() {
    var add_data = value_return(".modal_value");
    var formData = new FormData();
    var check;
    if (effectiveness1(add_data)){
    formData.append("supp_code", add_data.supp_code);
    formData.append("rpt_name", add_data.rpt_name);
    formData.append("trans_code", add_data.trans_code);
    formData.append("notice1", add_data.notice1);
    formData.append("notice2", add_data.notice2);
    formData.append("notice3", add_data.notice3);
    formData.append("notice4", add_data.notice4);
    formData.append("notice5", add_data.notice5);
    formData.append("notice6", add_data.notice6);
    formData.append("mark1", add_data.mark1);
    formData.append("mark2", add_data.mark2);
    formData.append("mark3", add_data.mark3);
    formData.append("mark4", add_data.mark4);
    formData.append("mark5", add_data.mark5);
    formData.append("file", $("#ex_file").prop("files")[0]);

    if ($("#ex_file").prop("files")[0] == null) {
        check = 0;
        formData.append("check", check);
    } else {
        check = 1;
        formData.append("file", $("#ex_file").prop("files")[0]);
        formData.append("check", check);
    }

        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
        wrapWindowByMask2();
            formData.append("keyword", main_data.check);
        ccn_file_ajax("/wmsInvoiceFormAdd", formData).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            }else{
                $("#addDialog").dialog('close');
            }
            closeWindowByMask();
            $('#mes_grid').trigger('reloadGrid');
        }).catch(function (err) {
            closeWindowByMask();
            $("#addDialog").dialog('close');
        });
    }
    }
}

//모달 메세지 설정
function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 800,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
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
        ],
        // 모달 창에서의 select2() 의 검색기능을 활성화
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;
                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    });
}


function selectBox_modal1() {
    $('#_select_modal1').select2();
    $('#_select_modal2').select2();
}



function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); // 저장여부
    msgGet_auth("TBMES_Q003"); // 수정여부
    msgGet_auth("TBMES_E008"); // 데이터 등록 실패
}

function select_modal_start(){

    select_makes_base("#modal_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'});
    select_makes_base("#modal_select2", "/sysCommonAllGet","code_value","code_name1",{keyword:'TRANS_TYPE'});

}
function confirmFileExtension(e) {
    var fileNm = $("#ex_file").val();

    if (fileNm != "") {

        var ext = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
        if (!(ext == "gif" || ext == "jpg" || ext == "png")) {
            alert("이미지파일 (.jpg, .png, .gif ) 만 업로드 가능합니다.");
            $(e).prev().text("사진첨부");
            $(e).val("");
            return false;
        } else {
            return true;
        }

    }


}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자


    if (confirmFileExtension(e)){
        $(e).prev().text("업로드완료");
    }
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.rpt_name === '') {
        alert("관리명칭을 입력해주세요");
        return false;
    }
      if (main_data.check === 'I'){
          if (modal_objact.file_signed === '') {
              alert("사진을 첨부해주세요");
              return false;
          }
      }


    return true;

}