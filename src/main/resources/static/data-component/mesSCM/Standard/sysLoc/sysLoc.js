/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {},// 조회시 data 담는 용도
    send_data_post: {}, //위와 같음
    readonly: ["loc_code"], //설정시 해당 name readonly 욥션
    auth:{} // 권한체크 후 권한 data 담는 용도
};
////////////////////////////시작 함수//////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    msg_get();  // 메세지설정
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    modal_start1(); // 모달 시작 함수
    authcheck(); // 권한체크
    jqgridPagerIcons(); //그리드 아이콘 설정
});
//$(function(){}); DOM이 로드되었을때 실행 하지만 로드하려는 리소스가 모두 그려지고 난 이후에 실행되기 때문에 jquery보다 늦게 실행된다.
window.onload = function(){
   // get_btn(1);// 페이지 load 동시에 그리드 조회
}

////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //해당 클레스네임 객체에 value name 할당
    main_data.send_data_post = main_data.send_data; //할당된 데이터 나눠주기
    $("#mes_grid").setGridParam({ // 그리드조회
        url: '/sysLocGet',  // URL -> RESTCONTROLLER 호출
        datatype: "json", // JSON 데이터 형식으로
        page: page,   // PAGE는 받은 파라미터로 설정
        postData: {keyword:""}  // 매개변수 전달
    }).trigger("reloadGrid"); // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
}


//추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") { //권한체크
        modal_reset(".modal_value", main_data.readonly); // 해당 클레스이름 객체내용 비워주기 readonly 이름이있다면 readonly옵션추가
        // modalValuePush("#cargo_select","#cargo_code","#cargo_name"); //모달안에 선택박스 데이터 채워주기
        main_data.check = 'I'; // 추가권한 부여
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 오류메세지 출력
    }
}

// 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); //해당 클레스이름 객체 내용비워주기 readonly 이름이있다면 readonly옵션추가
        main_data.check = 'U'; //업데이트 권한부여
        var send_data = {};
        send_data.keyword = jqgrid_data.loc_code; //키워드에 받아온 select cod 담아주기
        ccn_ajax('/sysLocOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open'); //모달창 열어주기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //오류 메세지 출력
    }
}

//삭제버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드 5 담아주기
        var ids = $("#mes_grid").getGridParam('selarrrow'); //그리드 에서 선택한 row 담아주기
        if (ids.length === 0) { //선택여부체크
            alert(msg_object.TBMES_A004.msg_name1); // 오류 메세지 출력
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //실행여부
                main_data.check = 'D'; //삭제권한 부여
                wrapWindowByMask2(); // 마스크로 덥고 삭제하는동안 다른행동 제약걸기
                // 가져온 그리드 row 객체에 아스키코드5 를 추가  1|2|3 형식으로 데이터 를보내준다
                ccn_ajax("/sysLocDelete", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') { // 프로시져 메세지가 ng 라면
                        alert(data.message); // 해당 오류메세지 출력
                    } else {
                        $("#mes_grid").trigger("reloadGrid");
                    }
                    closeWindowByMask(); // 마스크해제
                }).catch(function (err) {
                    closeWindowByMask();//마스크해제
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); //메세지 출력
    }
}


////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");// 추가권한없음
    msgGet_auth("TBMES_A002");// 삭제권한없음
    msgGet_auth("TBMES_A003");// 수정권한없음
    msgGet_auth("TBMES_A004");// 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005");// 삭제여부
}
// 권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysLoc"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",// local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST', // post 방식 데이터 전달
        colNames: ['위치코드', '위치명', '등록자', '등록일'],// grid 헤더 설정
        colModel: [ // grid row 의 설정할 데이터 설정
            {name: 'loc_code', index: 'loc_code', key:true, width: 150,fixed:true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: 'loc_name', index: 'loc_name', width: 150,fixed:true},   // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name: 'user_name', index: 'user_name', width: 60,fixed:true}, // fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name: 'update_date', index: 'update_date', width: 140,formatter: formmatterDate,fixed:true} // formatter 사용을 통해 데이터 형식 가공
        ],
        caption: "로케이션관리 | MES",// grid 제목
        autowidth: true, // 그리드 자동 가로 길이 설정
        height: 562,    // 그리드 세로 길이 설정
        pager: '#mes_grid_pager', // pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        multiselect: true, // 다중선택 가능
        beforeSelectRow: function (rowid, e) {    // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}

