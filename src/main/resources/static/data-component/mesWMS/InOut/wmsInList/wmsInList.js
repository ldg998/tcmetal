/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth:{}
};



////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    authcheck();
    datepickerInput();

    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');

    $("#mes_grid").setGridParam({
        url: '/wmsInListGet',
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
            data: {
                "name":"wmsInList",   // 현재 엑셀로 만들어줄 페이지 이름
                "row0":$('#datepicker').val().replace(/-/gi,""),  // 넘겨줄 파라미터 순서대로
                "row1": $('#datepicker2').val().replace(/-/gi,""), //

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

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsInList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['입고일자', '입고번호', '업체', '현장', '제품구분', '제품명','계획명', '생산계획번호', '등록자', '입고일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed:true, formatter: formmatterDate2},
            {name: 'in_no', index: 'in_no', sortable: false, width: 150,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed:true},
            {name: 'place_name', index: 'place_name', sortable: false, width: 150,fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150,fixed:true},
            {name: 'prod_name', index: 'prod_name', sortable: false, width: 150,fixed:true},
            {name: 'plan_name', index: 'plan_name', sortable: false, width: 150,fixed:true},
            {name: 'plan_no', index: 'plan_no', sortable: false, width: 150,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150,fixed:true,formatter: formmatterDate}
        ],
        caption: "입고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}
