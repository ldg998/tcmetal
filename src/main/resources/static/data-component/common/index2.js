$(document).ready(function () {
    //

    var today = new Date();

    var year = today.getFullYear(); // 년도
    var month = today.getMonth() + 1;  // 월
    var date = today.getDate();  // 날짜
    var day = today.getDay();  // 요일
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes();  // 분


    $(".day_dong").html(year + "년 " + month + "월 " + date + "일 " +" "+hours+"시 " + minutes +"분");
    jqGrid_main();
    jqGridResize("#mes_grid",  $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    jqGridResize("#mes_grid3", $('#mes_grid3').closest('[class*="col-"]'));
    jqGridResize("#mes_grid4", $('#mes_grid4').closest('[class*="col-"]'));
    jqgridPagerIcons();
    getList();
    setTimeout(function(){  location.reload();},60000);
});

function getList(){
    $("#mes_grid").setGridParam({
        url: "/monitoringGet",
        datatype: "json",
        page: 0
    }).trigger("reloadGrid");

    $("#mes_grid2").setGridParam({
        url: "/prodReport1Get",
        datatype: "json",
        page: 0
    }).trigger("reloadGrid");

    $("#mes_grid3").setGridParam({
        url: "/prodMiddleListGet",
        datatype: "json",
        page: 0
    }).trigger("reloadGrid");

    $("#mes_grid4").setGridParam({
        url: "/prodLeadTimeGet",
        datatype: "json",
        page: 0
    }).trigger("reloadGrid");
}



function jqGrid_main() {
    var height = 370;


    $("#mes_grid").jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "생산모니터링 | MES",
        colNames: ['공정','업체','기종','품명','품번','LOT','등록자'],
        colModel: [
            {name: 'line_name', index: 'line_name', sortable: false, width: 60,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 120,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},
            {name: 'lot_no', index: 'lot', sortable: false, width: 60,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60,fixed:true}
        ],
        autowidth: true,
        viewrecords: true,
        height: height,
        rowNum: 10000,
        rowList: [10000],


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

    $("#mes_grid2").jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "용해 주입일보현황 | MES",
        colNames: ['생산지시일자','CHARGE','업체','기종','품번','품명','단중','수량','등록자'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2},
            {name: 'charge', index: 'charge', sortable: false, width: 60,fixed:true ,align: 'right'},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 120,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 170,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},

        ],
        autowidth: true,
        viewrecords: true,
        height: height,
        rowNum: 10000,
        rowList: [10000],


        onCellSelect: function (rowid, icol, cellcontent, e) {
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
        },
        loadComplete: function () {
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    });

    $("#mes_grid3").jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "중간검사현황 | MES",
        colNames: ['업체','기종','품번','품명','단중','제품LOT','검사결과','등록자'],
        colModel: [
            {name: 'supp_name', index: 'supp_name', sortable:false, width: 130, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable:false, width: 100, fixed:true},
            {name: 'part_code', index: 'part_code', sortable:false, width: 130, fixed:true},
            {name: 'part_name', index: 'part_name', sortable:false, width: 190, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable:false, width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'lot_no', index: 'lot_no', sortable:false, width: 130, fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable:false, width: 60, fixed:true},
            {name: 'user_name', index: 'user_name', sortable:false, width: 60, fixed:true},


        ],
        autowidth: true,
        viewrecords: true,
        height: height,
        rowNum: 10000,
        rowList: [10000],


        onCellSelect: function (rowid, icol, cellcontent, e) {
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
        },
        loadComplete: function () {
            if ($("#mes_grid3").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    });

    $("#mes_grid4").jqGrid({
        mtype: "POST",
        datatype: "local",
        caption: "리드타임 생산실적 | MES",
        colNames: ['공정','업체','기종','품번','품명','단중','LOT','리드타임'],
        colModel: [
            {name: 'line_name', index: 'line_name', sortable: false,fixed:true ,width:80},
            {name: 'supp_name', index: 'supp_name', sortable: false, fixed:true,width:130},
            {name: 'part_kind', index: 'part_kind', sortable: false, fixed:true,width:80},
            {name: 'part_code', index: 'plan_code', sortable: false, fixed:true,width:130},
            {name: 'part_name', index: 'part_name', sortable: false, fixed:true,width:160},
            {name: 'part_weight', index: 'part_weight', sortable: false, fixed:true,align: 'right', formatter: 'integer',width:70},
            {name: 'lot_no', index: 'lot_no', sortable: false, fixed:true,width:60},
            {name: 'read_time', index: 'read_time', sortable: false,fixed:true,align: 'right', formatter: 'integer',width:70}


        ],
        viewrecords: true,
        autowidth: true,
        height: height,
        rowNum: 10000,
        rowList: [10000],


        onCellSelect: function (rowid, icol, cellcontent, e) {
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
        },
        loadComplete: function () {
            if ($("#mes_grid4").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    });


}