// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawBasic);


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
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    modal_start1();
    header_make();
});

////////////////////////////클릭 함수/////////////////////////////////////
function test() {

    $("#addDialog").dialog('open'); // 모달 열기
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword = '2';
    main_data.send_data.keyword2 = '';
    main_data.send_data.keyword3 = '3';
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: "/",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

    google.setOnLoadCallback(drawChart);

}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsProdErrorList",
                "row0":main_data.send_data.start_date,
                "row1":main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.keyword3
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
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdErrorList"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $('#1_select').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "공정라우팅 | MES",
        colNames: ['업체','기종','품번','품명','단중','위치','작업자','위치','작업자','위치','작업자','위치','작업자'],
        colModel: [
            {name: '', index: '', sortable:false, width: 60,  key: true,fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '1', index: '1', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '2', index: '2', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '3', index: '3', sortable:false, width: 100, fixed:true},
            {name: '', index:'', sortable:false, width: 100, fixed:true},
            {name: '4', index:'4', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true}

        ],
        autowidth: true,
        viewrecords: true,
        height: 321,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',

        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창

        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}

function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: '1', numberOfColumns: 2, titleText: '<center>중자</center>'},
            {startColumnName: '2', numberOfColumns: 2, titleText: '<center>발형</center>'},
            {startColumnName: '3', numberOfColumns: 2, titleText: '<center>도형</center>'},
            {startColumnName: '4', numberOfColumns: 2, titleText: '<center>합형</center>'}

        ]
    })
}