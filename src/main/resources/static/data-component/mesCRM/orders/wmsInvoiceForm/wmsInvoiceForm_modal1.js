/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    selectBox_modal1()
}


////////////////////////////클릭 함수/////////////////////////////////////


////////////////////////////호출 함수/////////////////////////////////////

function Udate_btn() {

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
                    Udate_btn();
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


function readURL(input,index) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-text'+index).hide();

            //var img = $('<img style="width: 100%; height: 100%;" id="img'+index+'\">')
            //$('#img_div'+index).prepend(img);
            $('#img'+index).attr('src', e.target.result);
            $('#img'+index).show();
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function readURLRemove(index) {
    $('#img'+index).removeAttr('src');
    //if (!$("#img-text"+index).text()){
    $("#img-text"+index).show();
    var div = $('<div class="img-text" id="img-text'+index+'\">미리보기가 표시됩니다.</div>');
    //$('#img_div'+index).prepend(div);
    $('#img'+index).hide();
    //}
    if (main_data.check = 'U'){
        main_data["delCheck"+index] = 1;
    }
    $("#xlsUploads"+index).val("");
}
