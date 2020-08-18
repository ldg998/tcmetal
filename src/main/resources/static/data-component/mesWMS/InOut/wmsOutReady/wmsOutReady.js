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
    selectBox();
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {

    main_data.send_data = value_return2(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/wmsOutReadyGet',
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
                "name":"wmsOutReady",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
                "row2":$('#supp_code_main').val()
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
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutReady"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['출고요청일자', '전표번호', '업체','기종', '품명', '품번','단중','수량','중량','등록자','수정일'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 90, fixed:true,formatter:formmatterDate2},
            {name: 'req_no', index: 'req_no', sortable: false, width: 150, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 150, fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150, fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 150, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 150, fixed:true,formatter:'integer',align: 'right'},
            {name: 'qty', index: 'qty', sortable: false, width: 150, fixed:true,formatter:'integer',align: 'right'},
            {name: 'weight', index: 'weight', sortable: false, width: 150, fixed:true,formatter:'integer',align: 'right'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150, fixed:true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150, fixed:true,formatter:formmatterDate}
        ],
        caption: '제품 미출고 현황 | MES',
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
