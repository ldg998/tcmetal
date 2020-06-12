
function modal_start1() {
    datepickerInput_modal1();
    modal_make1();
}

function update_btn(jqGrid_data){
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#datepicker3").datepicker('setDate', null);
        $("#datepicker4").datepicker('setDate', null);
        $("#datepicker5").datepicker('setDate', null);
        $("#datepicker6").datepicker('setDate', null);
        main_data.check = 'U';
        ccn_ajax('/crmMoneyOneGet',{ord_no:jqGrid_data}).then(function (data) {
            data.work_date=(formmatterDate2(data.work_date));
            if(data.in_date1 !== ''){
                data.in_date1=(formmatterDate2(data.in_date1));
                $("#datepicker3").datepicker('setDate', data.in_date1);
            }
            if(data.in_date2 !== ''){
                data.in_date2=(formmatterDate2(data.in_date2));
                $("#datepicker4").datepicker('setDate', data.in_date2);
            }
            if(data.in_date3 !== ''){
                data.in_date3=(formmatterDate2(data.in_date3));
                $("#datepicker5").datepicker('setDate', data.in_date3);
            }
            if(data.in_date4 !== ''){
                data.in_date4=(formmatterDate2(data.in_date4));
                $("#datepicker6").datepicker('setDate', data.in_date4);
            }
            data.order_amount = data.order_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.amount1 = data.amount1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.amount2 = data.amount2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.amount3 = data.amount3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.amount4 = data.amount4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.balance = data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            modal_edits('.modal_value',main_data.readonly,data);
        });
        $("#addDialog").dialog('open');
    }else {
        alert("수정권한이 없습니다.");
    }
}

function in_date1_change(value){
    if(value === '') {
        $("#amount1").prop("readonly",true).trigger("change");
    }else {
        $("#amount1").prop("readonly",false).trigger("change");
    }
}

function in_date2_change(value){
    if(value === '') {
        $("#amount2").prop("readonly",true).trigger("change");
    }else {
        $("#amount2").prop("readonly",false).trigger("change");
    }
}

function in_date3_change(value){
    if(value === '') {
        $("#amount3").prop("readonly",true).trigger("change");
    }else {
        $("#amount3").prop("readonly",false).trigger("change");
    }
}

function in_date4_change(value){
    if(value === '') {
        $("#amount4").prop("readonly",true).trigger("change");
    }else {
        $("#amount4").prop("readonly",false).trigger("change");
    }
}

function num_keyup_comma_crmMoney(e) {
    $(e).val($(e).val().replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    balance_change();
}

function balance_change(){
    var order_amount = $("#order_amount").val().replace(/[^0-9]/g,'');
    var amount1 = $("#amount1").val().replace(/[^0-9]/g,'');
    var amount2 = $("#amount2").val().replace(/[^0-9]/g,'');
    var amount3 = $("#amount3").val().replace(/[^0-9]/g,'');
    var amount4 = $("#amount4").val().replace(/[^0-9]/g,'');
    var balance = order_amount-amount1-amount2-amount3-amount4;

    // console.log(amount1);
    // console.log(amount2);
    // console.log(amount3);
    // console.log(amount4);
    // console.log(balance);

    balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $("#balance").val(balance).trigger("change");
}

function addUpdate_btn() {
    var add_data = value_return(".modal_value");
    if (confirm("수정하시겠습니까?")) {
        wrapWindowByMask2();
        add_data.keyword = main_data.check;
        add_data.work_date = add_data.work_date.replace(/\-/g, '');
        if(add_data.in_date1 !== '') {
            add_data.in_date1 = add_data.in_date1.replace(/\-/g, '');
        }
        if(add_data.in_date2 !== '') {
            add_data.in_date2 = add_data.in_date2.replace(/\-/g, '');
        }
        if(add_data.in_date3 !== '') {
            add_data.in_date3 = add_data.in_date3.replace(/\-/g, '');
        }
        if(add_data.in_date4 !== '') {
            add_data.in_date4 = add_data.in_date4.replace(/\-/g, '');
        }
        if(add_data.amount1 === '0') {
            add_data.in_date1 = '';
        }
        if(add_data.amount2 === '0') {
            add_data.in_date2 = '';
        }
        if(add_data.amount3 === '0') {
            add_data.in_date3 = '';
        }
        if(add_data.amount4 === '0') {
            add_data.in_date4 = '';
        }

        add_data.order_amount = add_data.order_amount.replace(/[^0-9]/g,'');
        add_data.amount1 = add_data.amount1.replace(/[^0-9]/g,'');
        add_data.amount2 = add_data.amount2.replace(/[^0-9]/g,'');
        add_data.amount3 = add_data.amount3.replace(/[^0-9]/g,'');
        add_data.amount4 = add_data.amount4.replace(/[^0-9]/g,'');
        add_data.balance = add_data.balance.replace(/[^0-9]/g,'');
        ccn_ajax("/crmMoneyAdd", add_data).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            } else {
                if (main_data.check === "I") {
                    get_btn(1);

                    $("#addDialog").dialog('close');
                } else {
                    closeWindowByMask(); // 마스크 종료
                    get_btn_post($("#mes_grid").getGridParam('page'));
                    $("#addDialog").dialog('close');
                }
            }
        }).catch(function (err) {
            closeWindowByMask();
            console.error(err);
        });
    }
}


function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: '600',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    addUpdate_btn();
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

                        if (typeof ui_dialog_interaction != "undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                } else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    });
}

function datepickerInput_modal1() {

    $("#datepicker3").datepicker({
        autoclose: true,
        format:'yyyy-mm-dd',
        language: "kr",
        todayHighlight: true,
    });
    $("#datepicker4").datepicker({
        autoclose: true,
        format:'yyyy-mm-dd',
        language: "kr",
        todayHighlight: true,
    });
    $("#datepicker5").datepicker({
        autoclose: true,
        format:'yyyy-mm-dd',
        language: "kr",
        todayHighlight: true,
    });
    $("#datepicker6").datepicker({
        autoclose: true,
        format:'yyyy-mm-dd',
        language: "kr",
        todayHighlight: true,
    });

}