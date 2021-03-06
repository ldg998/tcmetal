/**
 * various.js 와 연동
 */
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{}
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
        url: '/sysProdSumGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').empty();
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}


function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"sysProdSum",
                "row0": main_data.send_data.work_date,
                "row1": main_data.send_data.supp_code,
                "row2":main_data.send_data.part_kind,
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
    ccn_ajax("/menuAuthGet", {keyword: "popLotTracking"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','','업체','기종','품명','품번','단중','생산누계','기초재고','구분', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false,width: 30, fixed:true,hidden:true,key:true},
            {name: 'work_seq', index: 'work_seq', sortable: false, fixed:true,hidden:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 100,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 130,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 130,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 90,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'work_qty', index:'work_qty', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'stock_prev', index:'stock_prev', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'work_name', index:'work_name', sortable: false, width: 60,fixed:true},
            {name: 'day1', index: 'day1', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day2', index: 'day2', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day3', index: 'day3', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day4', index: 'day4', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day5', index: 'day5', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day6', index: 'day6', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day7', index: 'day7', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day8', index: 'day8', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day9', index: 'day9', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day10', index: 'day10', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day11', index: 'day11', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day12', index: 'day12', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day13', index: 'day13', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day14', index: 'day14', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day15', index: 'day15', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day16', index: 'day16', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day17', index: 'day17', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day18', index: 'day18', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day19', index: 'day19', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day20', index: 'day20', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day21', index: 'day21', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day22', index: 'day22', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day23', index: 'day23', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day24', index: 'day24', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day25', index: 'day25', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day26', index: 'day26', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day27', index: 'day27', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day28', index: 'day28', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day29', index: 'day29', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day30', index: 'day30', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'day31', index: 'day31', sortable: false, width: 60,fixed:true,align: 'right', formatter: 'integer'},

        ],
        caption: "수량집계표 | MES",
        shrinkToFit:false,
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        overflow:'visible',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(data){
            data.rows.forEach(function (idsfor, s) {
           var ck = Math.ceil(idsfor.rownum/6)
                if(ck % 2 != 0){
                    $("#mes_grid").setRowData(idsfor.rownum, false, {background:"rgb(155, 185, 239)"}) ;
                }



                //  if(Number.isInteger(idsfor.rownum/12)){
                //     $("#mes_grid").setRowData(idsfor.rownum, false, {background:"rgb(155, 185, 239)"}) ;
                //     $("#mes_grid").setRowData(idsfor.rownum-1, false, {background:"rgb(155, 185, 239)"}) ;
                //     $("#mes_grid").setRowData(idsfor.rownum-2, false, {background:"rgb(155, 185, 239)"}) ;
                //     $("#mes_grid").setRowData(idsfor.rownum-3, false, {background:"rgb(155, 185, 239)"}) ;
                //     $("#mes_grid").setRowData(idsfor.rownum-4, false, {background:"rgb(155, 185, 239)"}) ;
                //     $("#mes_grid").setRowData(idsfor.rownum-5, false, {background:"rgb(155, 185, 239)"}) ;
                //
                // }

            });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#part_kind_select').select2();

}