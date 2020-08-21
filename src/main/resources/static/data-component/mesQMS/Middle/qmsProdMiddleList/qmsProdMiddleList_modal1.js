////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    select_modal1();
    jqGrid_main_modal();
    jqGridResize("#mes_modal_grid",$('#mes_modal_grid').closest('[class*="col-"]')); //그리드 리 사이즈
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {

}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}



function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 700, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: '확인',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    $(this).dialog("close");

                }
            }

        ]
    })
}

function jqGrid_main_modal() {
    $("#mes_modal_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['검사항목'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정

            {name:'qc_name',index:'qc_name',sortable: false,fixed:true,width: 500},
          
        ],
        caption: "검사항목",

        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 100, // 그리드 세로 길이 설정
        loadComplete:function(){
            if ($("#mes_modal_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal_grid  tr.jqgfirstrow").css("height","1px");
        }
    })//.navGrid("mes_modal_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}

function select_modal1(){
   $("#select_modal1").select2();
}

