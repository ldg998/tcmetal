/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    supp_check: 'A',//초기 업체 A
    send_data: {},// 조회시 data 담는 용도
    send_data_post: {},//위와 같음
    auth:{} // 권한체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get(); //메세지 설정
    authcheck(); // 권한설정
    datepickerInput(); //초기날짜 배정
    suppModal_start(); // 업체 모달 시작
    jqGrid_main(); //그리드 스타트
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //해당 그리드 리사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정
    select_box();
});

////////////////////////////클릭 함수/////////////////////////////////////
//조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); //해당 클레스이름의 객체를 불러와 NAME VALUE 를 할당

if(main_data.send_data.start_date < main_data.send_data.end_date){
    $("#mes_grid").setGridParam({ //그리드 조회
        url: '/scmOrderListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid"); // 그리드 리로드
}else {
    alert('조회기간 오류')
}
}

//엑셀 다운로드
function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) { //다운로드 여부
        var $preparingFileModal = $("#preparing-file-modal"); //해당 id modal 할당
        $preparingFileModal.dialog({modal: true});   // 모달 활성화
        $("#progressbar").progressbar({value: false}); //화면 정지

        $.fileDownload("/excel_download", {  //엑셀 다운로드  호출
            httpMethod: 'POST', //post 형식으로
            data: {
                "name":"scmOrderList", //url
                "row0":main_data.send_data.start_date, //넘겨줄 데이터
                "row1": main_data.send_data.end_date,//넘겨줄 데이터
                "row2":$('#supp_select').val() //넘겨줄 데이터
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close'); //성공하면 모달닫기
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');     //실패하면 모달닫기
                $("#error-modal").dialog({modal: true}); //에러 모달 열기
            }
        });
        return false;
    }
}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get() { //오류 메세지설정
    msgGet_auth("TBMES_Q014"); //오류메세지 할당
}

function authcheck() { //권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmOrderList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() { //초기 날짜 할당
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function jqGrid_main() { //메인그리드 설정
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['발주일자', '발주번호', '업체명', '품번', '품명', '규격', '단위', '상태', '발주수량', '입고수량', '미입고'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, formatter: formmatterDate2,fixed:true, width:90},
            {name: 'ord_no', index: 'ord_no', sortable: false,fixed:true, width:120},
            {name: 'supp_name', index: 'supp_name', sortable: false,fixed:true, width:130},
            {name: 'part_code', index: 'part_code', sortable: false,fixed:true, width:120},
            {name: 'part_name', index: 'part_name', sortable: false,fixed:true, width:190},
            {name: 'spec', index: 'spec', sortable: false,fixed:true, width:150},
            {name: 'unit_name', index: 'unit_name', sortable: false,fixed:true, width:60},
            {name: 'status_name', index: 'status_name', sortable: false,fixed:true, width:70},
            {name: 'ord_qty', index: 'ord_qty', sortable: false,formatter:'integer', align: 'right',fixed:true, width:90},
            {name: 'qty', index: 'qty', sortable: false,formatter:'integer', align: 'right',fixed:true, width:90},
            {name: 'not_qty', index: 'not_qty', sortable: false, formatter:'integer', align: 'right',fixed:true, width:90},

          ],
        caption: '발주현황 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid tr.jqgfirstrow").css("height","1px");
            else
                $("table#mes_grid tr.jqgfirstrow").css("height","0px");
        }
    });
}

function select_box() {
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"Y")
}