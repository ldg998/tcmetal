/**
 * various.js 와 연동
 */
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth:{},
    prev_lot : '',
    afterList:{}
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
    modal_start1();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    $("#mes_grid2").jqGrid('clearGridData');
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/popProdList2Get',
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
                "name":"popProdList2List",
                "row0": main_data.send_data.work_date,
                "row1": main_data.send_data.keyword,
                "row2": main_data.send_data.keyword2,
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

//선택한 그리드의 로우 id를사용해 해당id 와같은 id 를 그리드조회
function under_get(data) {
    data.work_date = data.work_date.replace(/\-/g, '');
    $("#mes_grid2").setGridParam({
        url: '/popProdList2SubGet',
        datatype: "json",
        page: 1,
        postData: data
    }).trigger("reloadGrid");
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = "U";
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        jqgrid_data.prev_lot = jqgrid_data.lot_no
        jqgrid_data.lot_no = ''
        modal_edits('.modal_value',[],jqgrid_data)



        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdList2"}).then(function (data) {
        main_data.auth = data;
    });
}

function main_select_change1(value) {
    select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (data2) {
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
    datepicker_makes("#datepicker", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','','작업일자','공정','업체','기종','품번','품명','단중','지시수량','생산수량','등록자','등록일시'],
        colModel: [
            {name: 'supp_code', index: 'supp_code', hidden:true, sortable: false,fixed:true},
            {name: 'line_code', index: 'line_code', hidden:true, sortable: false,fixed:true},

            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2 },
            {name: 'line_name', index: 'dept_name', sortable: false, width: 70,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 110,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer' },
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer' },
            {name: 'prod_qty', index: 'prod_qty', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer' },
            {name: 'user_name', index: 'user_name', sortable: false, width: 60,fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 140,fixed:true,formatter: formmatterDate }

        ],
        caption: "공정별 생산현황 | MES",
        autowidth: true,
        height: 230,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        onCellSelect: function (rowid, icol, cellcontent, e) { //클릭시 이벤트 아래그리드 get
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            under_get(data);
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','생산일자','업체','기종','품번','품명','LOT'],
        colModel: [
            {name: 'supp_code', index: 'supp_code',hidden:true, sortable: false,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2 },
            {name: 'supp_name', index: 'dept_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'supp_name', sortable: false, width: 120,fixed:true},
            {name: 'part_code', index: 'part_kind', sortable: false, width: 130,fixed:true},
            {name: 'part_name', index: 'part_code', sortable: false, width: 190,fixed:true},
            {name: 'lot_no', key:true, index: 'part_name', sortable: false, width: 120,fixed:true},
        ],
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid2').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        caption: "공정별 생산현황 | MES",
        autowidth: true,
        height: 230,
        pager: '#mes_grid_pager2',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager2', {search: false, add: false, edit: false, del: false});


}

function select_box() {
    select_makes_base("#select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'1'},'').then(function (data){

        select_makes_base("#select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'').then(function (data2) {
        });
    });


}