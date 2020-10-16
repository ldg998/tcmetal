/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['qc_code'],
    auth:{}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid',$('#mes_grid').closest('[class*="col-"]'));
    modal_start1();
    selectBox();
    authcheck();
    jqgridPagerIcons();

});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/qmsQcItemGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}



function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value",main_data.readonly);

     $('#select_modal1').val($('#check_select').val()).trigger("change");
        main_data.check = 'I';
        $("#addDialog").dialog('open');
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.qc_code = jqgrid_data.qc_code;
        ccn_ajax('/qmsQcItemOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                var gu5 = String.fromCharCode(5);
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/qmsQcItemDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                            $('#mes_grid').trigger("reloadGrid");
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
    $('#check_select').select2();
    $('#code_select').select2();
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsTestItem"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['검사구분','코드그룹','검사코드','검사명','사용유무','등록자','등록일시'],
        colModel: [
            {name: 'qc_group_name', index: 'qc_group_name', width: 70, sortable:false,fixed:true},
            {name: 'qc_type_name', index: 'qc_type_name', width: 110, sortable:false,fixed:true},
            {name: 'qc_code', index: 'qc_code',key:true, width: 130, sortable:false,fixed:true},
            {name: 'qc_name', index: 'qc_name', width: 150, sortable:false,fixed:true},
            {name: 'use_yn', index: 'use_yn', width: 70, sortable:false,fixed:true},
            {name: 'user_name', index: 'user_name', width: 130, sortable:false,fixed:true},
            {name: 'create_date', index: 'create_date', width: 140, sortable:false,fixed:true,formatter: formmatterDate}
        ],
        caption: "검사항목관리 | MES",
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
    });
}

function select_change(value){
   if(value == 1){
       $('#code_select').empty();
       var option = $("<option></option>").text('불량유형').val(1);
       $('#code_select').append(option);
       $('#code_select').select2();
   }else if(value ==2){
       $('#code_select').empty();
       var option = $("<option></option>").text('검사항목').val(1);
       var option2 = $("<option></option>").text('폐기사유').val(2);
       $('#code_select').append(option);
       $('#code_select').append(option2);
       $('#code_select').select2();
   }else if(value ==3){
       $('#code_select').empty();
       var option = $("<option></option>").text('검사항목').val(1);
       $('#code_select').append(option);
       $('#code_select').select2();
   }else if(value ==4){
       $('#code_select').empty();
       var option = $("<option></option>").text('부적합 분류').val(1);
       $('#code_select').append(option);
       $('#code_select').select2();
   }else if(value ==5){
       $('#code_select').empty();
       var option = $("<option></option>").text('수정').val(1);
       var option2 = $("<option></option>").text('패기').val(2);

       $('#code_select').append(option);
       $('#code_select').append(option2);
       $('#code_select').select2();
   }else {
       $('#code_select').empty();
       var option = $("<option></option>").text('선택없음').val('');
       $('#code_select').append(option);
       $('#code_select').select2();
   }



}