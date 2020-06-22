<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<fmt:parseDate value="${InfoData.create_date}" var="c_date" pattern="yyyyMMddHHmmss"/>
<fmt:parseDate value="${InfoData.update_date}" var="u_date" pattern="yyyyMMddHHmmss"/>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<%@include file="/WEB-INF/views/body/mesBoard/mesBoard/mesBoard/header.jsp" %>
<!-- ###실제컨텐츠영역 -->
<style>
    .board_lee{
        style:border: 3px solid #D8D8D8;
    }

</style>
<div class="page-content" >
    <table class="bbs_view board_lee">
        <tbody>
        <tr>
            <th class="subject" style="text-align: left">게시명 : ${InfoData.subject}</th>
            <th class="subject">
                <span class="view_detail" style="float: right;">
                    작성자 : ${InfoData.user_name}
                </span>
            </th>
        </tr>
        <tr>
            <td class="view_detail" colspan="2">
                <span style="float: right;">
                    <c:if test="${InfoData.update_date eq null}">
                        작성일 : <fmt:formatDate value="${c_date}" pattern="yyyy-MM-dd HH:mm"/>
                    </c:if>
                    <c:if test="${InfoData.update_date ne null}">
                        수정일 : <fmt:formatDate value="${u_date}" pattern="yyyy-MM-dd HH:mm"/>
                    </c:if>
                    &nbsp;
                    조회수 : ${InfoData.read_count}
                </span>
            </td>
        </tr>
        <c:if test="${InfoData.file_cnt eq 0}">
        <tr>
            <th width="23%"><img name=wiz_target_resize style="margin-top: 3px; vertical-align: top; display: inline-block;" src="https://directsend.co.kr/images/common/icon_bigfile.png"/> 첨부파일
            </th>
                <td>첨부된 파일이 없습니다.</td>
        </tr>
        </c:if>
        <c:if test="${InfoData.file_cnt ne 0}">
            <c:forEach items="${fileData}" var="data">
                <tr>
                    <th width="23%"><img name=wiz_target_resize style="margin-top: 3px; vertical-align: top; display: inline-block;" src="https://directsend.co.kr/images/common/icon_bigfile.png"/> 첨부파일
                        <td>
                            <a target="_blank" rel="noreferrer noopener" onclick="file_download('${data.file_name}')">${data.file_og_name}</a>
                            <span style="color: #e6716b; margin-left: 3px;">${data.file_size}KB</span>
                        </td>
                </tr>
            </c:forEach>
        </c:if>
        <tr>
            <td class="view_content" colspan="2">
                <div style='width:100%;height:0px;' id='wiz_get_table_width'>
                    <img border='0' name='wiz_target_resize' width='0' height='0' alt=''/></div>
                <div>
                    <p>
                        ${InfoData.description}
                    </p>
                </div>
            </td>
        </tr>
        </tbody>
    </table>

    <table class="bbs_view board_lee" style="margin-bottom: 50px">
        <tr>
            <th width="23%">댓글 작성</th>
            <td style="padding-right:5px;">
                <input type="hidden" name="board_idx" class="board_idx" value="${InfoData.board_idx}">
                <input type="hidden" name="board_code" class="board_code" value="${InfoData.board_code}">
                <input type="text" name="reply_desc" class="reply_input" placeholder="댓글을 입력하세요." autocomplete="off" size="35"/>
                <input type="button" value="작성" class="btn_b_s"/>
            </td>
        </tr>
            <c:choose>
                <c:when test="${InfoData.reply_cnt == 0}">
                    <tr>
                        <td style="border-bottom: 0px;">
                        </td>
                        <td class="view_detail" style="text-align: center">
                        <span>
                            댓글이 존재하지않습니다.
                        </span>
                        </td>
                    </tr>
                </c:when>
                <c:otherwise>
                    <c:forEach items="${replyData}" var="data">
                        <fmt:parseDate value="${data.create_date}" var="r_date" pattern="yyyyMMddHHmmss"/>
                        <tr>
                            <td style="border-bottom: 0px;">
                            <td class="view_detail">
                                <span><i class="fa fa-commenting" style="color:#1453a1"></i>
                                    &nbsp;&nbsp;&nbsp;
                                    <span>${data.reply_desc}</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <c:if test="${data.user_code == sessionScope.userData.user_code}">
                                        <a onclick="delReply('${data.reply_idx}');"><i class="fa fa-times" style="color:#e6716b"></i></a>
                                    </c:if>
                                </span>
                                <span style="float:right">
                                    <i class="fa fa-user"></i> ${data.user_name} | <i class="fa fa-calendar-o"></i>
                                    <fmt:formatDate value="${r_date}" pattern="yyyy-MM-dd HH:mm"/>
                                </span>
                            </td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
    </table>
    <table class="bbs_view board_lee">
        <tr>
            <th width="23%" style="border-top: 1px solid #ddd;">이전글</th>
            <c:if test="${prev eq null}">
                <td style="border-top: 1px solid #ddd;">이전글이 존재하지않습니다.</td>
            </c:if>
            <c:if test="${prev ne null}">
                <td style="border-top: 1px solid #ddd;"><a
                        href='/info?idx=${prev.board_idx}&seq=${prev.seq}'>${prev.subject}</a></td>
            </c:if>
        </tr>
        <tr>
            <th>다음글</th>
            <c:if test="${next eq null}">
                <td>다음글이 존재하지않습니다.</td>
            </c:if>
            <c:if test="${next ne null}">
                <td><a href='/info?idx=${next.board_idx}&seq=${next.seq}'>${next.subject}</a></td>
            </c:if>
        </tr>
    </table>
    <br>
    <div class="bbs_btn align_right">

        <c:if test="${sessionScope.userData.user_code eq InfoData.user_code || sessionScope.userData.user_code eq 'ADMIN' }">
<%--            <a href='/modBoardList?idx=${InfoData.board_idx}' class='btn_w'>수정</a>--%>
            <a href='#' class='btn_w' onclick="return delBoardList('${InfoData.board_idx}');">삭제</a>
        </c:if>
        <c:if test="${sessionScope.userData.user_code eq InfoData.user_code}">
            <a href='#' class='btn_w' onclick="return upBoardList('${InfoData.board_code}','${InfoData.board_idx}');">수정</a>
        </c:if>
    <a href='#' class='btn_w' onclick="window.history.go(-1); return false;">돌아가기</a>
    </div>
</div>
</div>
<!--//실제컨텐츠영역-->
</div>
</div>
<!--//Contents -->
<script>
    var board_code = '${InfoData.board_code}';
    var main_data = {
        auth:{}
    };
    $(window).load(function () {
        authcheck();
        $('#sub-t-1').text('게시판');
        $('#sub-t-2').text('홈');
        $('#sub-t-3').text('게시판');
        $('#sub-t-4').text('게시판');

        $("input[name=file]").each(function (i, item) {
            $(this).attr('id', 'file_' + i).attr('name', 'file_' + i);
        });

    });

    function authcheck() {
        ccn_ajax("/menuAuthGet", {keyword: board_code}).then(function (data) {
            main_data.auth = data;
        });
    }

    function delReply(idx) {
        if (main_data.auth.check_del != "N" ) {
            if (confirm("댓글을 삭제하시겠습니까?") == true) {
                $.post("/delReply?idx=" + idx,function (result) {
                    if (result == 1) {
                        location.reload();
                    } else {
                        alert("알 수 없는 오류가 발생하였습니다.");
                        location.reload();
                    }
                });
            }
        } else {
            alert("삭제권한이 없습니다.");
        }
    }

    function delBoardList(idx) {
        if (main_data.auth.check_del != "N" ) {
            if (confirm("게시물을 삭제하시겠습니까?") == true) {
                $.post("/delBoardList?idx=" + idx,function (result) {
                    if (result == 1) {
                        location.href='/board';
                    } else {
                        alert("알 수 없는 오류가 발생하였습니다.");
                        location.reload();
                    }
                });
            }
        } else {
            alert("삭제권한이 없습니다.");
        }
    }

    function upBoardList(code,idx) {
        if (main_data.auth.check_edit != "N" ) {
            location.href='/mod?board_idx='+ idx+"&board_code="+code+"&seq="+${seq};
        } else {
            alert("수정권한이 없습니다.");
        }
    }

    $('.btn_b_s').click(function () {
        if($('.reply_input').val() == ''){
            alert("내용 입력해주세요.");
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: 'addReply',
                data: {
                    board_code: $('.board_code').val(),
                    board_idx:  $('.board_idx').val(),
                    reply_desc: $('.reply_input').val()
                },
                success: function (data) {
                    if(data == 1){
                        location.reload();
                    } else {
                        alert("오류가 발생하였습니다. 관리자에게 문의하세요.");
                        return false;
                    }
                },
                error: function (e) {
                    console.log(e);
                },
            })
        }
    });


    function file_download(file_name) {
        var name = file_name.split(".");

        if (confirm('파일을 저장하시겠습니까?')) {
            $.fileDownload('/FileUploads', {
                httpMethod: "POST",
                data: { key_value: name[0] },
                successCallback: function(url){
                },
                failCallback: function(){
                }
            });
        }
    }

</script>