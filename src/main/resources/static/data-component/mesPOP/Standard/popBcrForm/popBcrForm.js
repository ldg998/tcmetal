/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['bcr_form_code'],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    modal_start1();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {

    main_data.send_data_post = main_data.send_data; // 수정 삭제시 다시 조회하기 위한 데이터저장

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popBcrFormGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

//추가 버튼
function add_btn() {
    if(main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly);
        $("#bcr_contents").val('');
        main_data.check = 'I';
        $("#addDialog").dialog('open');
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", main_data.readonly);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.bcr_form_code;
        ccn_ajax('/popBcrFormOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#bcr_contents").val(data.bcr_contents);
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/popBcrFormDel", {keyword:ids.join(gu5)}).then(function (data) {
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
    ccn_ajax("/menuAuthGet", {keyword: "popBcrForm"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['양식코드', '양식명', '비고','등록자','등록일'],
        colModel: [
            {name: 'bcr_form_code', index: 'bcr_form_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'bcr_form_name', index: 'bcr_form_name', sortable: false, width: 200,fixed:true},
            {name: 'remark', index: 'remark', sortable: false, width: 300,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "바코드양식 | MES",
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
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
