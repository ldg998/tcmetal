/**
 * various.js 와 연동
 */
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    check2:'Y',
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
    selectBox();
});


////////////////////////////클릭 함수//////////////////////////////////


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/popLotTrackingGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"N");
    } else {
        var option = $("<option></option>").text('선택안함').val('');
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#part_kind_select').empty();
        $('#part_code_select').empty();

        $('#part_kind_select').append(option);
        $('#part_code_select').append(option2);

        $('#part_kind_select').select2();
        $('#part_code_select').select2();

    }
}


function select_change2(value) {
    if (main_data.check2 === 'Y') {
        if (value !== "") {
            select_makes_base("#part_code_select", "/sysSpartAllGet", "part_code", "part_name", {
                keyword: $("#supp_select").val(),
                keyword2: value
            }, "N").then(function (data) {

            });
        } else {

            $('#part_code_select').empty();
            var option2 = $("<option></option>").text('전체').val('');
            $('#part_code_select').append(option2);
            $('#part_code_select').select2();
        }

    }
}


////////////////////////////호출 함수//////////////////////////////////

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popLotTracking"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", 0);
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['순번','구분','진행일자','처리번호','업체','기종','품명','단중','제품LOT'],
        colModel: [
            {name: 'idx', index: 'idx', sortable: false, width: 40,fixed:true},
            {name: 'work_name', index: 'work_name', sortable: false, width: 80,fixed:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 90,fixed:true,formatter: formmatterDate2},
            {name: 'work_no', index: 'work_no', sortable: false, width: 130,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 120,fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 90,fixed:true,align: 'right', formatter: 'integer'},
            {name: 'lot_no', index: 'lot_no', sortable: false, width: 150,fixed:true}

        ],
        caption: "제조이력관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N")
    $('#part_kind_select').select2();
    $('#part_code_select').select2();
}

