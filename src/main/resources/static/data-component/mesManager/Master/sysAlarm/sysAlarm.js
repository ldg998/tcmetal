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
    main_data.send_data.keyword2=''
    $("#mes_grid").setGridParam({
        url: '/sysAlarmGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}



function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';
       modal_reset("modal_value",[])
        $('#mes_modal1_grid1').jqGrid('clearGridData');
        $('#mes_modal1_grid2').jqGrid('clearGridData');

        var select_value = $('#select1').val()

        $('#select_modal2').val(select_value);
        $('#select_modal2').prop("selected",select_value).trigger("change")


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
        $('#select_modal2').val(jqgrid_data.alarm_code);
        $('#select_modal2').prop("selected",jqgrid_data.alarm_code).trigger("change")
        var data = {keyword:jqgrid_data.alarm_code,keyword2:''}
        $("#mes_modal1_grid2").setGridParam({
            url: '/sysAlarmGet',
            datatype: "json",
            postData: data
        }).trigger("reloadGrid");

        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
        jqGridResize2("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));

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
                for(var i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    keywords.push(data.alarm_code +gu4+ data.alarm_user_code);
                }
                console.log(keywords.join(gu5));
               wrapWindowByMask2();

                ccn_ajax("/sysAlarmDel", {keyword:keywords.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn(1);
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
    ccn_ajax("/menuAuthGet", {keyword: "sysAlarm"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    select_makes_base("#select1", "/sysCommonAllGet","code_value","code_name1",{keyword:'ALARM_CD'},'');


}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['','','','구분','알림수신자','등록자','등록일시'],
        colModel: [
            {name: 'alarm_code', index: 'alarm_code', sortable: false,fixed:true,hidden:true },
            {name: 'alarm_user_code', index: 'alarm_user_code', sortable: false,fixed:true,hidden:true },
            {name: 'rownum', index: 'rownum', sortable: false,fixed:true,hidden:true ,key:true},
            {name: 'code_name1', index: 'code_name1', sortable: false, width: 130,fixed:true},
            {name: 'alarm_user_name', index: 'alarm_user_name', sortable: false, width: 80,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 140,  formatter: formmatterDate,fixed:true}
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
        ondblClickRow: function (rowid, iRow, iCol, e) {
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
