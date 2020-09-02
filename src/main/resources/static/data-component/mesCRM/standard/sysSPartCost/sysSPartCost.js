/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {},// 조회시 data 담는 용도
    readonly: [],// 설정시 해당 name의 readonly 옵션
    auth:{}     // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    msg_get();      // 메세지 설정
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();    // 권한 체크
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    selectBox();
    datepicker()
});


////////////////////////////클릭 함수/////////////////////////////////////

// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data.keyword3='';
    main_data.send_data.use_yn='Y';
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysSpartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}
// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N"){
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 경고메세지 출력
    }
}

// 그리드 내용 더블 클릭 시 실행
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#mes_modal_grid").jqGrid('clearGridData');
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        main_data.send_data.keyword = jqgrid_data.supp_code;
        main_data.send_data.keyword2 = jqgrid_data.part_kind;
        main_data.send_data.keyword3 = jqgrid_data.part_code;
        main_data.send_data.use_yn = jqgrid_data.use_yn;
            ccn_ajax('/sysSpartGet',  main_data.send_data).then(function (data) {
                data.rows[0].start_date = formmatterDate2(data.rows[0].start_date);
                 data.rows[0].part_weight = integer(String(data.rows[0].part_weight));
                modal_edits('.modal_value', main_data.readonly, data.rows[0]); // response 값 출력

            $("#mes_modal_grid").setGridParam({ // 그리   드 조회
                url: '/sysSpartCostGet',
                datatype: "json",
                page: 1,
                postData: main_data.send_data
            }).trigger("reloadGrid");
            $("#addDialog").dialog('open');// 모달 열기
            jqGridResize2("#mes_modal_grid",$('#mes_modal_grid').closest('[class*="col-"]')); // 그리드 resize
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}
// 삭제 버튼
function add_part_weight() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords = [];
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm('선택 제품의 단가를 변경하시겠습니까?')) {
                main_data.check = 'I';
                for(var i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    data.start_date = data.start_date.replace(/\-/g, '')
                    keywords.push(data.supp_code+ gu4 +data.part_code+ gu4 +data.part_kind + gu4 +data.start_date);
                }
                code_list=keywords.join(gu5);
                var work_date = $('#datepicker1').val().replace(/\-/g, '')
                var  unit_cost    =$('#part_weight').val().replace(/\,/g, '')
                wrapWindowByMask2();
                ccn_ajax("/sysSpartCostAddWeight", {keyword:code_list ,keyword2:work_date,keyword3:unit_cost }).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $("#mes_grid").trigger("reloadGrid");

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
function msg_get() {
    msgGet_auth("TBMES_A001"); //추가권한없음
    msgGet_auth("TBMES_A002"); //삭제권한없음
    msgGet_auth("TBMES_A003"); //수정권한없음
    msgGet_auth("TBMES_A004"); //삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); //삭제여부
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysSPartCost"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['','','','업체','기종','품번','품명','단중','화폐단위','변경일자','금액','등록자','수정일'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name: 'rownum', index: 'rownum',hidden:true,fixed: true,key:true},
            {name: 'use_yn', index: 'use_yn',hidden:true,fixed: true},
            {name: 'supp_code', index: 'supp_code',hidden:true,fixed: true},
            {name:'supp_name',index:'supp_name',sortable: false,width:100,fixed: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {name:'part_kind',index:'part_kind',sortable: false,width:150,fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name:'part_code',index:'part_code',sortable: false,width:150,fixed: true},// fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name:'part_name',index:'part_name',sortable: false,width:150,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:80,fixed: true,formatter: 'integer',align: 'right'},
            {name:'currency_code',index:'currency_code',sortable: false,width:80,fixed: true},
            {name:'start_date',index:'start_date',sortable: false,width:80,fixed: true,formatter:formmatterDate2},
            {name:'max_unit_cost',index:'max_unit_cost',sortable: false,width:80,fixed: true,formatter: 'integer',align: 'right'},
            {name:'cost_user_name',index:'cost_user_name',sortable: false,width:80,fixed: true},
            {name:'cost_create_date',index:'cost_create_date',sortable: false,width:180,fixed: true,formatter:formmatterDate}// formatter 사용을 통해 데이터 형식 가공
        ],
        caption: "제품단가관리 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        multiselect: true,
        height: 600, // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 400], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
                var $myGrid = $(this),
                    i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                    cm = $myGrid.jqGrid('getGridParam', 'colModel');
                return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}


function selectBox() {
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });
}
function datepicker() {
    datepicker_makes("#datepicker1", 0);
}

//
// function supp_select_change() {
//     var supp_code = $('#supp_select').val();
//     if(supp_code == null || supp_code ==''){
//         $("select#part_kind_select option").remove()
//     } else {
//         select_makes_sub("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:supp_code},"N");
//     }
// }


function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}