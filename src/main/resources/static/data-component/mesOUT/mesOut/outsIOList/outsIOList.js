/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', //수정, 추가 판단용
    supp_check: 'A', //업체
    send_data: {}, //조회시 data담는용
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck(); //권한체크
    msg_get(); //메세지 함수
    datepickerInput(); //datepicker
    suppModal_start(); //업체모달
    jqGrid_main(); //그리드 생성
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqgridPagerIcons(); //그리드 아이콘 설정
    get_btn(1); //페이지 load 동시에 그리드 조회
});

////////////////////////////클릭 함수/////////////////////////////////////

//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //조회기간에서 -를 빼고 저장
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword2 = '';
    $("#mes_grid").setGridParam({ //그리드 조회
        url: "/outsIOListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid"); //강제 reload
}

//엑셀다운로드
function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "outsIOList",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#datepicker2').val().replace(/-/gi, ""),
                "row2": $("#supp_code_main").val()
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

//업체선택 모달 호출 버튼
function supp_btn(what) {
    main_data.supp_check = what;
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

// 업체선택 모달 선택 데이터 가져오기
function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

// 업체선택모달 취소 버튼
function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(""); // 값을 비워줌
        $("#supp_code_main").val(""); // 값을 비워줌
    }
    $("#SuppSearchGrid").jqGrid('clearGridData'); //값을 비워줌
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {    //메세지 함수
    msgGet_auth("TBMES_Q014"); //엑셀로 저장하시겠습니까?
}

function authcheck() { //권한체크
    ccn_ajax("/menuAuthGet", {keyword: "outsIOList"}).then(function (data) {
        main_data.auth = data; //권한 받아옴 (y/n)
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

//jqgrid 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['출고일자', '업체','현장', '제품구분', '제품명', '제품바코드', '출고등록자','출고일시','입고등록자','입고일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150, fixed:true,formatter:formmatterDate2},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150, fixed:true},
            {name: 'place_name', index: 'place_name', sortable: false, width: 150, fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150, fixed:true},
            {name: 'prod_name', index: 'prod_name', sortable: false, width: 150, fixed:true},
            {name: 'bcr_no', index: 'bcr_no', sortable: false, width: 150, fixed:true},
            {name: 'out_user_name', index: 'out_user_name', sortable: false, width: 150, fixed:true},
            {name: 'out_date', index: 'out_date', sortable: false, width: 150, fixed:true,formatter:formmatterDate2},
            {name: 'in_user_name', index: 'in_user_name', sortable: false, width: 150, fixed:true},
            {name: 'in_date', index: 'in_date', sortable: false, width: 150, fixed:true,formatter:formmatterDate2}
        ],
        caption: "외주입출고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true, // 그리드 하단 현재컬럼/총컬럼수 명시
        loadComplete:function(){ //load가 완료되었을 시
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0) //데이터 조회 전에 가로 스크롤바 생김
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false}); // grid_pager 에 검색 삭제 수정 추가 기능 설정

}