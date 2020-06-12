////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
    datepickerInput2();
}

////////////////////////////클릭 함수/////////////////////////////////////


function addUdate_btn() {
    if (confirm('내용을 수정하시겠습니까?')) {
        wrapWindowByMask2();
        var modalForm = value_return(".modal_value");
        modalForm.keyword = main_data.check;
        modalForm.plan_year = modalForm.plan_year.toString().replace(/[^0-9]/g,'');
        modalForm.plan1 = modalForm.plan1.toString().replace(/[^0-9]/g,'');
        modalForm.plan2 = modalForm.plan2.toString().replace(/[^0-9]/g,'');
        modalForm.plan3 = modalForm.plan3.toString().replace(/[^0-9]/g,'');
        modalForm.plan4 = modalForm.plan4.toString().replace(/[^0-9]/g,'');
        modalForm.plan5 = modalForm.plan5.toString().replace(/[^0-9]/g,'');
        modalForm.plan6 = modalForm.plan6.toString().replace(/[^0-9]/g,'');
        modalForm.plan7 = modalForm.plan7.toString().replace(/[^0-9]/g,'');
        modalForm.plan8 = modalForm.plan8.toString().replace(/[^0-9]/g,'');
        modalForm.plan9 = modalForm.plan9.toString().replace(/[^0-9]/g,'');
        modalForm.plan10 = modalForm.plan10.toString().replace(/[^0-9]/g,'');
        modalForm.plan11 = modalForm.plan11.toString().replace(/[^0-9]/g,'');
        modalForm.plan12 = modalForm.plan12.toString().replace(/[^0-9]/g,'');

        modalForm.work1 = modalForm.work1.toString().replace(/[^0-9]/g,'');
        modalForm.work2 = modalForm.work2.toString().replace(/[^0-9]/g,'');
        modalForm.work3 = modalForm.work3.toString().replace(/[^0-9]/g,'');
        modalForm.work4 = modalForm.work4.toString().replace(/[^0-9]/g,'');
        modalForm.work5 = modalForm.work5.toString().replace(/[^0-9]/g,'');
        modalForm.work6 = modalForm.work6.toString().replace(/[^0-9]/g,'');
        modalForm.work7 = modalForm.work7.toString().replace(/[^0-9]/g,'');
        modalForm.work8 = modalForm.work8.toString().replace(/[^0-9]/g,'');
        modalForm.work9 = modalForm.work9.toString().replace(/[^0-9]/g,'');
        modalForm.work10 = modalForm.work10.toString().replace(/[^0-9]/g,'');
        modalForm.work11 = modalForm.work11.toString().replace(/[^0-9]/g,'');
        modalForm.work12 = modalForm.work12.toString().replace(/[^0-9]/g,'');

        modalForm.in1 = modalForm.in1.toString().replace(/[^0-9]/g,'');
        modalForm.in2 = modalForm.in2.toString().replace(/[^0-9]/g,'');
        modalForm.in3 = modalForm.in3.toString().replace(/[^0-9]/g,'');
        modalForm.in4 = modalForm.in4.toString().replace(/[^0-9]/g,'');
        modalForm.in5 = modalForm.in5.toString().replace(/[^0-9]/g,'');
        modalForm.in6 = modalForm.in6.toString().replace(/[^0-9]/g,'');
        modalForm.in7 = modalForm.in7.toString().replace(/[^0-9]/g,'');
        modalForm.in8 = modalForm.in8.toString().replace(/[^0-9]/g,'');
        modalForm.in9 = modalForm.in9.toString().replace(/[^0-9]/g,'');
        modalForm.in10 = modalForm.in10.toString().replace(/[^0-9]/g,'');
        modalForm.in11 = modalForm.in11.toString().replace(/[^0-9]/g,'');
        modalForm.in12 = modalForm.in12.toString().replace(/[^0-9]/g,'');


        $.ajax({
            url: "/crmWorkListUpdate",
            type: "POST",
            data: modalForm,
            success: function (data) {

                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                        under_get(modalForm.plan_year);
                    } else {
                        get_btn($("#mes_grid").getGridParam("page"));
                        under_get(modalForm.plan_year);
                    }
                }
                closeWindowByMask();
                $("#addDialog").dialog("close");
            },
            error: function (request, status, error) {
                alert("업로드에 실패 하였습니다.");
                closeWindowByMask();
                console.log("ERROR : ", e);
            }
        });
    }
}



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

                    if(effectiveness_lee()) {
                        addUdate_btn();

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
    var date = new Date();
    date.setDate(date.getDate());
    $('#plan_year_name').datepicker({
        autoclose: true,
        format: 'yyyy' + '년',
        language: "kr",
        minViewMode: 'years',
    }).datepicker('setDate', date);
}

function effectiveness1(modal_objact) { // 유효성 검사
    return true;
}


function effectiveness_lee() { // 유효성 검사

    var check = "Y";
    $(".modal_value2").each(function (i) {
        if ($(this).val() === "" && $(this).attr("name") !== 'plan_year_name' && $(this).attr("name") !== 'remark' && $(this).attr("name") !== 'remark2' && $(this).attr("name") !== 'remark3') {
            alert($(this).parent().siblings(".profile-info-name").text() + "을(를) 확인해주세요");
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
