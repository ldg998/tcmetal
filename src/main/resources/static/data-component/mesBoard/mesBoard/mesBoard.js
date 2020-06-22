// 파일 리스트 번호
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
////////////////////////////////////////////////////////////////////////////////////
//시작 함수
$(document).ready(function () {
    // 파일 드롭 다운
    fileDropDown();

});
//////////////////////////////////////////////////////////////////////////////////////
//버튼 함수
// 파일 등록
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
        var myForm = document.getElementById('uploadForm');
        var formData = new FormData(myForm);
        for(var i = 0; i < uploadFileList.length; i++){
            formData.append('files', fileList[uploadFileList[i]]);
        }

        console.log("데이터 확인 :"+formData);
        $.ajax({
            url:"/board_multipart_files",
            data:formData,
            type:'POST',
            enctype:'multipart/form-data',
            processData:false,
            contentType:false,
            dataType:'json',
            cache:false,
            success:function(result){
                if(result > 0){
                    alert("성공");

                }else{
                    alert("실패");
                }
            }
        });
    }
}

//////////////////////////////////////////////////////////////////////////////////////
//호출 함수

// 파일 드롭 다운
function fileDropDown(){
    var dropZone = $("#dropZone");
    var selectZone = $("#selectZone");
    dropZone.on('dragenter',function(e){ e.stopPropagation(); e.preventDefault();dropZone.css('background-color','#E3F2FC');}); // 파일 드래그 엔터 -css변경
    dropZone.on('dragleave',function(e){e.stopPropagation();e.preventDefault();dropZone.css('background-color','#FFFFFF');}); // 파일 드래그 래브 -css변경
    dropZone.on('dragover',function(e){e.stopPropagation();e.preventDefault();dropZone.css('background-color','#E3F2FC');}); // 파일 드래그 오버 - css변경


    dropZone.on('drop',function(e){ //파일 드롭 이벤트 css 및 기능구현
        e.preventDefault();
        dropZone.css('background-color','#FFFFFF');
        var files = e.originalEvent.dataTransfer.files,
            folders = 0,
            other = 0;

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
    });


    selectZone.on('change',function (e) {
        e.preventDefault();
        // 드롭다운 영역 css
        dropZone.css('background-color','#FFFFFF');

        var files = e.originalEvent.target.files;
        if(files != null){
            if(files.length < 1){
                alert("폴더 업로드 불가");
                return;
            }
            selectFile(files) //파일스는 끌어온 파일들이다
        }else{
            alert("ERROR");
        }

    });

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
                addFileList(fileIndex, fileName, fileSize);//파일 번호와 파일이름 파일 사이즈를 append 해주는 부분
                // 파일 번호 증가
                fileIndex++;
            }
        }
    }else{
        alert("ERROR");
    }
}
// 업로드 파일 목록 생성
function addFileList(fIndex, fileName, fileSize){
    var html = "";
    html += "<tr id='fileTr_" + fIndex + "'>";
    html += "    <td class='left' >";
    html +=         fileName + " / " + fileSize + "MB "  + "<a href='#' onclick='deleteFile(" + fIndex + "); return false;' class='btn small bg_02'>삭제</a>"
    html += "    </td>"
    html += "</tr>"

    $('#fileTableTbody').append(html);
}
// 업로드 파일 삭제
function deleteFile(fIndex){
    // 전체 파일 사이즈 수정
    totalFileSize -= fileSizeList[fIndex];
    // 파일 배열에서 삭제
    delete fileList[fIndex];
    // 파일 사이즈 배열 삭제
    delete fileSizeList[fIndex];
    // 업로드 파일 테이블 목록에서 삭제
    $("#fileTr_" + fIndex).remove();
}
function fileCk(files){
    var IMG_FORMAT = "\.(bmp|gif|jpg|jpeg|png)$"; //문서만 첨부하게 하려면 이 부분 바꿔주시면 되겠죠? ^^
    files.forEach(function(data){
        console.log("타입: "+data.type)
        if((new RegExp(IMG_FORMAT,"i")).test(data.type)) return true;


    });

}