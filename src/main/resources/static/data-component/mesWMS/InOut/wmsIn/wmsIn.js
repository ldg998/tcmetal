/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var save_rowid;

var main_data = {
    check: 'I',     // 수정,추가 판단용
    supp_check: 'A',//업체 체크
    send_data: {},  //조회시 data  담는용도
    send_data_post: {},
    check2: 'Y',
    auth: {},      //권한체크 후 권한 data 담는 용도
    check3: 'Y',
    status: 'N'
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get(); //메세지설정
    authcheck(); // 권한체크
    modal_start1();
    datepickerInput(); //날짜 표현형식
    jqGrid_main();  //main 그리드 생성
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqgridPagerIcons(); //그리드 아이콘 설정
    suppModal_start();

});

////////////////////////////클릭 함수/////////////////////////////////////
//모달 확인 조회 btn
function test() {
    $("#addDialog").dialog('open');// 모달 열기
    jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]')); //해당그리드 리사이즈
}

//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //해당클레스 이름을 가진객체 name value 할당
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');   ////가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data_post = main_data.send_data; //데이터 나눠주기
    //console.log(main_data.send_data);
    $("#mes_grid").setGridParam({ //그리드조회
        url: "/scmOrderGet",    // URL -> RESTCONTROLLER 호출
        datatype: "json",    //json 데이터 형식으로
        page: page,         // 페이지번호
        postData: main_data.send_data //매개변수전달
    }).trigger("reloadGrid");  // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념

    $('#mes_grid2').jqGrid('clearGridData'); //해당 그리드의 데이터삭제 및 업데이트
}

function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

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

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001"); // 추가권한없음
    msgGet_auth("TBMES_A002"); // 삭제권한없음
    msgGet_auth("TBMES_A003"); // 수정권한없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

function authcheck() { // 권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#status_select').select2();
}

function datepickerInput() {  //초기 날짜할당
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {  //메인 jqGrid
    $('#mes_grid').jqGrid({
        mtype: 'POST', // post 방식 데이터 전달
        datatype: 'local', // local 설정을 통해 handler 에 재요청하는 경우를 방지
        multiselect: true,  // 다중선택 가능
        caption: '재품입고관리 | MES', // grid 제목
        colNames: ['입고일자','전표번호','업체','기종','품명','품번','단중','제품LOT','등록자','등록일시'], // grid 헤더 설정
        colModel: [
            {name: '', index: '', sortable: false, fixed: true, width: 100}, // formatter 사용을 통해 데이터 형식 가공
            {name: '', index: '', sortable: false, key: true, fixed: true, width: 80},               // key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 80},
            {name: '', index: '', sortable: false, fixed: true, width: 100}
        ],
        autowidth: true, // 그리드 자동 가로 길이 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        height: 560,     // 그리드 세로 길이 설정
        rowNum: 100,    // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], // 페이지당 데이터 수 설정
        pager: '#mes_grid_pager',            // pager 연결
        beforeSelectRow: function (rowid, e) {   // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            $myGrid.setRowData(save_rowid, false, {background: "#FFFFFF"});
            save_rowid = rowid;
            $myGrid.setRowData(rowid, false, {background: "rgb(190, 220, 260)"});
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) { //클릭시 이벤트 아래그리드 get
            under_get(rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid); //선택한 로우 에 data를 넣고

            if (data.status === '1') { //상태 구분
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid); //업데이트 버튼 실행
        },
        loadComplete: function () {  //그리드 로드가 진행완료후 실행
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height", "1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height", "0px");
        }
    });

}

