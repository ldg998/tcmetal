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
    status: 'N'
};

////////////////////////////시작 함수/////////////////////////////////////
$(document).ready(function () {
    msg_get(); //메세지설정
    authcheck(); // 권한체크
    modal_start1();    //모달 실행
    datepickerInput(); //날짜 표현형식
    jqGrid_main();  //main 그리드 생성
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));//그리드 resize
    jqgridPagerIcons(); //그리드 아이콘 설정
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////
//모달 확인 조회 btn

//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //해당클레스 이름을 가진객체 name value 할당
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');   ////가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data_post = main_data.send_data; //데이터 나눠주기
    //console.log(main_data.send_data);
    $("#mes_grid").setGridParam({ //그리드조회
        url: "/scmOrderGet",    // URL -> RESTCONTROLLER 호출
        datatype: "json",    //json 데이터 형식으로
        page: page,         // 페이지번호
        postData: main_data.send_data //매개변수전달
    }).trigger("reloadGrid");  // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념

    $('#mes_grid2').jqGrid('clearGridData'); //해당 그리드의 데이터삭제 및 업데이트
}

//선택한 그리드의 로우 id를사용해 해당id 와같은 id 를 그리드조회
function under_get(rowid) {
    $("#mes_grid2").setGridParam({
        url: '/scmOrderSubGet',
        datatype: "json",
        page: 1,
        postData: {keyword: rowid}
    }).trigger("reloadGrid");
}

// 추가버튼
function add_btn() {
    var code = $('#supp_code_main').val();
    main_data.check3 = 'Y';
    main_data.check2 = 'Y';
    main_data.status = 'N';
    if (main_data.auth.check_add != "N") { //권한 체크
        $('#supp_code_modal').attr('disabled', false);// 셀렉트박스 리드온리 해제
        modal_reset(".modal_value", []); //해당 클레스명의 value 리셋 readonly name이있다면 그객체를 leadonly
        $("#mes_add_grid").jqGrid('clearGridData');   //해당 그리드의 데이터삭제 및 업데이트
        $("#mes_add_grid2").jqGrid('clearGridData');  //해당 그리드의 데이터삭제 및 업데이트

        var date = new Date();  //날짜데이터 호출
        var date2 = new Date(); //날짜데이터 호출
        date2.setDate(date.getDate() + 1); //현재날짜에 + 1
        $('#datepicker3').datepicker('setDate', date); //해당 id에 현재날짜 세팅  2020-06-04
        $('#datepicker4').datepicker('setDate', date2); // 해당 id에 현재날짜+1 세팅 2020-06-05
        $('#supp_code_modal').prop("selected",code).trigger("change")// 해당 셀렉트에 selected 를 해당 value 값으로 바꾼다

        $("#crm_ord_no").prop("disabled",false).trigger('change');    //수주번호
        main_data.check = 'I';   //추가권한 부여
        $("#addDialog").dialog('open'); // 모달오픈
        trigger_false();
        jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]')); //해당그리드 리사이즈
        jqGridResize2("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]')); //해당그리드 리사이즈
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 오류메세지출력

    }
}

//삭제버튼
function delete_btn() {
    if (main_data.auth.check_del != "N") { //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드 char5 담아추기
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크한 그리도 로우 가져오기
        var check = '';
        var check2 = [];
        if (ids.length === 0) { //체크 여부
            alert(msg_object.TBMES_A004.msg_name1); // 오류메세지출력
        } else {

            ids.forEach(function (id) { //체크한 로우만큼 반복
                check = $('#mes_grid').jqGrid('getRowData', id).status; //check = 선택한 로우id 에 데이터에 있는 status(상태) 번호이다
                if (check === '1') { //상태번호가 1이면
                    check2.push(id); //check2[] 에 담아준다
                }
            });
            if (check2.length > 0) { //체크2에 존재유무 체크
                alert(check2.join(",") + " 전표가 완료 되어있습니다.");
            } else {
                if (confirm(msg_object.TBMES_A005.msg_name1)) { //실행유무
                    main_data.check = 'D';   //삭제권한부여
                    wrapWindowByMask2();    //삭제하는동안 마스크
                    ccn_ajax("/scmOrderDel", {ord_no: ids.join(gu5)}).then(function (data) { //아스키 코드를 추가한 데이터 넘겨주기
                        if (data.result === 'NG') { //프로시저 메세지 가 ng 라면
                            alert(data.message);   //오류메세지 출력
                        } else {
                            $("#mes_grid").trigger("reloadGrid"); //화면 리로딩
                        }
                        $('#mes_grid2').jqGrid('clearGridData'); //해당 그리드 삭제 및 업데이트
                        closeWindowByMask(); //마스크 해제
                    }).catch(function (err) {
                        closeWindowByMask(); // 마스크해제
                        console.error(err); // Error 출력
                    });
                }
            }
            $('#mes_grid').jqGrid("resetSelection");   //해당그리드 재검색
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);// 오류메세지 출력

    }
}

//완료처리버튼
function complete_btn() {
    if (main_data.auth.check_edit != "N") {
        var gu5 = String.fromCharCode(5);             //아스키코드5
        var ids = $("#mes_grid").getGridParam('selarrrow'); //선택한 그리드 로우
        if (ids.length === 0) {                             //선택여부
            alert("완료처리하는 데이터를 선택해주세요");
        } else {
            if (confirm("완료처리 하시겠습니까?")) {           //시행여부
                wrapWindowByMask2();                       //마스크 온
                ccn_ajax("/scmOrderComp", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger("reloadGrid"); //화면 리로딩
                        $('#mes_grid2').jqGrid('clearGridData');
                    }
                    closeWindowByMask();                //마스크 오프
                }).catch(function (err) {
                    closeWindowByMask();                //마스크 오프
                    console.error(err); // Error 출력
                });
            }
            $('#mes_grid').jqGrid("resetSelection");    //그리드 전체 선택해제
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1);         //오류메세지 출력
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001"); // 추가권한없음
    msgGet_auth("TBMES_A002"); // 삭제권한없음
    msgGet_auth("TBMES_A003"); // 수정권한없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

function authcheck() { // 권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmOrder"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#status_select').select2();

    select_makes_base("#supp_code_main","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"Y")
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
        caption: '발주등록 | MES', // grid 제목
        colNames: ['','','발주일자', '전표번호', '업체명', '상태', '납기일자', '납품장소', '등록자', '등록일시'], // grid 헤더 설정
        colModel: [
            {name: 'supp_code', index: 'supp_code', sortable: false, hidden:true},
            {name: 'status', index: 'status', sortable: false, hidden:true},
            {name: 'work_date', index: 'work_date', sortable: false, formatter: formmatterDate2, fixed: true, width: 100}, // formatter 사용을 통해 데이터 형식 가공
            {name: 'ord_no', index: 'ord_no', sortable: false, key: true, fixed: true, width: 130},               // key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name: 'supp_name', index: 'supp_name', sortable: false, fixed: true, width: 130},
            {name: 'status_name', index: 'status_name', sortable: false, fixed: true, width: 100},
            {name: 'delivery_date', index: 'delivery_date', sortable: false, formatter: formmatterDate2, fixed: true, width: 200},
            {name: 'delivery_place', index: 'delivery_place', sortable: false, fixed: true, width: 150},
            {name: 'user_name', index: 'user_name', sortable: false, fixed: true, width: 100},
            {name: 'update_date', index: 'update_date', sortable: false,fixed:  true,width: 150,formatter: formmatterDate}
        ],
        autowidth: true, // 그리드 자동 가로 길이 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        height: 243,     // 그리드 세로 길이 설정
        rowNum: 100,    // 1페이지당 데이터 수
        rowList: [100, 200, 300, 500, 1000], // 페이지당 데이터 수 설정
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
            if (data.status === '1') { //상태 구분
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
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
        caption: '발주등록 | MES',
        colNames: ['구분', '품번', '품명', '규격', '단위', '발주수량', '입고수량', '미입고'],
        colModel: [
            {name: 'part_type_name', index: 'part_type_name', sortable: false},
            {name: 'part_code', index: 'part_code', sortable: false},
            {name: 'part_name', index: 'part_name', sortable: false},
            {name: 'spec', index: 'spec', sortable: false},
            {name: 'unit_name', index: 'unit_name', sortable: false},
            {name: 'ord_qty', index: 'ord_qty', sortable: false, align: 'right',formatter:'integer'},
            {name: 'qty', index: 'qty', sortable: false, align: 'right',formatter:'integer'},
            {name: 'not_qty', index: 'not_qty', sortable: false, align: 'right',formatter:'integer'}
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

