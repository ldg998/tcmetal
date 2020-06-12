/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{},
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    modal_start1();
    selectBox();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popRouteGet',
        datatype: "json",
        page: page,
    }).trigger("reloadGrid");
}


function get_btn_post(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popRouteGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';
        modal_reset(".modal_value", main_data.readonly);
        $("#addDialog").dialog('open');

    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.route_code;

        ccn_ajax('/popRouteOneGet', send_data).then(function (data) {
            modal_reset(".modal_value", main_data.readonly);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
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
                ccn_ajax("/popRouteDel", {keyword:ids.join(gu5)}).then(function (data) {
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

function selectBox() {
    $('#group_select').select2();
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popRoute"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['라우팅코드', '라우팅명', '공정1','공정2','공정3','공정4','공정5','공정6','공정7','공정8','등록자','등록일'],
        colModel: [
            {name: 'route_code', index: 'route_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'route_name', index: 'route_name', sortable: false, width: 150,fixed:true},
            {name: 'line_name1', index: 'line_name1', sortable: false, width: 100,fixed:true},
            {name: 'line_name2', index: 'line_name2', sortable: false, width: 100,fixed:true},
            {name: 'line_name3', index: 'line_name3', sortable: false, width: 100,fixed:true},
            {name: 'line_name4', index: 'line_name4', sortable: false, width: 100,fixed:true},
            {name: 'line_name5', index: 'line_name5', sortable: false, width: 100,fixed:true},
            {name: 'line_name6', index: 'line_name6', sortable: false, width: 100,fixed:true},
            {name: 'line_name7', index: 'line_name7', sortable: false, width: 100,fixed:true},
            {name: 'line_name8', index: 'line_name8', sortable: false, width: 100,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', width: 180, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "공정라우팅 | MES",
        autowidth: true,
        height: 562,
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
