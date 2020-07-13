var part_gu = 'N';
var part_gu2 = 'N';
////////////////////////////시작 함수/////////////////////////////////////
function partModal_start(what) {
    partModal_make();
    partModal_jqGrid();
    jqGridResize("#partSearchGrid", $('#partSearchGrid').closest('[class*="col-"]'));
    selectBox_part_modal();
}


////////////////////////////클릭 함수/////////////////////////////////////

function partModal_get_btn(page) {
    var part_send_data = value_return(".part_condition");
    part_send_data.keyword3 = '';

    $("#partSearchGrid").setGridParam({
        url: '/sysPartGet',
        datatype: "json",
        page: page,
        postData: part_send_data,
    }).trigger("reloadGrid");
}

function partModal_check() {
    if ($( "#partSearchGrid" ).getGridParam( "selrow" )) {
        var ids = $( "#partSearchGrid" ).getGridParam( "selrow" );
        var data = $('#partSearchGrid').jqGrid('getRowData', ids);
        partModal_bus(data);
        $("#part-search-dialog").dialog('close');


    }else {
        alert("선택하십시오");
    }
}
function partModal_close() {
    $("#part-search-dialog").dialog('close');
    suppModal_close_bus();

}

function select_part_modal_change1(value) {
    part_type_select_ajax("#part_group_select_modal", "/sysPartGroupAllGet", "part_grp_code", "part_grp_name",{keyword:value}).then(function (data2){
        part_type_select_ajax('#part_prod_select_modal', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:value, keyword2:data2[0].part_grp_code}).then(function (data3) {
            if (part_gu2 === 'Y' && value === 'B'){
                $("#part_prod_select_modal  option:eq(1)").prop("selected", true).trigger("change");
            }
        })
    }).catch(function (err){
        $('#part_group_select').empty();
        $('#part_prod_select').empty();
    });
}
function select_part_modal_change2(value) {
    part_type_select_ajax('#part_prod_select_modal', "/sysPartGroup2AllGet","part_grp_code2" ,"part_grp_name2",{keyword:$('#part_type_select_modal').val(), keyword2:value}).catch(function (err){
        $('#part_prod_select').empty();
    });
}



////////////////////////////호출 함수/////////////////////////////////////



function partModal_make() {
    $("#part-search-dialog").dialog({
        autoOpen:false,
        modal: true,
        minWidth:1100,
        height: 'auto',
        resizable: false,
    });

}



function partModal_jqGrid() {
    $('#partSearchGrid').jqGrid({
        datatype: "local",
        // 다중 select
        mtype: 'POST',
        // 타이틀
        caption: "품목조회 | MES",
        colNames: ['','품번','품명','규격','단위'],
        colModel: [
            {name:'radio',index:'radio',align:"center",width:30 ,sortable: false,fixed:true, formatter: function (cellValue, option,rowObject) {
                    return '<input type="radio" name="radio_' + option.gid + '" onclick="jqGrid_row_check(\'#partSearchGrid\''+','+'\''+rowObject.part_code+'\''+');"/>';
            }},
            {name: 'part_code', index: 'part_code', key: true, sortable: false, width: 200,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 200,fixed:true},
            {name: 'spec', index: 'spec', sortable: false, width: 200,fixed:true},
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 80,fixed:true}
        ],
        autowidth: true,
        height: 250,
        rowNum: 100,
        pager: '#partSearchGridPager',
        jsonReader: {cell:""},
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {
            var radio = $(e.target).closest('tr').find('input[type="radio"]');
            $('input[name="radio_SuppSearchGrid"]').removeAttr("checked").trigger('change');
            radio.prop('checked', true).trigger('change');
            return true; // allow row selection
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            partModal_check();
        },
        loadComplete:function(){
        if ($("#partSearchGrid").jqGrid('getGridParam', 'reccount') === 0)
            $("table#partSearchGrid tr.jqgfirstrow").css("height","1px");
    }
    });
}


function selectBox_part_modal() { //구분영역에 들어갈 select데이터 호출
    select_makes_base("#part_type_select_modal1", "/sysPartTypeGet", "part_type", "part_type_name",{keyword:'1'},'Y').then(function (data) {});
}


