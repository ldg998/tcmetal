

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
    modal_start1();
    datepickerInput();
    header_make()
});

////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/qmsMoldWashGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

//엑셀다운버튼
function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"qmsMoldWashList",
                "row0": main_data.send_data.start_date,
                "row1": main_data.send_data.end_date
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


// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        modal_edits('.modal_value',[],jqgrid_data)
        $("#addDialog").dialog('open'); // 모달 열기

    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 수정인지 체크
        modal_reset('.modal_value',[])
        datepickerInput_modal();
        $("#addDialog").dialog('open'); // 모달 열기

    }
}
// 삭제 버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/qmsMoldWashDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger('reloadGrid');
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
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
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsMoldWash"}).then(function (data) {
        main_data.auth = data;
    });
}
function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['','','','','일자','측정시간','측정값','작업자','측정시간','측정값','작업자','측정시간','측정값','작업자','측정시간','측정값','작업자'],
        colModel: [
            {name: 'user_code1', index: 'user_code1',sortable: false,fixed: true,hidden:true},
            {name: 'user_code2', index: 'user_code2',sortable: false,fixed: true,hidden:true},
            {name: 'user_code3', index: 'user_code3',sortable: false,fixed: true,hidden:true},
            {name: 'user_code4', index: 'user_code4',sortable: false,fixed: true,hidden:true},

            {name: 'work_date',  index: 'work_date',sortable: false, width: 80,fixed: true,key:true,formatter: formmatterDate2},
            {name: 'time1', index: 'time1',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'value1', index: 'value1',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'user_name', index: 'user_name',sortable: false, width: 80,fixed: true},
            {name: 'time2', index: 'time2',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'value2', index: 'value2',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'user_name2', index: 'user_name2',sortable: false, width: 80,fixed: true},
            {name: 'time3', index: 'time3',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'value3', index: 'value3',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'user_name3', index: 'user_name3',sortable: false, width: 80,fixed: true},
            {name: 'time4', index: 'time4',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'value4', index: 'value4',sortable: false, width: 80,fixed: true ,align: 'right'},
            {name: 'user_name4', index: 'user_name4',sortable: false, width: 80,fixed: true}

        ],
        caption: "도형제관리 | MES",
        autowidth: true,
        multiselect: true,
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

function datepickerInput() {
    datepicker_makes("#datepicker",-30);
    datepicker_makes("#datepicker2",0);
}

function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'time1', numberOfColumns: 3, titleText: '<center>1차</center>'},
            {startColumnName: 'time2', numberOfColumns: 3, titleText: '<center>2차</center>'},
            {startColumnName: 'time3', numberOfColumns: 3, titleText: '<center>3차</center>'},
            {startColumnName: 'time4', numberOfColumns: 3, titleText: '<center>4차</center>'}

        ]
    })
}