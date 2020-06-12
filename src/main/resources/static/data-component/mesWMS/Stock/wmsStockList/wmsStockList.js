/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    auth:{}
};

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: '/wmsStockListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download",{
            httpMethod: 'POST',
            data : {
                "name":"wmsStock"
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

////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsStockList"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['수주일자', '수주번호', '업체명', '현장', '제품구분','제품명','계획명','생산계획번호','입고일자'],
        colModel: [
            {name: 'plan_date', index: 'plan_date', width: 150,sortable:false,fixed:true, formatter:formmatterDate2},
            {name: 'ord_no', index: 'ord_no', width: 150,sortable:false,fixed:true},
            {name: 'supp_name', index: 'supp_name', width: 150,sortable:false,fixed:true},
            {name: 'place_name', index: 'place_name', width: 150,sortable:false,fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', width: 150,sortable:false,fixed:true},
            {name: 'prod_name', index: 'prod_name', width: 150,sortable:false,fixed:true},
            {name: 'plan_name', index: 'plan_name', width: 150,sortable:false,fixed:true},
            {name: 'plan_no', index: 'plan_no', width: 150,sortable:false,fixed:true},
            {name: 'work_date', index: 'work_date', width: 150,sortable:false,fixed:true, formatter:formmatterDate2}
        ],
        caption: "재고현황 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

