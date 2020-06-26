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
});

////////////////////////////클릭 함수/////////////////////////////////////

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
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutReady"}).then(function (data) {
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
        colNames: ['업체', '기종', '품번','품명', '단중','수량1','중량','수량2','중량','수량3','중량','수량4','중량','수량5','중량'],
        colModel: [
            {name:'1', index: '1', width: 150, fixed:true},
            {name:'2', index: '2',  width: 150, fixed:true},
            {name:'3', index: '3',  width: 150, fixed:true},
            {name:'4', index: '4',  width: 150, fixed:true},
            {name:'5', index: '5',  width: 150, fixed:true},
            {name:'as', index: 'as',  width: 150, fixed:true},
            {name:'as1', index: 'as1',  width: 150, fixed:true},
            {name:'as2', index: 'as2',  width: 150, fixed:true},
            {name:'9', index: '9',  width: 150, fixed:true},
            {name:'as3', index: 'as3',  width: 150, fixed:true},
            {name:'11', index: '11', width: 150, fixed:true},
            {name:'as4', index: 'as4', width: 150, fixed:true},
            {name:'13', index: '13', width: 150, fixed:true},
            {name:'as5', index: 'as5', width: 150, fixed:true},
            {name:'15', index: '15',  width: 150, fixed:true}

        ],
        caption: '제품재고현황 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        overflow:'visible',
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            // if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
            //     $(".jqgfirstrow").css("height","1px");
            // else
            //     $(".jqgfirstrow").css("height","0px");
        }

        });
    header_make();

    // $("#mes_grid").jqGrid('setGroupHeaders', {
    //     useColSpanStyle: true,
    //     groupHeaders: [
    //         { startColumnName:"as", numberOfColumns: 2, titleText:"test" }
    //     ]
    // });

    // var newWidth = $("#mes_grid_5").width() + $("#mes_grid_6").outerWidth(true); 해더 행합치기
    // $("#mes_grid").jqGrid("setLabel", "5", "<em>전일재고</em>", "", {
    //     style: "width: " + newWidth + "px;",
    //     colspan: "2"
    // });
    // $("#mes_grid").jqGrid("setLabel", "6", "", "", {style: "display: none"});


}
function header_make() {
    jQuery("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'as', numberOfColumns: 2, titleText: '<center>전일재고</center>'},


        ]
    });
}