/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth: {}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    select_box();
    msg_get();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");


    $("#mes_grid").setGridParam({
        url: '/popProdRangeGet',
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
                "name":"popProdRangeList",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.stop_date,
                "row2":main_data.send_data.supp_code,
                "row3":main_data.send_data.part_kind,
                "row4":main_data.send_data.keyword,
                "row5":main_data.send_data.keyword2,


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


function select_change_modal1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");

    } else {

        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();

    }
}


function main_select_change1(value) {
    select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (data2) {
    });
}

////////////////////////////호출 함수//////////////////////////////////
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdRange"}).then(function (data) {
        main_data.auth = data;
    });
}
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


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','공정','업체','기종','품번','품명','단중','생산수량','중량'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false, hidden:true, fixed:true ,key:true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 70,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 130,fixed:true},
            {name: 'part_code', index: 'plan_code', sortable: false, width: 120,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer'/*, summaryType:'sum',formatoptions:{decimalPlaces:0}*/},
            {name: 'qty', index: 'qty', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer'/*,summaryType:'sum',formatoptions:{decimalPlaces:0}*/},
            {name: 'work_weight', index: 'work_weight', sortable: false, width: 100,fixed:true,align: 'right', formatter: 'integer'/*,summaryType:'sum',formatoptions:{decimalPlaces:0}*/}

        ],
        caption: "기간별 생산실적 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        // footerrow: true, // 풋터서머리 사용여부
        // userDataOnFooter : true, //
        grouping : true ,
        loadComplete : function(data){
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.line_name === '합계'){
                    $("#mes_grid").setRowData(idsfor.rownum, false, {background:"rgb(155, 185, 239)"}) ;
                }
            });

            //
            // var moneySum = $('#mes_grid').jqGrid('getCol','part_weight', false, 'sum');
            // $('#mes_grid').jqGrid('footerData', 'set', { crateName:'합계', part_weight:moneySum });
            //
            // var moneySum2 = $('#mes_grid').jqGrid('getCol','qty', false, 'sum');
            // $('#mes_grid').jqGrid('footerData', 'set', { crateName:'합계', qty:moneySum2 });
            //
            // var moneySum3 = $('#mes_grid').jqGrid('getCol','work_weight', false, 'sum');
            // $('#mes_grid').jqGrid('footerData', 'set', { crateName:'합계', work_weight:moneySum3 });
            //
            // $('#mes_grid').jqGrid('footerData', 'set', { crateName:'합계', line_name:'합계' });
            //
            // var widthSum = $('#mes_grid tr:first td:eq(0)').width();
            // widthSum += $('#mes_grid tr:first td:eq(1)').width();
            // widthSum += $('#mes_grid tr:first td:eq(2)').width();
            // widthSum += $('#mes_grid tr:first td:eq(3)').width();
            // widthSum += $('#mes_grid tr:first td:eq(4)').width();
            // widthSum += $('#mes_grid tr:first td:eq(5)').width();
            // widthSum += $('#mes_grid tr:first td:eq(6)').width();
            // widthSum += $('#mes_grid tr:first td:eq(7)').width();
            // var footer = $("table.ui-jqgrid-ftable");
            // footer.css("width", widthSum);
            //
            //
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("background-color", "rgb(155, 185, 239)");
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("border", "0.1px solid #E1E1E1");
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("border-top", "none");
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("font-size", "12px");
            // footer.css("border-left", "0.1px solid #EAEAEA")
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("border", "0px solid #E1E1E1");


            // $('table.ui-jqgrid-ftable tr:first').children("td").css("border-top", "none");
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("font")
            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(4)').css("padding-top","5px");
            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(4)').css("padding-bottom","5px");


            // $('table.ui-jqgrid-ftable td:eq(1)').hide();
            // $('table.ui-jqgrid-ftable td:eq(2)').hide();
            // $('table.ui-jqgrid-ftable td:eq(3)').hide();
            // $('table.ui-jqgrid-ftable td:eq(4)').hide();

            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(1)').css("border-left", "0.1px solid #EAEAEA")




            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(0)').css("border-rigth","none")
            //
            // $('table.ui-jqgrid-ftable tr:first td:eq(1), table.ui-jqgrid-ftable tr:first td:eq(1)').css("border-left","none")
            // $('table.ui-jqgrid-ftable tr:first td:eq(1), table.ui-jqgrid-ftable tr:first td:eq(1)').css("border-rigth","none")



            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(6)').css("border-left","none")
            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(7)').css("border-left","none")
            // $('table.ui-jqgrid-ftable tr:first td:eq(0), table.ui-jqgrid-ftable tr:first td:eq(8)').css("border-left","none")


            // $('table.ui-jqgrid-ftable tr:first td:eq(5)').append(" \u00A0");
            // $('table.ui-jqgrid-ftable tr:first td:eq(6)').append(" \u00A0");
            // $('table.ui-jqgrid-ftable tr:first td:eq(7)').append(" \u00A0");

            // var footer = $("table.ui-jqgrid-ftable tr:first td:eq(0)");
            // footer.css("color", "#2e6e9e");
            // footer.css("text-align", "left");
            // footer.css("width", widthSum);
            // $('table.ui-jqgrid-ftable tr:first').children("td").css("background-color", "#dfeffc");
            // $('table.ui-jqgrid-ftable tr:first td:eq(0),table.ui-jqgrid-ftable tr:first td:eq(4)').css("padding-top","8px");
            // $('table.ui-jqgrid-ftable tr:first td:eq(0),table.ui-jqgrid-ftable tr:first td:eq(4)').css("padding-bottom","8px");
            // $('table.ui-jqgrid-ftable tr:first td:eq(4)').append(" \u00A0");
            }

        }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}


function select_box() {
    select_makes_base("#supp_code_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });

    select_makes_base("#select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'4'},'').then(function (data){
        select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'Y').then(function (data2) {
        });

    });

}