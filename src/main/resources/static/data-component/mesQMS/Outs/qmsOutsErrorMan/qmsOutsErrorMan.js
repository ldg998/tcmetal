/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));

    datepickerInput();
    modal_start1();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword = '2';
    main_data.send_data.keyword2 = '';
    main_data.send_data.keyword3 = '4';
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: "/qmsProdListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/qmsProdListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        var qc_no = jqgrid_data.qc_no;
        modal_reset(".modal_value", []);
        $('#file_02').val('');
        $('#file_03').val('');
        $('.file_labal').text('업로드');

        main_data.check = 'U';

        ccn_ajax('/qmsProdListOneGet', {qc_no: qc_no}).then(function (data) {
            data.work_date = formmatterDate2(data.work_date);
            data.update_date = formmatterDate(data.update_date);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#act_type_modal").val(data.act_type).trigger("change");
            console.log(data);
        });
        $("#addDialog").dialog('open');

    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsOutsErrorMan",
                "row0":main_data.send_data.start_date,
                "row1":main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.keyword3
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsOutsErrorMan"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype:"POST",
        datatype: "local",
        colNames: ['rownum','검사일자', '검사번호', '지시번호', '현장', '계획명', '검사항목', '검사결과', '불량유형', '불량세부',
            '조치구분','부적합보고서','개선조치','검사자','검사일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable:false, width: 60, hidden:true, key: true,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 100, formatter: formmatterDate2,fixed:true},
            {name: 'qc_no', index: 'qc_no', sortable: false, width: 130,fixed:true},
            {name: 'plan_no', index: 'plan_no', sortable: false, width: 130,fixed:true},
            {name: 'place_name', index: 'place_name', sortable: false, width: 150,fixed:true},
            {name: 'plan_name', index: 'plan_name', sortable: false, width: 150,fixed:true},
            {name: 'qc_name', index: 'qc_name', sortable: false, width: 100,fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable: false, width: 100,fixed:true},
            {name: 'ng_type_name', index: 'ng_type_name', sortable: false, width: 100,fixed:true},
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 200,fixed:true},
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 100,fixed:true},
            {name: 'file2_name', index: 'file2_name', sortable: false, width: 80,fixed:true},
            {name: 'file3_name', index: 'file3_name', sortable: false, width: 80,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 100,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150, formatter: formmatterDate,fixed:true}
        ],
        caption: "외주검사부적합 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {

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
    });
}