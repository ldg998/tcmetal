////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
    mask_modal();

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

            modal_objact.keyword = main_data.check;

            ccn_ajax("/sysSuppAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        $("#addDialog").dialog('close');
                        get_btn(1);
                    } else {
                        $("#addDialog").dialog('close');
                      $("#mes_grid").trigger("reloadGrid");
                    }
                }

            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }
}
////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 600,
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
    if (modal_objact.supp_code === '') {
        alert("업체코드를 입력해주세요");
        return false;
    } else if (modal_objact.corp_type1 === 'N' && modal_objact.corp_type2 === 'N' && modal_objact.corp_type3 === 'N') {
        alert("업체구분을 하나라도 Y 입력해주세요.");
        return false;
    } else {
        return true;
    }
}

function selectBox_modal1(){
    $('#corp_type1').select2();
    $('#corp_type2').select2();
    $('#corp_type3').select2();
    $('#corp_type4').select2();
    $('#use_yn').select2();
}




function mask_modal(){
    $("#tags").autocomplete({source: []});
    $("#tags1").autocomplete({source: []});
    $('input[name=supp_no]').mask('999-99-99999');
    var options =  {
        onKeyPress: function(cep, e, field, options) {
            var masks = ['000-000-0000', '00-000-0000'];
            var mask = (cep.substring(0,2) === '02') ? masks[1] : masks[0];
            $('input[name=tel_no]').mask(mask, options);
        }};
    $('input[name=tel_no]').mask('000-000-0000', options);
    // $('input[name=tel_no]').mask('999-999',options);
    $('input[name=emp_tel]').mask('999-9999-9999');
}