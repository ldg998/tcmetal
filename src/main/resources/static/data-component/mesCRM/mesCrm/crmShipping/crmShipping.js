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
    suppModal_start();
    header_make();
    selectBox();
    modal_start1();
});

////////////////////////////클릭 함수/////////////////////////////////////

function test() {
    $("#addDialog").dialog('open');
}

function get_btn(page) {

    main_data.send_data = value_return2(".condition_main");
    console.log(value_return2(".condition_main"));

    $("#mes_grid").setGridParam({
        url: '/wmsOutReadyGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function supp_btn(what) {
    main_data.supp_check = what;

    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");

    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {
        $("#supp_name_modal").val(name);
        $("#supp_code_modal").val(code);
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
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
    datepicker_makes("#datepicker", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmShipping"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    // arrtSetting = function (rowId, val, rawObject, cm) {
    //     var attr = rawObject.attr[cm.name], result;
    //     if (attr.rowspan) {
    //         result = ' rowspan=' + '"' + attr.rowspan + '"';
    //     } else if (attr.display) {
    //         result = ' style="display:' + attr.display + '"';
    //     }
    //     return result;
    // };


    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['선적일자', '전표번호', '업체','운송수단', '해상운임','터미널 핸들링비용','환경','쇼링비','부두이용료','서류발급비','하역료','보험료','항만시설보안료','국내운송비','관세대행수수료','목재비','순중량','운송단가','등록자','등록일시'],
        colModel: [
            {name:'1', index: '1', width: 150, fixed:true},
            {name:'2', index: '2',  width: 150, fixed:true},
            {name:'3', index: '3',  width: 150, fixed:true},
            {name:'4', index: '4',  width: 150, fixed:true},
            {name:'5', index: '5',  width: 150, fixed:true},
            {name:'6', index: '6',  width: 150, fixed:true},
            {name:'7', index: '7',  width: 150, fixed:true},
            {name:'8', index: '8',  width: 150, fixed:true},
            {name:'9', index: '9',  width: 150, fixed:true},
            {name:'10', index: '10',  width: 150, fixed:true},
            {name:'11', index: '11', width: 150, fixed:true},
            {name:'12', index: '12', width: 150, fixed:true},
            {name:'13', index: '13', width: 150, fixed:true},
            {name:'14', index: '14', width: 150, fixed:true},
            {name:'15', index: '15',  width: 150, fixed:true},
            {name:'16', index: '16', width: 150, fixed:true},
            {name:'17', index: '17', width: 150, fixed:true},
            {name:'18', index: '18', width: 150, fixed:true},
            {name:'19', index: '19', width: 150, fixed:true},
            {name:'20', index: '20',  width: 150, fixed:true}

        ],
        multiselect: true,
        caption: '운송비용 관리 | MES',
        autowidth: true,
        height: 562,
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
        }

        });


}
function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: '6', numberOfColumns: 5, titleText: '<center>항구비용</center>'}

            ]
    })
}
function selectBox() {
    $('#1_select').select2();
}