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
    selectBox();
    jqgridPagerIcons();
    suppModal_start();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////
function excel_download() {
    // if (confirm(msg_object.TBMES_Q014.msg_name1)) {
    //     var $preparingFileModal = $("#preparing-file-modal");
    //     $preparingFileModal.dialog({modal: true});
    //     $("#progressbar").progressbar({value: false});
    //     $.fileDownload("/excel_download", {
    //         httpMethod: 'POST',
    //         data: {
    //             "name": "wmsStockIOSumMonth",
    //             "row0":$('#datepicker').val().replace(/-/gi,""),
    //             "row1":$('#part_type_select').val(),
    //             "row2":$('#part_group1_select').val(),
    //             "row3":$('#part_group2_select').val()
    //         },
    //         successCallback: function (url) {
    //             $preparingFileModal.dialog('close');
    //         },
    //         failCallback: function (responseHtml, url) {
    //             $preparingFileModal.dialog('close');
    //             $("#error-modal").dialog({modal: true});
    //         }
    //     });
    //     return false;
    // }
}

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    main_data.send_data.keyword = 'B'
    $("#mes_grid").setGridParam({
        url: '/popProdList1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function select_change1(value) {
    part_type_select_ajax_all('#part_prod_select', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:'B', keyword2:value}).then(function (){
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_name_select').append(option);
        $('#part_name_select').select2();
    }).catch(function (err){
        $('#part_prod_select').empty();
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_prod_select').append(option);
        $('#part_name_select').append(option2);
    });
}
function select_change2(value) {
    if(value == null || value == ''){
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_name_select').append(option);
    }else {
        part_type_select_ajax_all('#part_name_select', "/sysPartNameAllGet","part_code" ,"part_name",{keyword:'B', keyword2:$('#part_group_select').val(), keyword3:value}).catch(function (err){
            $('#part_name_select').empty();
            var option = $("<option></option>").text('전체').val('');
            $('#part_name_select').append(option);
        });

    }
}

//업체선택 모달 호출 버튼
function supp_btn(what) {
    main_data.supp_check = what;
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

//업체선택 모달 선택 데이터 가져오기
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

//업체선택모달 종료 버튼
function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
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

function selectBox() {
    part_type_select_ajax_all("#part_group_select", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name", {keyword: 'B'}).then(function () {
        $('#part_prod_select').empty();
        $('#part_name_select').empty();
        var option = $("<option></option>").text('전체').val('');
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_prod_select').append(option);
        $('#part_name_select').append(option2);
        $('#part_prod_select').select2();
        $('#part_name_select').select2();
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['수주일자','업체','생산일자','계획번호','현장','구분','구분','규격','수량','계획명'],
        colModel: [
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true},
            {name: '', index: '', sortable: false, width: 150,fixed:true}

        ],
        caption: "제품별 생산실적 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}
