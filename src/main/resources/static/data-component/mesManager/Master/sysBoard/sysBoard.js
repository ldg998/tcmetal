/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
/**
 * @desc : 게시판관리 main 데이터
 * @생성자 : 이용환
 * @생성일 : 2019-12-20
 * */
var main_data = {
    check: 'I',
    send_data: {},
    readonly:['board_code'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////
/**
 * @desc : 게시판관리 main 시작 함수
 * @생성자 : 이용환
 * @생성일 : 2019-12-20
 * */
$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈

    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
});

////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysBoardGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
        main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제

        var send_data = {};
        send_data.keyword = jqgrid_data.board_code; // data에 값을 추가하여 파라미터로 사용

        ccn_ajax('/sysBoardOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            // $('#group_code').val(data.code_type); // 해당 id에 값을 부여
            $("#addDialog").dialog('open');// 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // multiselect 된 그리드의 row
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D'; // 삭제인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
                wrapWindowByMask2();
                ccn_ajax("/sysBoardDelete", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}
////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysBoard"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames:['게시판코드','영문명','한글','최대파일','파일크기(MB)','등록자','등록일'],
        colModel:[
            {name:'board_code',index:'board_code',key: true ,sortable: false,width:150,fixed: true},
            {name:'board_en',index:'board_en',sortable: false,width:200,fixed: true},
            {name:'board_kr',index:'board_kr',sortable: false,width:200,fixed: true},
            {name:'files',index:'files',sortable: false,width:100,fixed: true,align:'right'},
            {name:'file_size',index:'file_size',sortable: false,width:100,fixed: true,align:'right'},
            {name:'user_name',index:'user_name',sortable: false,width:150,fixed: true},
            {name:'update_date',index:'update_date',formatter:formmatterDate,sortable: false,width:180,fixed: true}
        ],
        caption: "게시판관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
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

