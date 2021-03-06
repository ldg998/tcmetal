// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawBasic);


/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {

    send_data: {},
    auth:{}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    selectBox();
    authcheck();
    jqgridPagerIcons();
    modal_start1();
    modal_start2();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.keyword = '';
    main_data.send_data.keyword2 = '';
    $("#mes_grid").setGridParam({
        url: "/qmsProdMiddleListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    ccn_ajax("/procedureLogAdd",{keyword:"중간검사조치기록 조회",keyword2:JSON.stringify(main_data.send_data)})

}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsProdMiddleList2",
                "row0":main_data.send_data.start_date,
                "row1":main_data.send_data.end_date,
                "row2":main_data.send_data.keyword,
                "row3":main_data.send_data.keyword2,
                "row4":main_data.send_data.keyword3
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

// 그리드 내용 더블 클릭 시 실행 수정버튼
function update_btn(rowid) {

    modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할 항목 설정
    ccn_ajax('/qmsProdMiddleListOneGet', {keyword: rowid}).then(function (data) { // user의 하나 출력
        ccn_ajax("/procedureLogAdd",{keyword:"중간검사조치기록 세부조회",keyword2:JSON.stringify({keyword: rowid})})
        data.work_date = formmatterDate2(data.work_date);

        result_ck(data.qc_result);
        modal_edits('.modal_value', [], data); // response 값 출력


        $("#file_01").val("");
        $(".file_labal").text("업로드");

        $("#addDialog").dialog('open'); // 모달 열기
        jqGridResize2("#mes_modal_grid",$('#mes_modal_grid').closest('[class*="col-"]')); //그리드 리 사이즈



    });
}


function img_btn(qc_no) {
    ccn_ajax("/qmsProdMiddleFileGet", {keyword:qc_no}).then(function (data) {
        ccn_ajax("/procedureLogAdd",{keyword:"중간검사조치기록 이미지조회",keyword2:JSON.stringify({keyword: qc_no})})
        $("#wrapper").empty();
        var main_div = $("<div class='swiper-wrapper' id='wrapper2' ></div>");
        $("#wrapper").append(main_div);
        var i = 1;
        while (i <= data.length) {

            var div = $(" " +
                "<div class='swiper-slide'>\n" +
                "               <div class='swiper-zoom-container'>\n" +
                "                   <img src='" + data[i-1].filename + "' id='addDialog_image" + i + "'>\n" +
                "                </div>\n" +
                "            </div>");
            $("#wrapper2").append(div);

            i = i + 1;
        }/*end while*/


        var div2 = $(" <div class='swiper-pagination swiper-pagination-white rm'></div>\n" +
            "        <div class='swiper-button-prev rm'></div>\n" +
            "        <div class='swiper-button-next rm'></div>" +
            "");

        $("#wrapper2").after(div2);
        $("#addDialog2").dialog('open');
        $("#wrapper2").trigger("resize");
        img_swiper();
        img_data = {};
        img_list = [];

    });

}


var agent = navigator.userAgent.toLowerCase();
function file_openPDF(cell) {
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        alert("익스플로러 브라우저는 지원되지 않습니다.");
    }
    else {
        window.open("/uploadFile/qmsProdMiddleErrorMan/"+cell);
        return false;
    }



}
////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdMiddleErrorMan"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $('#main_select1').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "중간검사 조치 | MES",
        colNames: ['검사일자','검사번호','업체','기종','품번','품명','단중','제품LOT','검사결과','수정','폐기','첨부사진','부적합보고서','검사자','검사일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', width: 90, fixed:true,formatter: formmatterDate2},
            {name: 'qc_no', index: 'qc_no', width: 130, key: true, fixed:true},
            {name: 'supp_name', index: 'supp_name', width: 130, fixed:true},
            {name: 'part_kind', index: 'part_kind', width: 130, fixed:true},
            {name: 'part_code', index: 'part_code', width: 130, fixed:true},
            {name: 'part_name', index: 'part_name', width: 190, fixed:true},
            {name: 'part_weight', index: 'part_weight', width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'lot_no', index: 'lot_no', width: 130, fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', width: 60, fixed:true},
            {name: 'result2_name', index: 'result2_name', width: 60, fixed:true},
            {name: 'result3_name', index: 'result3_name', width: 200, fixed:true},
            {name: 'upload_path', index: 'upload_path', width: 70, fixed:true,formatter: image_formatter},
            {name: 'file2', index: 'file2', width: 100, fixed:true, formatter: file3_formatter},
            {name: 'user_name', index: 'user_name', width: 60, fixed:true},
            {name: 'update_date', index: 'update_date', width: 140, fixed:true,formatter: formmatterDate}
        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            update_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}

function image_formatter(cellvalue, options, rowObject) {
    if (cellvalue == "N") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='img_btn(\"" + rowObject.qc_no + "\""+");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    }
}

function img_swiper(){
    var swiper = new Swiper('.swiper-container', {
        zoom: true,
        updateOnWindowResize:true,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    });


}

function result_ck(qc_result){
    if(qc_result == '1'){
        $("#result_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result2_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result3_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("select#result_code option[value='4']").remove();
    }else if(qc_result == '2'){
        $("#result_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result2_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result3_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("select#result_code option[value='4']").remove();
    }else if(qc_result == '3'){
        $("#result_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result2_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result3_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("select#result_code option[value='4']").remove();
    }else if(qc_result == '4'){
        $("#result_code").prop("disabled",false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result2_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#result3_code").prop("disabled",true).trigger("change");//셀렉트박스 잠금으로 체인지
        $("select#result_code").append("<option value='4'>판정대기</option>");
    }
}


function file3_formatter(cellvalue, options, rowObject) {
    if (cellvalue != "" && cellvalue != null && cellvalue != "null") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_openPDF(\"" + cellvalue + "\");'>" +
            "<span><i class='fa fa-search bigger-110 blue'></i>" +
            "<span>보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span>없음</span>" +
            "</span>" +
            "</a>";
    }
}