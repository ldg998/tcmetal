var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    jqGrid_main_modal();
    msg_get_modal1(); //모달 메세지설정
    modal_make1();    // 모달생산
    datepicker_modal1(); //모달안 날짜 넣어주기
    selectBox_modal1(); // 셀렉트박스 데이터 넣어주기
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]')); //행당그리드 리사이즈
    jqGridResize("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]')); //행당그리드 리사이즈
    readonly_go();
}

////////////////////////////클릭 함수/////////////////////////////////////
//모달 조회 버튼
function get_modal1_btn(page) {
    if(main_data.status === 'N') {
        var data = value_return(".modal_value"); //해당클레스이름 데이터 name value 할당
        if(data.keyword !== '') {
            $("#mes_add_grid").setGridParam({ //그리드 조회
                url: "/scmOrderPartGet",
                datatype: "json",
                page: page,
                postData: data
            }).trigger("reloadGrid"); //그리드 재시작
        }else {
            alert("업체를 선택해주세요.");
        }
    }else {
        alert("완료처리된 항목은 수정 할 수 없습니다.");
    }
}

//이미지 여부를 묻고 있다면 할당 없으면 ""  체크가 y가 아니라면 다시 이미지를 호출
function img_change(value){
    if(main_data.check3 === 'Y') {
        ccn_ajax("/scmOrderImageOneGet",{keyword: value}).then(function (data) {
            if(value == '' || value == null) {
                $("#remark").val("").trigger("change");
            }else {
                $("#remark").val(data.remark).trigger("change");
            }
        });
    }else {
        ccn_ajax("/scmOrderImageOneGet",{keyword: value}).then(function (data) {  });
    }
}

//추가모달 취소 버튼
function close_modal1_btn() {
    modal_reset(".modal_value", []);
    $("#addDialog").dialog('close');
}

// 추가 모달 저장 버튼
function add_modal1_btn() {}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); //저장 여부
    msgGet_auth("TBMES_Q003"); //수정 여부
    msgGet_auth("TBMES_E008"); //데이터 등록 실패
}

function datepicker_modal1() {
    datepicker_makes("#datepicker_modal1", 0); //모달 초기날짜 설정
    datepicker_makes("#datepicker_modal2", 0); // 모달 초기날짜 설정
}

function selectBox_modal1() {
    // select_makes_sub('#part_type_select', "/sysPartTypeGet","part_type" ,"part_type_name",{keyword:''},'Y'); //셀렉트박스 초기값할당
    // select_makes_sub("#supp_code_modal","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"N")
}

function modal_make1() {
    $("#addDialog").dialog({//모달 초기설정
        modal: true,
        width: 1400,
        height: 750,
        autoOpen: false,
        buttons: [ // 모달 하단 버튼 설정
            {
                text: "닫기",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
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

function jqGrid_main_modal() {
    $('#mes_modal1_grid1').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "품목조회 | MES",
        colNames: ['','품번','품명','규격','단위'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false,fixed:true, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#partSearchGrid\''+','+'\''+rowObject.part_code+'\''+');"/>';
                }},
            {name: 'part_code', index: 'part_code', key: true, sortable: false, width: 200,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 200,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 80,fixed:true}
        ],
        autowidth: true,
        height: 145,
        rowNum: 100,
        pager: '#partSearchGridPager',
        // jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            partModal_check();
        },
        loadComplete:function(){
            if ($("#partSearchGrid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#partSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    }).navGrid('#partSearchGridPager', {search: false, add: false, edit: false, del: false});// grid_

    $('#mes_modal1_grid2').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "품목조회 | MES",
        colNames: ['','품번','품명','규격','단위'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false,fixed:true, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#partSearchGrid\''+','+'\''+rowObject.part_code+'\''+');"/>';
                }},
            {name: 'part_code', index: 'part_code', key: true, sortable: false, width: 200,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 200,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 80,fixed:true}
        ],
        autowidth: true,
        height: 145,
        rowNum: 100,
        pager: '#partSearchGridPager',
        // jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            partModal_check();
        },
        loadComplete:function(){
            if ($("#partSearchGrid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#partSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    }).navGrid('#partSearchGridPager', {search: false, add: false, edit: false, del: false});// grid_

}

function readonly_go() {
    $(".modal_value").each(function(i){
        $(this).prop("disabled",true);
    });
}