var lastsel;
var saverow = 0;
var savecol = 0;
var delcheck = 0;


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var list = [];
    var list2 = [];
    var jdata = $("#mes_modal1_grid1").getRowData(); // row 추가한 전체 데이터 내용 String[][]
    var add_data = value_return(".modal_value"); // String []
    if(effectiveness1(add_data)){
    jdata.forEach(function (data, i) {
        if (data.seq !== '0') {
            list.push(data.seq + gu4 + data.part_name + gu4 + data.spec + gu4 + data.qty + gu4 + data.unit_name + gu4 + data.price + gu4 + data.remark2);
        } else {
            list2.push(i + 1);
        }
    });
    add_data.keyword2 = list.join(gu5);
    if (main_data.check === "I"){ // 수행하는일이 insert 라면 we_no는 ''이다
        add_data.we_no = '';
    }
    add_data.save_type = main_data.check;                       //수행할 타입 지정 I=추가 U=업데이트
    add_data.work_date = add_data.work_date.replace(/\-/g, ''); //날짜 date - 빼주기
    wrapWindowByMask2();  //수행하는동안 마스크로 다른동작 제한
    ccn_ajax("/crmWeAddUpdate", add_data).then(function (data) {
        if (data.result === 'NG') {
            alert(data.message);
        } else {
            $('#mes_grid').trigger("reloadGrid");
            $('#mes_grid2').trigger("reloadGrid");
        }
        $('#mes_modal1_grid1').jqGrid('clearGridData');
        closeWindowByMask();
        $("#addDialog").dialog('close');
    });
}
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}


function part_name_value_change_update(data) {

    for (var i = 1 ; i<=10; i++){
        $("#part_name"+i).text(data["part_name"+i]);
        if (data["part_name"+i] === null || data["part_name"+i] === ""){
            $("select[name=part_code"+i+"]").prop("disabled",true).trigger('change');
        }else {
            $("select[name=part_code"+i+"]").prop("disabled",false).trigger('change');
            select_makes_base2("#part_code"+i, "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data["part_name_code"+i],num:i},'N')
                .then(function (data2) {

                    $("#part_code"+data2.num).val(data["part_code"+data2.num]).trigger("change");
                });

        }
    }
}


function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}

function modal_make1() { //모달 옵션
    $("#addDialog").dialog({
        modal: true,
        width:818,
        height: 'auto',
        autoOpen: false,
        buttons: [
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                if(confirm('저장하시겠습니까?')) {
                    addUdate_btn();
                }
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


function modal1_rowAdd() {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");
    var seq = 1;
    if (reccount >= 14){
        alert("14개 까지 등록 할수 있습니다.");
    } else {
        if (reccount !== 0){
            seq = reccount+1;
        }
       var row = $("#mes_modal1_grid1").getRowData().length
        var lastRowdata = $("#mes_modal1_grid1").jqGrid('getRowData',[row]);
        var add_data = {
            seq:seq,
            part_name:lastRowdata.part_name,
            // spec:lastRowdata.spec,
            // qty:lastRowdata.qty,
            // unit_name:lastRowdata.unit_name,
            // price:lastRowdata.price,
            // remark2:lastRowdata.remark2
        }
        $('#mes_modal1_grid1').jqGrid("resetSelection");
        $("#mes_modal1_grid1").jqGrid("addRowData", seq, add_data, 'last'); // 마지막 행에 Row 추가
        $("#mes_modal1_grid1").closest(".ui-jqgrid-bdiv").scrollTop($("#mes_modal1_grid1").css("height").replace(/px/g, ""));
    }

}

function modal1_rowDel() {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");
    $("#mes_modal1_grid1").jqGrid("delRowData", reccount);
    $('#mes_modal1_grid1').jqGrid("resetSelection");
}


function jqGrid_modal1() { //모달설정  editable: true= 수정가능 여부 editoptions = 수정 옵션
        $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        ajaxSelectOptions: { cache: false, type: 'POST' },
        caption: "견적서관리 | MES",
        colNames: ['순번','품명','규격','수량','단위','단가','비고'],
        colModel: [
            {name: 'seq', index: 'seq', sortable: false, width: 40,formatter: 'integer',fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true,
                editable: true,
                editoptions: {
                    dataEvents: [
                        {type: 'focus',fn: function (e) {$(e.target).attr('autocomplete', 'off'); }},
                        { type: 'keydown',fn: function (e) {if (e.keyCode === 13) {$("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);}}},
                        {type: 'focusout', fn: function (e) { $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol); }}
                    ]
                }},

            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed: true,
                editable: true,
                editoptions: {
                    dataEvents: [
                        {type: 'focus',fn: function (e) {$(e.target).attr('autocomplete', 'off');}},
                        { type: 'keydown',fn: function (e) {if (e.keyCode === 13) {$("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);}}},
                        {type: 'focusout', fn: function (e) { $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol); }}
                    ]
                }},

            {name: 'qty', index: 'qty', sortable: false, width: 60,formatter: 'integer',fixed: true,align: 'right',
                editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 60,fixed: true,align: 'center',
                editable: true,
                editoptions: {
                    dataEvents: [
                        {type: 'focus',fn: function (e) {if (e.target.value === '0'){e.target.value = ''; }$(e.target).attr('autocomplete', 'off');}},
                        { type: 'keydown',fn: function (e) {if (e.keyCode === 13) {$("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);}}},
                        {type: 'focusout', fn: function (e) { $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol); }}
                        ]
                }
            },
            {name: 'price', index: 'price', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right',
                editable: true,
                editoptions: {
                    dataEvents: [
                        {type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');
                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                }
                            }
                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]
                }
            },
            {name: 'remark2', index: 'remark2', sortable: false, width: 200,fixed: true,
                editable: true,
                editoptions: {
                    dataEvents: [
                        {type: 'focus',fn: function (e) {$(e.target).attr('autocomplete', 'off');}},
                        { type: 'keydown',fn: function (e) {if (e.keyCode === 13) {$("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);}}},
                        {type: 'focusout', fn: function (e) { $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol); }}
                    ]
                }},
        ],
        autowidth :true,
        height: 310,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {},
    });
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.supp_name === '') {
        alert("수신(을)를 입력해주세요");
        return false;
    } else if (modal_objact.reference  === '') {
        alert("참조(을)를 입력해주세요");
        return false;
    } else if (modal_objact.tel === '') {
        alert("TEL(을)를 입력해주세요");
        return false;
    }else if (modal_objact.fax  === '') {
        alert("FAX(을)를 입력해주세요");
        return false;
    }else if (modal_objact.work_name === '') {
        alert("공사명(을)를 입력해주세요");
        return false;
    }else {
        return true;
    }
}

