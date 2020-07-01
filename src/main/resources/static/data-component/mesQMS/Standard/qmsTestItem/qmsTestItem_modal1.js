////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
}
////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var send_data = value_return(".modal_value");
    if (effectiveness1(send_data)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        send_data.keyword = main_data.check;
        if (confirm(text)) {
            var options = {
                data:send_data,
                success : function(data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        if (main_data.check === "I") {
                            get_btn(1);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                        $("#addDialog").dialog('close');
                    }
                },
                type : "POST"
            };
            $("#qmsTestltem").ajaxSubmit(options);
        }
    }


    // var modal_objact = value_return(".modal_value");
    // if (effectiveness1(modal_objact)) {
    //     var text = '저장하겠습니까?';
    //     if (main_data.check === "U") {
    //         text = '수정하겠습니까?';
    //     }
    //     if (confirm(text)) {
    //
    //         modal_objact.keyword = main_data.check;
    //
    //         ccn_ajax("/sysLocAdd", modal_objact).then(function (data) {
    //             if (data.result === 'NG') {
    //                 alert(data.message);
    //             } else {
    //                 if (main_data.check === "I") {
    //                     get_btn(1);
    //                 } else {
    //                     get_btn_post($("#mes_grid").getGridParam('page'));
    //                 }
    //             }
    //             $("#addDialog").dialog('close');
    //         }).catch(function (err) {
    //             alert("저장실패");
    //         });
    //     }
    // }

}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
}

function selectBox_modal1(){
    $('#select_modal1').select2();
    $('#select_modal2').select2();
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
