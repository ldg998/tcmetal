/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
      check: 'I',// 수정,추가 판단용
      check2:'Y',
      send_data: {},// 조회시 data 담는 용도
      send_data_post: {},
      readonly: [],// 설정시 해당 name의 readonly 옵션
      auth:{},// 권한체크 후 권한 data 담는 용도
      condition_data:{}
};


////////////////////////////시작 함수//////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    msg_get(); // 메세지 설정
    jqGrid_main();// main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));// 그리드 resize
    selectBox(); //선택박스에 데이터 생성
    authcheck(); //권한체크
    modal_start1();// 모달1 시작 함수
    jqgridPagerIcons(); // 그리드 아이콘 설정
    get_btn(1);// 페이지 load 동시에 그리드 조회


});

////////////////////////////클릭 함수//////////////////////////////////



//모달 확인 조회 btn
function test(){
    $("#addDialog").dialog('open'); //숨겨진 모달 켜기
}
//추가버튼
function add_btn() {
    if (main_data.auth.check_add !="N") { //권한체크
        main_data.check = 'I';   // 추가권한을 부여
     //   main_data.condition_data = value_return(".condition_main");

        modal_reset(".modal_value", main_data.readonly); // 해당클레스명을 가지고있는 객체val 값을 초기화
        //$("#part_name").val(main_data.condition_data.keyword4);
        $("select[name=part_name_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=part_type] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=cargo_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=loc_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=unit_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=qc_level] option:eq(0)").prop("selected", true).trigger("change");

        $("#addDialog").dialog('open'); //숨겨진 모달 켜기

    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 권한이없다면 메세지
    }
}

/* 조회 버튼 */
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");//해당클레스 이름을 가지고있는 객체의value 를 객체이름에 넣어주는 쿼리
  //  main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({ //그리드조회
        url: '/sysPartGet',      // URL -> RESTCONTROLLER 호출
        datatype: "json",       //json 데이터 형식으로
        page: page,            // 페이지번호
        postData: main_data.send_data //매개변수전달
    }).trigger("reloadGrid");  // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
}


function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function update_btn(jqgrid_data) { //업로드버튼
    if (main_data.auth.check_edit !="N") { //권한체크
        main_data.check = 'U';             //업로드권한부여
        main_data.check2 = 'N';            //권한 제거
        modal_reset(".modal_value", []); //값 초기화

        //ajax 통신에 필요한 url 과 data 를 넘겨주고 성공한뒤 .then 안에 실행쿼리를 사용
        ccn_ajax('/sysPartOneGet', {keyword:jqgrid_data.part_code}).then(function (data) {
            modal_edits('.modal_value', main_data.readonly,data); // response 값 출력

            //셀렉트박스에 값을 채워넣어줌
            select_makes_base('#modal_loc_code_select', '/sysLocAllGet', "loc_code", "loc_name", {keyword: data.cargo_code}, '').then(function (data2) {
                $("#modal_loc_code_select").val(data.loc_code).trigger("change");
                main_data.check2 = 'Y';

                //모달 열기
                $("#addDialog").dialog('open');
            });
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


//삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu5 = String.fromCharCode(5); //CHAR(5) 구분자 선언
        var ids = $("#mes_grid").getGridParam('selarrrow'); //체크된 그리드 로우
        if (ids.length === 0) { //체크된 그리드 로우가 0이라면
            alert(msg_object.TBMES_A004.msg_name1); // 오류메세지 뿌리기
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)){// 실행할지 여부
                main_data.check = 'D';  // 삭제권한 부여
                wrapWindowByMask2();    // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
               //ajax 통신으로 체크된 그리도로우를 아스키코드5를 추가해주어 11|12|13| 다음과같이 보내준다
                ccn_ajax("/sysPartDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') { //실패하면 메세지
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));//그외라면 그리드 호출
                    }
                    closeWindowByMask(); // 마스크 종료
                }).catch(function (err) {
                    closeWindowByMask(); // 마스크 종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); // 권한이없을경우 해당메세지 출력
    }
}



////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");// 추가권한 없음
    msgGet_auth("TBMES_A002");// 삭제권한 없음
    msgGet_auth("TBMES_A003");// 수정한권한 없음
    msgGet_auth("TBMES_A004");// 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005");// 삭제여부
}

function authcheck() { // 권한체크
    ccn_ajax("/menuAuthGet", {keyword: "sysPart"}).then(function (data) {// ajax 통신으로 해당 메뉴의 권한을 가져 온다
        main_data.auth = data;// main_data 에 권한 데이터를 담는다.
    });
}


function selectBox() { //구분영역에 들어갈 select데이터 호출
    select_makes_base("#part_type_select", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'Y').then(function (data) {});
}
//jq 그리드 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames: ['구분','품번','품명','규격','단위','업체','업체2','업체3','위치','등록자','수정일시'],// grid 헤더 설정
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 80,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: 'part_code', index: 'part_code', key:true, sortable: false, width: 100,fixed: true},// sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed: true}, // fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name: 'spec', index: 'spec', sortable: false, width: 180,fixed: true},            // formatter 사용을 통해 데이터 형식 가공
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 100,fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed: true},
            {name: 'supp_name2', index: 'supp_name2', sortable: false, width: 150,fixed: true},
            {name: 'supp_name3', index: 'supp_name3', sortable: false, width: 150,fixed: true},
            {name: 'loc_name', index: 'loc_name', sortable: false, width: 100,fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 100,fixed: true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed: true}

        ],
        caption: "품목정보관리 | MES", // grid 제목
        autowidth: true,        // 그리드 자동 가로 길이 설정
        height: 562,             // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100,             // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000],// 페이지당 데이터 수 설정
        viewrecords: true,              // 그리드 하단 현재 컬럼/총컬럼 수 명시
        multiselect: true,               // 다중선택 가능
        beforeSelectRow: function (rowid, e) {   // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
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
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}
