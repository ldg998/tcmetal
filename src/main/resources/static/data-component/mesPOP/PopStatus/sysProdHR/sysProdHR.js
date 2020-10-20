/**
 * various.js 와 연동
 */
////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth: {},
    select: {ck: 'N'}
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
    console.log(main_data.send_data);
    $("#mes_grid").setGridParam({
        url: '/sysProdHRGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add != "N") {
        modal_reset(".modal_value", ['work_date']); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        $("#line_select_modal").prop("disabled", false)//셀렉트박스 잠금으로 체인지
        $("#line_select_modal2").prop("disabled", false)//셀렉트박스 잠금으로 체인지

        $('#line_select_modal option:eq(0)').prop("selected", true).trigger('change') //셀렉트 0번째 아이템으로 할당
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기

    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 경고메세지 출력
    }
}


// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit != "N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        modal_edits('.modal_value', ['work_date'], jqgrid_data)
        select_makes_base("#line_select_modal", "/sysLineGroupAllGet", "code_value", "code_name1", {keyword: ''}, '').then(function (data) {
            $('#line_select_modal').val(jqgrid_data.line_grp_code).trigger("change");;
            select_makes_base("#line_select_modal2", "/syslineAllGroupGet", "line_code", "line_name", {keyword: jqgrid_data.line_grp_code}, '').then(function (data2) {
                $('#line_select_modal2').val(jqgrid_data.line_code).trigger("change");

                $("#addDialog").dialog('open'); // 모달 열기
            });
        });

        $("#line_select_modal").prop("disabled", true)//셀렉트박스 잠금으로 체인지
        $("#line_select_modal2").prop("disabled", true)//셀렉트박스 잠금으로 체인지


    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


// 삭제 버튼
function delete_btn() {

    if (main_data.auth.check_del != "N") {  //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드 5 담기
        var gu4 = String.fromCharCode(4); //아스키코드 4 담기
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        var list = [];

        for (var i = 0; i < ids.length; i++) {
            var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
            list.push(data.work_date.replace(/\-/g, '') + gu4 + data.line_code);
        }

        if (ids.length === 0) {      //선택여부 체크  선택이안되어 0이라면
            alert(msg_object.TBMES_A004.msg_name1); // 경고메세지 출력
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //시행 여부메세지 출력
                main_data.check = 'D'; // 삭제권한 부여
                wrapWindowByMask2();  //마스크로 덥고 삭제 진행동안 다른작업 방지하기
                ccn_ajax("/sysProdHrDel2", {keyword: list.join(gu5)}).then(function (data) { // 체크된 그리드 로우에 아스키코드를 넣어 1|2|3| 이런식으로 데이터전달
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message);   //해당 오류메세지 출력
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                    }
                    closeWindowByMask(); //마스크 종료
                }).catch(function (err) { //에러발생시
                    closeWindowByMask(); // 마스크종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);// 권한 이 없을 경우 해당 메세지 출력
    }

}


function main_select_change1(value) {
    select_makes_base("#select2", "/syslineAllGroupGet", "line_code", "line_name", {keyword: value}, "").then(function (data) {
    });

}


//  한로우씩 삭제
// // 삭제 버튼
// function delete_btn() {
//     if (main_data.auth.check_del != "N") {
//         var gu5 = String.fromCharCode(5);
//         if ( main_data.select.ck ==="N") {
//             alert(msg_object.TBMES_A004.msg_name1);
//         } else {
//             if (confirm(msg_object.TBMES_A005.msg_name1)) {
//                 main_data.check = 'D';
//                 wrapWindowByMask2();
//                 ccn_ajax("/sysProdHrDel", main_data.select).then(function (data) {
//                     if (data.result === 'NG') {
//                         alert(data.message);
//                     } else {
//                         $('#mes_grid').trigger('reloadGrid');
//                     }
//                     closeWindowByMask();
//                 }).catch(function (err) {
//                     closeWindowByMask();
//                     console.error(err); // Error 출력
//                 });
//             }
//         }
//     } else {
//         alert(msg_object.TBMES_A002.msg_name1);
//     }
//
// }

////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysProdHR"}).then(function (data) {
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
        colNames: ['', '', '', '계획일자', '라인그룹', '라인', '작업인원', '재적공수', '결근/휴가', '조퇴', '지각', '취업공수', '잔업', '특근', '작업공수', '작업공수(H/r)', '작업자', '등록일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false, fixed: true, hidden: true, key: true},
            {name: 'line_grp_code', index: 'line_grp_code', sortable: false, fixed: true, hidden: true},
            {name: 'line_code', index: 'line_code', sortable: false, fixed: true, hidden: true},
            {
                name: 'work_date',
                index: 'work_date',
                sortable: false,
                width: 90,
                fixed: true,
                formatter: formmatterDate2
            },
            {name: 'line_name', index: 'line_name', sortable: false, width: 60, fixed: true},
            {name: 'line_name2', index: 'line_name2', sortable: false, width: 60, fixed: true},
            {
                name: 'wk_qty',
                index: 'wk_qty',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty_sum',
                index: 'wk_qty_sum',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty1',
                index: 'wk_qty1',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty2',
                index: 'wk_qty2',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty3',
                index: 'wk_qty3',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty_sum1',
                index: 'wk_qty_sum1',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty4',
                index: 'wk_qty4',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty5',
                index: 'wk_qty5',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty_sum2',
                index: 'wk_qty_sum2',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {
                name: 'wk_qty_hr',
                index: 'wk_qty_hr',
                sortable: false,
                width: 80,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {name: 'user_name', index: 'user_name', sortable: false, width: 60, fixed: true},
            {
                name: 'create_date',
                index: 'create_date',
                sortable: false,
                width: 140,
                fixed: true,
                formatter: formmatterDate
            },
        ],
        caption: "작업공수관리 | MES",
        autowidth: true,
        multiselect: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete: function () {
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height", "1px");
        }, onCellSelect: function (rowid, icol, cellcontent, e) {
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            main_data.select = {}
            main_data.select.ck = 'Y';
            data.work_date = data.work_date.replace(/\-/g, '');
            main_data.select = data;
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function select_box() {
    select_makes_base("#select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'5'},'').then(function (data) {
        select_makes_base("#select2", "/syslineAllGroupGet", "line_code", "line_name", {keyword: data[0].code_value}, '').then(function (data2) {
        });
    });


}