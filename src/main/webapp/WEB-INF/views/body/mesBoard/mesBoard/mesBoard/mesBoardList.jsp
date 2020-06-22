<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<html>
<%@include file="/WEB-INF/views/body/mesBoard/mesBoard/mesBoard/header.jsp"%>

<body>

<div class="page-content">
    <div class="bbs_search">
        <form name="sfrm" action="board${pageMaker.searchOption(idx)}" method="get">
            <input type="hidden" name="category" class="h_cg" value="">
            <table width="0%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="select_area">
                        <select name="searchType" class="select_search" title="검색조건을 선택하세요" />
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="all">제목+내용</option>
                        </select>
                    </td>
                    <td>
                        <input name="keyword" type="text" class="search_input" placeholder="검색어를 입력하세요" size="35" value="${pageMaker.keyword}" autocomplete="off" />
                    </td>
                    <td>
                        <input type="submit" value="검색" title="검색" class="btn_b_s" />
                    </td>
                </tr>
            </table>
        </form>
    </div>

    <!-- 게시물 시작 -->
    <table class="bbs_con" summary="게시물 목록을 보여줍니다.">
        <caption class="blind">게시물 목록</caption>
        <thead>
        <tr>
            <th width="5%" class="m_none">번호</th>
            <th width="10%" class="left">제목</th>
            <th width="10%" class="m_none">작성자</th>
            <th width="10%" class="m_date">작성일</th>
            <th width="5%" class="m_none">첨부파일</th>
            <th width="5%" class="m_none">조회수</th>
        </tr>
        </thead>
        <tbody>
        <c:if test="${pageMaker.totalCount eq 0 }">
            <tr align='center'>
                <td colspan="6">데이터가 존재하지않습니다.</td>
            </tr>
        </c:if>

        <c:forEach items="${ListData}" var="data">
            <fmt:parseDate value="${data.create_date}" var="date" pattern="yyyyMMddHHmmss"/>
            <tr class="tr-hover" onclick='location.href="info?idx=${data.board_idx}&seq=${data.seq}"' style='cursor: pointer;'>
                <td class="m_none">${data.seq}</td>
                <td class="left">${data.subject}&nbsp;&nbsp; <i class="fa fa-commenting" style="color:#888"/><span style="color:#888; ">&nbsp;${data.reply_cnt}</span></td>
                <td class="m_none">${data.user_name}</td>
                <td class="m_date"><fmt:formatDate value="${date}" pattern="yyyy-MM-dd HH:mm"/></td>
                <c:choose>
                    <c:when test="${data.file_cnt > 0}">
                        <td class="m_none"><img name=wiz_target_resize style="margin-top: 3px; vertical-align: top; display: inline-block;" src="https://directsend.co.kr/images/common/icon_bigfile.png" /></td>
                    </c:when>
                    <c:otherwise>
                        <td class="m_none"><i class="fa fa-unlink"/> </td>
                    </c:otherwise>
                </c:choose>
                <td class="m_none">${data.read_count}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
    <!-- 게시물 끝 -->

    <!-- 페이징 -->
    <div class='page_num'>
        ${pageMaker._pagination("board") }
    </div>
    <!-- 페이징 -->

    <div class="bbs_btn align_right">
        <a class='btn_w' id="write">글쓰기</a>
    </div>

</div>


<form id="values" action="/bd_writeForm" method="POST">
    <input type="hidden" value="${board_code}" name="board_code">
</form>








</body>
</html>
<script>

    var board_code = '${board_code}';
    var main_data = {
        auth:{}
    };

    $(window).load(function(){
        $.ajax({
            url: 'getNM?idx=${board_code}',
            type: 'GET',
            async: true,
            dataType: "json",
            error: function (e) {
                if(e.status == 200){
                    $('#sub-t-1').text(e.responseText);
                    $('#sub-t-4').text(e.responseText);
                }
            }
        });
        authcheck();
    });


    function authcheck() {
        ccn_ajax("/menuAuthGet", {keyword: board_code}).then(function (data) {
            main_data.auth = data;
        });
    }


    $('#write').click(
        function(){
            if (main_data.auth.check_add !="N") {
                $('#values').submit();
            } else {
                alert("추가권한이 없습니다,");
            }
        }
    );
</script>
