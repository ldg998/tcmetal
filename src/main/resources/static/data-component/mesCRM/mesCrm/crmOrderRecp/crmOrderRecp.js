/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{},
    change: 'Y'
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    selectBox();
    modal_start1();
    modal_start2();
    suppModal_start();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);


});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/crmOrderRecpGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: "/crmOrderRecpGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        datepicker_makes("#datepicker3", 0);
        datepicker_makes("#datepicker4", 1);
        datepicker_makes("#datepicker5", 1);

        $("#image_seach_btn1").text("찾기");
        $("#image_seach_btn2").text("찾기");
        $("#image_seach_btn3").text("찾기");
        $("#image_seach_btn4").text("찾기");
        $("#image_seach_btn5").text("찾기");
        $("#image_modal1").val("");
        $("#image_modal2").val("");
        $("#image_modal3").val("");
        $("#image_modal4").val("");
        $("#image_modal5").val("");

        delcheck = {
            delcheck1:0,
            delcheck2:0,
            delcheck3:0,
            delcheck4:0,
            delcheck5:0,
        }

        $("#status_modal_select option:eq(0)").prop("selected", true).trigger("change");

        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);

    }
}

function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();

                ccn_ajax("/crmOrderRecpDel", {keyword: ids.join(gu5)}).then(function (data) {
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


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        $("#image_seach_btn1").text("찾기");
        $("#image_seach_btn2").text("찾기");
        $("#image_seach_btn3").text("찾기");
        $("#image_seach_btn4").text("찾기");
        $("#image_seach_btn5").text("찾기");
        $("#image_modal1").val("");
        $("#image_modal2").val("");
        $("#image_modal3").val("");
        $("#image_modal4").val("");
        $("#image_modal5").val("");

        delcheck = {
            delcheck1:0,
            delcheck2:0,
            delcheck3:0,
            delcheck4:0,
            delcheck5:0,
        };

        main_data.check = 'U'; // 수정인지 체크
        wrapWindowByMask2();
        ccn_ajax('/crmOrderRecpOneGet', {keyword:jqgrid_data.ord_no}).then(function (data) { // user의 하나 출력
            data.work_date = formmatterDate2(data.work_date);
            data.target_date = formmatterDate2(data.target_date);
            data.end_date = formmatterDate2(data.end_date);
            data.order_amount = data.order_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            data.balance = data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // console.log(data);

            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력

            if (data.image1 !== null){
                $("#image_seach_btn1").text("완료");
            }
            if (data.image2 !== null){
                $("#image_seach_btn2").text("완료");
            }
            if (data.image3 !== null){
                $("#image_seach_btn3").text("완료");
            }
            if (data.image4 !== null){
                $("#image_seach_btn4").text("완료");
            }
            if (data.image5 !== null){
                $("#image_seach_btn5").text("완료");
            }

            closeWindowByMask();
            $("#addDialog").dialog('open');
        });
    } else {
        closeWindowByMask();
        alert(msg_object.TBMES_A003.msg_name1);
    }
}



function supp_btn(what) {
    main_data.supp_check = what;
    $("#SuppSearchGrid").jqGrid('clearGridData');
    $("#supp-search-dialog").dialog('open');
    $('#gubun_select option:eq(0)').prop("selected", true).trigger("change");
    $('#supp_code_search').val('').trigger("change");
    jqGridResize2("#SuppSearchGrid", $('#SuppSearchGrid').closest('[class*="col-"]'));
}

function suppModal_bus(code, name) {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val(name);
        $("#supp_code_main").val(code);
    } else if (main_data.supp_check === 'B') {

        ccn_ajax('/sysSuppOneGet', {keyword:code}).then(function (data) {
            // console.log(data);
            $("#supp_name_modal").val(name);
            $("#supp_code_modal").val(code);
            $("#supp_user_name").val(data.emp_name);
            $("#supp_tel_no").val(data.emp_tel);
        });

    }
    $("#SuppSearchGrid").jqGrid('clearGridData');

}

function suppModal_close_bus() {
    if (main_data.supp_check === 'A') {
        $("#supp_name_main").val("");
        $("#supp_code_main").val("");
    }
    $("#SuppSearchGrid").jqGrid('clearGridData');
}

function image_show(value) {
    $("#addDialog2_image").attr("src",value);
    $("#addDialog2").dialog('open');
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
    msgGet_auth("TBMES_Q014");
}

function selectBox() {
   $("#status_select_main").select2();
}


function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "crmOrderRecp"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['수주일자','수주번호','업체명', '현장명', '담당자','연락처', '수주내용',  '납품예정일', '상태','납품일자','수주금액','결제1','결제2','결제3','결제4','잔액','비고','이미지1','이미지2','이미지3','이미지4','이미지5','등록자','등록일시'],
        colModel: [
            {name: 'work_date', index: 'work_date',formatter:formmatterDate2,  sortable: false, fixed: true},
            {name: 'ord_no', index: 'ord_no', sortable: false, key:true, width: 150,fixed: true},
            {name: 'supp_name', index: 'supp_name',hidden:true, sortable: false},
            {name: 'place_name', index: 'place_name', sortable: false, width: 180, fixed: true},
            {name: 'emp_name', index: 'emp_name', sortable: false, width: 180, fixed: true},
            {name: 'emp_tel', index: 'emp_tel', sortable: false, width: 150,fixed: true},
            {name: 'ord_name', index: 'ord_name', sortable: false, width: 150,fixed: true},
            {name: 'target_date', index: 'target_date', sortable: false, width: 150,formatter:formmatterDate2,fixed: true},
            {name: 'status_name', index: 'status_name', sortable: false, width: 150,fixed: true},
            {name: 'end_date', index: 'end_date', sortable: false, width: 150,formatter:formmatterDate2,fixed: true},
            {name: 'order_amount', index: 'order_amount', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'amount1', index: 'amount1', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'amount2', index: 'amount2', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'amount3', index: 'amount3', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'amount4', index: 'amount4', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'balance', index: 'balance', sortable: false, width: 150,formatter: 'integer',fixed: true,align:'right'},
            {name: 'remark', index: 'remark', sortable: false, width: 150,fixed: true},
            {name: 'image1', index: 'image1', width: 150, sortable: false,fixed: true,formatter:image_formatter1},
            {name: 'image2', index: 'image2', width: 150, sortable: false,fixed: true,formatter:image_formatter2},
            {name: 'image3', index: 'image3', width: 150, sortable: false,fixed: true,formatter:image_formatter3},
            {name: 'image4', index: 'image4', width: 150, sortable: false,fixed: true,formatter:image_formatter4},
            {name: 'image5', index: 'image5', width: 150, sortable: false,fixed: true,formatter:image_formatter5},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150,formatter:formmatterDate,fixed: true},
        ],
        caption: "수주정보관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
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
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    });
}


function image_formatter1(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image1 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}
function image_formatter2(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image2 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}
function image_formatter3(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image3 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}
function image_formatter4(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image4 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}
function image_formatter5(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image5 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}

