/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    supp_check: 'A', //초기 업체체크
    send_data: {},  //조회시 data 담는 용도
    auth:{}        // 권한체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();//권한확인
    authcheck();//datepicker 설정
    datepickerInput();//업체선택 모달 호출
    suppModal_start();//jqGrid 설정
    jqGrid_main();//Resize 설정 추가
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));//Pager에 Icon 설정 추가
    jqgridPagerIcons();// 그리드 아이콘설정
    get_btn(1); // 조회버튼
});

////////////////////////////클릭 함수/////////////////////////////////////

//조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");//해당 클레스이름의 객체를 불러와 NAME VALUE 를 할당
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');//날짜 모양 가공 2020-06-06 = 20200606
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');//날짜 모양 가공 2020-06-06 = 20200606

    // SP_SCM_IN_LIST_GET
    $("#mes_grid").setGridParam({ //그리드 조회
        url: '/scmInListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid"); //그리드 리로드
}

//업체선택 모달 호출 버튼
function supp_btn(what) { //업체버튼 클릭시 업체모달 표시 및 데이터 초기할당
    main_data.supp_check = what;
    $("#SuppSearchGrid").jqGrid('clearGridData'); // 그리드 데이터 삭제및 업데이트
    $("#supp-search-dialog").dialog('open'); // 모달 오픈
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");//초기값 0번 째 셀렉트로 할당
    $('#supp_code_search').val('').trigger("change"); // 코드값 초기화
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));//리사이즈
}

//업체선택 모달 선택 데이터 가져오기
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

//업체선택모달 종료 버튼
function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

//엑셀 다운로드
function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) { //다운로드 여부
        var $preparingFileModal = $("#preparing-file-modal"); //해당 id modal 할당
        $preparingFileModal.dialog({modal: true});  // 모달 활성화
        $("#progressbar").progressbar({value: false}); //화면 정지
        $.fileDownload("/excel_download", {  //엑셀 다운로드  호출
            httpMethod: 'POST',             //post 형식으로
            data : {
                "name":"scmInList", //url
                "row0":$('#datepicker').val().replace(/-/gi,""),//넘겨줄 데이터
                "row1": $('#datepicker2').val().replace(/-/gi,""),//넘겨줄 데이터
                "row2":$('#supp_code_main').val()//넘겨줄 데이터
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');//성공하면 모달닫기
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close'); //실패하면 모달닫기
                $("#error-modal").dialog({modal: true}); //에러모달 열기
            }
        });
        return false;
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014"); //엑셀 시행메세지
}

//권한 확인 함수
function authcheck() { //권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmInList"}).then(function (data) {
        main_data.auth = data;
    });
}

//datepicker 생성 함수
function datepickerInput() { //초기날짜 할당
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

//jqGrid 설정 함수
function jqGrid_main() { //메인그리드 설정
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['입고일자','전표번호','업체명','품번','품명','규격','입고수량','단위','검사구분','검사결과','등록자','등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, formatter:formmatterDate2, width: 100, fixed: true},
            {name: 'in_no', index: 'in_no', sortable: false, width: 150, fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150, fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 100, fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150, fixed: true},
            {name: 'spec', index: 'spec', sortable: false, width: 150, fixed: true},
            {name: 'qty', index: 'qty', sortable: false, width: 150, fixed: true, formatter:'integer', align:'right'},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 150, fixed: true},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false, width: 100, fixed: true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable: false, width: 100, fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 100, fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, formatter:formmatterDate, width: 150, fixed: true}
        ],
        caption: "입고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}