/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['supp_code'],
    auth:{}
};

var check1 = 0;

////////////////////////////시작 함수//////////////////////////////////
$(document).ready(function () {
    msg_get();
    selectBox();
    modal_start1();
    authcheck();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    jqgridPagerIcons();

});


////////////////////////////클릭 함수//////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;

    $("#mes_grid").setGridParam({
        url: '/sysSuppListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
    var corp_type = $('#gubun_select').val()

        modal_reset(".modal_value", main_data.readonly);
        $('#corp_type1').val('N').trigger('change');
        $('#corp_type2').val('N').trigger('change');
        $('#corp_type3').val('N').trigger('change');
        $('#corp_type4').val('N').trigger('change');
        $('#use_yn').val('N').trigger('change');

        $('#'+corp_type).val('Y').trigger('change');

        main_data.check = 'I';
        $("#addDialog").dialog('open');
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U';
        var send_data = {};
        send_data.keyword = jqgrid_data.supp_code;
        send_data.keyword2 = jqgrid_data.supp_no;
        ccn_ajax('/sysSuppOneGet', send_data).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';

                wrapWindowByMask2();
                ccn_ajax("/sysSuppListDel",{keyword: ids.join(gu5)}).then(function (data) {
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

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "sysSupp",
                "row0": $("#gubun_select").val(),
                "row1": $("#keyword2").val(),
                "row2": $("#keyword3").val()
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

////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysSupp"}).then(function (data) {
        main_data.auth = data;
    });
}

function selectBox() {
    $('#gubun_select').select2();
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['업체코드','업체명','업체명2','대표','사업자번호','업태','종목','전화번호','팩스번호','주소','담당자명','담당자연락처','이메일','매입구분','매출구분','외주','수출구분','비고'],
        colModel: [
            //{name: 'site_code',index:'site_code',hidden:true},
            {name: 'supp_code', index: 'supp_code',key:true, width: 60,fixed: true},
            {name: 'supp_name', index: 'supp_name', width: 120,fixed: true},
            {name: 'supp_name2', index: 'supp_name_en', width: 130,fixed: true},
            {name: 'ceo', index: 'ceo', width: 50,fixed: true},
            {name: 'supp_no', index: 'supp_no', width: 100,fixed: true},
            {name: 'buss_type', index: 'buss_type', width: 70,fixed: true},
            {name: 'category', index: 'category', width: 100,fixed: true},
            {name: 'tel_no', index: 'tel_no', width: 130,fixed: true},
            {name: 'fax_no', index: 'fax_no', width: 110,fixed: true},
            {name: 'address', index: 'address', width: 250,fixed: true},
            {name: 'emp_name', index: 'emp_name', width: 140,fixed: true},
            {name: 'emp_tel', index: 'emp_tel', width: 140,fixed: true},
            {name: 'emp_email', index: 'emp_email', width: 140,fixed: true},
            {name: 'corp_type1', index: 'corp_type1', width: 80,fixed: true},
            {name: 'corp_type2', index: 'corp_type2', width: 80,fixed: true},
            {name: 'corp_type3', index: 'corp_type3', width: 80,fixed: true},
            {name: 'corp_type4', index: 'corp_type4', width: 80,fixed: true},
            {name: 'remark', index: 'remark', width: 200,fixed: true},


        ],
        caption: "업체정보 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
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
