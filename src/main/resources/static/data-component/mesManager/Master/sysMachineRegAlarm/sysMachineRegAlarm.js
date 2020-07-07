/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth: {}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    authcheck();
    modal_start1();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/tpmMachineRegAlarmGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/tpmMachineRegAlarmGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';
        $('#mes_modal1_grid1').jqGrid("clearGridData");
        $('#mes_modal1_grid2').jqGrid("clearGridData");
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2",[]);
        $('#line_select2').val($('#line_select').val()).prop("selected",true).trigger("change");
        $('#line_select2').prop("disabled", false);
        $('#machine_select2').prop("disabled", false);
        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
        jqGridResize2("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
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
        main_data.check = 'U';
        modal_reset(".modal_value", []);
        modal_reset(".modal_value2", []);
        var send_data = {};
        send_data.line_code = jqgrid_data.line_code;
        send_data.machine_code = jqgrid_data.machine_code;

        ccn_ajax('/tpmMachineRegAlarmAllGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data[0]); // response 값 출력

            var line_code = '';
            if(data[0].line_code != 'AAAAA'){
                line_code = data[0].line_code;
                $('#line_select2').val(data[0].line_code).prop("selected",true).trigger("change");
            } else {
                $('#line_select2').val('').prop("selected",true).trigger("change");
            }


            $('#machine_select2').empty();
            select_makes_sub_ajax2("#machine_select2", "/tpmMachineAllGet", "machine_code", "machine_name", {keyword:line_code}, "Y").then(function (data2) {

                if(data[0].machine_code != 'AAAAA'){
                    $('#machine_select2').val(data[0].machine_code).trigger("change");
                } else {
                    $('#machine_select2').val('').trigger("change");
                }
            });

            $('#line_select2').prop("disabled", true);
            $('#machine_select2').prop("disabled", true);
            $('#mes_modal1_grid1').jqGrid("clearGridData");
            $('#mes_modal1_grid2').jqGrid("clearGridData");

            var value = [];
            data.forEach(function (d) {
                value.push({user_code:d.alarm_user_code,user_name:d.alarm_user_name});
            });
            return value;

        }).then(function (value) {
            $("#mes_modal1_grid2").setGridParam({
                datatype: "local",
                data: value
            }).trigger("reloadGrid");

            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
            jqGridResize2("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords = [];

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    keywords.push(data.line_code+gu4+data.machine_code+gu4+data.alarm_user_code);
                }

                wrapWindowByMask2();
                ccn_ajax("/tpmMachineRegAlarmDel", {keyword:keywords.join(gu5)}).then(function (data) {
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
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "tpmMachineRegAlarm"}).then(function (data) {
        main_data.auth = data;
    });
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
        colNames: ['rownum','라인명','line_code','설비명','machine_code','알림수신자','alaram_user_code','사전알림(일)','등록자','등록일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false,key:true,hidden:true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 130,fixed:true},
            {name: 'line_code', index: 'line_code', sortable: false,hidden:true},
            {name: 'machine_name', index: 'machine_name', sortable: false, width: 130,fixed:true},
            {name: 'machine_code', index: 'machine_code', sortable: false,hidden:true},
            {name: 'alarm_user_name', index: 'alarm_user_name', sortable: false, width: 80,fixed:true},
            {name: 'alarm_user_code', index: 'alarm_user_code', sortable: false,hidden:true},
            {name: 'alarm_day', index: 'alarm_day', sortable: false, width: 80, align: 'right', formatter: 'integer',fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},
            {name: 'create_date', index: 'create_date', width: 140, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "예방점검알림설정 | MES",
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
