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
        url: '/popProdList1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}
//엑셀다운로드
function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"popProdList1List",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.stop_date,
                "row2": main_data.send_data.supp_code,
                "row3": main_data.send_data.part_kind,
                "row4": main_data.send_data.keyword
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
////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdList1"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function msg_get() {
    msgGet_auth("TBMES_Q014");
    msgGet_auth("TBMES_A001"); // 추가권한 없음
    msgGet_auth("TBMES_A002"); // 삭제권한 없음
    msgGet_auth("TBMES_A003"); // 수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','공정','업체','기종','품번','품명','단중','생산일자','생산수량','중량'],
        colModel: [
            {name:'seq', index: 'seq',key:true,hidden:true},
            {name: 'line_name', index: 'line_name',  width: 80,fixed:true,sortable:false},
            {name: 'supp_name', index: 'supp_name',  width: 130,fixed:true,sortable:false},
            {name: 'part_kind', index: 'part_kind',  width: 110,fixed:true,sortable:false},
            {name: 'part_code', index: 'plan_code',  width: 130,fixed:true,sortable:false},
            {name: 'part_name', index: 'part_name',  width: 190,fixed:true,sortable:false},
            {name: 'part_weight', index: 'part_weight',  width: 90,fixed:true,align: 'right', formatter: 'integer',sortable:false },
            {name: 'work_date', index: 'work_date',  width: 90,fixed:true,formatter: formmatterDate2,sortable:false},
            {name: 'qty', index: 'qty',  width: 90,fixed:true,align: 'right', formatter: 'integer' ,sortable:false},
            {name: 'weight', index: 'weight',  width: 90,fixed:true,align: 'right', formatter: 'integer' ,sortable:false}

        ],
        caption: "제품별 생산실적 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            },
        loadComplete : function(data) {
            console.log(data);
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.work_date == '소계'){
                    $("#mes_grid").setRowData(idsfor.seq, false, {background:"rgb(155, 185, 239)"}) ;
                }
            });
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
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

    select_makes_base("#select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'4'},'').then(function (data){}); // 합형
}
