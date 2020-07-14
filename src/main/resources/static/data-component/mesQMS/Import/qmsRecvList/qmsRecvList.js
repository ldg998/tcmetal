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
   // get_btn(1);
});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');
    main_data.send_data.keyword = $('#supp_code').val();
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
        colNames: ['입고일자','전표번호','업체','구분','품번','품명','규격','단위','입고수량'/*,'검사구분'*/,'검사수량','불량유형','불량상세','조치구분','성적서','성적서 수정','검사자','검사일시'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 100, formatter: formmatterDate2,fixed:true},
            {name: 'in_no', index: 'in_no', sortable: false, width: 130,fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130,fixed:true},
            {name: 'part_type_name', index: 'part_type_name', sortable: false, width: 130,fixed:true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130,fixed:true},         //품번
            {name: 'part_name', index: 'part_name', sortable: false, width: 130,fixed:true},        //품명
            {name: 'spec', index: 'spec', sortable: false, width: 130,fixed:true},                  //규격
            {name: 'unit_name', index: 'unit_name', sortable: false, width: 130,fixed:true},        //단위
            {name: 'qty', index: 'qty', sortable: false, width: 130,fixed:true,align:'right',formatter:'number' },                    //입고수량
          //  {name: 'qc_level', index: 'qc_level', sortable: false, width: 130,fixed:true},  //검사구분
            {name: 'qc_qty', index: 'qc_qty', sortable: false, width: 130,fixed:true,align:'right',formatter:'number'},              //검사수령
            {name: 'ng_type_name', index: 'ng_type_name', sortable: false, width: 130,fixed:true},   //불량유형
            {name: 'ng_name', index: 'ng_name', sortable: false, width: 130,fixed:true},            //불량상세
            {name: 'act_type_name', index: 'act_type_name', sortable: false, width: 130,fixed:true}, //조치구분
            {name: 'file1_name', index: 'file1_name', sortable: false, width: 100, align: 'center', formatter: file1_formatter,fixed:true},//성적서
            {name: 'file_upload', index: 'file1_name', sortable: false, width: 100, align: 'center',formatter:file_upload_formatter,fixed:true},//성적서 수정
            {name: 'user_name', index: 'user_name', sortable: false, width: 130,fixed:true},                                //검사자
            {name: 'update_date', index: 'update_date', sortable: false, width: 130,fixed:true,formatter: formmatterDate} //검사일시

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


function file1_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
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

function file3_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file3 + "\");'>" +
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

function file_upload_formatter(cellvalue, options, rowObject){

    return  " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
        "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_upload()'>" +
        "<span><i class='fa fa-download bigger-110 blue'></i>" +
        "<span>업로드</span>" +
        "</span>" +
        "</a>";


}
function file_upload(){$('#file').click();}
function file_change(){
    var files =   $('#file')[0].files,
        folders = 0,
        other = 0;
    console.log(files);
    //originalEvent = 데이터이벤트   dataTransfer = 드래그한  files= 파일
    for (var i = 0, f; f = files[i]; i++) { // iterate in the files dropped
        if (!f.type && f.size % 4096 == 0) folders++;
        else other++;
    }
    if(files != null){
        if (folders && !other) {
            alert("폴더 업로드 불가");
            return;
        } else if (!folders && other) {
            selectFile(files) //파일스는 끌어온 파일들이다
        }
    }else{
        alert("ERROR");
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


// 파일 선택시
function selectFile(files){
    // 다중파일 등록    파일스 안에는 끌어온 파일들이 담겨져있따
    if(files != null){
        for(var i = 0; i < files.length; i++){
            // 파일 이름
            var fileName = files[i].name;
            var fileNameArr = fileName.split("\.");
            // 확장자
            var ext = fileNameArr[fileNameArr.length - 1];
            // 파일 사이즈(단위 :MB)
            var fileSize = files[i].size / 1024 / 1024;
            if($.inArray(ext, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml','directory']) >= 0){
                // 확장자 체크
                alert("등록 불가 확장자");
                break;
            }else if(fileSize > uploadSize){
                // 파일 사이즈 체크
                alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
                break;
            }else{
                // 전체 파일 사이즈
                totalFileSize += fileSize;
                // 파일 배열에 넣기
                fileList[fileIndex] = files[i];
                // 파일 사이즈 배열에 넣기
                fileSizeList[fileIndex] = fileSize;
                // 업로드 파일 목록 생성
                // addFileList(fileIndex, fileName, fileSize);//파일 번호와 파일이름 파일 사이즈를 append 해주는 부분
                // 파일 번호 증가
                fileIndex++;
                uploadFile();
            }
        }
    }else{
        alert("ERROR");
    }
}



function uploadFile(){
    // 등록할 파일 리스트
    var uploadFileList = Object.keys(fileList);

    // 용량을 500MB를 넘을 경우 업로드 불가
    if(totalFileSize > maxUploadSize){
        // 파일 사이즈 초과 경고창
        alert("총 용량 초과\n총 업로드 가능 용량 : " + maxUploadSize + " MB");
        return;
    }
    if(confirm("등록 하시겠습니까?")){
        // 등록할 파일 리스트를 formData로 데이터 입력
        var myForm = document.getElementById('qms_uploadForm');
        var formData = new FormData(myForm);
        for(var i = 0; i < uploadFileList.length; i++){
            formData.append('files', fileList[uploadFileList[i]]);
        }
        console.log("데이터 확인 :"+formData);
        ccn_file_ajax("/qmsRecvList_File_Upload",formData).then(function (data) {

            console.log(data);

        });
    }
}