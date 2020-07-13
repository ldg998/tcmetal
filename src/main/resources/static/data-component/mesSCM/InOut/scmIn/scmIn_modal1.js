var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); //모달 메세지설정
    modal_make1();    // 모달생산
    datepicker_modal1(); //모달안 날짜 넣어주기
    // selectBox_modal1(); // 셀렉트박스 데이터 넣어주기
    jqGrid_modal1();  //그리드 생성
    jqGridResize("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]')); //행당그리드 리사이즈
    jqGridResize("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]')); //행당그리드 리사이즈
}

////////////////////////////클릭 함수/////////////////////////////////////
//모달 조회 버튼
function get_modal1_btn() {
    var data = value_return(".modal_value"); //해당클레스이름 데이터 name value 할당
    if (data.keyword !== '') {
        $("#mes_add_grid").setGridParam({ //그리드 조회
            url: "/scmInOrdModalGet",
            datatype: "json",
            postData: data
        }).trigger("reloadGrid"); //그리드 재시작
    } else {
        alert("업체를 선택해주세요.");
    }

}

//이미지 여부를 묻고 있다면 할당 없으면 ""  체크가 y가 아니라면 다시 이미지를 호출
function img_change(value) {
    if (main_data.check3 === 'Y') {
        ccn_ajax("/scmOrderImageOneGet", {keyword: value}).then(function (data) {
            if (value == '' || value == null) {
                $("#remark").val("").trigger("change");
            } else {
                $("#remark").val(data.remark).trigger("change");
            }
        });
    } else {
        ccn_ajax("/scmOrderImageOneGet", {keyword: value}).then(function (data) {
        });
    }
}

//수주조회 모달창 오픈
function ord_btn() {
    modal_reset(".crm_condition", []);
    $("#crmSearchGrid").jqGrid('clearGridData');
    var date = new Date();
    var date2 = new Date();
    date2.setDate(date.getDate() + 1);
    $('#crm_datepicker').datepicker('setDate', date);
    $('#crm_datepicker2').datepicker('setDate', date2);
    $("#crm-search-dialog").dialog('open');

    $("#crm_supp_name").val($("#supp_name_modal").val());
    $("#crm_supp_code").val($("#supp_code_modal").val());
    $("#crm_supp_name").focus();
    jqGridResize2("#crmSearchGrid", $('#crmSearchGrid').closest('[class*="col-"]'));
}

//수주조회 선택 버튼 동작
function crmModal_bus(data) {
    $("#crm_ord_no").val(data.ord_no);
    $("#place_name").val(data.place_name);
    if ($("#supp_name_modal").val() === "" || $("#supp_name_modal").val() === null) {
        $("#supp_name_modal").val(data.supp_name);
        $("#supp_code_modal").val(data.supp_code);
    }
}

//수주조회 모달 닫기 버튼 동작
function crmModal_close_bus() {
    $("#crm_ord_no").val("");
    $("#place_name").val("");
    $("#crmSearchGrid").jqGrid('clearGridData');
}

//추가모달 취소 버튼
function close_modal1_btn() {
    modal_reset(".modal_value", []);
    $("#addDialog").dialog('close');
}

//수정 버튼
function update_btn(rowid) {
    main_data.check3 = 'N';
    if (main_data.auth.check_edit != "N") {
    } else {
        alert("수정권한이 없습니다.");
    }
}

// 추가 모달 저장 버튼
function add_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value");
    add_data.work_date = add_data.work_date.replace(/\-/g, '');
    add_data.stop_date = add_data.stop_date.replace(/\-/g, '');
    add_data.save_type = main_data.check;
    var jdata = $("#mes_add_grid2").getRowData();

    if (jdata.length > 0) {
        var list = [];
        var list2 = [];
        jdata.forEach(function (data, j) {
            if (data.ord_qty !== '' && data.ord_qty > 0) {
                list.push(data.part_code + gu4 + data.ord_qty + gu4 + data.spec + gu4 + data.direction + gu4 + data.remark);
            } else {
                list2.push(data.part_code);
            }
        });
        callback(function () {
            if (list2.length > 0) {
                alert(list2[0] + "를 다시 확인해주세요");
            } else {
                if (main_data.status === 'Y') {
                    alert("완료처리된 항목은 수정 할 수 없습니다.");
                } else {
                    var text = msg_object.TBMES_Q002.msg_name1;
                    if (main_data.check === "U") {
                        text = msg_object.TBMES_Q003.msg_name1;
                    }

                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.ord_sub = list.join(gu5);
                        console.log(add_data);
                        ccn_ajax("/scmOrderAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    get_btn_post($("#mes_grid").getGridParam('page'));
                                }
                            }
                            $('#mes_add_grid').jqGrid('clearGridData');
                            $('#mes_add_grid2').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert(msg_object.TBMES_E008.msg_name1);
                        });
                    }
                }
            }
        });
    } else {
        alert("저장 목록을 넣어주세요");
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); //저장 여부
    msgGet_auth("TBMES_Q003"); //수정 여부
    msgGet_auth("TBMES_E008"); //데이터 등록 실패
}

function datepicker_modal1() {
    datepicker_makes("#datepicker3", 0); //모달 초기날짜 설정
}

function selectBox_modal1() {
    select_makes_sub('#part_type_select', "/sysPartTypeGet", "part_type", "part_type_name", {keyword: ''}, 'Y'); //셀렉트박스 초기값할당
    select_makes_sub("#img_select", "/scmOrderImageList", "img_code", "img_name", {keyword: 0, keyword2: 0}, 'N'); //셀렉트박스 초기값할당
}

function jqGrid_modal1() { // 메인 그리드 설정
    $("#mes_add_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "자재입고 | MES",
        colNames: ['rownum', '발주일자', '구분', '품번', '품명', '규격', '단위', '발주수량', '기입고수량', '입고수량', '발주완료', '검사구분', '검사결과', '검사수량', '불량유형', 'ng_type', '불량상세', '조치구분'],
        colModel: [
            {name: 'rownum', index: 'rownum', key: true, hidden: true, sortable: false},
            {
                name: 'work_date',
                index: 'work_date',
                sortable: false,
                formatter: formmatterDate2,
                fixed: true,
                width: 100
            },
            {name: 'part_type_name', index: 'part_type_name', sortable: false,fixed: true, width: 100},
            {name: 'part_code', index: 'part_code', sortable: false,fixed: true, width: 100},
            {name: 'part_name', index: 'part_name', sortable: false,fixed: true, width: 100},
            {name: 'spec', index: 'spec', sortable: false,fixed: true, width: 100},
            {name: 'unit_name', index: 'unit_name', sortable: false,fixed: true, width: 100},
            {name: 'ord_qty', index: 'ord_qty', sortable: false,fixed: true, width: 100, align: 'right',formatter:'number'},
            {name: 'qty', index: 'qty', sortable: false,fixed: true, width: 100, align: 'right',formatter:'number'},
            {
                name: 'in_qty', index: 'in_qty', sortable: false, align: 'right',formatter:'number',fixed: true, width: 100,
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0.00'){
                                    e.target.value = '';
                                }

                                // if(main_data.check !== 'I') {
                                //     $(e.target).prop('readonly',true);
                                // }

                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowid = row.attr('id');
                                    var data = $('#mes_add_grid').jqGrid('getRowData', rowid);
                                    var value = e.target.value;

                                    if (isNaN(value)) {
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = 0;
                                        $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if (parseFloat_change((parseFloat(data.ord_qty) - parseFloat(data.qty))) < parseFloat_change(value)) {
                                        alert("입고 가능 수량이 초과 하였습니다.");
                                        e.target.value = 0;
                                        $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = 0;
                                    }
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var data = $('#mes_add_grid').jqGrid('getRowData', rowid);
                                var value = e.target.value;

                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = 0;
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if (parseFloat_change((parseFloat(data.ord_qty) - parseFloat(data.qty))) < parseFloat_change(value)) {
                                    alert("입고 가능 수량이 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(value === ''){
                                    e.target.value = 0;
                                }
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                            }
                        }

                    ]
                }
            },
            {
                name: 'status', index: 'status', sortable: false,fixed: true, width: 100,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "0:진행중;1:완료",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    defaultValue: '0',
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {name: '', index: '', sortable: false,fixed: true, width: 100},
            {
                name: 'qc_result', index: 'qc_result', sortable: false,fixed: true, width: 100,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "1:양품;2:불량",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    defaultValue: '1',
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {
                name: 'qc_qty', index: 'qc_qty', sortable: false, align: 'right',formatter:'number',fixed: true, width: 100,
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0.00'){
                                    e.target.value = '';
                                }

                                // if(main_data.check !== 'I') {
                                //     $(e.target).prop('readonly',true);
                                // }

                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowid = row.attr('id');
                                    var data = $('#mes_add_grid').jqGrid('getRowData', rowid);
                                    var value = e.target.value;

                                    if (isNaN(value)) {
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = 0;
                                        $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if (parseFloat_change((parseFloat(data.in_qty))) < parseFloat_change(value)) {
                                        alert("입고 수량을 초과 하였습니다.");
                                        e.target.value = 0;
                                        $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = 0;
                                    }
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var data = $('#mes_add_grid').jqGrid('getRowData', rowid);
                                var value = e.target.value;

                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = 0;
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if (parseFloat_change((parseFloat(data.in_qty))) < parseFloat_change(value)) {
                                    alert("입고 수량을 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(value === ''){
                                    e.target.value = 0;
                                }
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                            }
                        }

                    ]
                }
            },
            {name: 'ng_type_name', index: 'ng_type_name', sortable: false,fixed: true, width: 100,
                editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"popLineUserAllGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_add_grid').jqGrid('getRowData', rowid);
                        return {
                            keyword: data.line_code
                        }
                    },
                    buildSelect:setSelectCombo2,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                            $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type', value);
                            if (value === ''){
                                $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type', ' ');
                            }
                            $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type_name', text);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                                $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type', value);
                                if (value === ''){
                                    $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type', ' ');
                                }
                                $('#mes_add_grid').jqGrid('setCell', rowid, 'ng_type_name', text);

                            }
                        }
                    ]


                }
            },
            {name: 'ng_type', index: 'ng_type', hidden:true, sortable: false,fixed: true, width: 100},
            {
                name: 'ng_name', index: 'ng_name', width: 100, sortable: false,fixed: true,
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {

                                $(e.target).attr('autocomplete', 'off');


                            }
                        },
                        {
                            type: 'focusout',
                            fn: function (e) {

                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {
                name: 'act_type', index: 'act_type',  sortable: false,fixed: true, width: 100,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: ":선택안함;0:조치중;1:조치완료",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    defaultValue: '',
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_add_grid").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
        ],
        autowidth: true,
        height: 200,
        rowNum: 3000,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        loadComplete: function () {
            if ($("#mes_add_grid").jqGrid('getGridParam', 'reccount') === 0) {
                $("table#mes_add_grid  tr.jqgfirstrow").css("height", "1px");
            }
        }
    });

}


function modal_make1() {
    $("#addDialog").dialog({//모달 초기설정
        modal: true,
        width: 1350,
        height: 'auto',
        autoOpen: false,
        resizable: false,
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
        }

    });
}


function setSelectCombo2(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].qc_code + '">' + data[idx].qc_name + '</option>';
    }
    result += '</select>';
    return result;
}