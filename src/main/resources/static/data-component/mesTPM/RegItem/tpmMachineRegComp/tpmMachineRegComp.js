/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: ['work_date','line_name','machine_name','qc_name'],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

    $(document).ready(function () {
        msg_get();
        selectBox();
        jqGrid_main();
        jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
        datepickerInput();
        modal_start1();
        jqgridPagerIcons();

});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/tpmMachineRegCompGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/tpmMachineRegCompGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    main_data.check = 'I';
    $("#addDialog").dialog('open');
    jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
}

function select_change1(value) {
    if (value !== '' && value !== null ){
        select_makes_sub("#machine_select","/tpmMachineAllGet","machine_code","machine_name",{keyword:value},"Y");
    } else {
        $('#machine_select').empty();

        var option = $("<option></option>").text('전체').val('');

        $('#machine_select').append(option);

        $('#machine_select').select2();
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.line_code;
        send_data.keyword2 = jqgrid_data.machine_code;
        send_data.keyword3 = jqgrid_data.work_date.replace(/\-/g, '');
        send_data.keyword4 = jqgrid_data.qc_code;

        ccn_ajax('/tpmMachineRegCompOneGet', send_data).then(function (data) {
            data.work_date = formmatterDate2(data.work_date);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력

            $("#addDialog").dialog('open');
        });
        if($('#check_yn').val() === 'N'){
            $('#result_select').prop("disabled", true).trigger("change");
            $('#measure_name').prop("readonly", true).trigger("change");
        }

    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수//////////////////////////////////
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "tpmMachineRegComp"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    part_type_select_ajax_all("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''}).then(function (data){
        $('#machine_select').empty();

        var option = $("<option></option>").text('전체').val('');

        $('#machine_select').append(option);

        $('#machine_select').select2();


    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['rownum','점검예정일', '라인','line_code', '설비','machine_code','점검항목','qc_code', '점검유무', '점검결과','조치사항','등록자','점검일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable:false,hidden:true,key:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 100, formatter:formmatterDate2,fixed:true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 80,fixed:true},
            {name: 'line_code', index: 'line_code', sortable: false, hidden:true},
            {name: 'machine_name', index: 'machine_name', sortable: false, width: 130,fixed:true},
            {name: 'machine_code', index: 'machine_code', sortable: false,hidden:true},
            {name: 'qc_name', index: 'qc_name', sortable: false, width: 130,fixed:true},
            {name: 'qc_code', index: 'qc_code', sortable: false, hidden:true},
            {name: 'check_yn', index: 'check_yn', sortable: false, width: 50,fixed:true},
            {name: 'code_name1', index: 'check_code', sortable: false, width: 130,fixed:true},
            {name: 'measure_name', index: 'measure_name', sortable: false, width: 130,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},
            {name: 'check_date', index: 'check_date', width: 140, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "예방점검관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지

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
