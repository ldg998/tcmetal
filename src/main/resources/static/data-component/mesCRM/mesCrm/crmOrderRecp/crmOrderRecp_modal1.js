////////////////////////////시작 함수/////////////////////////////////////

var delcheck = {
    delcheck1:0,
    delcheck2:0,
    delcheck3:0,
    delcheck4:0,
    delcheck5:0,
}



function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    datepickerInput_modal1();
    modal_make1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    modal_objact.work_date = modal_objact.work_date.replace(/[^0-9]/g,'');
    modal_objact.target_date = modal_objact.target_date.replace(/[^0-9]/g,'');
    modal_objact.end_date = modal_objact.end_date.replace(/[^0-9]/g,'');
    modal_objact.order_amount = modal_objact.order_amount.replace (/[^0-9]/g,'');
    modal_objact.balance = modal_objact.balance.replace (/[^0-9]/g,'');

    if (modal_objact.order_amount === ''){
        modal_objact.order_amount = 0;
    }
    if (modal_objact.balance === ''){
        modal_objact.balance = 0;
    }
    if (modal_objact.amount1 === ''){
        modal_objact.amount1 = 0;
    }
    if (modal_objact.amount2 === ''){
        modal_objact.amount2 = 0;
    }
    if (modal_objact.amount3 === ''){
        modal_objact.amount3 = 0;
    }
    if (modal_objact.amount4 === ''){
        modal_objact.amount4 = 0;
    }

    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2();
            var formData = new FormData(document.getElementById("crmImageForm"));
            formData.append("work_date",modal_objact.work_date);
            formData.append("ord_no",modal_objact.ord_no);
            formData.append("supp_code",modal_objact.supp_code);
            formData.append("supp_name",modal_objact.supp_name);
            formData.append("emp_name",modal_objact.emp_name);
            formData.append("emp_tel",modal_objact.emp_tel);
            formData.append("place_name",modal_objact.place_name);
            formData.append("supp_user_name",modal_objact.supp_user_name);
            formData.append("supp_tel_no",modal_objact.supp_tel_no);
            formData.append("ord_name",modal_objact.ord_name);
            formData.append("status",modal_objact.status);
            formData.append("target_date",modal_objact.target_date);
            formData.append("end_date",modal_objact.end_date);
            formData.append("order_amount",modal_objact.order_amount);
            formData.append("amount1",modal_objact.amount1);
            formData.append("amount2",modal_objact.amount2);
            formData.append("amount3",modal_objact.amount3);
            formData.append("amount4",modal_objact.amount4);
            formData.append("balance",modal_objact.balance);
            formData.append("remark",modal_objact.remark);
            formData.append("keyword", main_data.check);

            for (var i = 1 ; i <= 5; i++  ){
                if (typeof $("#image_modal"+i).prop("files")[0] !== "undefined" && $("#image_modal"+i).prop("files")[0] !== "" && $("#image_modal"+i).prop("files")[0] !== null ) {

                    if (main_data.check = 'U'){
                        delcheck["delcheck"+i] = 0;
                    }

                }
                formData.append("delcheck"+i,delcheck["delcheck"+i]);
            }

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                url: "/crmOrderRecpAdd",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        if (main_data.check === "I") {
                            get_btn(1);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                    }
                    closeWindowByMask();
                    $('#addDialog').dialog('close');
                },
                error: function (e) {
                    closeWindowByMask();
                    console.log("ERROR : ", e);
                }
            });




            // ccn_ajax("/crmOrderRecpAdd", formData).then(function (data) {
            //     if (data.result === 'NG') {
            //         alert(data.message);
            //     } else {
            //         if (main_data.check === "I") {
            //             get_btn(1);
            //         } else {
            //             get_btn_post($("#mes_grid").getGridParam('page'));
            //         }
            //     }
            //     $("#addDialog").dialog('close');
            // }).catch(function (err) {
            //     alert("저장실패");
            // });
        }
    }

}

function image_change(value,num) {
    if (value !== ""){
        var reg = /(.*?)\.(jpg|jpeg|png|gif|bmp|PNG)$/;

        if(!value.match(reg)) {
            alert("해당 파일은 이미지 파일이 아닙니다.");
            $("#image_seach_btn"+num).text("찾기");
            $("#image_modal"+num).val("");
        } else {
            $("#image_seach_btn"+num).text("완료");
        }
    }
}

function image_del(num) {
    $("#image_seach_btn"+num).text("찾기");
    $("#image_modal"+num).val("");
    delcheck["delcheck"+num] = 1;

}

function num_keyup_comma_crm(e) {
    $(e).val($(e).val().replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $("#balance_modal1").val($(e).val()).trigger("change");
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
    datepicker_makes("#datepicker4", 1);
    datepicker_makes("#datepicker5", 1);
}


function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.supp_code === '') {
        alert("업체를 선택해주세요");
        return false;
    } else if (modal_objact.place_name === '') {
        alert("현장명을 입력해주세요");
        return false;
    } else {
        return true;
    }
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
        ],
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
    $("#status_modal_select").select2();

}