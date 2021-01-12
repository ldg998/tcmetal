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

    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({ // 그리드 조회
        // URL -> RESTCONTROLLER 호출
        url: '/wmsInvoiceFormGet',
        // JSON 데이터 형식으로
        datatype: "json",
        // PAGE는 받은 파라미터로 설정
        page: page,
        // 매개변수 전달
        postData: main_data.send_data
        // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N"){
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $("#modal_select1").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#modal_select2").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#rpt_name").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지


        $('#modal_select1 option:eq(0)').prop("selected", true).trigger("change");
        $('#modal_select2 option:eq(0)').prop("selected", true).trigger("change");
        if($("#supp_select").val() !== ""){
            $('#modal_select1').val($("#supp_select").val()).trigger("change");
        }
        $("#ex_file").prev().text("사진첨부");
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 경고메세지 출력
    }
}

// 그리드 내용 더블 클릭 시 실행
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        $("#modal_select1").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#modal_select2").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#rpt_name").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지


        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/wmsInvoiceFormOneGet', {keyword: jqgrid_data.supp_code,keyword2:jqgrid_data.rpt_name,keyword3:jqgrid_data.trans_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#ex_file").prev().text("사진첨부");
            $("#addDialog").dialog('open'); //모달창열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //경고메세지 출력
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { // 권한체크
        var gu5 = String.fromCharCode(5);
        var gu4 = String.fromCharCode(4);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        if (ids.length === 0) { // 선택된 그리드 row가 없을 경우
            alert(msg_object.TBMES_A004.msg_name1); // 경고문 출력
        } else {


            var list = [];
            var jdata = {};
            for(var i = 0; i < ids.length; i ++){
                jdata = $('#mes_grid').jqGrid('getRowData', ids[i]);
                list.push(jdata.supp_code +gu4+jdata.rpt_name +gu4+ jdata.trans_code);
            }


            if (confirm(msg_object.TBMES_A005.msg_name1)) { // 삭제여부 확인 메세지 출력
                wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
                // ajax 통신 함수 url과 data 를 전달하여 promise로 실행 후 가공 data를 사용할 수 있도록 설정
                ccn_ajax("/wmsInvoiceFormDel", {keyword: list.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message); // 해당 오류 메세지 출력
                    } else {
                        $('#mes_grid').trigger('reloadGrid'); // 성공시 기존에 조회했던 조건 그대로 grid를 조회
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
function msg_get() {
    msgGet_auth("TBMES_A001"); // 추가권한 없음
    msgGet_auth("TBMES_A002"); // 삭제권한 없음
    msgGet_auth("TBMES_A003"); // 수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsInvoiceForm"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['rownum','업체','업체','명칭','운송수단','운송수단','등록자','수정일'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'rownum',index:'rownum',key: true ,width:100,hidden:true,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'supp_name',index:'supp_name',width:150,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'supp_code',index:'supp_code',hidden:true,width:150,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'rpt_name',index:'rpt_name',width:150,fixed: true},// fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name:'trans_name',index:'trans_name',width:80,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'trans_code',index:'trans_code',hidden:true,width:150,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'user_name',index:'user_name',width:60,fixed: true},
            {name:'update_date',index:'update_date',width:140,fixed: true,formatter: formmatterDate}
        ],
        caption: "인보이스양식 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 562, // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 400], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        multiselect: true,
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
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
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}