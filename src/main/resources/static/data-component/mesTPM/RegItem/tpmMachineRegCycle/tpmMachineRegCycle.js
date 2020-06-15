/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', //수정/추가 판단용
    send_data: {}, //조회시 data담는용
    send_data_post: {}, //수정,삭제 시 재조회할때 조건을 담는용
    readonly: [], //readonly용
    auth:{} //권한체크용
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    authcheck(); //권한체크
    msg_get(); //메세지 함수
    selectBox(); //selectbox

    /*** 모달 ***/
    modal_start1(); //모달1시작함수

    /*** 그리드 ***/
    jqGrid_main(); //그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqgridPagerIcons();//그리드 아이콘 설정
});

////////////////////////////클릭 함수//////////////////////////////////
//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //조회조건을 받아옴
    main_data.send_data_post = main_data.send_data; // 조건값 저장

    $("#mes_grid").setGridParam({ //그리드 조회
        url: '/tpmMachineRegGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 수정/삭제시 동일 조건으로 조회
function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/tpmMachineRegGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post //저장한 조건값
    }).trigger("reloadGrid");
}

//추가버튼
function add_btn() {
    if(main_data.auth.check_add != "N") { //권한 체크
        main_data.check = 'I'; //저장(insert)
        modal_reset(".modal_value", main_data.readonly) //데이터 리셋
        var date = new Date(); //날짜생성
        date.setDate(date.getDate() + 1); //다음날로 저장
        $("#datepicker3").datepicker('setDate', date); //다음날로 set

        if ($('#line_select').val() !== '' && $('#line_select').val() !== null){ //라인 !== 전체
            $('#line_select2').val($('#line_select').val()).prop("selected",true).trigger("change");//라인
        } else {
            $('#line_select2').val('').prop("selected", true).trigger("change");
        }
        $("select[name=qc_code] option:eq(0)").prop("selected", true).trigger("change");
        $("select[name=cycle_type] option:eq(0)").prop("selected", true).trigger("change");

        $('#line_select2').prop("disabled", false);
        $('#machine_select2').prop("disabled", false);
        $('#qc_select').prop("disabled", false);

        $("#addDialog").dialog('open'); //모달창 오픈
        jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]')); //그리드 resize
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 추가권한X
    }
}

function select_change1(value) {
    if (value !== '' && value !== null ){
        select_makes_sub("#machine_select","/tpmMachineAllGet","machine_code","machine_name",{keyword:value},"Y");
    } else {
        $('#machine_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#machine_select').append(option);
        $('#machine_select').select2();
    }
}

//수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        main_data.check = 'U';
        modal_reset(".modal_value", []);
        var send_data = {};
        send_data.keyword = jqgrid_data.line_code;
        send_data.keyword2 = jqgrid_data.machine_code;
        send_data.keyword3 = jqgrid_data.qc_code;
        ccn_ajax('/tpmMachineRegOneGet', send_data).then(function (data) {
            data.start_date = formmatterDate2(data.start_date);
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력

            if(data.line_code === 'AAAAA') {
                $('#line_select2').val('').trigger("change");
            } else {
                $('#line_select2').val(data.line_code).trigger("change");
            }
            select_makes_sub_ajax2("#machine_select2","/tpmMachineAllGet","machine_code","machine_name",{keyword:data.line_code},"Y").then(function (data2) {
                if(data.machine_code === 'AAAAA') {
                    $('#machine_select2').val('').trigger("change");
                }else {
                    $('#machine_select2').val(data.machine_code).trigger("change");
                }
                $('#line_select2').prop("disabled", true);
                $('#machine_select2').prop("disabled", true);
                $('#qc_select').prop("disabled", true);
                $("#addDialog").dialog('open');
            });
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

//삭제버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords = [];
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    keywords.push(data.machine_code+gu4+data.qc_code+gu4+data.line_code);
                }
                code_list=keywords.join(gu5);
                wrapWindowByMask2();
                ccn_ajax("/tpmMachineRegDel", {keyword:code_list}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
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
//메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "tpmMachineRegCycle"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    part_type_select_ajax_all("#line_select", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''}).then(function (data){
        $('#machine_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#machine_select').append(option);
        $('#machine_select').select2();
    });
}

//jqgrid 설정
function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['rownum','line_code','machine_code','공정명','설비명', '점검항목코드', '점검항목명','반복구분', '시작일','등록자','수정일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', key: true, hidden:true, sortable: false},
            {name: 'line_code', index: 'line_code', hidden:true, sortable: false},
            {name: 'machine_code', index: 'machine_code', hidden:true, sortable: false},
            {name: 'line_name', index: 'line_name', sortable: false, width: 130,fixed:true},
            {name: 'machine_name', index: 'machine_name', sortable: false, width: 130,fixed:true},
            {name: 'qc_code', index: 'qc_code', sortable: false, width: 80,fixed:true},
            {name: 'qc_name', index: 'qc_name', sortable: false, width: 120,fixed:true},
            {name: 'cycle_type_name', index: 'cycle_type_name', sortable: false, width: 70,fixed:true},
            {name: 'start_date', index: 'start_date', sortable: false, width: 100, formatter: formmatterDate2,fixed:true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},
            {name: 'update_date', index: 'update_date', width: 140, sortable: false, formatter: formmatterDate,fixed:true}
        ],
        caption: "예방점검주기설정 | MES", //grid 제목
        autowidth: true, //그리드 가로 자동설정
        height: 562, //세로
        pager: '#mes_grid_pager', //pager 연결(jsp랑 id동일)
        rowNum: 100, //한 페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], //페이지당 데이터 수 설정
        viewrecords: true, //그리드 하단 현재 컬럼 / 총컬럼 수 명시
        multiselect: true, // 다중선택 가능
        beforeSelectRow: function (rowid, e) { // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){ // 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false}); // grid_pager 에 검색 삭제 수정 추가 기능 설정
}
