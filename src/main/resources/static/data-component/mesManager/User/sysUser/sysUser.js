/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
/**
 * @desc : 사용자관리 main 데이터
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['user_code'],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////
/**
 * @desc : 사용자관리 main 시작 함수
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
$(document).ready(function () {
    authcheck();
    msg_get();
    selectBox(); // select2 생성

    /*----모달----*/
    modal_start1(); // 모달1 시작 함수

    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // value_return 클래스명 넣으면 name에 맞게 객체 생성
    main_data.send_data.keyword ="";
    main_data.send_data.keyword2 = "";
    main_data.send_data_post = main_data.send_data; // 수정 삭제시 다시 조회하기 위한 데이터저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysUserGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 수정 삭제 시 호출 하는 조회
function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysUserGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $(".pwd-reset").hide();//비밀번호초기화버튼 숨기기
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 그리는 더블 클릭 시 발동
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        $(".pwd-reset").show(); //비밀번호초기화버튼
        jqgrid_data.dept_code = main_data.send_data_post.keyword; // 저장한데이터 dept_code 를 넣어 서 진행
        ccn_ajax('/sysUserOneGet', jqgrid_data).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/sysUserDelete", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
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


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysUser"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    select_makes("#dept_select", "/sysDeptAllGet", "dept_code", "dept_name");
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['사용자코드', '사용자명', '부서', '직책', '권한', '전화번호', '이메일', '사용유무', '최근로그인', '수정일'],
        colModel: [
            {name: 'user_code', index: 'user_code', key: true,width:150, sortable: false,fixed: true},
            {name: 'user_name', index: 'user_name',width:150, sortable: false,fixed: true},
            {name: 'dept_name', index: 'dept_name',width:150, sortable: false,fixed: true},
            {name: 'duty_name', index: 'duty_name',width:150, sortable: false,fixed: true},
            {name: 'auth_name', index: 'auth_name',width:150, sortable: false,fixed: true},
            {name: 'tel_no', index: 'tel_no',width:150, sortable: false, fixed: true},
            {name: 'email', index: 'email',width:250, sortable: false,fixed: true},
            {name: 'use_yn', index: 'use_yn',width:100, sortable: false,fixed: true},
            {name: 'login_date', index: 'login_date',width:150, formatter: formmatterDate, sortable: false,fixed: true},
            {name: 'update_date', index: 'update_date',width:150, formatter: formmatterDate, sortable: false,fixed: true}
        ],
        caption: "사용자관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});
}



