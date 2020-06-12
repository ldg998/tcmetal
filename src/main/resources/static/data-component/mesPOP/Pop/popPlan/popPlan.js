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
    change: 'Y',
    check2:'Y',

};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();
    selectBox();
    modal_start1();
    modal_start2();
    modal_start3();
    suppModal_start();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);

    //workDocumentMake();

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


function under_get_btn(value) {

    $("#mes_grid2").setGridParam({
        url: "/popPlanGet",
        datatype: "json",
        page: 1,
        postData: {keyword:value}
    }).trigger("reloadGrid");
}

function add_btn() {
    if(main_data.auth.check_add != "N") {
        var checkid =  $("#mes_grid").getGridParam( "selrow" );
        if (checkid !== null){
            $('#mes_modal1_grid1').jqGrid('clearGridData');

            ccn_ajax('/crmOrderRecpOneGet', {keyword:checkid}).then(function (data) { // user의 하나 출력
                modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
                modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
                main_data.check = 'I'; // 저장인지 체크
                part_name_reset();
                datepicker_makes("#datepicker3", 0);
                $("#prod_type1_modal1_select option:eq(0)").prop("selected", true).trigger("change");
                $("#prod_type_modal1_select").prop("disabled",false).trigger('change');
                $("#prod_code_modal1_select").prop("disabled",false).trigger('change');

                $("#addDialog").dialog('open');
                jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
            });

        } else {
            alert("수주정보를 선택해주세요.");
        }
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

        main_data.check = 'U'; // 수정인지 체크

        part_name_reset();
        $("#image_modal").val("");
        delcheck = 0;

        ccn_ajax('/popPlanOneGet', {keyword:jqgrid_data.plan_no}).then(function (data) { // user의 하나 출력
            data.plan_date = formmatterDate2(data.plan_date);
            main_data.check2 = 'N';

            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            select_makes_base('#prod_code_modal1_select', "/sysProdAllGet","prod_code" ,"prod_name",{keyword:data.prod_type},'N').then(function (){
                $('#prod_code_modal1_select').val(data.prod_code).trigger("change");
                $('#part_name_code_modal1_select').val(data.part_name_code).trigger("change");
                $('#route_code_modal1_select').val(data.route_code).trigger("change");

                $("#prod_type_modal1_select").prop("disabled",true).trigger('change');
                $("#prod_code_modal1_select").prop("disabled",true).trigger('change');

                main_data.check2 = 'Y';

                part_name_value_change_update(data);

                ccn_ajax('/popPlanSubGet', {keyword:jqgrid_data.plan_no}).then(function (data2) {
                    $("#mes_modal1_grid1").setGridParam({
                        datatype: "local",
                        data: data2
                    }).trigger("reloadGrid");
                    $("#addDialog").dialog('open');
                });

            });

        });
    } else {
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



////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function selectBox() {
    $("#status_select_main").select2();


}

function part_name_reset() {
    $("#bcr_contents").val("");
    $("#part_name1").text("");
    $("#part_name2").text("");
    $("#part_name3").text("");
    $("#part_name4").text("");
    $("#part_name5").text("");
    $("#part_name6").text("");
    $("#part_name7").text("");
    $("#part_name8").text("");
    $("#part_name9").text("");
    $("#part_name10").text("");
    $("select[name=part_code1]").val("").trigger("change");
    $("select[name=part_code2]").val("").trigger("change");
    $("select[name=part_code3]").val("").trigger("change");
    $("select[name=part_code4]").val("").trigger("change");
    $("select[name=part_code5]").val("").trigger("change");
    $("select[name=part_code6]").val("").trigger("change");
    $("select[name=part_code7]").val("").trigger("change");
    $("select[name=part_code8]").val("").trigger("change");
    $("select[name=part_code9]").val("").trigger("change");
    $("select[name=part_code10]").val("").trigger("change");
    $("select[name=part_code1]").prop("disabled",true).trigger('change');
    $("select[name=part_code2]").prop("disabled",true).trigger('change');
    $("select[name=part_code3]").prop("disabled",true).trigger('change');
    $("select[name=part_code4]").prop("disabled",true).trigger('change');
    $("select[name=part_code5]").prop("disabled",true).trigger('change');
    $("select[name=part_code6]").prop("disabled",true).trigger('change');
    $("select[name=part_code7]").prop("disabled",true).trigger('change');
    $("select[name=part_code8]").prop("disabled",true).trigger('change');
    $("select[name=part_code9]").prop("disabled",true).trigger('change');
    $("select[name=part_code10]").prop("disabled",true).trigger('change');
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlan"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['수주일자','수주번호','업체명', '현장명', '담당자','연락처', '수주내용',  '납품예정일', '상태','납품일자',
            '수주금액','결재1','결재2','결재3','결재4','잔액','비고','등록자','등록일시'],
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
            {name: 'order_amount', index: 'order_amount', sortable: false, width: 150,formatter: 'integer',fixed: true},
            {name: 'amount1', index: 'amount1', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right'},
            {name: 'amount2', index: 'amount2', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right'},
            {name: 'amount3', index: 'amount3', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right'},
            {name: 'amount4', index: 'amount4', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right'},
            {name: 'balance', index: 'balance', sortable: false, width: 150,formatter: 'integer',fixed: true,align: 'right'},
            {name: 'remark', index: 'remark', sortable: false, width: 150,fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150,formatter:formmatterDate,fixed: true},

        ],
        caption: "생산계획관리 | MES",
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        onCellSelect: function (rowid, icol, cellcontent, e) {
            under_get_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }

    });

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "생산계획관리 | MES",
        colNames: ['계획일자','계획번호','제품구분','제품명','내용','status','상태','라우팅','작업의뢰서','참고이미지'],
        colModel: [
            {name: 'plan_date', index: 'plan_date', width: 185, sortable: false,fixed:true,formatter:formmatterDate2},
            {name: 'plan_no', index: 'plan_no',key:true, width: 150, sortable: false,fixed:true},
            {name: 'prod_type_name', index: 'prod_type_name', width: 150, sortable: false,fixed:true},
            {name: 'prod_name', index: 'prod_name', width: 160, sortable: false,fixed:true},
            {name: 'plan_name', index: 'plan_name', width: 160, sortable: false,fixed:true},
            {name: 'status', index: 'status', width: 160,hidden:true, sortable: false,fixed:true},
            {name: 'status_name', index: 'status_name', width: 160, sortable: false,fixed:true},
            {name: 'route_name', index: 'route_name', width: 160, sortable: false,fixed:true},
            {name: 'report_status_name', index: 'report_status_name', width: 160, sortable: false,fixed:true,formatter:report_status_formatter},
            {name: 'image5', index: 'image5', width: 160, sortable: false,fixed:true,formatter:image_formatter},
        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',
        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid2').jqGrid('getRowData', rowid);
            update_btn(data);
        },

    });
}
function report_status_formatter(cellvalue, options, rowObject) {

    return "" +
        " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
        "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='report_status_show(\"" + rowObject.plan_no + "\",\""+rowObject.status +"\");'>" +
        "<span><i class='fa fa-search bigger-110 blue'></i>" +
        "<span> "+cellvalue+"</span>" +
        "</span>" +
        "</a>";

}

function image_formatter(cellvalue, options, rowObject) {
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


function image_show(value) {
    var image1= value.split("/");
    var index1 = image1.length;
    $("#addDialog2_image").attr("src","/uploadFile/popPlan/image5/"+image1[index1-1]);

    $("#addDialog2").dialog('open');
}