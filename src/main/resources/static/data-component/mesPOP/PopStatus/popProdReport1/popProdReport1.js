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
});


////////////////////////////클릭 함수//////////////////////////////////
function test(){

    $("#addDialog").dialog('open'); // 모달 열기

    jqGridResize("#mes_add_grid" , $('#mes_add_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_add_grid2" , $('#mes_add_grid2').closest('[class*="col-"]'));

}
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/popProdReport1Get',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 그리드 내용 더블 클릭 시 실행 수정버튼
function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") { // 권한체크
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할 항목 설정
        var getData ={}
        getData = { work_date:rowid.work_date.replace(/\-/g, '') ,line_code:rowid.line_code ,charge:rowid.charge}

        ccn_ajax('/popProdMeltGet',getData).then(function (data1) {
            var edits_list = {}
            var list = data1.pop_prod_melt
            var list2 = data1.pop_prod_melt_sub1
            var list3 = data1.pop_prod_melt_sub2
            var list4 = data1.pop_prod_melt_sub3

            list.forEach(function (id) {
                var name = Object.keys(id)
                name.forEach(function (id2 ){
                    edits_list[id2] = id[id2]
                })
            });
            list2.forEach(function (id) {
                var name = Object.keys(id)
                name.forEach(function (id2 ){
                    edits_list[id.seq+id2] = id[id2]
                })
            });
            list3.forEach(function (id) {
                var name = Object.keys(id)
                name.forEach(function (id2 ){
                    edits_list[id.seq+id2] = id[id2]
                })
            });
            list4.forEach(function (id) {
                var name = Object.keys(id)
                name.forEach(function (id2 ){
                    edits_list[id.seq+id2] = id[id2]
                })
            });
            edits_list.work_date = formmatterDate2(edits_list.work_date);


        modal_edits('.modal_value',[],edits_list)
            $("#addDialog").dialog('open'); // 모달 열기
        }).catch(function (err) {
            alert('호출 실패');
        });

    } else {
        alert(msg_object.TBMES_A003.msg_name1); // 경고메세지 출력
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

////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popProdReport1"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','','생산지시일자','CHARGE','업체','기종','품번','품명','단중','수량','등록자','등록일시'],
        colModel: [
            {name: 'rownum', index: 'rownum',key:true ,hidden:true, sortable: false,fixed:true},
            {name: 'line_code', index: 'line_code' ,hidden:true, sortable: false,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2},
            {name: 'charge', index: 'charge', sortable: false, width: 100,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 100,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 100,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 100,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 100,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 100,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 80,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 80,fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 140,fixed:true,formatter: formmatterDate}

        ],
        caption: "주입일보현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#part_kind_select').select2();

}