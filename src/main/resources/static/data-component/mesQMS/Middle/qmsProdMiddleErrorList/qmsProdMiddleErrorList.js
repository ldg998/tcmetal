google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawBasic);


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
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    selectBox();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword3= '3'

    $("#mes_grid").setGridParam({
        url: "/qmsProdMiddleListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");


    $("#mes_grid2").setGridParam({
        url: "/qmsProdMiddleErrorListSumGet",
        datatype: "json",
        postData: main_data.send_data
    }).trigger("reloadGrid");


    google.setOnLoadCallback(drawChart);

}

function drawChart() {


    ccn_ajax('/qmsProdMiddleErrorListSumGet', main_data.send_data).then(function (data2) {

        var dataSet = [['yearMonth', '불량률']];

        if (data2.length > 0) {
            list = [];
            var date;
            var bad;
            data2.forEach(function (d) {
                date = formatterDate4(d.work_date);
                bad = parseInt(d.qc_ratio.replace("%"));
                dataSet.push([date, bad]);
            })

            var data = google.visualization.arrayToDataTable(dataSet);
            var options = {
                title: '불량률 그래프',
                hAxis: {
                    title: '기간'
                },
                vAxis: {
                    title: '중간검사\n불량현황'
                    , ticks: [0, 25, 50, 75, 100]
                },
                series: {
                    0: {lineWidth: 2, pointSize: 8, color: '4444FF', pointShape: 'circle'}
                }


            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
            window.addEventListener('resize', function () {
                chart.draw(data, options);
            }, false);

        } else {
            google.setOnLoadCallback(drawBasic);
        }
    });
}

function drawBasic() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '불량률');

    data.addRows([]);

    var options = {
        title: '불량률 그래프',
        hAxis: {
            title: '기간',
            textPosition: 'none'
        },
        vAxis: {
            title: '중간검사\n불량현황'
            , ticks: [0, 25, 50, 75, 100]
        },

    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
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
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2": main_data.send_data.keyword,
                "row3": main_data.send_data.keyword2,
                "row4": main_data.send_data.keyword3
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
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdMiddleErrorList"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "중간검사 불량현황 | MES",
        colNames: ['검사일자','검사번호','업체','기종','품번','품명','단중','제품LOT','검사결과','수정','폐기','조치구분','부적합보고서','검사자','검사일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable:false, width: 80, fixed:true,formatter: formmatterDate2},
            {name: 'qc_no', index: 'qc_no', sortable:false, width: 120, key: true, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable:false, width: 80, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable:false, width: 80, fixed:true},
            {name: 'part_code', index: 'part_code', sortable:false, width: 120, fixed:true},
            {name: 'part_name', index: 'part_name', sortable:false, width: 120, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable:false, width: 80, fixed:true,align:'right',formatter:'integer'},
            {name: 'lot_no', index: 'lot_no', sortable:false, width: 80, fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable:false, width: 60, fixed:true},
            {name: 'result2_name', index: 'result2_name', sortable:false, width: 60, fixed:true},
            {name: 'result3_name', index: 'result3_name', sortable:false, width: 200, fixed:true},
            {name: 'act_type_name', index: 'act_type_name', sortable:false, width: 60, fixed:true},
            {name: 'file2_yn', index: 'file2_yn', sortable:false, width: 100, fixed:true},
            {name: 'user_name', index: 'user_name', sortable:false, width: 60, fixed:true},
            {name: 'update_date', index: 'update_date', sortable:false, width: 140, fixed:true,formatter: formmatterDate}

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
        loadComplete: function () {
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }

    });

    $('#mes_grid2').jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "증간검사 불량현황 | MES",
        colNames: ['구분', '검사수량', '불량수량', '불량률(%)'],
        colModel: [
            {
                name: 'work_date',
                index: 'work_date',
                width: 150,
                sortable: false,
                formatter: formatterDate4,
                fixed: true
            },
            {
                name: 'qc_qty',
                index: 'qc_qty',
                width: 100,
                sortable: false,
                align: 'right',
                formatter: 'integer',
                fixed: true
            },
            {
                name: 'ng_qty',
                index: 'ng_qty',
                width: 100,
                sortable: false,
                align: 'right',
                formatter: 'integer',
                fixed: true
            },
            {name: 'qc_ratio', index: 'qc_ratio', width: 100, sortable: false, fixed: true}
        ],
        autowidth: true,
        height: 349,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        loadComplete: function () {
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    });
}

function selectBox() {
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}