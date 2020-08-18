var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    datepickerInput_modal1();
    jqGrid_main_modal();
    selectBox_modal1();
}



////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value");
    if (effectiveness1(add_data)) {

        var jdata = $("#mes_modal1_grid1").getRowData();
        if (jdata.length > 0) {


            var list = [];
            var list2 = [];
            var transCheck = "Y";
            var partCheck = "Y";
            var trans_code = "";
            var part_object = {supp_code:"",part_kind:"",part_code:""};
            var part_object2 = {supp_code:"",part_kind:"",part_code:""};
            jdata.forEach(function (data, j) {
                if (data.qty !== '' && data.qty > 0) {
                    list.push(data.ord_no + gu4 + data.qty + gu4 + data.outs_supp_code );
                    if (j !== 0) {
                        if (trans_code !== data.trans_code) {
                            transCheck = "N";
                        }

                        if (JSON.stringify(part_object) !== JSON.stringify({supp_code:data.supp_code,part_kind:data.part_kind,part_code:data.part_code})) {
                            partCheck = "N";
                        }


                    }


                }

                if (j == 0){
                    trans_code = data.trans_code;
                    part_object = {supp_code:data.supp_code,part_kind:data.part_kind,part_code:data.part_code};
                }

            });
            if (list.length === 0) {
                alert("수량을 다시 확인해주세요");
            } else if(transCheck === 'N') {
                alert("운송수단을 다시 확인해주세요");
            }else if(partCheck === 'N') {
                alert("같은 제품인지 다시 확인해주세요");
            }else {
                var text = msg_object.TBMES_Q002.msg_name1;
                if (main_data.check === "U") {
                    text = msg_object.TBMES_Q003.msg_name1;
                }

                if (confirm(text)) {
                    wrapWindowByMask2();
                    add_data.keyword2 = list.join(gu5);
                    add_data.keyword = main_data.check;
                    ccn_ajax("/wmsOutOrderAdd", add_data).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            if (main_data.check === "I") {
                                $("#addDialog").dialog('close');
                                get_btn(1);
                            } else {
                                $("#addDialog").dialog('close');
                                $('#mes_grid').trigger('reloadGrid');
                            }
                        }
                        closeWindowByMask()
                    }).catch(function (err) {
                        alert(msg_object.TBMES_E008.msg_name1);
                    });
                }
            }
        } else {
            alert("저장 목록을 조회 해주세요");
        }
    }
}

function get_modal1_btn() {
    if (main_data.check === "U") {

    } else {
        var data = value_return(".modal_value"); //해당클레스이름 데이터 name value 할당
        data.keyword = data.supp_code
        if (data.keyword !== '') {
            $("#mes_modal1_grid1").setGridParam({ //그리드 조회
                url: "/crmOrderRecpModalGet",
                datatype: "json",
                postData: data
            }).trigger("reloadGrid"); //그리드 재시작
        } else {
            alert("업체를 선택해주세요.");
        }
    }


}

function select_change_modal1(value) {
    if (main_data.check2 === 'Y'){
        if (value !== ""){
            select_makes_base("#modal1_select2","/suppDeliveryPlaceGet","delivery_place","delivery_place",{keyword:value},"N").then(function (data) {

            });
        } else {
            $('#modal1_select2').empty();
            var option2 = $("<option></option>").text('선택안함').val('');
            $('#modal1_select2').append(option2);
            $('#modal1_select2').select2();

        }
    }
    $('#mes_modal1_grid1').jqGrid('clearGridData');
}

function modal1_close_btn() {
    $("#addDialog").dialog('close');
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
        minWidth:1100,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [],
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



function jqGrid_main_modal() {
    $("#mes_modal1_grid1").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['저장수량','수주번호','수주일자','업체','업체','PO','기종','품번','품명','단중','trans_code','운송수단','수주수량','기납품수량','납품수량','외주(열처리)','외주(열처리)'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name: 'qty2', index: 'qty2', sortable: false, hidden:true},
            {name:'ord_no',index:'ord_no',hidden:true,key:true,sortable: false,width:110,fixed: true},
            {name:'work_date',index:'work_date',sortable: false,width:110,fixed: true, formatter: formmatterDate2},
            {name:'supp_code',index:'supp_code',sortable: false,width:125,fixed: true,hidden:true},
            {name:'supp_name',index:'supp_name',sortable: false,width:125,fixed: true},
            {name:'po_no',index:'po_no',sortable: false,width:110,fixed: true},
            {name:'part_kind',index:'part_kind',sortable: false,width:125,fixed: true},
            {name:'part_code',index:'part_code',sortable: false,width:110,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:125,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:110,fixed: true, formatter:'integer', align:'right'},
            {name:'trans_code',index:'trans_code',sortable: false,width:110,fixed: true,hidden:true},
            {name:'trans_name',index:'trans_name',sortable: false,width:110,fixed: true},
            {name:'ord_qty',index:'ord_qty',sortable: false,width:125,fixed: true, formatter:'integer', align:'right'},
            {name:'prev_qty',index:'prev_qty',sortable: false,width:110,fixed: true, formatter:'integer', align:'right'},
            {name:'qty',index:'qty',sortable: false,width:125,fixed: true, formatter:'integer', align:'right',
                editable: true,
                editoptions: {

                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
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
                                    var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                    var value = e.target.value;

                                    var check;
                                    if (main_data.check === "I"){
                                        check =  parseInt_change((parseInt(data.ord_qty) - parseInt(data.prev_qty))) < parseInt_change(value);
                                    } else {
                                        check =  parseInt_change((parseInt(data.ord_qty) - parseInt(data.prev_qty) + parseInt(data.qty2))) < parseInt_change(value);
                                    }



                                    if (isNaN(value)) {
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = 0;
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if (check) {
                                        alert("납품 가능 수량이 초과 하였습니다.");
                                        e.target.value = 0;
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = 0;
                                    }
                                    e.target.value = parseInt(e.target.value);
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                var value = e.target.value;


                                var check;
                                if (main_data.check === "I"){
                                    check =  parseInt_change((parseInt(data.ord_qty) - parseInt(data.prev_qty))) < parseInt_change(value);
                                } else {
                                    check =  parseInt_change((parseInt(data.ord_qty) - parseInt(data.prev_qty) + parseInt(data.qty2))) < parseInt_change(value);
                                }

                                if (isNaN(value)) {
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = 0;
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if (check) {
                                    alert("납품 가능 수량이 초과 하였습니다.");
                                    e.target.value = 0;
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(value === ''){
                                    e.target.value = 0;
                                }
                                e.target.value = parseInt(e.target.value);
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            }
                        }

                    ]
                }
            },
            {name:'outs_supp_code',index:'outs_supp_code',sortable: false,width:110,fixed: true,hidden:true},
            {name:'outs_supp_name',index:'outs_supp_name',sortable: false,width:110,fixed: true}

        ],
        // caption: "자재단가 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 250, // 그리드 세로 길이 설정
        rowNum: 3000,
        caption: "출고지시서 | MES",
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_modal1_grid1").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("mes_modal1_grid1_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}
function datepickerInput_modal1() {

    datepicker_makes("#datepicker_modal", -30);
    datepicker_makes("#datepicker2_modal", 0);
    datepicker_makes("#datepicker3_modal", 0);
    datepicker_makes("#datepicker4_modal", 0);
}

function selectBox_modal1() {
    select_makes_base("#modal1_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N").then(function (data) {
        $('#modal1_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal1_select2').append(option);
        $('#modal1_select2').select2();
    });

    select_makes_base("#modal1_select3", "/sysCommonAllGet","code_value","code_name1",{keyword:'TRANS_TYPE'});

}

function effectiveness1(data) {
    if (data.supp_code === ""){
        alert("업체를 선택해주세요");
        return false;
    } else if(data.delivery_place === "") {
        alert("납품장소를 선택해주세요");
        return false;
    } else {
        return true;
    }

}