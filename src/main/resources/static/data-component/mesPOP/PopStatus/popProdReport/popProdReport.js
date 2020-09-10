/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{},
    excel_check:'N'
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    authcheck();
    msg_get();
    selectBox();
    datepickerInput();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();

});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    $("#mes_grid2").jqGrid('clearGridData');
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/popProdReportGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0) {
            alert(msg_object.TBMES_E060.msg_name1);
        } else {
            if (main_data.excel_check === "Y") {
                var $preparingFileModal = $("#preparing-file-modal");
                $preparingFileModal.dialog({modal: true});
                $("#progressbar").progressbar({value: false});
                $.fileDownload("/excel_download", {
                    httpMethod: 'POST',
                    data: {
                        "name": "popProdReport",
                        "row0": $('#datepicker').val().replace(/-/gi, ""),
                        "row1": $('#datepicker2').val().replace(/-/gi, ""),
                        "row2": $('#line_select').val(),
                    },
                    successCallback: function (url) {
                        $preparingFileModal.dialog('close');
                    },
                    failCallback: function (responseHtml, url) {
                        $preparingFileModal.dialog('close');
                        $("#error-modal").dialog({modal: true});
                    }
                });
            } else {
                alert(msg_object.TBMES_E061.msg_name1);
            }
        }
        return false;
    }
}

function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function under_get(data) {
    $("#mes_grid2").setGridParam({
        url: '/popDownTimeGet',
        datatype: "json",
        page: 1,
        postData: {keyword:data.work_date.replace(/-/gi, ""),keyword2:data.line_code}
    }).trigger("reloadGrid");
}


function main_select_change1(value) {
    if (value !== ""){
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (d){});


    }
}




////////////////////////////호출 함수//////////////////////////////////
function excel_change() {
    main_data.excel_check ="N";
}

function msg_get() {
    msgGet_auth("TBMES_Q014"); //엑셀 시행메세지
    msgGet_auth("TBMES_E060");
    msgGet_auth("TBMES_E061");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdReport"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_base("#main_select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'3'},'').then(function (data) {
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'').then(function (data2) {

        });
    });

}
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['row_num','line_code','생산일자','공정','생산량','비가동시간'],
        colModel: [
            {name: 'rownum', index: 'rownum',key:true, sortable: false,hidden:true, width: 150,fixed:true},
            {name: 'line_code', index: 'line_code', sortable: false,hidden:true, width: 150,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed:true,formatter: formmatterDate2},
            {name: 'line_name', index: 'line_name', sortable: false, width: 150,fixed:true},
            {name: 'work_qty', index: 'work_qty', sortable: false, width: 150,fixed:true,align:'right'},
            {name: 'downtime', index: 'downtime', sortable: false, width: 150,fixed:true,align:'right'}
        ],
        caption: "작업일보현황 | MES",
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        onCellSelect: function (rowid, icol, cellcontent, e) { //클릭시 이벤트 아래그리드 get
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            under_get(data);
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "작업일보현황 | MES",
        colNames: ['비가동시작','비가동종료','비가동시간','비가동사유'],
        colModel: [
            {name: 'start_date', index: 'start_date', width: 150, sortable: false,fixed:true},
            {name: 'stop_date', index: 'stop_date', width: 150, sortable: false,fixed:true},
            {name: 'downtime', index: 'downtime', width: 150, sortable: false,fixed:true},
            {name: 'downtime_name', index: 'downtime_name', width: 150, sortable: false,fixed:true}
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

    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정;

}


