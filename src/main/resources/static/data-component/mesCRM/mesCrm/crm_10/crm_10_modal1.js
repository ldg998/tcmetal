////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    datepickerInput_modal1();
    jqGrid_main_modal();
    selectBox();
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2()
            modal_objact.keyword = main_data.check;

            ccn_ajax("/tpmMachineErrorAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        $("#addDialog").dialog('close');
                        get_btn(1);
                    } else {
                        $("#addDialog").dialog('close');
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                }
               closeWindowByMask()
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
        width: 'auto',
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
    $("#mes_modal_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['수주일자','업체','PO','기종','품번','품명','단중','수주수량','기납품수량','납품수량','외주(열처리)'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'',index:'',sortable: false,width:110,fixed: true},
            {name:'',index:'',sortable: false,width:125,fixed: true},
            {name:'',index:'',sortable: false,width:110,fixed: true},
            {name:'',index:'',sortable: false,width:125,fixed: true},
            {name:'',index:'',sortable: false,width:110,fixed: true},
            {name:'',index:'',sortable: false,width:125,fixed: true},
            {name:'',index:'',sortable: false,width:110,fixed: true},
            {name:'',index:'',sortable: false,width:125,fixed: true},
            {name:'',index:'',sortable: false,width:110,fixed: true},
            {name:'',index:'',sortable: false,width:125,fixed: true},
            {name:'',index:'',sortable: false,width:110,fixed: true}

        ],
        // caption: "자재단가 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 200, // 그리드 세로 길이 설정
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("mes_modal_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}
function datepickerInput_modal1() {

    datepicker_makes("#datepicker_modal", -30);
    datepicker_makes("#datepicker2_modal", 0);
    datepicker_makes("#datepicker3_modal", 0);
}

function selectBox() {
    $('#_select').select2();
    $('#_select2').select2();
}