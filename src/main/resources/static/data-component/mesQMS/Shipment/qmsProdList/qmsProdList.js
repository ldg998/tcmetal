// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawBasic);


/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_data = {
    send_data: {},
    auth:{},
    file_ck:0
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
        url: "/qmsProdListGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name": "qmsProdErrorList",
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

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);

        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        jqgrid_data.part_weight = integer(jqgrid_data.part_weight)
        modal_edits('.modal_value',[],jqgrid_data)

        if(jqgrid_data.file_key == null || jqgrid_data.file_key == "" || jqgrid_data.file_key =='null'){
        main_data.file_ck =0
            $('#file_labal').closest("div")
                .children(".file_labal")
                .text("업로드");
        }else {
            main_data.file_ck =1
            $('#file_labal').closest("div")
                .children(".file_labal")
                .text("업로드완료");
        }
        $("#mes_modal1_grid2").setGridParam({
            url: "/qmsProdListModalGet",
            datatype: "json",
            postData: {keyword:jqgrid_data.qc_no}
        }).trigger("reloadGrid");

        $("#addDialog").dialog('open'); // 모달 열기
        jqGridResize("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords =[];
        var file_key_list =[];
        for(var i=0;i<ids.length;i++){
            var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
            keywords.push(data.file_key);
        }
        file_key_list=keywords.join(gu5);


            if (ids.length === 0) {
                alert(msg_object.TBMES_A004.msg_name1);
            } else {
                if (confirm(msg_object.TBMES_A005.msg_name1)) {
                    var gu5 = String.fromCharCode(5);
                    main_data.check = 'D';
                    wrapWindowByMask2();
                    ccn_ajax("/qmsProdListDel", {keyword: ids.join(gu5),keyword2:file_key_list}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            $('#mes_grid').trigger("reloadGrid");
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





function img_btn(qc_no) {
    ccn_ajax("/qmsProdlistFileGet", {keyword:qc_no}).then(function (data) {
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

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdList"}).then(function (data) {
        main_data.auth = data;
    });
}
function selectBox() {
    $('#select1').select2();
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "출하검사현황 | MES",
        colNames: ['','검사일자','검사번호','업체','기종','품번','품명','단중','제품LOT','경도1','경도2','경도3','검사결과','첨부사진','성적서','검사자','검사일시'],
        colModel: [
            {name: 'file_key', index: 'file_key', sortable:false ,hidden:true},
            {name: 'work_date', index: 'work_date', sortable:false, width: 90,fixed:true,formatter: formmatterDate2 },
            {name: 'qc_no', index: 'qc_no', sortable:false, width: 130, key: true,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable:false, width: 130, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable:false, width: 120, fixed:true},
            {name: 'part_code', index: 'part_code', sortable:false, width: 130, fixed:true},
            {name: 'part_name', index: 'part_name', sortable:false, width: 190, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable:false, width: 90, fixed:true,align: 'right', formatter: 'integer' },
            {name: 'lot_no', index: 'lot_no', sortable:false, width: 120, fixed:true},
            {name: 'hard1', index: 'hard1', sortable:false, width: 40, fixed:true,align: 'right', formatter: 'integer' },
            {name: 'hard2', index: 'hard3', sortable:false, width: 40, fixed:true,align: 'right', formatter: 'integer' },
            {name: 'hard2', index: 'hard3', sortable:false, width: 40, fixed:true,align: 'right', formatter: 'integer' },
            {name: 'qc_result_name', index: 'qc_result_name', sortable:false, width: 60, fixed:true},
            {name: 'filename', index: 'filename', sortable:false, width: 70, fixed:true ,formatter:image_formatter},
            {name: 'file1', index: 'file1', sortable:false, width: 70, fixed:true, formatter: file3_formatter},
            {name: 'user_name', index: 'user_name', sortable:false, width: 70, fixed:true},
            {name: 'create_date', index: 'create_date', sortable:false, width: 140, fixed:true,formatter: formmatterDate }
        ],
        // multiselect: true,
        autowidth: true,
        viewrecords: true,
        height: 562,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid_pager',

        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
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
        }

    });

}



function file3_formatter(cellvalue, options, rowObject) {
    if (cellvalue == null || cellvalue == "" ||cellvalue == "null" ) {
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
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file_key + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 저장</span>" +
            "</span>" +
            "</a>";
    }
}

function file_download(file_name) {
    if (confirm('파일을 저장하시겠습니까?')) {
        $.fileDownload('/FileUploads',{
            httpMethod: "POST",
            data: { key_value: file_name },
            successCallback: function(url){
            },
            failCallback: function(){
            }
        });
    }
}


function image_formatter(cellvalue, options, rowObject) {
    if (cellvalue == "" ||  cellvalue == null || cellvalue =='null' || cellvalue =='N') {
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
