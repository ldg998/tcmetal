/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth: {},
    readonly: ['plan_year']
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    authcheck();
    datepickerInput();
    modal_start1();

    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    main_data.send_data.start_date = $("#datepicker").val().replace('년', '');
    main_data.send_data.end_date = $("#datepicker2").val().replace('년', '');
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/crmPlanGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {

    $("#mes_grid").setGridParam({
        url: '/crmPlanGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add != "N") {
        modal_reset(".modal_value",[]);
        // modal_reset(".modal_value", main_data.readonly);
        main_data.check = 'I';
        var date = new Date();
        date.setDate(date.getDate());
        $('#plan_year').datepicker({
            autoclose: true,
            format: 'yyyy' + '년',
            language: "kr",
            minViewMode: 'years',
        }).datepicker('setDate', date);

        $("#plan_year").prop("disabled", false).trigger("change");
        $("#addDialog").dialog('open');
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
    modal_reset(".modal_value", []);
    main_data.check = 'U'; // 수정인지 체크
    // jqgrid_data.plan_year = main_data.send_data.keyword;
    // console.log("확인 키워드:"+ JSON.stringify(jqgrid_data));
    ccn_ajax('/crmPlanOneGet', {plan_year:jqgrid_data}).then(function (data) { // user의 하나 출력
        data.plan_year = data.plan_year+"년";
        $('#plan_year').datepicker({
            autoclose: true,
            format: 'yyyy' + '년',
            language: "kr",
            minViewMode: 'years',
        }).datepicker('setDate', data.plan_year);
        data.plan1 = integer(data.plan1);
        data.plan2 = integer(data.plan2);
        data.plan3 = integer(data.plan3);
        data.plan4 = integer(data.plan4);
        data.plan5 = integer(data.plan5);
        data.plan6 = integer(data.plan6);
        data.plan7 = integer(data.plan7);
        data.plan8 = integer(data.plan8);
        data.plan9 = integer(data.plan9);
        data.plan10= integer(data.plan10);
        data.plan11= integer(data.plan11);
        data.plan12= integer(data.plan12);


        $("#plan_year").prop("disabled", true).trigger("change");
        modal_edits('.modal_value', main_data.readonly, data);
        $("#addDialog").dialog('open');
    });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/crmPlanDelete", {keyword: ids.join(gu5)}).then(function (data) {
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

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmPlan"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_years_make('#datepicker',-5);
    datepicker_years_make('#datepicker2',5);
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['계획년도', '계획금액', '실적금액', '비고', '등록자', '등록일시'],
        colModel: [
            {
                name: 'plan_year',
                index: 'plan_year',
                key: true,
                sortable: false,
                width: 150,
                fixed: true,
                formatter: formatterYear
            },
            {name: 'plan_total', index: 'plan_total', sortable: false, width: 150, fixed: true, align: 'right', formatter:'integer'},
            {name: 'work_total', index: 'work_total', sortable: false, width: 150, fixed: true, align: 'right', formatter:'integer'},
            {name: 'remark', index: 'remark', sortable: false, width: 150, fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150, fixed: true},
            {
                name: 'update_date',
                index: 'update_date',
                sortable: false,
                width: 150,
                fixed: true,
                formatter: formmatterDate
            }
        ],
        caption: '계획관리 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        multiselect: true,
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $(this).jqGrid('getRowData', rowid);
            // var data = $('#mes_grid').jqGrid('getRowData', rowid);

            $('#plan_year').datepicker('destroy');


           update_btn(data.plan_year.replace('년', ''));


        },
        loadComplete: function () {
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height", "1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height", "0px");
        }
    });
}

function modal_text_reset_lee(class_name) {
    $(class_name).each(function (i) {
        $(class_name).val("");
    });
}
function integer(String) {
   return String.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}