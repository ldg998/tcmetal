/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth: {},
    check:"Y"
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    datepickerInput();
    authcheck();
    header_make();
    selectBox();
    modal_start1();
    modal2_start();
    // jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();
    disabled_tf(["input[name=out_date]","input[name=ship_date]","input[name=supp_name]"],"Y");
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {

    main_data.send_data = value_return(".condition_main");

    $("#mes_grid").setGridParam({
        url: '/crmShippingGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function modal2_btn() {
    $("#addDialog2").dialog('open');
    jqGridResize2("#mes_modal2_grid1", $('#mes_modal2_grid1').closest('[class*="col-"]'));
}




function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"wmsOutReady",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
                "row2":$('#supp_code_main').val()
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

function add_btn() {
    if (main_data.auth.check_add !="N") { //권한체크
        if (main_data.auth.check_add !="N") {
            modal_reset(".modal_value",[]); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
            main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
            $("input[name=ship_date]").val("");
            $("input[name=out_date]").val("");
            disabled_tf(["input[name=out_no]"],"N");
            $("#addDialog").dialog('open'); // 모달 열기
        } else {
            alert(msg_object.TBMES_A001.msg_name1);
        }
    }
}

// 그리드 내용 더블 클릭 시 실행 수정버튼
function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") { // 권한체크
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할 항목 설정
        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/crmShippingOneGet', {keyword: rowid}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value',[], data); // response 값 출력
            disabled_tf(["input[name=out_no]"],"Y");
            $("#addDialog").dialog('open'); // 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); // 경고메세지 출력
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
                ccn_ajax("/crmShippingDel", {keyword: ids.join(gu5)}).then(function (data) {
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

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
    msgGet_auth("TBMES_A001"); // 추가권한 없음
    msgGet_auth("TBMES_A002"); // 삭제권한 없음
    msgGet_auth("TBMES_A003"); // 수정권한 없음
    msgGet_auth("TBMES_A004"); // 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005"); // 삭제여부
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmShipping"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['선적일자', '전표번호', '업체','운송수단', '해상운임','터미널 핸들링비용','환경','쇼링비','부두이용료','서류발급비','하역료','보험료','항만시설보안료','국내운송비','관세대행수수료','목재비1','목재비2','목재비3','순중량','운송단가','등록자','등록일시'],
        colModel: [
            {name:'ship_date', index: 'ship_date', width: 100, fixed:true,formatter:formmatterDate2},
            {name:'out_no', index: 'out_no',  width: 150,key:true, fixed:true},
            {name:'supp_name', index: 'supp_name',  width: 150, fixed:true},
            {name:'trans_name', index: 'trans_name',  width: 100, fixed:true},
            {name:'ship_cost', index: 'ship_cost',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost1', index: 'port_cost1',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost2', index: 'port_cost2',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost3', index: 'port_cost3',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost4', index: 'port_cost4',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'port_cost5', index: 'port_cost5',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'unloading_cost', index: 'unloading_cost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'landing_ost', index: 'landing_ost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'harbor_facility', index: 'harbor_facility', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'local_cost', index: 'local_cost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'customs_fee', index: 'customs_fee',  width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost1', index: 'wood_cost1', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost2', index: 'wood_cost2', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'wood_cost3', index: 'wood_cost3', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'weight', index: 'weight', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'unit_cost', index: 'unit_cost', width: 100, fixed:true, align: 'right',formatter:'integer'},
            {name:'user_name', index: 'user_name', width: 100, fixed:true},
            {name:'update_date', index: 'update_date',  width: 150, fixed:true,formatter:formmatterDate}

        ],
        multiselect: true,
        caption: '운송비용 관리 | MES',
        autowidth: true,
        height: 532,
        pager: '#mes_grid_pager',
        rowNum: 100,
        overflow:'visible',
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(rowid);
        },
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },

        });


}
function header_make() {
    $("#mes_grid").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'port_cost1', numberOfColumns: 5, titleText: '<center>항구비용</center>'}

            ]
    })
}
function selectBox() {
    select_makes_base("#main_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
    });

    select_makes_base("#main_select2", "/sysCommonAllGet","code_value","code_name1",{keyword:'TRANS_TYPE'},"Y");
}