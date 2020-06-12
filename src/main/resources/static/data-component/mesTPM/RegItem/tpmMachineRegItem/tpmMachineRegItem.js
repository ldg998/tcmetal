/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정/추가 체크용
    send_data: {}, //조회시 data 담는용
    readonly: [],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈


    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    get_btn(1);
});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/tpmMachineRegItemGet',
        datatype: "json",
        page: page,
    }).trigger("reloadGrid");
}


// 추가 버튼
function add_btn() {
    if(main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 추가권한X
    }
}

// 그리는 더블 클릭 시 발동
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") { //권한체크
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크

        ccn_ajax('/tpmMachineRegItemOneGet', {keyword:jqgrid_data.qc_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open'); //모달창열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //수정권한X
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드5번
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) { //선택된게 없을시
            alert(msg_object.TBMES_A004.msg_name1); //데이터를 선택하라는 경고창
        } else { //선택한게 1개라도 있을경우
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //삭제하시겠습니까?
                main_data.check = 'D';
                wrapWindowByMask2(); // 마스크
                //ajax로 keyword는 코드+5번+코드+5번---
                ccn_ajax("/tpmMachineRegItemDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask(); //마스크 해제
                }).catch(function (err) {
                    closeWindowByMask(); //마스크 해제
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); //삭제권한X
    }
}


////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001"); //추가권한x
    msgGet_auth("TBMES_A002"); //삭제권한x
    msgGet_auth("TBMES_A003"); //수정권한x
    msgGet_auth("TBMES_A004"); //삭제할 데이터 선택해줘
    msgGet_auth("TBMES_A005"); //삭제할거야?
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "tpmMachineRegItem"}).then(function (data) {
        main_data.auth = data; //권한을 (y/n)으로 받아옴
    });
}

//jqgrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST', //post방식
        colNames : ['점검항목코드','점검항목명','사용유무','등록자','점검일시'], //컬럼헤더
        colModel : [ //컬럼내용, 헤더와 갯수 일치
            {name:'qc_code',index:'qc_code',key: true ,sortable: false,width:80,fixed:true},
            {name:'qc_name',index:'qc_name',sortable: false,width:120,fixed:true},
            {name:'use_yn',index:'use_yn',sortable: false,width:50,fixed:true},
            {name:'user_name',index:'user_name',sortable: false,width:80,fixed:true},
            {name:'update_date',index:'update_date',formatter:formmatterDate,sortable: false,width:140,fixed:true}
        ],
        caption: "예방점검 항목관리 | MES", //제목
        autowidth: true, //자동 가로길이
        height: 600, //세로
        pager: '#mes_grid_pager', //pager(jap에 id와 동일)
        jsonReader: {cell: ""},
        rowNum: 100, //한페이지당 데이터 수
        rowList: [100, 200, 300, 400], //한페이지당 데이터수 설정
        viewrecords: true, //그리드 하단 현재 컬럼/총컬럼수 명시
        multiselect: true, //다중선택기능
        beforeSelectRow: function (rowid, e) { // 클릭시 체크 방지 / 체크박스를 통한 클릭
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);

        },
        loadComplete:function(){ //load 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0) // 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false}); // grid_pager 에 검색 삭제 수정 추가 기능 설정
}



