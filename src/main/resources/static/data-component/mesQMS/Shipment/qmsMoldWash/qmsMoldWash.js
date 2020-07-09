

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['code_value'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    modal_start1();
    datepickerInput();
    header_make()
});

////////////////////////////클릭 함수//////////////////////////////////
function test() {
    $('#addDialog').dialog('open')
}
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysCommonGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제

        var send_data = {};
        send_data.keyword = jqgrid_data.code_type;
        send_data.keyword2 = jqgrid_data.code_value; // data에 값을 추가하여 파라미터로 사용

        ccn_ajax('/sysCommonOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $('#group_name').val(data.cn); // 해당 id에 값을 부여
            $('#group_code').val(data.code_type); // 해당 id에 값을 부여
            $("#addDialog").dialog('open');// 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}



////////////////////////////호출 함수//////////////////////////////////
//호출함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysCommon"}).then(function (data) {
        main_data.auth = data;
    });
}
function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['일자','측정시간','측정값','작업자','측정시간','측정값','작업자','측정시간','측정값','작업자','측정시간','측정값','작업자'],
        colModel: [
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '1', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '2', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '3', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '4', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true},
            {name: '', index: '',sortable: false, width: 80,fixed: true}

        ],
        caption: "도형제관리 | MES",
        autowidth: true,
        multiselect: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function datepickerInput() {
    datepicker_makes("#datepicker",-30);
    datepicker_makes("#datepicker2",0);
}

function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: '1', numberOfColumns: 3, titleText: '<center>1차</center>'},
            {startColumnName: '2', numberOfColumns: 3, titleText: '<center>2차</center>'},
            {startColumnName: '3', numberOfColumns: 3, titleText: '<center>3차</center>'},
            {startColumnName: '4', numberOfColumns: 3, titleText: '<center>4차</center>'}

        ]
    })
}