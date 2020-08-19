// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawBasic);

/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    send_data: {},
    auth:{},
    readonly:['supp_name','part_kind','part_name','part_code','part_weight']
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    jqgridPagerIcons();
    modal_start1();
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword3 = '';
    main_data.send_data.use_yn='y';
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/sysSpartGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);

        $('#file_03').val('');
        $('.file_labal').text('업로드');

        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        var send_data = {};
        send_data.keyword = jqgrid_data.supp_code;
        send_data.keyword2 = jqgrid_data.part_kind;
        send_data.keyword3 = jqgrid_data.part_code;
        ccn_ajax('/sysSpartOneGet',  send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly,data); // response 값 출력
            $("#addDialog").dialog('open');// 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
    msgGet_auth("TBMES_A003");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysSPartWood"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "고객지급품관리 | MES",
        colNames: ['rownum','','업체','기종','품번','품명','단중','첨자','형종류','중자수','지급품도면','file3','제작업체','입고일','비고','등록자','수정일'],
        colModel: [
            {name: 'rownum', index: 'rownum',hidden:true, width: 80,fixed: true,key:true},
            {name: 'supp_code', index: 'supp_code',hidden:true, sortable:false, width: 100,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable:false, width: 100,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable:false, width: 100, fixed:true},
            {name: 'part_code', index: 'part_code', sortable:false, width: 150, fixed:true},
            {name: 'part_name', index: 'part_name', sortable:false, width: 150, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable:false, width: 100, fixed:true},
            {name: 'wood_type1', index: 'wood_type1', sortable:false, width: 100, fixed:true},
            {name: 'wood_type2', index: 'wood_type2', sortable:false, width: 100, fixed:true},
            {name: 'wood_type3', index: 'wood_type3', sortable:false, width: 100, fixed:true},
            {name: 'file3_name', index: 'file3_name', sortable: false, width: 80, align: 'center', formatter: file3_formatter,fixed:true},
            {name: 'file3', index: 'file3', sortable: false,hidden: true},
            {name: 'wood_supp_name', index: 'wood_supp_name', sortable:false, width: 100, fixed:true},
            {name: 'wood_in_date', index: 'wood_in_date', sortable:false, width: 100, fixed:true},
            {name: 'wood_remark', index: 'wood_remark', sortable:false, width: 120, fixed:true},
            {name: 'user_name', index: 'user_name', sortable:false, width: 80, fixed:true},
            {name: 'update_date', index: 'update_date', sortable:false, width: 140, fixed:true, formatter:formmatterDate},
        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        onCellSelect: function (rowid, icol, cellcontent, e) {
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}

function file3_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file3 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span>저장</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span>없음</span>" +
            "</span>" +
            "</a>";
    }
}

function file_download(file_name) {
    if (confirm('파일을 저장하시겠습니까?')) {
        $.fileDownload('/FileUploads', {
            httpMethod: "POST",
            data: { key_value: file_name },
            successCallback: function(url){
            },
            failCallback: function(){
            }
        });
    }
}