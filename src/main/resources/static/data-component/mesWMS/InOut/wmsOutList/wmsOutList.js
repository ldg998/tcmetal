/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth: {}

};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/wmsOutListGet',
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
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"wmsOutList",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,"")
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
    msgGet_auth("TBMES_Q014");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);

}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutList"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['출고일자', '출고번호', '현장','제품구분', '제품명', '계획명', '생산계획번호', '수주번호','등록자','출고일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150, fixed:true, formatter:formmatterDate2},
            {name: 'out_no', index: 'out_no', sortable: false, width: 150, fixed:true},
            {name: 'place_name', index: 'place_name', sortable: false, width: 150, fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150, fixed:true},
            {name: 'prod_name', index: 'prod_name', sortable: false, width: 150, fixed:true},
            {name: 'plan_name', index: 'plan_name', sortable: false, width: 150, fixed:true},
            {name: 'plan_no', index: 'plan_no', sortable: false, width: 150, fixed:true},
            {name: 'ord_no', index: 'ord_no', sortable: false, width: 150, fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150, fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150, fixed:true, formatter:formmatterDate}
        ],
        caption: '제품출고 현황 | MES',
        autowidth: true,
        height: 562,
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
    });
}
