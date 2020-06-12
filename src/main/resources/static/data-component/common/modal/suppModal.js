var suppModal_data = {
    send_data: {},
    send_data_post: {},
}



////////////////////////////시작 함수/////////////////////////////////////
function suppModal_start() {
    suppModal_make(); //업체모달 설정
    suppModal_jqGrid(); //업체모달 활성화
    jqGridResize("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]')); //해당 그리드 리사이즈
    selectBox_suppModal(); // 셀렉트바스 데이터 할당
}


////////////////////////////클릭 함수/////////////////////////////////////
function autoSupp_name(value) { //자동 업체 조회
    if (value == '' || value == null) { //텍스트 존재여부 확인
        $("#supp_code_search").autocomplete({
            source:[], //없다면 null
            minLength: 0 //크기0 할당
        });
        return false;
    } else {
        //데이터가 있다면 keyUp 할때마다 호출
        ccn_ajax("/autocomplete_Supp_Name", {keyword: value}).then(function (data) {
            var availableTags = [];                 // 받아온 2차원 배얼을 1차원으로 받아줄 객체
            for (var i = 0; i < data.length; i++) { // 받아온 data 크기에만큼 반복
                availableTags.push(data[i].supp_name); // 2차원배얼을 1차원으로 담아준다
            }
            $("#supp_code_search").autocomplete({ //1차원 배얼로 받아온 데이터를 오토컴플리트 해준다 == '핸' 을 입력하면 핸디맨 이라는 데이터가 자동 완성된다
                source: availableTags,
                minLength: 0
            }).focus(function(){ //그리고 해당 인풋에 포커스가 되면
                $(this).autocomplete("search"); // 해당 input 에 오토컴플리트를 재시작한다
            });
        }).catch(function (err) {
            alert(msg_object.TBMES_E008.msg_name1); //오류호출
        });
    }
}

function autoSupp_no(value) { //자동 업체번호 조회
    if (value == '' || value == null) {
        $("#supp_no").autocomplete({
            source:[],
            minLength: 0
        });
        return false;
    } else {
        ccn_ajax("/autocomplete_Supp_No", {keyword: value}).then(function (data) {
            var availableTags = [];
            for (var i = 0; i < data.length; i++) {
                availableTags.push(data[i].supp_no);
            }
            $("#supp_no").autocomplete({
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

// 업채모달 조회 클릭 버튼
function suppModal_get_btn(page) {
    suppModal_data.send_data = value_return(".suppModal_condition");
    $("#SuppSearchGrid").setGridParam({ // 그리드 조회
        url: '/suppModalGet',
        datatype: "json",
        page: page,
        postData: suppModal_data.send_data
    }).trigger("reloadGrid");
}

function suppModal_check() {
    if ($( "#SuppSearchGrid" ).getGridParam( "selrow" )) {
        var ids = $( "#SuppSearchGrid" ).getGridParam( "selrow" );
        var data = $('#SuppSearchGrid').jqGrid('getRowData', ids);
        suppModal_bus(data.supp_code,data.supp_name);
        $('#suppModal_condition').val('');
        $("#supp-search-dialog").dialog('close');
    }else {
        alert("선택하십시오");
    }
}
// 업체모달 닫고 코드 비워주기
function suppModal_close() {
    $("#supp-search-dialog").dialog('close');
    $('#supp_code_search').val('');
    suppModal_close_bus();
}

////////////////////////////호출 함수/////////////////////////////////////
//업체모달 셀렉트박스 할당
function selectBox_suppModal() {
    $('#gubun_select').select2();
}

// 업체모달 설정
function suppModal_make() {
    $("#supp-search-dialog").dialog({
        autoOpen:false,
        modal: true,

        width:'1300',
        height: 'auto',
        resizable: false,
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

function suppModal_jqGrid() { //업체모달 메인 그리드 설정
    $('#SuppSearchGrid').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "업체조회 | MES",
        colNames: ['','업체코드','업체명','사업자번호','대표','주소'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false,fixed:true, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#SuppSearchGrid\''+','+'\''+rowObject.supp_code+'\''+');"/>';
            }},
            {name: 'supp_code', index: 'supp_code', key:true,width: 150, sortable: false,fixed:true},
            {name: 'supp_name', index: 'supp_name',width: 150, sortable: false,fixed:true},
            {name: 'supp_no', index: 'supp_no',width: 150, sortable: false,fixed:true},
            {name: 'emp_name', index: 'emp_name',width: 150, sortable: false,fixed:true},
            {name: 'address', index: 'address',width: 450, sortable: false,fixed:true}
        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        pager: '#SuppSearchGridPager',
        jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#SuppSearchGrid').jqGrid('getRowData', rowid);
            suppModal_bus(data.supp_code,data.supp_name);
            $("#supp-search-dialog").dialog('close');

        },
        loadComplete:function(){
            if ($("#SuppSearchGrid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }

    });
}


