////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    datepickerInput2();
}

////////////////////////////클릭 함수/////////////////////////////////////

////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    var updateDT = value_return(".modal_value")

                    if (main_data.check === 'U') {

                        updateForm(updateDT);

                    }
                    if (main_data.check === 'I') {

                        addForm(updateDT);

                    }

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
    })
}

function datepickerInput2() {
    datepicker_years_make("#plan_year",0);
}

function effectiveness1(modal_objact) { // 유효성 검사
    return true;
}

function addForm(updateDT) {
    if (effectiveness_lee()) {
        if (confirm("추가 하시겠습니까?")) {
            wrapWindowByMask2();
            updateDT.keyword = main_data.check;
            updateDT.plan_year = updateDT.plan_year.replace(/[^0-9]/g,'');
            updateDT.plan1 = updateDT.plan1.replace(/[^0-9]/g,'');
            updateDT.plan2 = updateDT.plan2.replace(/[^0-9]/g,'');
            updateDT.plan3 = updateDT.plan3.replace(/[^0-9]/g,'');
            updateDT.plan4 = updateDT.plan4.replace(/[^0-9]/g,'');
            updateDT.plan5 = updateDT.plan5.replace(/[^0-9]/g,'');
            updateDT.plan6 = updateDT.plan6.replace(/[^0-9]/g,'');
            updateDT.plan7 = updateDT.plan7.replace(/[^0-9]/g,'');
            updateDT.plan8 = updateDT.plan8.replace(/[^0-9]/g,'');
            updateDT.plan9 = updateDT.plan9.replace(/[^0-9]/g,'');
            updateDT.plan10 = updateDT.plan10.replace(/[^0-9]/g,'');
            updateDT.plan11 = updateDT.plan11.replace(/[^0-9]/g,'');
            updateDT.plan12 = updateDT.plan12.replace(/[^0-9]/g,'');

            $.ajax({
                url: "/crmPlanAdd",
                type: "POST",
                data: updateDT,
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $("#addDialog").dialog("close");
                        get_btn(1);
                    }
                },
                error: function (e) {
                    closeWindowByMask();
                    console.log("ERROR : ", e);
                }
            });
        }
    }

}

function updateForm(updateDT) {
    if (effectiveness_lee()) {
        if (confirm("수정 하시겠습니까?")) {
            wrapWindowByMask2();
            updateDT.keyword = main_data.check;
            updateDT.plan_year = updateDT.plan_year.replace(/[^0-9]/g,'');
            updateDT.plan1 = updateDT.plan1.replace(/[^0-9]/g,'');
            updateDT.plan2 = updateDT.plan2.replace(/[^0-9]/g,'');
            updateDT.plan3 = updateDT.plan3.replace(/[^0-9]/g,'');
            updateDT.plan4 = updateDT.plan4.replace(/[^0-9]/g,'');
            updateDT.plan5 = updateDT.plan5.replace(/[^0-9]/g,'');
            updateDT.plan6 = updateDT.plan6.replace(/[^0-9]/g,'');
            updateDT.plan7 = updateDT.plan7.replace(/[^0-9]/g,'');
            updateDT.plan8 = updateDT.plan8.replace(/[^0-9]/g,'');
            updateDT.plan9 = updateDT.plan9.replace(/[^0-9]/g,'');
            updateDT.plan10 = updateDT.plan10.replace(/[^0-9]/g,'');
            updateDT.plan11 = updateDT.plan11.replace(/[^0-9]/g,'');
            updateDT.plan12 = updateDT.plan12.replace(/[^0-9]/g,'');
            $.ajax({
                url: "/crmPlanAdd",
                type: "POST",
                data: updateDT,
                success: function (data) {

                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $("#addDialog").dialog("close");
                        $("#mes_grid").trigger("reloadGrid")
                    }
                    closeWindowByMask();
                }

                , error: function (request, status, error) {
                    closeWindowByMask();
                    var msg = "ERROR<br><br>"
                    msg += request.status + "<br>" + request.responseText + "<br>" + error;

                }

            });
        }
    }
}

function modal_text_ck(class_name) {
    var ck = false;
    $(class_name).each(function (i) {
        var class_name = $(class_name);

        if (class_name.val() == "" || class_name.val() == null) {
            class_name.focus();
            return ck;
        } else {
            ck = true;
            return ck;
        }
    });

    return ck;
}


function effectiveness1(modal_objact) { // 유효성 검사
    var listAlert = ["날짜", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var listx = ["plan_year_name", 'remark'];
    var index = 0;
    var index2 = 0;
    var index3 = 0;

    for (var s in modal_objact) {

        // console.log(s);

        if (listx[index2] === s) {
            index2++;
        } else {
            if (modal_objact[s] === "") {
                alert(listAlert[index3]);
                return false;
            } else {
                index3++;
            }
        }

        index++;
    }


    return true;

}


function effectiveness_lee() { // 유효성 검사
    var check = "Y"
    $(".modal_value").each(function (i) {
        if ($(this).val() === "" && $(this).attr("name") !== 'plan_year_name' && $(this).attr("name") !== 'remark') {
            alert($(this).parent().prev().text() + "을(를) 확인해주세요");
            check = "N";
            return false;
        }
    });
    if (check === "Y") {
        return true;
    } else {
        return false;
    }

}