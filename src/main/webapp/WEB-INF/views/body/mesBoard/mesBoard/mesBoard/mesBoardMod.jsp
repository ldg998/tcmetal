<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<jsp:useBean id="toDay" class="java.util.Date"/>
<%@include file="/WEB-INF/views/body/mesBoard/mesBoard/mesBoard/header.jsp"%>
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
                    <td><input name="subject" id="subject" type='text' value="${board.subject}" class='input'autocomplete="off"></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <input type="hidden" id="board_code" name="board_code" value="${boardData.board_code}">
                    <input type="hidden" id="board_idx" name="board_idx" value="${board_idx}">
                    <td><textarea class="textarea" rows="10" name="description" id="description" autocomplete="off">${board.description}</textarea></td>
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
                                    <input type="button" border="0" value="확인" class="btn_style" onclick="UploadCallback();">
                                    <input type="button" border="0" value="취소" class="btn_style2" onclick="history.go(-1);">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <!-- 게시물 시작 -->
    <!-- 페이징 -->
</div>
</div>
<!--//실제컨텐츠영역-->
</div>
</div>
<script>


    function effectiveness1() {
        if($('#subject').val() == ''){
            alert('제목을 입력하세요.');
            return false;
        }
        else if($('#description').val() == ''){
            alert('내용을 입력하세요.');
            return false;
        }
        else{
            return true;
        }
    }

    function UploadCallback(){
        CKEDITOR.instances.description.updateElement();



        if (effectiveness1()){
        if (confirm("게시물을 수정하시겠습니까?") == true) {
            var description = CKEDITOR.instances['description'].getData();
            $.ajax({
                type : 'post',
                url : '/upBoardList',
                data : {
                            //type:$('#type').val(),
                            subject:$('#subject').val(),
                            description:description,
                            board_code:$('#board_code').val(),
                            board_idx:$('#board_idx').val(),
                        },
                success : function(req){
                    if(req == 1){
                        //alert('게시글이 등록되었습니다.');
                        location.href='/info?idx=${board_idx}&seq=${seq}';
                    }else{
                        alert('게시글이 등록실패.');
                        location.href='/board';
                    }
                }
            });
        }
        }
    }



    $('#bdr_write').submit(function() {
        if($('#subject').val == ''){
            alert('제목을 입력하세요.');
            return false;
        }
        else if($('#description').val == ''){
            alert('내용을 입력하세요.');
            return false;
        }
        else{
            return;
        }
    });

    $(window).load(function(){
        $('#sub-t-1').text('게시글 작성');
        $('#sub-t-2').text('홈');
        $('#sub-t-3').text('게시판');
        $('#sub-t-4').text('${boardData.board_kr}');

    });

    $(function () {

    });
</script>
