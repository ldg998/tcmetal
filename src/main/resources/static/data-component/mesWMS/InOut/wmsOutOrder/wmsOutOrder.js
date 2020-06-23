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
    check2: 'Y',
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////
/**
 * @desc : 사용자관리 main 시작 함수
 * @생성자 : 김종효
 * @생성일 : 2019-11-12
 * */
$(document).ready(function () {
    msg_get();
    authcheck();
    selectBox();
    datepickerInput();
    suppModal_start();
    modal_start1();

    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수/////////////////////////////////////
function supp_btn(what) {
    main_data.supp_check = what;
    // console.log(main_data.supp_check);
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    } else if(main_data.supp_check === 'B') {
        $("#supp_name_modal").val("");
        $("#supp_code_modal").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;


    $("#mes_grid").setGridParam({
        url: "/wmsOutOrderGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/wmsOutOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
    $('#mes_grid2').jqGrid('clearGridData');
}


function under_get(rowid) {
    $("#mes_grid2").setGridParam({
        url: '/wmsOutOrderSubGet',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}


function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I';
        main_data.check2 = 'Y';
        modal_reset(".modal_value", []);
        $("#datepicker3").datepicker('setDate', 'today');
        $("#ord_no").prop("disabled",false).trigger('change');
        $("#mes_modal_grid").jqGrid('clearGridData');

        $("#addDialog").dialog('open');
        $("#supp_name_modal").prop("disabled", false);
        $("#supp_code_modal").prop("disabled", false);
        $("#place_name").prop("readonly", false);

        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        // console.log(ids);
        var check = '';         //status_name 대기, 완료 넣어줄 용도
        var check2 = [];        //status_name 완료인 id를 넣어줄 용도
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            ids.forEach(function (id) {
                check = $('#mes_grid').jqGrid('getRowData', id).status_name;
                if (check === '완료') {
                    check2.push(id);
                }
            })
            if (check2.length > 0) {
                alert(check2.join(",") + " 전표가 출고 완료 되어있습니다.");
            } else {
                if (confirm(msg_object.TBMES_A005.msg_name1)) {
                    main_data.check = 'D';
                    wrapWindowByMask2();

                    // console.log(ids.join(gu5)); .join()은 배열의 원소들을 연결하여 하나로 가공
                    ccn_ajax("/wmsOutOrderDel", {keyword: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                        $('#mes_grid2').jqGrid('clearGridData');
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        console.error(err);
                    });
                }
            }
            $('#mes_grid').jqGrid("resetSelection");
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
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    $('#scmOutOrderSelect').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        // 다중 select
        multiselect: true,
        // 타이틀
       caption: "제품출고 지시 | MES",
       colNames: ['출하일자','출하번호','업체명','상태','등록자','등록일시'],
       colModel: [
           {name: 'work_date', index: 'work_date' ,sortable: false,fixed:true,width:150, formatter: formmatterDate2},
           {name: 'req_no', index: 'req_no', sortable: false,fixed:true,width:150, key:true},
           {name: 'supp_name', index: 'supp_name', sortable: false,fixed:true,width:150},
           {name: 'status_name', index: 'status_name', sortable: false,fixed:true,width:150},
           {name: 'user_name', index: 'user_name', sortable: false,fixed:true,width:150},
           {name: 'update_date', index: 'update_date', sortable: false,fixed:true,width:150,formatter: formmatterDate}

       ],
        autowidth: true,
        viewrecords: true,
        height: 243,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');

                $myGrid.setRowData(save_rowid, false, {background:"#FFFFFF"}) ;
                save_rowid = rowid;
                $myGrid.setRowData(rowid, false, {background:"rgb(190, 220, 260)"}) ;

            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {
            under_get(rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            if (data.status_name === '완료') {
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "제품출고 지시 | MES",
       colNames: ['출하번호','현장','제품구분','제품명','계획명','생산계획번호','출고여부'],
       colModel: [
           {name: 'req_no', index: 'req_no', width: 150, sortable: false,fixed:true},
           {name: 'place_name', index: 'place_name', width: 150, sortable: false,fixed:true},
           {name: 'prod_type_name', index: 'prod_type_name', width: 150, sortable: false,fixed:true},
           {name: 'part_name', index: 'part_name', width: 150, sortable: false,fixed:true},
           {name: 'plan_name', index: 'plan_name', width: 150, sortable: false,fixed:true},
           {name: 'plan_no', index: 'plan_no', width: 150, sortable: false,fixed:true},
           {name: 'status_name', index: 'status_name', width: 150, sortable: false,fixed:true}
       ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager2',
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}

var save_rowid;


