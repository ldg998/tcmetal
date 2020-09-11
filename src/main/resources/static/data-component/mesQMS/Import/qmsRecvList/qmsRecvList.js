/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    auth:{}
};
var fileIndex = 0;
// 등록할 전체 파일 사이즈
var totalFileSize = 0;
// 파일 리스트
var fileList = new Array();
// 파일 사이즈 리스트
var fileSizeList = new Array();
// 등록 가능한 파일 사이즈 MB
var uploadSize = 50;
// 등록 가능한 총 파일 사이즈 MB
var maxUploadSize = 500;
////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    selectBox();
    modal_start1();
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({
        url: "/qmsRecvListGet",
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
        $.fileDownload("/excel_download",{
            httpMethod: 'POST',
            data: {
                "name": "qmsRecvList",
                "row0": $('#datepicker').val().replace(/\-/g, ''),
                "row1": $('#datepicker2').val().replace(/\-/g, ''),
                "row2": $('#supp_code').val(),

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




function img_btn(data) {
   var path = data.replace(/C:/g, '')
    $("#wrapper").empty();
    $( '.rm' ).remove();
        var imgs = {};
        var main_div = $("<div class='swiper-wrapper' id='wrapper2' ></div>");
        $("#wrapper").append(main_div);
            var i = 1;

                var div = $(" " +
                    "<div class='swiper-slide'>\n" +
                    "               <div class='swiper-zoom-container'>\n" +
                    "                   <img src='"+ path +"' id='addDialog_image" + i + "'>\n" +
                    "                </div>\n" +
                    "            </div>");
                $("#wrapper2").append(div);

        var div2 = $(" <div class='swiper-pagination swiper-pagination-white rm'></div>\n" +
            "        <div class='swiper-button-prev rm'></div>\n" +
            "        <div class='swiper-button-next rm'></div>" +
            "");

        $("#wrapper2").after(div2);
        $("#addDialog1").dialog('open');
        $("#wrapper2").trigger("resize");
        img_swiper();


}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}


function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    $('#result_select').select2();
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsRecvList"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['','','','','입고일자','전표번호','업체','구분','품번','품명','규격','단위','입고수량'/*,'검사구분'*/,'검사수량','불량수량','불량유형','불량상세','조치구분','성적서','성적서 수정','검사자','검사일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false,hidden:true ,key:true},
            {name: 'file1_code', index: 'file1_code', sortable: false,hidden:true },
            {name: 'upload_path', index: 'upload_path', sortable: false,hidden:true},
            {name: 'ord_no', index: 'ord_no', sortable: false,hidden:true},
            {name: 'work_date', index: 'work_date', sortable: false, width: 90, formatter: formmatterDate2,fixed:true},
            {name: 'in_no', index: 'in_no',sortable: false, width: 120,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 80,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},         //품번
            {name: 'part_name', index: 'part_name', sortable: false, width: 190,fixed:true},        //품명
            {name: 'spec', index: 'spec', sortable: false, width: 130,fixed:true},                  //규격
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 70,fixed:true},        //단위
            {name: 'in_qty', index: 'in_qty', sortable: false, width: 90,fixed:true,align:'right',formatter:'integer' },                    //입고수량
          //  {name: 'qc_level', index: 'qc_level', sortable: false, width: 130,fixed:true},  //검사구분
            {name: 'qc_qty', index: 'qc_qty', sortable: false, width: 90,fixed:true,align:'right',formatter:'integer'},              //검사수령
            {name: 'ng_qty', index: 'ng_qty', sortable: false, width: 90,fixed:true,align:'right',formatter:'integer'},              //검사수령
            {name: 'ng_type_name', index: 'ng_type_name', sortable: false, width: 130,fixed:true},   //불량유형
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 130,fixed:true},            //불량상세
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 130,fixed:true}, //조치구분
            {name: 'file1', index: 'file1', sortable: false, width: 100, align: 'center',fixed:true,formatter: file2_formatter,fixed:true },//성적서
            {name: 'file1', index: 'file1', sortable: false, width: 100, align: 'center',fixed:true,formatter: filebox,fixed:true },//성적서 수정
            {name: 'user_name', index: 'user_name', sortable: false, width: 70,fixed:true},                                //검사자
            {name: 'update_date', index: 'update_date', sortable: false, width: 140,fixed:true,formatter: formmatterDate} //검사일시

             ],
        caption: "수입검사현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
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
    if (cellvalue !== "" &&  cellvalue !== null && cellvalue !=='null') {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file1 + "\");'>" +
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


function filebox(cellvalue, options, rowObject) {   //업로드null, 그리드, 그리드내용
        return "" +
            "<div class='dt-buttons btn-overlap btn-group filebox_lee'>"+
            "<label class='file_labal'  " +
            " for='file_01"+rowObject.rownum+"'><i class=\"fa fa-upload bigger-110 blue\"></i>업로드</label>"+
            "<input type='file' id='file_01"+rowObject.rownum+"'  onchange='file_change(this"+",this.value,\""+rowObject.in_no+"\",\""+rowObject.part_code+"\",\""+rowObject.ord_no+"\" ,\""+rowObject.rownum+"\",\""+rowObject.file1_code+"\" "+");' />" +
            "</div>";

}

function file_change(e,value,no,part_code,ord_no,rownum,file1_code) {

    if ( $(e).val() !== ''){
        // var reg = /(.*?)\.(pdf)$/;
        // if(!value.match(reg)) {
        //     alert("해당 파일은 pdf 파일이 아닙니다.");
        //     $(e).closest("div")
        //         .children(".file_labal")
        //         .text("업로드");
        // }else {
            var formData = new FormData();


            formData.append("in_no", no);
            formData.append("part_code", part_code);
            formData.append("ord_no", ord_no);
            formData.append("files1", $("#file_01"+rownum+"").prop("files")[0]);
            if(file1_code =='' || file1_code == null || file1_code=='nulll'){
                formData.append("file_ck1",1);
            }else {
             formData.append("file1_code",file1_code);
            formData.append("file_ck1",0);
            }

            if(confirm("등록 하시겠습니까?")){
                wrapWindowByMask2();
                ccn_file_ajax("/qmsRecvListFileAdd", formData).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    }
                    closeWindowByMask();
                    $('#mes_grid').trigger('reloadGrid')
                    $(e).closest("div")
                        .children(".file_labal")
                        .text("업로드완료");
                }).catch(function (err) {
                    closeWindowByMask();
                });
            }
        // }


    }
}

function image_formatter(cellvalue, options, rowObject) {
    if (cellvalue == "" ||  cellvalue == null || cellvalue =='null') {
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
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='img_btn(\"" + rowObject.upload_path + "\""+");'>" +
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
    }
}


function selectBox() {
    select_makes_base("#main_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"Y").then(function (data) {
    });
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