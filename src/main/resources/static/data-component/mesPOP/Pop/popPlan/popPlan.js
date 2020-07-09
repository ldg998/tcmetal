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
    datepickerInput();
    selectBox();
    authcheck();
    jqgridPagerIcons();
    modal_start1();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
});

////////////////////////////클릭 함수/////////////////////////////////////
function  test() {
    $('#addDialog').dialog('open');
    jqGridResize("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
}

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

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function selectBox() {
    $("#select1").select2();

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
        colNames: ['계획일자','순번','업체','기종','품명','단중','수량','중량','제품LOT','작업자'],
        colModel: [
            {name: '', index: '', sortable: false, key:true, width: 150,fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true},
            {name: '', index: '', sortable: false, width: 180, fixed: true}
        ],
        caption: "생산계획 | MES",
        autowidth: true,
        multiselect: true,
        height: 562,
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