/**
 * sysAuth.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    modal_make1();
    datepickerInput_modal();
}


////////////////////////////클릭 함수/////////////////////////////////////



function addUdate_btn() {
    var add_data = value_return(".modal_value");
    var formData = new FormData();
    var check;
    formData.append("qc_no", add_data.qc_no);
    formData.append("qc_result", add_data.qc_result);
    formData.append("result2_code", add_data.result2_code);
    formData.append("result3_code", add_data.result3_code);


    if ($("#file_01").prop("files")[0] == null) {
        check = 0;
        formData.append("check", check);
    } else {
        check = 1;
        formData.append("file1", $("#file_01").prop("files")[0]);
        formData.append("check", check);
    }
    if(confirm("등록 하시겠습니까?")) {
        wrapWindowByMask2();
        ccn_file_ajax("/qmsProdMiddleErrorManAdd", formData).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            }else{
                ccn_ajax("/procedureLogAdd",{keyword:"중간검사조치기록 저장",keyword2:JSON.stringify({keyword: qc_no})})
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

// 엔터키를 통한 저장버튼 활성화
function add_click_btn() {
    $(document).on("keypress",'.modal_value',function (e) {
        if (e.which == 13){
            addUdate_btn();
        }
    });
}

function modal1_select_change1(value) {
    //disabled_tf
    if (value === "1"){
        // $("#machine_select2 option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=result2_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=result3_code] option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["select[name=result2_code]","select[name=result3_code]"],"Y");
    } else if (value === "2"){
        $("select[name=result3_code] option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["select[name=result3_code]"],"Y");
        disabled_tf(["select[name=result2_code]"],"N");
    } else if (value === "3"){
        $("select[name=result2_code] option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["select[name=result3_code]"],"N");
        disabled_tf(["select[name=result2_code]"],"Y");
    } else {
        $("select[name=result2_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=result3_code] option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["select[name=result2_code]","select[name=result3_code]"],"Y");
    }

}
////////////////////////////호출 함수/////////////////////////////////////

//모달 메세지 설정
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.dept_name === '') {
        alert("부서명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}


function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 700,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [

            {
                text: "저장",
                "class": "btn btn-minier",
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
    $('select[name=qc_result]').select2();
    $('select[name=result2_code]').select2();

    select_makes_base('select[name=result3_code]', "/qmsQcItemAllGet","qc_code" ,"qc_name",{keyword: "2",keyword2:"2"},'N').then(function (){
    });
}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal", -30);
    datepicker_makes("#datepicker_modal2", 30);
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