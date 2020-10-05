/**
 * various.js 와 연동
 */
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawBasic);
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth: {},
    check:"Y"
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    datepickerInput();
    authcheck();
    header_make();
    selectBox();
    // jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    // disabled_tf(["input[name=out_date]","input[name=ship_date]","input[name=supp_name]"],"Y");
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {

    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/crmShippingGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

    drawChart();
}

function modal2_btn() {
    $("#addDialog2").dialog('open');
    jqGridResize2("#mes_modal2_grid1", $('#mes_modal2_grid1').closest('[class*="col-"]'));
}




function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"crmShipping",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2":main_data.send_data.keyword ,
                "row3":main_data.send_data.keyword2
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

function add_btn() {
    if (main_data.auth.check_add !="N") { //권한체크
        if (main_data.auth.check_add !="N") {
            modal_reset(".modal_value",[]); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
            main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
            $("input[name=ship_date]").val("");
            $("input[name=out_date]").val("");
            disabled_tf(["input[name=out_no]"],"N");
            $("#addDialog").dialog('open'); // 모달 열기
        } else {
            alert(msg_object.TBMES_A001.msg_name1);
        }
    }
}


// 삭제 버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/crmShippingDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger('reloadGrid');
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



////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
    msgGet_auth("TBMES_A001"); // 추가권한 없음
    msgGet_auth("TBMES_A002"); // 삭제권한 없음
    msgGet_auth("TBMES_A003"); // 수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmShipping"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['선적일자', '전표번호', '업체','운송수단', '해상운임','터미널 핸들링비용','환경','쇼링비','부두이용료','서류발급비','하역료','보험료','항만시설보안료','국내운송비','관세대행수수료','목재비1','목재비2','목재비3','순중량','운송단가','선적일자','등록자','등록일시'],
        colModel: [
            {name:'out_date', index: 'out_date', width: 90, fixed:true,formatter:formmatterDate2},
            {name:'out_no', index: 'out_no',  width: 120,key:true, fixed:true},
            {name:'supp_name', index: 'supp_name',  width: 130, fixed:true},
            {name:'trans_name', index: 'trans_name',  width: 100, fixed:true},
            {name:'ship_cost', index: 'ship_cost',  width: 110, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost1', index: 'port_cost1',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost2', index: 'port_cost2',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost3', index: 'port_cost3',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost4', index: 'port_cost4',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost5', index: 'port_cost5',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'unloading_cost', index: 'unloading_cost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'landing_ost', index: 'landing_ost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'harbor_facility', index: 'harbor_facility', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'local_cost', index: 'local_cost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'customs_fee', index: 'customs_fee',  width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost1', index: 'wood_cost1', width: 110, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost2', index: 'wood_cost2', width: 110, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost3', index: 'wood_cost3', width: 110, fixed:true, align: 'right',formatter:'integer'},
            {name:'weight', index: 'weight', width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'unit_cost', index: 'unit_cost', width: 90, fixed:true, align: 'right',formatter:'integer'},
            {name:'ship_date', index: 'ship_date', width: 90, fixed:true,formatter:formmatterDate2},
            {name:'user_name', index: 'user_name', width: 60, fixed:true},
            {name:'update_date', index: 'update_date',  width: 140, fixed:true,formatter:formmatterDate},

        ],

        caption: '운송비용현황 | MES',
        autowidth: true,
        height: 232,
        pager: '#mes_grid_pager',
        rowNum: 100,
        overflow:'visible',
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            // var $myGrid = $(this),
            //     i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
            //     cm = $myGrid.jqGrid('getGridParam', 'colModel');
            // return (cm[i].name === 'cb');
        },

        });


}
function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'port_cost1', numberOfColumns: 5, titleText: '<center>항구비용</center>'}

            ]
    })
}
function selectBox() {
    select_makes_base("#main_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
    });

    select_makes_base("#main_select2", "/sysCommonAllGet","code_value","code_name1",{keyword:'TRANS_TYPE'},"Y");
}

function drawChart() {
    ccn_ajax('/crmShippingListGet', main_data.send_data).then(function (data2) {
        var dataSet =  [ ['yearMonth', '']];
        if (data2.length> 0) {
            list = [];
            var date;
            var bad;
            data2.forEach(function (d) {

                // date = formatterDate4(d.work_date);
                date = d.out_no;
                bad = parseInt(d.unit_cost);
                dataSet.push([date,bad]);
            })

            var data = google.visualization.arrayToDataTable(dataSet);
            var options = {
                title: '운송비용 그래프',
                hAxis: {
                    title: '전표번호'
                },
                vAxis: {
                    title: ''
                    ,ticks:[0,1000,2000,3000,4000,5000]
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
    data.addColumn('number', '');
    data.addRows([
    ]);

    var options = {
        title: '운송비용 그래프',
        hAxis: {
            title: '전표번호',
            textPosition : 'none'
        },
        vAxis: {
            title: ''
            ,ticks:[0,1000,2000,3000,4000,5000]
        },

    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    window.addEventListener('resize', function() {   chart.draw(data, options); }, false);
}