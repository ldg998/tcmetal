

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['code_value'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    selectBox();
    datepickerInput();
});

////////////////////////////클릭 함수//////////////////////////////////

// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');   ////가져온 날짜데이터 가공 2020-06-01 = 20200601

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/outsInListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제

        var send_data = {};
        send_data.keyword = jqgrid_data.code_type;
        send_data.keyword2 = jqgrid_data.code_value; // data에 값을 추가하여 파라미터로 사용

        ccn_ajax('/sysCommonOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $('#group_name').val(data.cn); // 해당 id에 값을 부여
            $('#group_code').val(data.code_type); // 해당 id에 값을 부여
            $("#addDialog").dialog('open');// 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수//////////////////////////////////
//호출함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "outsInList"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['입고일자','전표번호','외주업체','업체','기종','품번','품명','단중','수량','출장검사','등록자','입고일시'],
        colModel: [
            {name: 'work_date', index: 'work_date',sortable: false, width: 100,fixed: true,formatter:formmatterDate2},
            {name: 'in_no', index: 'in_no',sortable: false, width: 150,fixed: true},
            {name: 'outs_supp_name', index: 'outs_supp_name',sortable: false, width: 120,fixed: true},
            {name: 'supp_name', index: 'supp_name',sortable: false, width: 120,fixed: true},
            {name: 'part_kind', index: 'part_kind',sortable: false, width: 120,fixed: true},
            {name: 'part_code', index: 'part_code',sortable: false, width: 120,fixed: true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 120,fixed: true},
            {name: 'part_weight', index: 'part_weight',sortable: false, width: 80,fixed: true,align: 'right', formatter: 'integer'},
            {name: 'qty', index: 'qty',sortable: false, width: 80,fixed: true,align: 'right', formatter: 'integer'},
            {name: 'outs_qc', index: 'outs_qc',sortable: false, width: 80,fixed: true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 80,fixed: true},
            {name: 'work_date', index: 'work_date',sortable: false, width: 140,fixed: true,formatter:formmatterDate}

        ],
        caption: "외주입고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    $('#select1').select2();
    select_makes_base("#main_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#main_select2').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#main_select2').append(option);
        $('#main_select2').select2();
    });

    select_makes_base("#main_select3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"");
}

function main_select_change1(value) {
    if (value !== ""){
        select_makes_base("#main_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y").then(function (data) {
        });
    } else {
        $('#main_select2').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#main_select2').append(option);
        $('#main_select2').select2();
    }

}

function datepickerInput() {
    datepicker_makes("#datepicker",-30);
    datepicker_makes("#datepicker2",0);
}
