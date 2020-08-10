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
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    console.log(main_data);
    $("#mes_grid").setGridParam({
        url: '/wmsOutListGet',
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
                "name":"wmsOutList",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,"")
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
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutList"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['출고일자', '출고전표', '업체','기종', '품명', '품번','단중','수량','중량','제품LOT','차량번호','성적서','출고요청번호','수주번호','생산일자','입고일자','등록자','등록일시'],
        colModel: [
            {name: 'work_date', index: 'out_date', sortable: false, width: 150, fixed:true, formatter:formmatterDate2},
            {name: 'out_no', index: 'out_no', sortable: false, width: 80, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 100, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 100, fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 120, fixed:true},
            {name: 'part_code', index: 'part_no', sortable: false, width: 120, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 60, fixed:true,formatter:'integer',align: 'right'},
            {name: 'qty', index: 'qty', sortable: false, width: 60, fixed:true,formatter:'integer',align: 'right'},
            {name: 'weight', index: 'weight', sortable: false, width: 60, fixed:true,formatter:'integer',align: 'right'},
            {name: 'lot_no', index: 'lot_no', sortable: false, width: 120, fixed:true },
            {name: 'car_no', index: 'car_no', sortable: false, width: 90, fixed:true},
            {name: '', index: '', sortable: false, width: 90, fixed:true},
            {name: 'req_no', index: 'req_no', sortable: false, width: 130, fixed:true},
            {name: 'ord_no', index: 'ord_no', sortable: false, width: 130, fixed:true},
            {name: '', index: '', sortable: false, width: 130, fixed:true,formatter:formmatterDate2},
            {name: 'in_date', index: 'in_date', sortable: false, width: 90, fixed:true ,formatter:formmatterDate2},
            {name: 'user_name', index: 'user_name', sortable: false, width: 90, fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 90, fixed:true,formatter:formmatterDate2}
        ],
        caption: '제품출고 현황 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}

function selectBox() {
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}
