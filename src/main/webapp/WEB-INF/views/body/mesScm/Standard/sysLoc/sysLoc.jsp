<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %>
<!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysLoc/sysLoc.js"
        charset="UTF-8"></script>
<!-- 스크립트 파일 import -->
<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <%-- 구분 선택창 --%>
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">구분</td>
                    <td class="wt-px-200">
                        <select name="keyword" id="cargo_select" class="form-control keyword condition_main"
                                style="width:100%">
                        </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- button div 영역 -->
        <div class="clearfix">
            <!-- button div 왼쪽으로 float 정렬 -->
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <!-- 조회버튼 -->
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       title="" onclick="get_btn(1);">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>
                    <!-- 추가버튼 -->
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="add_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>추가</span>
                            </span>
                    </a>
                    <!-- 삭제버튼 -->
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       title=""
                       onclick="delete_btn();">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>삭제</span>
                            </span>
                    </a>
                </div>
            </div>
        </div>
        <!-- jqGrid 영역 -->
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <!-- grid영역 -->
                <table id="mes_grid"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>

<!-- 모달창 import -->
<%@include file="sysLoc_modal1.jsp" %>



