/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    modal_start1();
    datepickerInput();
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    //get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    main_data.send_data.keyword2 = '2';

    $("#mes_grid").setGridParam({
        url: "/qmsRecvListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/qmsRecvListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function supp_btn(what) {
    main_data.supp_check = what;

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
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {

        var in_no = jqgrid_data.in_no;
        modal_reset(".modal_value", []);
        $('#file_01').val('');
        $('#file_02').val('');
        $('#file_03').val('');
        $('.file_labal').text('업로드');
        //
        main_data.check = 'U';
        // var send_data = {};
        // send_data.supp_code = jqgrid_data.supp_code;
        // send_data.in_no = jqgrid_data.in_no;
        // send_data.part_code = jqgrid_data.part_code;
        //
        ccn_ajax('/qmsRecvListOneGet', {in_no: in_no}).then(function (data) {
            data.work_date = formmatterDate2(data.work_date);
            data.update_date = formmatterDate(data.update_date);
            // data.work_date = data.work_date.substring(0,4)+'-'+data.work_date.substring(4,6)+'-'+data.work_date.substring(6);
            // data.update_date = data.update_date.substring(0,4)+'-'+data.update_date.substring(4,6)+'-'+data.update_date.substring(6,8)+' '+data.update_date.substring(8,10)+':'+data.update_date.substring(10,12)+':'+data.update_date.substring(12);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#act_type_modal").val(data.act_type).trigger("change");

        });
        $("#addDialog").dialog('open');
    } else {
        // alert("수정권한이 없습니다.");
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
                "name": "qmsRecvErrorMan",
                "row0": $('#datepicker').val().replace(/-/gi, ""),
                "row1": $('#datepicker2').val().replace(/-/gi, ""),
                "row2": $('#supp_code_main').val(),
                "row3": main_data.send_data.keyword2
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

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsRecvErrorMan"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype:"POST",
        datatype: "local",
        colNames: ['rownum','입고일자', '전표번호','업체', '품번', '품명', '규격', '단위','입고LOT','검사종류' ,
            '검사결과', '입고수량', '검사수량','불량수량', '불량유형','불량내용','조치구분','성적서','부적합보고서','개선조치','검사자','검사일시'],
        colModel: [
            {name:'rownum',index:'rownum',sortable:false,hidden:true,key:true,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 100,fixed:true,formatter: formmatterDate2},
            {name: 'in_no', index: 'in_no', sortable: false, width: 130,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 100,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 150,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 150,fixed:true},
            {name: 'lot', index: 'lot', sortable: false, width: 150,fixed:true},
            {name: 'qc_level_name', index: 'qc_level_name', sortable: false, width: 100,fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable: false, width: 100,fixed:true},
            {name: 'qty', index: 'qty', sortable: false, width: 150,fixed:true,align: 'right',formatter:'integer'},
            {name: 'qc_qty', index: 'qc_qty', sortable: false, width: 150,fixed:true,align: 'right',formatter:'integer'},
            {name: 'ng_qty', index: 'ng_qty', sortable: false, width: 150,fixed:true,align: 'right',formatter:'integer'},
            {name: 'ng_type_name', index: 'ng_type_name', sortable: false, width: 150,fixed:true},
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 200,fixed:true},
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 100,fixed:true},
            {name: 'file1_name', index: 'file1_name', sortable: false, width: 80,fixed:true},
            {name: 'file2_name', index: 'file2_name', sortable: false, width: 80,fixed:true},
            {name: 'file3_name', index: 'file3_name', sortable: false, width: 80,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 100,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150,fixed:true,formatter: formmatterDate}

        ],
        caption: "수입검사부적합 | MES",
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
