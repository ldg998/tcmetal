



////////////////////////////시작 함수/////////////////////////////////////
function modal_start3() {
    modal_make3();
}


////////////////////////////클릭 함수/////////////////////////////////////
function report_status_show(plan_no,status) {
    ccn_ajax('/popPlanOneGet', {keyword:plan_no}).then(function (data) {

        $("#addDialog3").dialog('open');
    });
    //alert("ss");

}

////////////////////////////호출 함수/////////////////////////////////////


function workDocumentMake() {
    //window.scrollTo(0,0);
    var workForm;


    ccn_html_ajax('/workFormBase', {}).then(function (data) {
        // console.log(data);
        workForm = $(data);
        ccn_html_ajax('/workFormColumn', {}).then(function (data1) {
            workForm.find("#column1").append($(data1));
            ccn_html_ajax('/workFormColumn', {}).then(function (data2) {
                workForm.find("#column2").append($(data2));
                ccn_html_ajax('/workFormColumn', {}).then(function (data3) {
                    workForm.find("#column3").append($(data3));
                    ccn_html_ajax('/workFormColumn', {}).then(function (data4) {
                        workForm.find("#column4").append($(data4));
                        $("#res").empty();
                        $("#res").append(workForm);

                        html2canvas($("#all-content").get(0), {
                            allowTaint: true,
                            taintTest: false,
                            useCORS: true,
                            scrollY: 0,
                            scrollX: 0,
                            width: 900,
                            height: 1200,
                            windowWidth: 700,
                            windowHeight: 900,
                            y: 1000,
                            x: 18,
                            scale: 3,
                            onclone: function (clonedDoc) {
                                //  console.log(clonedDoc);
                                $(clonedDoc).find("#res").attr('style', 'style="width: 100%; display: none;"')
                                $(clonedDoc).find("#res").find("#all-content").removeAttr("style");
                                // console.log($(clonedDoc).find("#res").html());
                            }
                        }).then(function (canvas) {


                            var myImage = canvas.toDataURL("image/png");

                            $("#asd").attr("src",myImage);

                            downloadURI(myImage, "test.png");
                            $("#res").empty();


                        });

                    });
                });
            });
        });
    });

}



function modal_make3() {
    $("#addDialog3").dialog({
        modal: true,
        // width: 532,
        // height: 650,
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
                    workDocumentMake();
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


function downloadURI(uri,name) {
    var link = document.createElement("a")
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}