<%@ page language="java" contentType="text/html; charset=UTF-8"%><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crm_8/crm_8.js" charset="UTF-8"></script> <%--스크립트 파일 import--%>
<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <!-- 검색 div 영역 -->
        <div class="col-lg-12 padding0">
            <table class="table wt-15 board_line">
                <tbody>
                <tr>

                    <!-- 구분 select 창 -->
                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_type">업체</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 condition_main"
                                   id="supp_name_main" onclick="supp_btn('A');" readonly>
                            <input type="hidden" name="keyword" class="form-control h-25 condition_main"
                                   id="supp_code_main">
                            <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                        </div>
                    </td>
                    <!-- 품목코드 검색창 -->
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
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                        tabindex="0" aria-controls="dynamic-table" data-original-title=""  title="" onclick="test();">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
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
<%@include file="crm_8_modal1.jsp"%>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>
