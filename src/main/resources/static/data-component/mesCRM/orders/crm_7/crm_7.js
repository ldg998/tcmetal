google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawBasic);


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
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();
    selectBox();
    authcheck();
    jqgridPagerIcons();
    header_make();
});

////////////////////////////클릭 함수/////////////////////////////////////
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

function drawChart() {

    ccn_ajax('/qmsProdErrorListSumGet', main_data.send_data).then(function (data2) {

        var dataSet =  [ ['yearMonth', '운송비용 현황']];

        if (data2.length> 0) {
            list = [];
            var date;
            var bad;
            data2.forEach(function (d) {
                date = formatterDate4(d.work_date);
                bad = parseInt(d.qc_ratio.replace("%"));
                dataSet.push([date,bad]);
            })

            var data = google.visualization.arrayToDataTable(dataSet);
            var options = {
                title: '운송비용현황 그래프',
                hAxis: {
                    title: '기간'
                },
                vAxis: {
                    title: '운송비용\n현황'
                    ,ticks:[0,25,50,75,100]
                },
                series:{
                    0:{lineWidth:2,pointSize:8,color:'4444FF',pointShape:'circle'}
                }


            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
            window.addEventListener('resize', function() {   chart.draw(data, options); }, false);

        } else {
            google.setOnLoadCallback(drawBasic);
        }
    });
}


function drawBasic() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '운송비용 현황');
    data.addRows([
    ]);

    var options = {
        title: '운송비용현황 그래프',
        hAxis: {
            title: '기간',
            textPosition : 'none'
        },
        vAxis: {
            title: '운송비용\n현황'
            ,ticks:[0,25,50,75,100]
        },

    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
    window.addEventListener('resize', function() {   chart.draw(data, options); }, false);
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
        caption: "운송비용 현황 | MES",
        colNames: ['선적일자','전표번호', '업체', '운송수단', '해상운임', '터미널 핸들링비용', '환경', '쇼링비', '부두이용료', '서류발급비',
            '하역료','보험료','항만시설보안료','국내운송비','관세대행수수료','목재비','순중량','운송단가','등록자','등록일시'],
        colModel: [
            {name: '', index: '', sortable:false, width: 60,  key: true,fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '6', index: '6', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 100, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
            {name: '', index: '', sortable:false, width: 60, fixed:true},
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
            {startColumnName: '6', numberOfColumns: 5, titleText: '<center>항구비용</center>'}

        ]
    })
}