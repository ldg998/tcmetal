////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    datepickerInput();
    jqGrid_main_modal();
    jqGridResize("#mes_modal_grid",$('#mes_modal_grid').closest('[class*="col-"]')); //그리드 리 사이즈
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function add_modal1_btn(){
    var modalValue = value_return('.modal_value');

    modalValue.start_date = modalValue.start_date.replace(/\-/g, '');
    modalValue.unit_cost = modalValue.unit_cost.replace(/\,/g, '');

        if (confirm('해당 제품의 단가를 저장하시겠습니까?')) {
            ccn_ajax('/sysSpartCostAdd',modalValue).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                        $('#mes_grid').trigger("reloadGrid")
                        $('#mes_modal_grid').trigger("reloadGrid")
                }
            }).catch(function (err) {
                alert(msg_object.TBMES_E008.msg_name1);
            });
        }


}


function close_addDialog (){
$('#addDialog').dialog("close");
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
        width: 300, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정

        ]
    })
}

function jqGrid_main_modal() {
    $("#mes_modal_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['','','','','변경일자','금액'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'rownum',index:'rownum',sortable: false,key:true,hidden:true},
            {name:'supp_code',index:'supp_code',sortable: false,hidden:true},
            {name:'part_code',index:'part_code',sortable: false,hidden:true},
            {name:'part_kind',index:'part_kind',sortable: false,hidden:true},
            {name:'start_date',index:'start_date',sortable: false,width:100,fixed: true,formatter:formmatterDate2},
            {name:'unit_cost',index:'unit_cost',sortable: false,width:110,fixed: true,formatter: 'integer',align: 'right'}
        ],
        caption: "제품단가관리 | MES",
        multiselect: true,
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 100, // 그리드 세로 길이 설정
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#mes_modal_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal_grid  tr.jqgfirstrow").css("height","1px");
        }
    })//.navGrid("mes_modal_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}
function datepickerInput() {
    datepicker_makes("#datepicker1_modal", 0);
}