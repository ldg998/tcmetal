

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
    add_click_btn();
    $("#tags").autocomplete({source: []});
    $("#tags1").autocomplete({source: []});
}

////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        if (confirm(text)) {
            wrapWindowByMask2();
            var formData = new FormData(document.getElementById("suppForm"));
            formData.append("supp_code",modal_objact.supp_code);
            formData.append("supp_name",modal_objact.supp_name);
            formData.append("ceo",modal_objact.ceo);
            formData.append("supp_name_en",modal_objact.supp_name_en);
            formData.append("supp_no",modal_objact.supp_no);
            formData.append("tel_no",modal_objact.tel_no);
            formData.append("buss_type",modal_objact.buss_type);
            formData.append("fax_no",modal_objact.fax_no);
            formData.append("category",modal_objact.category);
            formData.append("give_type",modal_objact.give_type);
            formData.append("address",modal_objact.address);
            formData.append("emp_name",modal_objact.emp_name);
            formData.append("emp_tel",modal_objact.emp_tel);
            formData.append("corp_type1",modal_objact.corp_type1);
            formData.append("corp_type2",modal_objact.corp_type2);
            formData.append("emp_email",modal_objact.emp_email);
            formData.append("use_yn",modal_objact.use_yn);
            formData.append("bank",modal_objact.bank);
            formData.append("bank_account",modal_objact.bank_account);
            formData.append("bank_name",modal_objact.bank_name);
            formData.append("keyword",main_data.check);

            if (typeof $("#file_01").prop("files")[0] !== "undefined" && $("#file_01").prop("files")[0] !== "" && $("#file_01").prop("files")[0] !== null ) {
                if (main_data.check = 'U'){
                    check1 = 0;
                }
            }

            formData.append("check1", check1);
            ccn_file_ajax("/sysSuppAdd", formData).then(function (data) {
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
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                closeWindowByMask();
                alert(msg_object.TBMES_E008.msg_name1);
                console.log("ERROR : ", e);
            });
        }
    }
}


function add_click_btn() {
    $(document).on("keypress", '.modal_value', function (e) {
        if (e.which == 13) {
            addUdate_btn();
        }
    });
}

function file_del() {
    $(".file_labal").html("<span><i class=\"fa fa-upload bigger-110 blue\"></i>\n" +
        "                                <span>업로드</span>\n" +
        "                            </span>");
    $("#file_01").val("");
    check1 = 1;
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){
        //var filename2 = filename[2].substr(0,13) + "..";

        $(e).closest("div")
            .children(".file_labal")
            .html("<span><i class=\"fa fa-check bigger-110 blue\"></i>\n" +
                "                                <span>업로드완료</span>\n" +
                "                            </span>");
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
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();
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

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.corp_type1 === 'N' && modal_objact.corp_type2 === 'N') {
        alert("업체구분을 하나라도 Y 입력해주세요.");
        return false;
    } else {
        return true;
    }
}

function selectBox_modal1() {
    $('#corp_type1').select2();
    $('#corp_type2').select2();
    $('#use_yn').select2();
}

function autoSupp_name(value) {
    if (value == '' || value == null) {
        $("#tags").autocomplete({source:[]});
        return false;
    } else {
        ccn_ajax("/autocomplete_Supp_Name", {keyword: value}).then(function (data) {
            var availableTags = [];
            for (var i = 0; i < data.length; i++) {
                availableTags.push(data[i].supp_name);
            }
            $("#tags").autocomplete({source: availableTags}).focus(function(){
                $(this).autocomplete("search");
            });
        }).catch(function (err) {
            alert(msg_object.TBMES_E008.msg_name1);
        });
    }
}

function autoSupp_no(value) {
    if (value == '' || value == null) {
        $("#tags1").autocomplete({source:[]});
        return false;
    } else {
        ccn_ajax("/autocomplete_Supp_No", {keyword: value}).then(function (data) {
            var availableTags = [];
            for (var i = 0; i < data.length; i++) {
                availableTags.push(data[i].supp_no);
            }
            $("#tags1").autocomplete({
                source: availableTags,
                minLength: 0
            }).focus(function(){
                $(this).autocomplete("search");
            });
        }).catch(function (err) {
            alert(msg_object.TBMES_E008.msg_name1);
        });
    }
}