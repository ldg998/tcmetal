/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [],
    auth:{}
};
////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    authcheck();
    datepickerInput();
    jqgridPagerIcons();
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.stop_date = main_data.send_data.stop_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;


    $("#mes_grid").setGridParam({
        url: '/popPlanOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/popPlanOrderGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function ord_btn() {
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var ids = $("#mes_grid").getGridParam('selarrrow');
    if (ids.length === 0) {
        alert("생산 지시할 데이터를 선택해주세요");
    } else {
        if(confirm("지시처리를 하겠습니까?")){
            var data;
            var list = [];
            var list2 = [];
            ids.forEach(function(id){
                data = $('#mes_grid').jqGrid('getRowData', id);

                if(data.ord_date !== '' && data.ord_date !== null){
                    list2.push(data.req_no);
                }
                list.push(data.req_no);

            });


            if(list2.length > 0) {
                alert(list2[0]+"는 지시를 내릴 수 없는 상태입니다.")
            }else {
                ccn_ajax("/popPlanOrderOrd",{keyword:list.join(gu5)}).then(function (){
                    get_btn_post($("#mes_grid").getGridParam('page'));
                });
            }
        }else {
            alert("수정권한이 없습니다.");
        }
    }
}
////////////////////////////호출 함수//////////////////////////////////
function datepickerInput() {
    datepicker_makes("#datepicker", -1);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlanOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['일자','지시번호','수주번호','수주처','End User','납기일','작업구분','품목군','제품군','제품명','커넥터1','커넥터2','단위','길이','수량','생산지시일'],
        colModel: [
            {name: 'work_date', index: 'work_date',sortable: false, width: 50, formatter: formmatterDate2},
            {name: 'req_no', index: 'req_no',sortable: false,key:true, width: 90},
            {name: 'ord_no', index: 'ord_no',sortable: false, width: 90},
            {name: 'supp_name', index: 'supp_name',sortable: false, width: 60},
            {name: 'end_supp_name', index: 'end_supp_name',sortable: false, width: 60},
            {name: 'end_date', index: 'end_date',sortable: false, width: 60, formatter: formmatterDate2},
            {name: 'work_type_name', index: 'work_type_name',sortable: false, width: 60},
            {name: 'part_grp_name', index: 'part_grp_name',sortable: false, width: 60},
            {name: 'part_grp_name2', index: 'part_grp_name2',sortable: false, width: 60},
            {name: 'part_name', index: 'part_name',sortable: false, width: 60},
            {name: 'part_name1', index: 'part_name1',sortable: false, width: 60},
            {name: 'part_name2', index: 'part_name2',sortable: false, width: 60},
            {name: 'unit_name', index: 'unit_name',sortable: false, width: 50},
            {name: 'part_length', index: 'part_length',sortable: false, width: 50, align: 'right',formatter:'number'},
            {name: 'qty', index: 'qty',sortable: false, width: 40, align: 'right',formatter:'number'},
            {name: 'ord_date', index: 'ord_date',sortable: false, width: 90, formatter: formmatterDate}
        ],
        caption: "생산요청현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

