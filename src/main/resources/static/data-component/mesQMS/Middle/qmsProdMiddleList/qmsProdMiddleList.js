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
    $("#mes_grid").setGridParam({
        url: "/qmsProdMiddleListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

    ccn_ajax("/procedureLogAdd",{keyword:"중간검사현황 조회",keyword2:JSON.stringify(main_data.send_data)})

}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsProdMiddleList",
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
function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}


// 그리드 내용 더블 클릭 시 실행 수정버튼
function update_btn(rowid) {

    modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할 항목 설정
    ccn_ajax('/qmsProdMiddleListOneGet', {keyword: rowid}).then(function (data) { // user의 하나 출력
        data.work_date = formmatterDate2(data.work_date);
        modal_edits('.modal_value', [], data); // response 값 출력
        ccn_ajax('/qmsProdMiddleSubGet', {keyword: rowid}).then(function (data) {
            $("#mes_modal_grid").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");
            ccn_ajax("/procedureLogAdd",{keyword:"중간검사현황 세부조회",keyword2:JSON.stringify({keyword: rowid})})
            $("#addDialog").dialog('open'); // 모달 열기
            jqGridResize2("#mes_modal_grid",$('#mes_modal_grid').closest('[class*="col-"]')); //그리드 리 사이즈


        });



    });

}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            main_data.check = 'D';
            var check = "Y"
            for(i=0;i<ids.length;i++){
                var data = $('#mes_grid').jqGrid('getRowData', ids[i]);

                if (data.status === "1" ){
                    check = "N";
                }
            }//11|12|13|

            if (check === "N"){
                alert("출하검사가 완료된 제품이 있습니다.");
            } else {
                if (confirm(msg_object.TBMES_A005.msg_name1)) {
                    code_list=ids.join(gu5);
                    wrapWindowByMask2();
                    ccn_ajax("/qmsProdMiddleListDel", {keyword:code_list}).then(function (data) {
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
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}


function img_btn(qc_no) {
    ccn_ajax("/qmsProdMiddleFileGet", {keyword:qc_no}).then(function (data) {
        ccn_ajax("/procedureLogAdd",{keyword:"중간검사현황 이미지조회",keyword2:JSON.stringify({keyword:qc_no})})
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


// function img_btn(data) {
//     var path = data.replace(/C:/g, '')
//     $("#wrapper").empty();
//     $( '.rm' ).remove();
//     var imgs = {};
//     var main_div = $("<div class='swiper-wrapper' id='wrapper2' ></div>");
//     $("#wrapper").append(main_div);
//     var i = 1;
//
//     var div = $(" " +
//         "<div class='swiper-slide'>\n" +
//         "               <div class='swiper-zoom-container'>\n" +
//         "                   <img src='"+ path +"' id='addDialog_image" + i + "'>\n" +
//         "                </div>\n" +
//         "            </div>");
//     $("#wrapper2").append(div);
//
//     var div2 = $(" <div class='swiper-pagination swiper-pagination-white rm'></div>\n" +
//         "        <div class='swiper-button-prev rm'></div>\n" +
//         "        <div class='swiper-button-next rm'></div>" +
//         "");
//
//     $("#wrapper2").after(div2);
//     $("#addDialog1").dialog('open');
//     $("#wrapper2").trigger("resize");
//     img_swiper();
//
//
// }

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
    msgGet_auth("TBMES_A005");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdMiddleList"}).then(function (data) {
        main_data.auth = data;
    });
}


function selectBox() {
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
    $('#main_select3').select2();
}



function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "중간검사현황 | MES",
        colNames: ['검사일자','검사번호','업체','기종','품번','품명','단중','제품LOT','검사결과','수정','폐기','첨부사진','부적합보고서','상태','상태','검사자','검사일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable:false, width: 90, fixed:true,formatter: formmatterDate2},
            {name: 'qc_no', index: 'qc_no', sortable:false, width: 120, key: true, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable:false, width: 130, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable:false, width: 130, fixed:true},
            {name: 'part_code', index: 'part_code', sortable:false, width: 130, fixed:true},
            {name: 'part_name', index: 'part_name', sortable:false, width: 190, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable:false, width: 90, fixed:true,align:'right',formatter:'integer'},
            {name: 'lot_no', index: 'lot_no', sortable:false, width: 130, fixed:true},
            {name: 'qc_result_name', index: 'qc_result_name', sortable:false, width: 60, fixed:true},
            {name: 'result2_name', index: 'result2_name', sortable:false, width: 60, fixed:true},
            {name: 'result3_name', index: 'result3_name', sortable:false, width: 200, fixed:true},
            {name: 'upload_path', index: 'upload_path', sortable:false, width: 100, fixed:true,fixed:true,formatter: image_formatter},
            {name: 'file2_yn', index: 'file2_yn', sortable:false, width: 100, fixed:true,formatter: file2_formatter},
            {name: 'status', index: 'status', sortable:false, width: 60,hidden:true ,fixed:true},
            {name: 'status_name', index: 'status_name', sortable:false, width: 60, fixed:true},
            {name: 'user_name', index: 'user_name', sortable:false, width: 60, fixed:true},
            {name: 'update_date', index: 'update_date', sortable:false, width: 140, fixed:true,formatter: formmatterDate}



        ],
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',
        multiselect: true, // 다중선택 가능
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            update_btn(rowid)
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}


function file2_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file2 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span>저장</span>" +
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

function file_download(file_name) {
    if (confirm('파일을 저장하시겠습니까?')) {
        $.fileDownload('/FileUploads', {
            httpMethod: "POST",
            data: { key_value: file_name },
            successCallback: function(url){
            },
            failCallback: function(){
            }
        });
                ccn_ajax("/procedureLogAdd",{keyword:"중간검사현황 파일저장",keyword2:""})
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