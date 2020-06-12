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
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    selectBox();
    datepickerInput();
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    // main_data.send_data = value_return(".condition_main");
    // main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    // main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    // main_data.send_data.keyword = 'B'
    // $("#mes_grid").setGridParam({
    //     url: '/popProdList1Get',
    //     datatype: "json",
    //     page: page,
    //     postData: main_data.send_data
    // }).trigger("reloadGrid");
}

function excel_download() {
    // if (confirm(msg_object.TBMES_Q014.msg_name1)) {
    //     var $preparingFileModal = $("#preparing-file-modal");
    //     $preparingFileModal.dialog({modal: true});
    //     $("#progressbar").progressbar({value: false});
    //     $.fileDownload("/excel_download", {
    //         httpMethod: 'POST',
    //         data: {
    //             "name": "wmsStockIOSumMonth",
    //             "row0":$('#datepicker').val().replace(/-/gi,""),
    //             "row1":$('#part_type_select').val(),
    //             "row2":$('#part_group1_select').val(),
    //             "row3":$('#part_group2_select').val()
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
}
////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popMonitoring"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_sub("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'Y');
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['생산일자','공정','작업시간','비가동시간'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true}
        ],
        caption: "작업일보현황 | MES",
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "작업일보현황 | MES",
        colNames: ['비가동시작','비가동종료','비가동시간','비가동사유'],
        colModel: [
            {name: '', index: '', width: 150, sortable: false,fixed:true},
            {name: '', index: '', width: 150, sortable: false,fixed:true},
            {name: '', index: '', width: 150, sortable: false,fixed:true},
            {name: '', index: '', width: 150, sortable: false,fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}


