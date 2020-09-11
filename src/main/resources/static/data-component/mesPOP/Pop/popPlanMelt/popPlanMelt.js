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
    selectBox();
    msg_get();
    modal_start1();
});


////////////////////////////클릭 함수//////////////////////////////////
function test() {
    $("#addDialog").dialog('open');
    jqGridResize('#mes_modal1_grid1', $('#mes_modal1_grid1').closest('[class*="col-"]'));

}


function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: "/popPlanGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I';
        datepicker_makes("#datepicker_modal1", 0);
        $("#modal1_select1 option:eq(0)").prop("selected", true).trigger("change");
        // $("#modal1_select2 option:eq(0)").prop("selected", true).trigger("change");
        $('#mes_modal1_grid1').jqGrid('clearGridData');
        modal1_rowAdd('');
        disabled_tf(["#datepicker_modal1","#modal1_select1","#modal1_select2"],"N");
        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));

    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        main_data.check2 = 'N'; // 수정인지 체크
        ccn_ajax('/popPlanWorkDateGet', {keyword:(jqgrid_data.work_date).replace(/[^0-9]/g,''),keyword2:jqgrid_data.line_code}).then(function (data) {
            $('#mes_modal1_grid1').jqGrid('clearGridData');
            select_makes_base("#modal1_select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'2'},'').then(function (data2) {
                $("#modal1_select1").val(jqgrid_data.line_grp_code).trigger("change");
                select_makes_base("#modal1_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:jqgrid_data.line_grp_code},'').then(function (data3) {
                    $("#modal1_select2").val(jqgrid_data.line_code).trigger("change");
                    main_data.check2 = 'Y';
                    $("#datepicker_modal1").val(formmatterDate2((jqgrid_data.work_date).replace(/[^0-9]/g,'')));
                    disabled_tf(["#datepicker_modal1","#modal1_select1","#modal1_select2"],"Y");
                    $("#mes_modal1_grid1").setGridParam({
                        datatype: "local",
                        data: data
                    }).trigger("reloadGrid");
                    $("#addDialog").dialog('open');
                    jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));

                });
            });

            if (data.length  === 0){
                modal1_rowAdd('');
            }
        });

    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function comp_btn() {
    if(main_data.auth.check_edit != "N") { // 권한체크
        var gu5 = String.fromCharCode(5); // CHAR(5) 구분자 선언
        var gu4 = String.fromCharCode(4); // CHAR(5) 구분자 선언
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        if (ids.length === 0) { // 선택된 그리드 row가 없을 경우
            alert("완료처리 데이터를 선택 해주세요"); // 경고문 출력
        } else {

            var list = [];
            var jdata  ={};
            for(var i = 0; i < ids.length; i++){
                jdata = $('#mes_grid').jqGrid('getRowData', ids[i]);
                list.push((jdata.work_date).replace(/[^0-9]/g,'')+gu4+jdata.line_code + gu4 +jdata.seq)
            }


            if (confirm("완료처리 하시겠습니까?")) { // 삭제여부 확인 메세지 출력
                wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
                // ajax 통신 함수 url과 data 를 전달하여 promise로 실행 후 가공 data를 사용할 수 있도록 설정
                ccn_ajax("/popPlanComp", {keyword: list.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message); // 해당 오류 메세지 출력
                    } else {
                        $("#mes_grid").trigger("reloadGrid"); // 성공시 기존에 조회했던 조건 그대로 grid를 조회
                    }
                    closeWindowByMask(); // 마스크 종료
                }).catch(function (err) { // 에러 발생 시
                    closeWindowByMask(); // 마스크 종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1); // 권한 이 없을 경우 해당 메세지 출력
    }
}

function main_select_change1(value) {
    if (value !== ""){
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (data2) {

        });
    }
}

////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlanMelt"}).then(function (data) {
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
        colNames: ['rownum','seq','계획일자','CHARGE','라인그룹','라인','라인','업체','기종','품명','단중','수량','중량','상태','재질','작업자'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false, key:true, width: 150,fixed: true,hidden:true},
            {name: 'seq', index: 'seq', sortable: false, width: 50, fixed: true,hidden:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 100, fixed: true,formatter:formmatterDate2},
            {name: 'charge', index: 'charge', sortable: false, width: 100, fixed: true,align:'right',formatter:'integer'},
            {name: 'line_grp_code', index: 'line_grp_code', sortable: false, width: 150, fixed: true,hidden:true},
            {name: 'line_code', index: 'line_code', sortable: false, width: 150, fixed: true,hidden:true},
            {name: 'line_name', index: 'line_name', sortable: false, width: 150, fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150, fixed: true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 150, fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 150, fixed: true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 100, fixed: true,align:'right',formatter:'integer'},
            {name: 'plan_qty', index: 'plan_qty', sortable: false, width: 100, fixed: true,align:'right',formatter:'integer'},
            {name: 'weight', index: 'weight', sortable: false, width: 100, fixed: true,align:'right',formatter:'integer'},
            {name: 'status_name', index: 'status_name', sortable: false, width: 50, fixed: true},
            {name: 'mat_group', index: 'mat_group', sortable: false, width: 150, fixed: true},
            {name: 'work_user_name', index: 'work_user_name', sortable: false, width: 100, fixed: true}

        ],
        caption: "주입계획서 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true, // 다중선택 가능
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    select_makes_base("#main_select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'2'},'').then(function (data) {
        select_makes_base("#main_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'').then(function (data2) {

        });
    });

}