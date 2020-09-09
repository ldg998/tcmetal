/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {},// 조회시 data 담는 용도
    readonly: [],// 설정시 해당 name의 readonly 옵션
    auth:{}     // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    msg_get();      // 메세지 설정
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();    // 권한 체크
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    selectBox();

  //  get_btn(1);// 페이지 load 동시에 그리드 조회

});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return('.condition_main')
    $("#mes_grid").setGridParam({ // 그리드 조회
        // URL -> RESTCONTROLLER 호출
        url: '/sysPartListGet',
        // JSON 데이터 형식으로
        datatype: "json",
        // PAGE는 받은 파라미터로 설정
        page: page,
        // 매개변수 전달
        postData: main_data.send_data
        // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
    }).trigger("reloadGrid");
}


// 그리드 내용 더블 클릭 시 실행
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        jqgrid_data.unit_cost = integer(jqgrid_data.unit_cost);
            modal_edits('.modal_value',[],jqgrid_data); // response 값 출력
        $("#mes_modal_grid").setGridParam({ // 그리드 조회
            url: '/sysPartCostGet',
            datatype: "json",
            postData: {keyword:jqgrid_data.part_code}

        }).trigger("reloadGrid");


           $("#addDialog").dialog('open'); //모달창열기
           jqGridResize("#mes_modal_grid" , $('#mes_modal_grid').closest('[class*="col-"]')); //그리드 리 사이즈


    } else {
        alert(msg_object.TBMES_A003.msg_name1); //경고메세지 출력
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001"); //추가권한없음
    msgGet_auth("TBMES_A002"); //삭제권한없음
    msgGet_auth("TBMES_A003"); //수정권한없음
    msgGet_auth("TBMES_A004"); //삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); //삭제여부
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysPartCost"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['','구분','품번','품명','규격','단위','업체','변경일자','금액','등록자','등록일시'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'unit_code',index:'unit_code' ,sortable: false,fixed: true,hidden:true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'part_type_name',index:'part_type_name',sortable: false,width:100,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'part_code',index:'part_code',key: true ,sortable: false,width:80,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'part_name',index:'part_name',sortable: false,width:150,fixed: true},// fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name:'spec',index:'spec',sortable: false,width:150,fixed: true},
            {name:'unit_name',index:'unit_name',sortable: false,width:80,fixed: true},
            {name:'supp_name',index:'supp_name',sortable: false,width:150,fixed: true},
            {name:'start_date',index:'start_date',sortable: false,width:120,fixed: true,formatter: formmatterDate2},
            {name:'unit_cost',index:'unit_cost',sortable: false,width:80,fixed: true,align: 'right', formatter: 'integer'},
            {name:'user_name',index:'user_name',sortable: false,width:80,fixed: true},
            {name:'cost_create_date',index:'cost_create_date',sortable: false,width:140,fixed: true,formatter: formmatterDate}// formatter 사용을 통해 데이터 형식 가공
        ],
        caption: "자재단가 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 600, // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 400], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
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
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}


function selectBox() {

    $('#1_select').select2();
}
