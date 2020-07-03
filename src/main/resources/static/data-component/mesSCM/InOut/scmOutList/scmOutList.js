/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    supp_check: 'A', //초기 업체체크
    send_data: {},  //조회시 data 담는 용도
    auth:{}        // 권한체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();//권한확인
    authcheck();//datepicker 설정
    datepickerInput();//업체선택 모달 호출
    jqGrid_main();//Resize 설정 추가
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));//Pager에 Icon 설정 추가
    jqgridPagerIcons();// 그리드 아이콘설정
});

////////////////////////////클릭 함수/////////////////////////////////////

//조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");//해당 클레스이름의 객체를 불러와 NAME VALUE 를 할당
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');//날짜 모양 가공 2020-06-06 = 20200606
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');//날짜 모양 가공 2020-06-06 = 20200606

    // SP_SCM_IN_LIST_GET
    $("#mes_grid").setGridParam({ //그리드 조회
        url: '/scmInListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid"); //그리드 리로드
}


//엑셀 다운로드
function excel_download() {
    // if (confirm(msg_object.TBMES_Q014.msg_name1)) { //다운로드 여부
    //     var $preparingFileModal = $("#preparing-file-modal"); //해당 id modal 할당
    //     $preparingFileModal.dialog({modal: true});  // 모달 활성화
    //     $("#progressbar").progressbar({value: false}); //화면 정지
    //     $.fileDownload("/excel_download", {  //엑셀 다운로드  호출
    //         httpMethod: 'POST',             //post 형식으로
    //         data : {
    //             "name":"scmInList", //url
    //             "row0":$('#datepicker').val().replace(/-/gi,""),//넘겨줄 데이터
    //             "row1": $('#datepicker2').val().replace(/-/gi,""),//넘겨줄 데이터
    //             "row2":$('#supp_code_main').val()//넘겨줄 데이터
    //         },
    //         successCallback: function (url) {
    //             $preparingFileModal.dialog('close');//성공하면 모달닫기
    //         },
    //         failCallback: function (responseHtml, url) {
    //             $preparingFileModal.dialog('close'); //실패하면 모달닫기
    //             $("#error-modal").dialog({modal: true}); //에러모달 열기
    //         }
    //     });
    //     return false;
    // }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014"); //엑셀 시행메세지
}

//권한 확인 함수
function authcheck() { //권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmOutLits"}).then(function (data) {
        main_data.auth = data;
    });
}

//datepicker 생성 함수
function datepickerInput() { //초기날짜 할당
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

//jqGrid 설정 함수

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['입고일자','입고번호','업체명','품번','품명','규격','단위','출고수량','등록자','등록일시'],
        colModel: [
            {name: '', index: '',sortable: false,key:true,fixed:true,width:150,formatter:formmatterDate2},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150},
            {name: '', index: '',sortable: false, fixed:true, width:150}
        ],
        caption: "자재출고현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        loadComplete : function(data) {
            data.rows.forEach(function (idsfor, s) {
                if (idsfor.work_date === '소계'){
                    $("#mes_grid").setRowData(idsfor.seq, false, {background:"rgb(155, 185, 239)"}) ;

                }
            });

            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },
    });
}