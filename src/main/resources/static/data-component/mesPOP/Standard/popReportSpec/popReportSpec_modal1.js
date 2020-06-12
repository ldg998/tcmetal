var delcheck = 0;



////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    datepickerInput_modal1();
    modal_make1();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var text = msg_object.TBMES_Q002.msg_name1;
    if (main_data.check === "U") {
        text = msg_object.TBMES_Q003.msg_name1;
    }

    if (confirm(text)){
        var add_data = value_return(".modal_value");

            var formData = new FormData(document.getElementById("formRS_id"));
            formData.append("prod_type",add_data.prod_type);
            formData.append("prod_code",add_data.prod_code);
            formData.append("part_name_code",add_data.part_name_code);
            formData.append("route_code",add_data.route_code);
            formData.append("remark",add_data.remark);
            formData.append("part_name_code1",add_data.part_name_code1);
            formData.append("part_name_code2",add_data.part_name_code2);
            formData.append("part_name_code3",add_data.part_name_code3);
            formData.append("part_name_code4",add_data.part_name_code4);
            formData.append("part_name_code5",add_data.part_name_code5);
            formData.append("part_name_code6",add_data.part_name_code6);
            formData.append("part_name_code7",add_data.part_name_code7);
            formData.append("part_name_code8",add_data.part_name_code8);
            formData.append("part_name_code9",add_data.part_name_code9);
            formData.append("part_name_code10",add_data.part_name_code10);

            formData.append("keyword",main_data.check);

            if (typeof $("#image_modal").prop("files")[0] !== "undefined" && $("#image_modal").prop("files")[0] !== "" && $("#image_modal").prop("files")[0] !== null ) {

                if (main_data.check = 'U'){
                    delcheck = 0;
                }

            } else {

            }
            formData.append("delcheck",delcheck);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                url: "/popReportSpecAdd",
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
                    $('#addDialog').dialog('close');
                },
                error: function (e) {
                    closeWindowByMask();
                    console.log("ERROR : ", e);
                }
            });



    }
}

function image_change(value) {
    if (value !== ""){
        var reg = /(.*?)\.(jpg|jpeg|png|gif|bmp|PNG)$/;

        if(!value.match(reg)) {
            alert("해당 파일은 이미지 파일이 아닙니다.");
            $("#image_seach_btn").text("찾기");
            $("#image_modal").val("");
        } else {
            $("#image_seach_btn").text("완료");
        }
    }
}

function image_del() {
    $("#image_seach_btn").text("찾기");
    $("#image_modal").val("");
    delcheck = 1;
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

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 532,
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
    select_makes_base("#part_name_code_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'').then(function (data) {});
    select_makes_base("#route_select_modal", "/popRouteGroupAllGet", "route_code", "route_name",{},'').then(function (data) {});


    select_makes_base("#part_name_code1_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code2_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code3_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code4_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code5_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code6_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code7_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code8_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code9_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#part_name_code10_select_modal", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});

}