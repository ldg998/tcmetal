<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<jsp:useBean id="toDay" class="java.util.Date"/>
<%@include file="/WEB-INF/views/body/mesBoard/mesBoard/mesBoard/header.jsp" %>
<script src="/data-component/mesBoard/mesBoard/mesBoard.js"></script>
<style>

    .filebox input[type="file"] { /* 파일 필드 숨기기 */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
    }
    .filebox label {
        display: inline-block;
        padding: .5em .75em; color: #999;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: .25em; }

</style>
<div class="page-content">
    <div class="con1">
      <form enctype="multipart/form-data" id="boardForm">
            <table class="form_table">
                <tbody>
                <%--                <tr>--%>
                <%--                    <th>분류</th>--%>
                <%--                    <td>--%>
                <%--                        <select name="type" id="type" class="w-100">--%>
                <%--                        <c:forEach items="${common}" var="commons">--%>
                <%--                            <option value='${commons.code_value}'>${commons.code_name1}</option>--%>
                <%--                        </c:forEach>--%>
                <%--                        </select>--%>
                <%--                    </td>--%>
                <%--                </tr>--%>
                <tr>
                    <th>제목</th>
                    <td><input name="subject" id="subject" type='text' class='input' autocomplete="off"></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td><textarea class="textarea" rows="10" name="description" id="description"
                                  autocomplete="off"></textarea></td>
                </tr>
                <script>
                    CKEDITOR.replace('description', {
                        'height': '400'
                    });
                    CKEDITOR.on('dialogDefinition', function (e) {
                        var dialogName = e.data.name;
                        var dialogDefinition = e.data.definition;
                        switch (dialogName) {
                            case 'image':
                                // dialogDefinition.removeContents('info');
                                dialogDefinition.removeContents('Link');
                                dialogDefinition.removeContents('advanced');
                                break;
                        }
                    });
                </script>
                </tbody>
                <tbody class="file-area">
                <tr class="file-tr">
                    <th>첨부파일</th>
                    <td><input name="file" id="file" type='file' class='input' onchange="return sizeChk(this)"></td>
                    <input type="hidden" id="files" name="files">
                    <input type="hidden" id="board_code" name="board_code" value="${boardData.board_code}">
                    <input type="hidden" id="board_idx" name="board_idx" value="${board_idx}">
                </tr>
                </tbody>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="5"></td>
                </tr>
                <tr>
                    <td align="center">
                        <table>
                            <tr>
                                <td>
                                    <input type="button" border="0" value="확인" class="btn_style"
                                           onclick="fileUploader();">
                                    <input type="button" border="0" value="취소" class="btn_style2"
                                           onclick="history.go(-1);">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </form>
<%--            <div class="filebox">--%>
<%--                <label for="selectZone">업로드--%>
<%--                <input type="file" name="file2" id="selectZone" >--%>
<%--                </label>--%>
<%--            </div>--%>
<%--        <form name="uploadForm" id="uploadForm" enctype="multipart/form-data" method="post">--%>
<%--            <table class="table" width="100%" border="1px">--%>
<%--                <tbody id="fileTableTbody">--%>
<%--                <tr>--%>
<%--                    <td id="dropZone">--%>
<%--                        파일을 드래그 하세요--%>
<%--                    </td>--%>
<%--                </tr>--%>
<%--                </tbody>--%>
<%--            </table>--%>
<%--        </form>--%>
<%--        <input type="button" onclick="uploadFile();">--%>
    </div>
    <!-- 게시물 시작 -->
    <!-- 페이징 -->
</div>
</div>
<!--//실제컨텐츠영역-->
</div>
</div>


<%--<script>--%>
<%--    function fileUploader() {--%>
<%--        CKEDITOR.instances.description.updateElement();--%>


<%--        if (effectiveness1()) {--%>
<%--            if (confirm("게시물을 추가하시겠습니까?") == true) {--%>
<%--                var int = 0;--%>
<%--                var fileName;--%>
<%--                var result = 0;--%>
<%--                for (var i = 0; i <= file_num - 1; i++) {--%>
<%--                    if ($('#file_' + i).val() != '') {--%>
<%--                        int++;--%>
<%--                        fileName = 'file_' + i;--%>
<%--                        $('#files').val(fileName);--%>
<%--                        var form = $('#boardForm')[0];--%>
<%--                        var data = new FormData(form);--%>
<%--                        data.append("file_num", i);--%>
<%--                        $.ajax({--%>
<%--                            type: 'post',--%>
<%--                            url: '/boardFileUploader',--%>
<%--                            enctype: 'multipart/form-data',--%>
<%--                            data: data,--%>
<%--                            contentType: false,--%>
<%--                            processData: false,--%>
<%--                            success: function (req) {--%>
<%--                                result = +req;--%>
<%--                            },--%>
<%--                            error: function (req, status, error) {--%>
<%--                                console.log(req.status);--%>
<%--                            }--%>
<%--                        });--%>
<%--                    }--%>
<%--                }--%>
<%--                if (int == 0) {--%>
<%--                    UploadCallback();--%>
<%--                } else {--%>
<%--                    UploadCallback();--%>
<%--                }--%>
<%--            }--%>
<%--        }--%>
<%--    }--%>

<%--    function UploadCallback() {--%>
<%--        var description = CKEDITOR.instances['description'].getData();--%>
<%--        $.ajax({--%>
<%--            type: 'post',--%>
<%--            url: '/addBoardList',--%>
<%--            data: {--%>
<%--                type: $('#type').val(),--%>
<%--                subject: $('#subject').val(),--%>
<%--                description: description,--%>
<%--                board_code: $('#board_code').val(),--%>
<%--                board_idx: $('#board_idx').val(),--%>
<%--            },--%>
<%--            success: function (req) {--%>
<%--                if (req == 1) {--%>
<%--                    //alert('게시글이 등록되었습니다.');--%>
<%--                    location.href = '/board';--%>
<%--                } else {--%>
<%--                    alert('게시글이 등록실패.');--%>
<%--                    location.href = '/board';--%>
<%--                }--%>
<%--            }--%>
<%--        });--%>
<%--    }--%>

<%--    function sizeChk(idx) {--%>
<%--        var id = $(idx).attr('id');--%>
<%--        var baseSize = parseInt(${boardData.file_size}) * 1024 * 1024;--%>
<%--        var fileSize = idx.files[0].size;--%>
<%--        var maxSize = baseSize / 1024 / 1024;--%>

<%--        if (baseSize < fileSize) {--%>
<%--            alert('파일 용량은 최대 ' + maxSize + 'MB를 초과할 수 없습니다.');--%>
<%--            $('#' + id).val("");--%>
<%--            return false;--%>
<%--        }--%>
<%--    }--%>

<%--    $('#bdr_write').submit(function () {--%>
<%--        if ($('#subject').val == '') {--%>
<%--            alert('제목을 입력하세요.');--%>
<%--            return false;--%>
<%--        } else if ($('#description').val == '') {--%>
<%--            alert('내용을 입력하세요.');--%>
<%--            return false;--%>
<%--        } else {--%>
<%--            return;--%>
<%--        }--%>
<%--    });--%>

<%--    $(window).load(function () {--%>
<%--        $('#sub-t-1').text('게시글 작성');--%>
<%--        $('#sub-t-2').text('홈');--%>
<%--        $('#sub-t-3').text('게시판');--%>
<%--        $('#sub-t-4').text('${boardData.board_kr}');--%>

<%--        $("input[name=file]").each(function (i, item) {--%>
<%--            $(this).attr('id', 'file_' + i).attr('name', 'file_' + i);--%>
<%--        });--%>
<%--    });--%>

<%--    function effectiveness1() {--%>
<%--        if ($('#subject').val() == '') {--%>
<%--            alert('제목을 입력하세요.');--%>
<%--            return false;--%>
<%--        } else if ($('#description').val() == '') {--%>
<%--            alert('내용을 입력하세요.');--%>
<%--            return false;--%>
<%--        } else {--%>
<%--            return true;--%>
<%--        }--%>
<%--    }--%>

<%--    var file_num--%>
<%--    $(function () {--%>
<%--        var i;--%>
<%--        file_num = ${boardData.files};--%>
<%--        var orgn = $('.file-tr').clone();--%>
<%--        $('.file-tr').remove();--%>

<%--        if (parseInt(file_num) > 0) {--%>
<%--            for (i = 1; i <= file_num; i++) {--%>
<%--                orgn.attr('class', 'file-tr' + i);--%>
<%--                var clones = orgn.clone();--%>
<%--                $('.file-area').append(clones);--%>
<%--            }--%>
<%--        }--%>
<%--    })--%>
<%--</script>--%>
