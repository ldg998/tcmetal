/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize('#mes_grid2', $('#mes_grid2').closest('[class*="col-"]'));
    selectBox();
    authcheck();
    jqgridPagerIcons();

});


////////////////////////////클릭 함수//////////////////////////////////

// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/popLineUserGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}



function add_btn() {
    if (main_data.auth.check_add !="N") {
        var gu5 = String.fromCharCode(5);
       var data = value_return(".condition_main");
       var ids = $("#mes_grid2").getGridParam('selarrrow').slice();
        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }else {
            var send_data = {};
            send_data.line_code = data.keyword;
            send_data.keyword = ids.join(gu5);

            var text = msg_object.TBMES_Q002.msg_name1;

            if (confirm(text)) {
                ccn_ajax("/popLineUserAdd", send_data).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn(1);
                        $("#mes_grid2").trigger("reloadGrid");
                    }

                }).catch(function (err) {
                    alert(msg_object.TBMES_E008.msg_name1);
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                var line_code = $('#mes_grid').jqGrid('getRowData', ids[0]).line_code;
                wrapWindowByMask2();
                ccn_ajax("/popLineUserDel", {line_code:line_code,keyword: ids.join(gu5)}).then(function (data) {
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



////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_E008");

}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popLineUser"}).then(function (data) {
        main_data.auth = data;
    });
}



function selectBox() {
    $('#select1').select2();
    $('#select2').select2();
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['공정', '사용자코드', '사용자명'],
        colModel: [
            {name: 'line_name', index: 'line_name', sortable: false, width: 100,fixed:true},
            {name: 'user_code', index: 'user_code',key:true, sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true}
        ],
        caption: "공정별작업자 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['사용자코드', '사용자명'],
        colModel: [
            {name: 'user_code', index: 'user_code', key: true, sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true}
        ],
        caption: "공정별작업자 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid2_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid2_pager', {search: false, add: false, edit: false, del: false});
}
