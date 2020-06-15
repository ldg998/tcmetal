/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {}, //조회시 data담는 용도
    send_data_post: {}, //수정 및 삭제 시
    readonly: ['machine_code'], //설정시 해당 name의 readonly 옵션
    delCheck1:0, //이미지1 유무체크
    delCheck2:0, //이미지2 유무체크
    delCheck3:0, //이미지3 유무체크
    auth:{} // 권한 체크 후 권한 data담는 용도
};


////////////////////////////시작 함수//////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    authcheck(); //권한 체크
    msg_get(); //메제지 설정
    selectBox(); //selectbox
    jqGrid_main(); //그리드생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); //그리드 resize


    modal_start1(); //모달1 시작함수
    modal_start2(); //모달2 시작함수
    jqgridPagerIcons(); //그리드 아이콘설정
});


////////////////////////////클릭 함수//////////////////////////////////

// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // condition_main 클래스명 넣으면 name에 맞게 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정 삭제시 다시 조회하기 위한 데이터저장

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/tpmMCGet', // URL -> RESTCONTROLLER 호출
        datatype: "json",  // JSON 데이터 형식으로
        page: page, // PAGE는 받은 파라미터로 설정
        postData: main_data.send_data // 매개변수 전달
    }).trigger("reloadGrid");  // 해당이벤트를 강제발생시키는 개념:그리드 reload
}

// 수정 삭제 시 호출 하는 조회
function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/tpmMCGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu5 = String.fromCharCode(5);   //아스키코드5번
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) { //체크된게 0개라면
            alert(msg_object.TBMES_A004.msg_name1);  //삭제할 데이터를 선택해주세요 alert
        } else { //체크된게 0개가 아니라면(하나라도 선택했다면)
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //삭제하시겠습니까? 물어보고
                main_data.check = 'D'; //check를 D로 바꿔주고
                wrapWindowByMask2(); // 삭제중 다른 작업을 할 수 없도록 마스크로 화면 덮음
                //ajax통신을 위해 url, data를 넘겨줌
                ccn_ajax("/tpmMCDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {// 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message);// 해당 오류 메세지 출력
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page')); //성공시 기존 조건으로 grid 조회
                    }
                    closeWindowByMask(); // 마스크 종료
                }).catch(function (err) {//에러발생시
                    closeWindowByMask();//마스크종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); //수정권한이 없을경우 경고창
    }
}

//추가버튼
function add_btn() {
    if(main_data.auth.check_add != "N") { //권한체크
        modal_reset(".modal_value", main_data.readonly); // 추가하기위해 기존의 데이터를 비워줌
        datepicker_makes("#datepicker", 0); //datepicker설정, 날짜는 오늘(0)
        $("#line_select2").val($('#line_select').val()).trigger("change"); //

        readURLRemove(1);   //이미지1 경로지우기
        readURLRemove(2);   //이미지2 경로지우기
        readURLRemove(3);   //이미지3 경로지우기
        $('#img1').hide();  //이미지1 숨기기?
        $('#img2').hide();  //이미지2 숨기기?
        $('#img3').hide();  //이미지3 숨기기?

        $("#mes_modal_grid").jqGrid('clearGridData'); //그리드 데이터 초기화
        main_data.check = 'I'; //저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]')); //그리드 resize
    } else {
        alert(msg_object.TBMES_A001.msg_name1); //저장권한이 없을경우 경고창
    }
}

////////////////////////////호출 함수//////////////////////////////////
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001"); //추가권한 없음
    msgGet_auth("TBMES_A002"); //삭제권한 없음
    msgGet_auth("TBMES_A003"); //수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "tpmMC"}).then(function (data) { //ajax통신으로 해당 메뉴의 권한을 가져온다
        main_data.auth = data;// main_data 에 권한 데이터(Y/N)를 담는다.
    });
}

//select box
function selectBox() {
    select_makes_sub("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{},'Y');   //ajax 통신을 통해 line 데이터를 받아옴
}

// jqGrid 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST', // post 방식
        colNames: ['설비코드', '설비명', '설치장소','비고', '등록자', '등록일'], //grid 헤더
        colModel: [ //gird데이터이며 colNmaes와 컬럼갯수가 동일해야함
            {name: 'machine_code', index: 'machine_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'machine_name', index: 'machine_name', sortable: false, width: 150,fixed:true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 100,fixed:true},
            {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "설비정보관리 | MES", // grid
        autowidth: true, // 그리드 가로길이 자동설정
        height: 562, // 세로길이 설정
        pager: '#mes_grid_pager', // jsp의 id와 동일
        rowNum: 100, // 한 페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], // 한 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재컬럼/총컬럼 수 설정
        multiselect: true, //다중선택 기능
        beforeSelectRow: function (rowid, e) { // 클릭시 체크 방지(체크박스를 눌러야만 체크)
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){ // 그리드 load가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0) // 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
