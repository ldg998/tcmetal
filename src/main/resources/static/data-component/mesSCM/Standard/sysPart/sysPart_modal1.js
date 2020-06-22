var modal_data = {
    supp_check: 'A',
};
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); //모달 메세지 설정
    modal_make1(); // 모달 생성
    selectBox_modal1(); //모달 셀렉박스 추가
    suppModal_start(); //업체 선택시 업체모달 활성화
}

////////////////////////////클릭 함수/////////////////////////////////////

function addUdate_btn() { // 모든 추가와 업데이트는 여기서 처리해준다
    //해당 클레스명을 가지고있는 모든 객체의 name =  value 를 담아준다
    var modal_objact = value_return(".modal_value");

    // 유효성검사 체크
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }

        //I = inset  U = update 체크권한에따라 다른 메세지로 여부를 물어본다
        if (confirm(text)) {
            wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
            modal_objact.keyword = main_data.check;
            //ajax 통신을통해 url 과 data 를 보낸뒤
            ccn_ajax("/sysPartAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') { // 프로시져 반환값이 ng 라면
                    alert(data.message);  // 오류메세지 출력
                } else {
                    if (main_data.check === "I") { //권한이 I 라면
                        get_btn(1);  // 재조회
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page')); //재조회
                    }
                }
                closeWindowByMask(); // 마스크 종료
                $("#addDialog").dialog('close'); //모달 닫기
            }).catch(function (err) {
                closeWindowByMask(); // 마스크 종료
                alert(msg_object.TBMES_E008.msg_name1); // 오류메세지 출력
            });
        }
    }
}

/* 권한이있다면 select 박스에 데이터 채우기 */
function cargo_select_change(value) {
    if (main_data.check2 === 'Y'){
        if(value != null && value != '') {
            select_makes_base('#modal_loc_code_select', '/sysLocAllGet', "loc_code", "loc_name", {keyword: value}, '').then(function () {
            });
        }
    }
}

/* 업체선택시 업체 모달 띄우기 */
function supp_btn() {
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

/* 받아온 코드와 네임으로 업체모달 객체 name ,value 할당해주기 */
function suppModal_bus(code, name) {
    $("#supp_name_modal").val(name);
    $("#supp_code_modal").val(code);
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

/* 업체모달 객체 비워주기*/
function suppModal_close_bus() {
    $("#supp_name_modal").val("");
    $("#supp_code_modal").val("");
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); // 저장여부
    msgGet_auth("TBMES_Q003"); // 수정여부
    msgGet_auth("TBMES_E008"); // 데이터 등록 실패
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 'auto', // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, // 자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달하단 버튼설정
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
    })
}

function selectBox_modal1() { //현재모달의 셀렉트박스에 데이터 할당
    select_makes_base("#modal_part_name_code_select", "/sysPartNameAllGet", "part_name_code", "part_name",{},'').then(function (data) {});
    select_makes_base("#modal_part_type_select", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'').then(function (data) {
    });
    select_makes_base("#modal_cargo_code_select", "/sysCargoAllGet", "cargo_code", "cargo_name",{},'').then(function (data) {
        select_makes_base('#modal_loc_code_select','/sysLocAllGet',"loc_code","loc_name",{keyword:data[0].cargo_code},'');
     });
    select_makes_base('#modal_unit_code_select','/sysCommonAllGet','code_value','code_name1',{keyword:'UNIT'},'');
   $('#modal_loc_code_select').select2();
    $('#modal_qc_level_select').select2();
}


function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.spec === '') {
        alert("규격을 입력해주세요");
        return false;
    }else {
        return true;
    }
}