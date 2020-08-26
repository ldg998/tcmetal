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
    authcheck();    // 권한 체크
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    selectBox();
    datepickerInput();
  //  get_btn(1);// 페이지 load 동시에 그리드 조회
    suppModal_start();
});


////////////////////////////클릭 함수/////////////////////////////////////

// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return('.condition_main')


    $("#mes_grid").setGridParam({ // 그리드 조회
        // URL -> RESTCONTROLLER 호출
        url: '/outsStockSumMonthGet',
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
        ccn_ajax('/sysPartNameOneGet', {keyword: jqgrid_data.part_name_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open'); //모달창열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //경고메세지 출력
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {  //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드 5 담기
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {      //선택여부 체크  선택이안되어 0이라면
            alert(msg_object.TBMES_A004.msg_name1); // 경고메세지 출력
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //시행 여부메세지 출력
                main_data.check = 'D'; // 삭제권한 부여
                wrapWindowByMask2();  //마스크로 덥고 삭제 진행동안 다른작업 방지하기
                ccn_ajax("/sysPartNameDel", {keyword: ids.join(gu5)}).then(function (data) { // 체크된 그리드 로우에 아스키코드를 넣어 1|2|3| 이런식으로 데이터전달
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message);   //해당 오류메세지 출력
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));// 성공시 기존에 조회했던 조건 그대로 grid를 조회
                    }
                    closeWindowByMask(); //마스크 종료
                }).catch(function (err) { //에러발생시
                    closeWindowByMask(); // 마스크종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);// 권한 이 없을 경우 해당 메세지 출력
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
    ccn_ajax("/menuAuthGet", {keyword: "outsStockSumMonth"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['외주업체','업체','기종','품번','품명','단중','전월재고','금월입고','금월출고','자체불량','재고'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'outs_supp_name',index:'outs_supp_name',key: true ,sortable: false,width:100,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'supp_name',index:'supp_name',sortable: false,width:150,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'part_kind',index:'part_kind',sortable: false,width:150,fixed: true},// fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name:'part_code',index:'part_code',sortable: false,width:150,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:150,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:80,fixed: true,align: 'right', formatter: 'integer'},
            {name:'prev_qty',index:'prev_qty',sortable: false,width:60,fixed: true,align: 'right', formatter: 'integer'},
            {name:'in_qty',index:'in_qty',sortable: false,width:60,fixed: true,align: 'right', formatter: 'integer'},
            {name:'out_qty',index:'out_qty',sortable: false,width:60,fixed: true,align: 'right', formatter: 'integer'},
            {name:'ng_qty',index:'ng_qty',sortable: false,width:80,fixed: true},
            {name:'qty',index:'qty',sortable: false,width:60,fixed: true,align: 'right', formatter: 'integer'}// formatter 사용을 통해 데이터 형식 가공
        ],

        caption: "외주재고 월원장 | MES",// grid 제목
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
    $('#select1').select2();
    select_makes_base("#main_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#main_select2').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#main_select2').append(option);
        $('#main_select2').select2();
    });

    select_makes_base("#main_select3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"");
}
function datepickerInput() {
    datepicker_makes("#datepicker", 0);

}
function main_select_change1(value) {
    if (value !== ""){
        select_makes_base("#main_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y").then(function (data) {
        });
    } else {
        $('#main_select2').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#main_select2').append(option);
        $('#main_select2').select2();
    }

}
