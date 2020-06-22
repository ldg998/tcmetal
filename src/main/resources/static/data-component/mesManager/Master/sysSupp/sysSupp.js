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
//모달 확인 조회 btn
function test() {
    $("#addDialog").dialog('open');
}
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

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/sysSuppListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly);
        $('#corp_type1').val('N').trigger('change');
        $('#corp_type2').val('N').trigger('change');

        if($("#gubun_select").val() === 'CORP_TYPE1') {
            $('#corp_type1').val('Y').trigger('change');
        }else if($("#gubun_select").val() === 'CORP_TYPE2') {
            $('#corp_type2').val('Y').trigger('change');
        }else if($("#gubun_select").val() === 'CORP_TYPE3') {
            $('#corp_type1').val('Y').trigger('change');
            $('#corp_type2').val('Y').trigger('change');
        }
        $('#use_yn').val('Y').trigger('change');
        $(".file_labal").html("<span><i class=\"fa fa-upload bigger-110 blue\"></i>\n" +
            "                                <span>업로드</span>\n" +
            "                            </span>");
        $("#file_01").val("");
        check1=0;
        main_data.check = 'I';
        $("#tags").autocomplete({source: []});
        $("#tags1").autocomplete({source: []});
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
            if(data.file1 !== '' && data.file1 !== null) {
                $(".file_labal").html("<span><i class=\"fa fa-check bigger-110 blue\"></i>\n" +
                    "                                <span>업로드완료</span>\n" +
                    "                            </span>");
            }else {
                $(".file_labal").html("<span><i class=\"fa fa-upload bigger-110 blue\"></i>\n" +
                    "                                <span>업로드</span>\n" +
                    "                            </span>");
                $("#file1").val("");
            }

            $('#corp_type1').val(data.corp_type1).trigger('change');
            $('#corp_type2').val(data.corp_type2).trigger('change');
            $("#tags").autocomplete({source: []});
            $("#tags1").autocomplete({source: []});

            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var gu4 = String.fromCharCode(4);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var list =[];
        var list2 = [];
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(var i=0; i<ids.length;i++) {
                    jdata=$("#mes_grid").jqGrid('getRowData', ids[i]);
                    list.push(jdata.supp_code+gu4+jdata.file1_f);
                    list2.push(jdata.file1_f);
                }

                wrapWindowByMask2();
                ccn_ajax("/sysSuppListDel",{keyword: list.join(gu5),keyword2: list2.join(gu5)}).then(function (data) {
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
        colNames: ['sitecode','업체코드','업체명','업체명(영문)','대표','사업자번호','업태','종목','전화번호','팩스번호','주소','담당자명','담당자연락처','이메일','매입구분','매출구분','외주','수출구분','비고'],
        colModel: [
            {name: 'site_code',index:'site_code',hidden:true},

            {name: 'supp_code', index: 'supp_code',key:true, width: 60,fixed: true},
            {name: 'supp_name', index: 'supp_name', width: 150,fixed: true},
            {name: 'supp_name_en', index: 'supp_name_en', width: 150,fixed: true},
            {name: '', index: '', width: 50,fixed: true},
            {name: 'supp_no', index: 'supp_no', width: 100,fixed: true},
            {name: 'buss_type', index: 'buss_type', width: 70,fixed: true},
            {name: 'category', index: 'category', width: 100,fixed: true},
            {name: 'tel_no', index: 'tel_no', width: 70,fixed: true},
            {name: 'fax_no', index: 'fax_no', width: 70,fixed: true},
            {name: 'address', index: 'address', width: 250,fixed: true},
            {name: '', index: '', width: 140,fixed: true},
            {name: '', index: '', width: 140,fixed: true},
            {name: '', index: '', width: 140,fixed: true},
            {name: '', index: '', width: 80,fixed: true},
            {name: '', index: '', width: 80,fixed: true},
            {name: '', index: '', width: 80,fixed: true},
            {name: '', index: '', width: 80,fixed: true},
            {name: '', index: '', width: 200,fixed: true},


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
