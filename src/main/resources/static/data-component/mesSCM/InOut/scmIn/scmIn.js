/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var save_rowid;

var main_data = {
    check: 'I',     // 수정,추가 판단용
    supp_check: 'A',//업체 체크
    send_data: {},  //조회시 data  담는용도
    send_data_post: {},
    check2: 'Y',
    auth: {},      //권한체크 후 권한 data 담는 용도
    check3: 'Y',
    status: 'N',
    qcItem_list_string:[]
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get(); //메세지설정
    authcheck(); // 권한체크
    qmsQcItemAllGet();
    datepickerInput(); //날짜 표현형식
    selectBox();     //select Box 데이터 할당
    jqGrid_main();  //main 그리드 생성
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));//그리드 resize
    jqgridPagerIcons(); //그리드 아이콘 설정
    suppModal_start();

});

////////////////////////////클릭 함수/////////////////////////////////////

//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //해당클레스 이름을 가진객체 name value 할당
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');   ////가져온 날짜데이터 가공 2020-06-01 = 20200601

    main_data.send_data_post = main_data.send_data; //데이터 나눠주기
    //console.log(main_data.send_data);
    $("#mes_grid").setGridParam({ //그리드조회
        url: "/scmInGet",    // URL -> RESTCONTROLLER 호출
        datatype: "json",    //json 데이터 형식으로
        page: page,         // 페이지번호
        postData: main_data.send_data //매개변수전달
    }).trigger("reloadGrid");  // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념

    $('#mes_grid2').jqGrid('clearGridData'); //해당 그리드의 데이터삭제 및 업데이트
}


//선택한 그리드의 로우 id를사용해 해당id 와같은 id 를 그리드조회
function under_get(rowid) {
    $("#mes_grid2").setGridParam({
        url: '/scmInSub1Get',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}



// 추가버튼
function add_btn() {
    if (main_data.auth.check_add != "N") { //권한 체크
        $("#modal_get_btn").show();
        $("#modal_add_btn").show();
        modal_reset(".modal_value", []); //해당 클레스명의 value 리셋 readonly name이있다면 그객체를 leadonly
        $("#mes_add_grid").jqGrid('clearGridData');   //해당 그리드의 데이터삭제 및 업데이트
        var date = new Date();  //날짜데이터 호출
        $('#datepicker3').datepicker('setDate', date); //해당 id에 현재날짜 세팅  2020-06-04
        $("#supp_modal_select").prop("disabled", false);
        $("#datepicker3").prop("disabled", false);
        $("#modal1_remark").prop("disabled", false);
        main_data.check = 'I';   //추가권한 부여
        $("#addDialog").dialog('open'); // 모달오픈
        jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]')); //해당그리드 리사이즈
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 오류메세지출력

    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                var gu5 = String.fromCharCode(5);
                wrapWindowByMask2();
                ccn_ajax("/scmInDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                        $('#mes_grid2').jqGrid('clearGridData');
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

////////////////////////////호출 함수/////////////////////////////////////

function qmsQcItemAllGet() {
    ccn_ajax("/qmsQcItemAllGet", {keyword: "1",keyword2:"1"}).then(function (data) {
        main_data.qcItem_list = data;
        main_data.qcItem_list_string=[];
        data.forEach(function (d) {
            main_data.qcItem_list_string.push(d.qc_code+":"+d.qc_name);
        })
        modal_start1();



    }).catch(function (err) {
        console.error(err); // Error 출력
    });
}


function msg_get() {
    msgGet_auth("TBMES_A001"); // 추가권한없음
    msgGet_auth("TBMES_A002"); // 삭제권한없음
    msgGet_auth("TBMES_A003"); // 수정권한없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

function authcheck() { // 권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmIn"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"N")
}

function datepickerInput() {  //초기 날짜할당
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() {  //메인 jqGrid
    $('#mes_grid').jqGrid({
        mtype: 'POST', // post 방식 데이터 전달
        datatype: 'local', // local 설정을 통해 handler 에 재요청하는 경우를 방지
        multiselect: true,  // 다중선택 가능
        caption: '자재입고 | MES', // grid 제목
        colNames: ['입고일자','전표번호','업체명','등록자','등록일시'], // grid 헤더 설정
        colModel: [
            {name: 'work_date', index: "work_date",  fixed: true, width: 90, formatter: formmatterDate2}, // formatter 사용을 통해 데이터 형식 가공
            {name: 'in_no', index: 'in_no',  key: true, fixed: true, width: 120},               // key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: 'supp_name', index: 'supp_name',  fixed: true, width: 130},
            {name: 'user_name', index: 'user_name',  fixed: true, width: 60},
            {name: 'update_date', index: 'update_date',  fixed: true, width: 140, formatter: formmatterDate}
        ],
        autowidth: true, // 그리드 자동 가로 길이 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        height: 243,     // 그리드 세로 길이 설정
        rowNum: 100,    // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], // 페이지당 데이터 수 설정
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        pager: '#mes_grid_pager',            // pager 연결
        beforeSelectRow: function (rowid, e) {   // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            $myGrid.setRowData(save_rowid, false, {background: "#FFFFFF"});
            save_rowid = rowid;
            $myGrid.setRowData(rowid, false, {background: "rgb(190, 220, 260)"});
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) { //클릭시 이벤트 아래그리드 get
            under_get(rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid); //선택한 로우 에 data를 넣고

            update_btn(rowid); //업데이트 버튼 실행
        },
        loadComplete: function () {  //그리드 로드가 진행완료후 실행
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height", "1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height", "0px");
        }
    });

    $('#mes_grid2').jqGrid({  //메인 그리드2(아래 그리드)
        mtype: 'POST',
        datatype: 'local',
        caption: '자재입고 | MES',
        colNames: ['구분', '품번', '품명', '규격', '단위', '입고수량','LOT'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name',  fixed: true, width: 50},
            {name: 'part_code', index: 'part_code',  fixed: true, width: 120},
            {name: 'part_name', index: 'part_name',  fixed: true, width: 190},
            {name: 'spec', index: 'spec',  fixed: true, width: 110},
            {name: 'unit_name', index: 'unit_name',  fixed: true, width: 70},
            {name: 'qty', index: 'qty',  align: 'right', fixed: true, width: 90 ,formatter:'integer'},
            {name: 'lot', index: 'lot',  align: 'right', fixed: true, width: 100}
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',
        loadComplete: function () {
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid2 tr.jqgfirstrow").css("height", "1px");
            else
                $("table#mes_grid2 tr.jqgfirstrow").css("height", "0px");
        }
    });
}

