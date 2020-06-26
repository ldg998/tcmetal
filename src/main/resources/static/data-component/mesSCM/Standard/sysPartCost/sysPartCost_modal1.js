////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    add_click_btn();// 키설정
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    var modal_objact = value_return(".modal_value");
    if (effectiveness1(modal_objact)) {
        var text = msg_object.TBMES_Q002.msg_name1;
        if (main_data.check === "U") {
            text = msg_object.TBMES_Q003.msg_name1;
        }
        if (confirm(text)) {
            wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
            modal_objact.keyword = main_data.check;
            ccn_ajax("/sysPartNameAdd", modal_objact).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    if (main_data.check === "I") {
                        get_btn(1);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                }
                closeWindowByMask(); // 마스크 종료
                $("#addDialog").dialog('close');
            }).catch(function (err) {
                closeWindowByMask(); // 마스크 종료
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }
    }

}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}

function effectiveness1(modal_objact) { // 유효성 검사
     if (modal_objact.part_name === '') {
        alert("품목명을 입력해주세요");
        return false;
    }  else {
        return true;
    }
}

function add_click_btn() { // 엔터키를 통한 버튼 활성화
     $(document).on("keypress",'.modal_value',function (e) {
         if (e.which == 13){
             addUdate_btn();
         }
     });
}

function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 300, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                    $("#addDialog2").dialog("close");
                }
            }
        ]
    })
}

function jqGrid_main_modal() {
    $("#mes_update_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['변경일자','금액'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'',index:'',sortable: false,width:40,fixed: true},
            {name:'',index:'',sortable: false,width:40,fixed: true}

        ],
        multiselect: true,
        caption: "자재단가 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 50, // 그리드 세로 길이 설정
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
    }).navGrid("#mes_update_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}
