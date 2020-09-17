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
    // header_make1();
    // header_make2();
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
        caption: "성분분석",
        colNames: ['구분','온도','시간','CE','C','Si','CW','PW'],
        colModel: [

            {name: 'seq', index: 'seq', key: true, sortable: false, width: 60,fixed:true,formatter:seq_formatter},
            {name: 'chg_temp', index: 'chg_temp', sortable: false, width: 60,fixed:true},
            {name: 'chg_time', index: 'chg_time', sortable: false, width: 60,fixed:true},
            {name: 'chg_ce', index: 'chg_ce', sortable: false, width: 60,fixed:true},
            {name: 'chg_c', index: 'chg_c', sortable: false, width: 60,fixed:true},
            {name: 'chg_si', index: 'chg_si', sortable: false, width: 60,fixed:true},
            {name: 'wedge_cw', index: 'wedge_cw', sortable: false, width: 60,fixed:true},
            {name: 'wedge_pw', index: 'wedge_pw', sortable: false, width: 60,fixed:true}

        ],
        autowidth: true,
        height: 145,
        rowNum: 100,
        // jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,

        loadComplete:function(){
            if ($("#mes_modal1_grid1").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal1_grid1 tr.jqgfirstrow").css("height","1px");
        }
    })

    $('#mes_modal1_grid2').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "주입내역",
        colNames: ['업체','기종','품명','단중','주입시간','온도1','온도2','LOT','작업자'],
        colModel: [
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 100,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 100,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 120,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 60,fixed:true, align: 'right',formatter:'integer'},
            {name: 'in_time', index: 'in_time', sortable: false, width: 60,fixed:true, align: 'right',formatter:'integer'},
            {name: 'temp1', index: 'temp1', sortable: false, width: 60,fixed:true, align: 'right',formatter:'integer'},
            {name: 'temp2', index: 'temp2', sortable: false, width: 60,fixed:true, align: 'right',formatter:'integer'},
            {name: 'lot_no', index: 'lot_no', sortable: false, width: 100,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60,fixed:true}

        ],
        autowidth: true,
        height: 145,
        rowNum: 100,
        // jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,

        loadComplete:function(){
            if ($("#mes_modal1_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal1_grid2 tr.jqgfirstrow").css("height","1px");
        }
    });

}


function header_make1() {
    $("#mes_modal1_grid1").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'radio', numberOfColumns: 6, titleText: '<center>성 분 조 정</center>'},
            {startColumnName: 'cw', numberOfColumns: 2, titleText: '<center>WEDGE</center>'}

        ]
    })
}
function header_make2() {
    $("#mes_modal1_grid2").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'supp_name', numberOfColumns: 8, titleText: '<center>주 입 내 역</center>'}

        ]
    })
}


function readonly_go() {
    $(".modal_value").each(function(i){
        $(this).prop("disabled",true);
    });
}

function seq_formatter(cellValue) {
    if (cellValue !== 7){
        return cellValue+"차";
    } else {
        return "최종";
    }
}
