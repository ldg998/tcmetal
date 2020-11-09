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
    modal_start1();
    msg_get();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/popSpectroGet',
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
                "name":"popSpectroList",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.supp_code,
                "row5":main_data.send_data.part_kind,


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

function main_select_change1(value) {
    if (value !== ""){
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (data2) {

        });
    }
}



function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        if(jqgrid_data.ck =='' || jqgrid_data.ck==null || jqgrid_data.ck=='null'){
            main_data.check = 'I'; // 추가인지 체크
        }else {  main_data.check = 'U'; // 수정인지 체크
        }
        jqgrid_data.part_weight = integer(String(jqgrid_data.part_weight));

        modal_edits('.modal_value',[],jqgrid_data)


        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}
////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popSpectro"}).then(function (data) {
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
        colNames: ['','','','','','','계획일자','CHARGE','업체','기종','품명','단중','C','Si','Mn','P','S','Cr','Ni','Cu','Sn','작업자','등록일시'],
        colModel: [
            {name: 'rownum', index: 'rownum',hidden:true ,key:true,sortable: false,fixed:true},
            {name: 'seq', index: 'seq',hidden:true ,sortable: false,fixed:true},
            {name: 'line_code', index: 'line_code',hidden:true ,sortable: false,fixed:true},
            {name: 'ck', index: 'ck',hidden:true ,sortable: false,fixed:true},
            {name: 'supp_code', index: 'supp_code',hidden:true ,sortable: false,fixed:true},
            {name: 'part_code', index: 'part_code',hidden:true ,sortable: false,fixed:true},

            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2},
            {name: 'charge', index: 'charge', sortable: false, width: 60,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 130,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'test_value1', index: 'test_value1', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number'},
            {name: 'test_value2', index: 'test_value2', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number'},
            {name: 'test_value3', index: 'test_value3', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number'},
            {name: 'test_value4', index: 'test_value4', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'test_value5', index: 'test_value5', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'test_value6', index: 'test_value6', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'test_value7', index: 'test_value7', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'test_value8', index: 'test_value8', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'test_value9', index: 'test_value9', sortable: false, width: 70,fixed:true,align: 'right', formatter: 'number',formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 3, defaultValue: '0.000' }},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60,fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 140,fixed:true,formatter: formmatterDate},
        ],
        caption: "성분분석 | MES",
        //formatter:{number:{decimalSeparator: ".",thousandsSeparator:" ",decimalPlaces: 4,defaultValue:'0.000'}},
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
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#part_kind_select').select2();

    select_makes_base("#main_select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'2'},'').then(function (data) {
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'').then(function (data2) {

        });
    });

}

