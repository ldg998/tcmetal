/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var sysUserLog_main_data = {
    check: 'I',
    send_data: {},
    readonly: [],
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    sysUserLog_authcheck();
    sysUserLog_datepickerInput();

    sysUserLog_jqGrid_main(); // main 그리드 생성
    jqGridResize("#sysUserLog_mes_grid" , $('#sysUserLog_mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

    sysUserLog_get_btn(1);

    $(document).keypress(function(e){
        if (e.keyCode === 13 && nowPage === 'sysUserLog'){
            sysUserLog_get_btn(1);
        }
    });
});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function sysUserLog_get_btn(page) {
    sysUserLog_main_data.send_data = value_return(".condition_main");

    $("#sysUserLog_mes_grid").setGridParam({ // 그리드 조회
        url: '/sysUserLogGet',
        datatype: "json",
        page: page,
        postData: sysUserLog_main_data.send_data,
    }).trigger("reloadGrid");
}


////////////////////////////호출 함수/////////////////////////////////////

function sysUserLog_authcheck() { // 권한체크
    ccn_ajax("/menuAuthGet", {keyword: "sysUserLog"}).then(function (data) {
        sysUserLog_main_data.auth = data;
    });
}

function sysUserLog_datepickerInput() {

    datepicker_makes("#sysUserLog_datepicker", -30);
    datepicker_makes("#sysUserLog_datepicker2", 0);
}

function sysUserLog_jqGrid_main() {
    $("#sysUserLog_mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['사용시간', '사용자명', '메뉴명'],
        colModel: [
            {name: 'log_date', index: 'log_date',width:140, formatter: formmatterDate, fixed: true},
            {name: 'user_name', index: 'user_name',width:100, fixed: true},
            {name: 'menu_name', index: 'menu_name',width:200, fixed: true},
        ],
        caption: "사용자사용이력 | MES",
        sortable: true,
        autowidth: true,
        height: 539,
        pager: '#sysUserLog_mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        shrinkToFit: false,
        multiSort: true,
        loadComplete:function(){
            grid_horizon_scroll("#sysUserLog_mes_grid");
        }
    })

}



