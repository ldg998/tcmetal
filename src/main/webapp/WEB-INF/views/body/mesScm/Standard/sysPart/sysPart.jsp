<%@ page language="java" contentType="text/html; charset=UTF-8" %><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %><!-- 스프링프레임워크 form 태그립기능-->
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPart/sysPart.js" charset="UTF-8"></script><!-- 스크립트 파일 import -->

<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">

        <!-- 검색 div 영역 -->
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-6 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>

                        <!-- 구분 select 창 -->
                        <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_type">구분</td>
                        <td class="wt-px-200">
                            <select id="part_type_select" name="keyword" class="form-control keyword condition_main"  style="width:100%">
                            </select>
                        </td>
                        <!-- 품목코드 검색창 -->
                        <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_group1">품번</td>
                        <td class="wt-px-200">
                            <input type="text" name="keyword2" class="form-control h-25 condition_main" id="part_code" autocomplete="off">
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <select class="form-control condition_main" name="keyword3" id="supp_select" style="width: 100%">
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- button div 영역 -->
        <div class="clearfix">
            <!-- button div 왼쪽으로 float 정렬 -->
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <!-- 조회버튼 -->
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>
                    <!-- 추가버튼 -->
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>추가</span>
                            </span>
                    </a>
                    <!-- 삭제버튼 -->
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>삭제</span>
                            </span>
                    </a>
<%--                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"--%>
<%--                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">--%>
<%--                            <span>--%>
<%--                                <i class="fa fa-download bigger-110 blue"></i>--%>
<%--                                <span>저장</span>--%>
<%--                            </span>--%>
<%--                    </a>--%>
<%--                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"--%>
<%--                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">--%>
<%--                            <span>--%>
<%--                                <i class="fa fa-upload bigger-110 blue"></i>--%>
<%--                                <span>엑셀업로드</span>--%>
<%--                            </span>--%>
<%--                    </a>--%>
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
<%@include file="sysPart_modal1.jsp" %>




