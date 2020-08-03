/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    check2:"Y",
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{}
};


////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    suppOutAllGet();
    selectBox();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////
function test(){
    $('#addDialog').dialog('open');
    jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
}
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/wmsOutOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';
        modal_reset(".modal_value", main_data.readonly);
        datepicker_makes("#datepicker_modal", -30);
        datepicker_makes("#datepicker_modal2", 0);
        $('#mes_modal1_grid1').jqGrid('clearGridData');
        disabled_tf(["#modal1_select1"],"N");
        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }

}


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        modal_reset(".modal_value", []);
        datepicker_makes("#datepicker_modal", -30);
        datepicker_makes("#datepicker_modal2", 0);
        $('#mes_modal1_grid1').jqGrid('clearGridData');
        ccn_ajax('/wmsOutOrderOneGet', {keyword: jqgrid_data.req_no}).then(function (data) {
            disabled_tf(["#modal1_select1"],"Y");

            $("#modal1_select1").val(data[0].supp_code).trigger("change");
            $("#modal1_select2").val(data[0].delivery_place).trigger("change");

            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
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
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    keywords.push(data.line_code+gu4+data.machine_code);
                }//11|12|13|
                code_list=keywords.join(gu5);
                wrapWindowByMask2();
                ccn_ajax("/tpmMachineErrorDelete", {keyword:code_list}).then(function (data) {
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

// function excel_download() {
    // if (confirm(msg_object.TBMES_Q014.msg_name1)) {
    //     var $preparingFileModal = $("#preparing-file-modal");
    //     $preparingFileModal.dialog({modal: true});
    //     $("#progressbar").progressbar({value: false});
    //     $.fileDownload("/excel_download", {
    //         httpMethod: 'POST',
    //         data: {
    //             "name": "wmsStockIOSumMonth",
    //             "row0":$('#datepicker').val().replace(/-/gi,""),
    //             "row1":$('#datepicker2').val().replace(/-/gi,""),
    //             "row2":$('#line_select').val(),
    //             "row3":$('#machine_select').val(),
    //         },
    //         successCallback: function (url) {
    //             $preparingFileModal.dialog('close');
    //         },
    //         failCallback: function (responseHtml, url) {
    //             $preparingFileModal.dialog('close');
    //             $("#error-modal").dialog({modal: true});
    //         }
    //     });
    //     return false;
    // }
// }

////////////////////////////호출 함수/////////////////////////////////////

function suppOutAllGet() {
    ccn_ajax("/suppAllGet", {keyword:'Y',keyword2:'CORP_TYPE3'}).then(function (data) {
        main_data.supp_list = data;
        main_data.supp_list_string=[];
        data.forEach(function (d) {
            main_data.supp_list_string.push(d.supp_code+":"+d.supp_name);
        })
        modal_start1();



    }).catch(function (err) {
        console.error(err); // Error 출력
    });


}

//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
    msgGet_auth("TBMES_Q014");

}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes1("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutOrder"}).then(function (data) {
        main_data.auth = data;
    });
}



function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['rownum','출고일자', '출고지시번호','수주일자','업체','PO','기종','품번','품명','단중','수량','외주(열처리)','상태','등록자','등록일시'],
        colModel: [

            {name: 'rownum', index: 'rownum', sortable: false,hidden:true,key:true, width: 80,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 80, formatter: formmatterDate2,fixed:true},
            {name: 'req_no', index: 'req_no', sortable: false, width: 140,fixed:true},
            {name: 'ord_date', index: 'ord_date', sortable: false, width: 80,formatter: formmatterDate2,fixed:true  },
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 80,fixed:true},
            {name: '', index: '', sortable: false, width: 80,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 80,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 80,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 80,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 80,fixed:true, align: 'right',formatter:'integer'},
            {name: 'qty', index: 'qty', sortable: false, width: 80,fixed:true, align: 'right',formatter:'integer'},
            {name: 'outs_supp_name', index: 'outs_supp_name', sortable: false, width: 80,fixed:true},
            {name: 'status_name', index: 'status_name', sortable: false, width: 80,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 80,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 140,formatter: formmatterDate,fixed:true}

        ],
        multiselect: true,
        caption: '출고지시서 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
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

function selectBox() {
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
    });
}