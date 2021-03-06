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
  //  get_btn(1);// 페이지 load 동시에 그리드 조회


});

////////////////////////////클릭 함수//////////////////////////////////



//모달 확인 조회 btn
//추가버튼
function add_btn() {
    if (main_data.auth.check_add !="N") { //권한체크
        main_data.check = 'I';   // 추가권한을 부여
        modal_reset(".modal_value", main_data.readonly); // 해당클레스명을 가지고있는 객체val 값을 초기화
        var select = $('#part_type_select').val();

        if(select ==''){
            $("#part_type_modal1 option:eq(0)").prop("selected", true).trigger('change');
        }else {
        $('#part_type_modal1').val(select).trigger('change');
        }
        $('#part_code_modal').prop("disabled",false).trigger("change");
        $('#qc_level option:eq(0)').prop("selected", true).trigger("change");

        $("#unit_code_modal1 option:eq(0)").prop("selected", true).trigger('change');
        $("#stock_yn option:eq(0)").prop("selected", true).trigger('change');
        $("#loc_code_modal1 option:eq(0)").prop("selected", true).trigger('change');

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

function update_btn(jqgrid_data) { //업로드버튼
    if (main_data.auth.check_edit !="N") { //권한체크
        main_data.check = 'U';             //업로드권한부여
        modal_reset(".modal_value", []); //값 초기화

        var send_data = {
            keyword:jqgrid_data.part_type,
            keyword2:jqgrid_data.part_code,
            keyword3:""
        }


        //ajax 통신에 필요한 url 과 data 를 넘겨주고 성공한뒤 .then 안에 실행쿼리를 사용
        ccn_ajax('/sysPartOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly,data); // response 값 출력
            $('#part_code_modal').prop("disabled",true).trigger("change");

            $("#addDialog").dialog('open');
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
                        $("#mes_grid").trigger("reloadGrid");
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
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"Y")


}
//jq 그리드 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames: ['','','구분','품번','품명','규격','단위','품질레벨','업체','업체2','업체3','업체4','업체5','위치','등록자','등록일시'],// grid 헤더 설정
        colModel: [
            {name: 'part_type', index: 'part_type',hidden:true},
            {name: 'supp_code', index: 'supp_code',hidden:true},
            {name: 'part_type_name', index: 'part_type_name', width: 50,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: 'part_code', index: 'part_code', key:true, width: 110,fixed: true},// sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name: 'part_name', index: 'part_name',  width: 190,fixed: true}, // fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name: 'spec', index: 'spec',  width: 110,fixed: true},            // formatter 사용을 통해 데이터 형식 가공
            {name: 'unit_name', index: 'unit_name',  width: 60,fixed: true},
            {name: 'qc_level_name', index: 'user_name_name',  width: 70,fixed: true},
            {name: 'supp_name', index: 'supp_name',  width: 130,fixed: true},
            {name: 'supp_name2', index: 'supp_name2',  width: 130,fixed: true},
            {name: 'supp_name3', index: 'supp_name3',  width: 130,fixed: true},
            {name: 'supp_name4', index: 'supp_name4',  width: 130,fixed: true},
            {name: 'supp_name5', index: 'supp_name5',  width: 130,fixed: true},
            {name: 'loc_name', index: 'loc_name',  width: 100,fixed: true},
            {name: 'user_name', index: 'user_name',  width: 60,fixed: true},
            {name: 'update_date', index: 'update_date', width: 140,  formatter: formmatterDate,fixed: true}


        ],
        caption: "품목정보관리 | MES", // grid 제목
        autowidth: true,        // 그리드 자동 가로 길이 설정
        height: 562,             // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100,             // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000],// 페이지당 데이터 수 설정
        viewrecords: true,              // 그리드 하단 현재 컬럼/총컬럼 수 명시
        multiselect: true,               // 다중선택 가능
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
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
