/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {}, // 조회시 data 담는 용도
    readonly: ['auth_code'],// 설정시 해당 name의 readonly 옵션
    auth:{} // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수//////////////////////////////////

// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    authcheck(); // 권한 체크
    msg_get(); // 메세지 설정
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); // 그리드 resize
    jqgridPagerIcons(); // 그리드 아이콘 설정

    // ccn_ajax("/test0609", {}).then(function (data) { // ajax 통신으로 해당 메뉴의 권한을 가져 온다
    //     console.log(data); // main_data 에 권한 데이터를 담는다.
    // });
});


////////////////////////////클릭 함수/////////////////////////////////////

// 조회 버튼
function get_btn(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        // URL -> RESTCONTROLLER 호출
        url: '/sysAuthGet2',
        // JSON 데이터 형식으로
        datatype: "json",
        // PAGE는 받은 파라미터로 설정
        page: page,
        // 매개변수 전달
        postData: main_data.send_data
        // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
    }).trigger("reloadGrid");
}

// 수정/삭제 와 조건설정이 동시에 존재할 경우 get_btn_post 필요

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !== "N"){ // 권한 체크
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 설정 / 모달창 데이터 초기화
        main_data.check = 'I'; // 저장인지 체크 INSERT - I
        $("#addDialog").dialog('open'); // 모달 열기

    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 경고메세지 출력
    }
}

// 그리드 내용 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") { // 권한체크
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할 항목 설정
        main_data.check = 'U'; // 수정인지 체크
        jqgrid_data.dept_code = main_data.send_data.keyword; // 저장한데이터 dept_code 를 넣어 서 진행
        ccn_ajax('/sysAuthOneGet2', {keyword: jqgrid_data.auth_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open'); // 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); // 경고메세지 출력
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { // 권한체크
        var gu5 = String.fromCharCode(5); // CHAR(5) 구분자 선언
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        if (ids.length === 0) { // 선택된 그리드 row가 없을 경우
            alert(msg_object.TBMES_A004.msg_name1); // 경고문 출력
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) { // 삭제여부 확인 메세지 출력
                wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
                // ajax 통신 함수 url과 data 를 전달하여 promise로 실행 후 가공 data를 사용할 수 있도록 설정
                ccn_ajax("/sysAuthDelete", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message); // 해당 오류 메세지 출력
                    } else {
                        // ccn_ajax("/procedureLogAdd",{keyword:"SP_SYS_AUTH_GROUP_DEL",keyword2:""})
                        get_btn($("#mes_grid").getGridParam('page')); // 성공시 기존에 조회했던 조건 그대로 grid를 조회
                    }
                closeWindowByMask(); // 마스크 종료
                }).catch(function (err) { // 에러 발생 시
                    closeWindowByMask(); // 마스크 종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); // 권한 이 없을 경우 해당 메세지 출력
    }
}


////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001"); // 추가권한 없음
    msgGet_auth("TBMES_A002"); // 삭제권한 없음
    msgGet_auth("TBMES_A003"); // 수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}
// 권한 체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysAuth"}).then(function (data) { // ajax 통신으로 해당 메뉴의 권한을 가져 온다
        main_data.auth = data; // main_data 에 권한 데이터를 담는다.
    });
}
// jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST', // post 방식 데이터 전달
        colNames : ['권한그룹코드','권한그룹명','등록자','등록일시'], // grid 헤더 설정
        colModel : [ // grid row 의 설정할 데이터 설정
            {name:'auth_code',index:'auth_code',key: true ,width:150,fixed: true}, // key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'auth_name',index:'auth_name',width:200,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'user_name',index:'user_name',width:150,fixed: true}, // fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name:'update_date',index:'update_date',formatter:formmatterDate,width:140,fixed: true} // formatter 사용을 통해 데이터 형식 가공
        ],
        caption: "권한그룹관리 | MES", // grid 제목
        autowidth: true, // 그리드 자동 가로 길이 설정
        height: 600, // 그리드 세로 길이 설정
        pager: '#mes_grid_pager', // pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 400], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        multiselect: true, // 다중선택 가능,
        sortable: true,
        forceClientSorting: true,
        navOptions: { reloadGridOptions: { fromServer: true } },
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
        loadComplete:function(){ // 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0) // 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false}); // grid_pager 에 검색 삭제 수정 추가 기능 설정
}
// function readExcel() {
//     var input = event.target;
//     var reader = new FileReader();
//     reader.onload = function () {
//         var data = reader.result;
//         var workBook = XLSX.read(data, { type: 'binary' });
//         workBook.SheetNames.forEach(function (sheetName) {
//             console.log('SheetName: ' + sheetName);
//             var rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
//             console.log(rows);
//             console.log(JSON.stringify(rows));
//         })
//     };
//     reader.readAsBinaryString(input.files[0]);
// }