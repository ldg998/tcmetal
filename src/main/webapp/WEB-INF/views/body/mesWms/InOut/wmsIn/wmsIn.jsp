<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 스크립트 파일 import -->
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsIn/wmsIn.js" charset="UTF-8"></script>

<style>
    #mes_add_grid_pager #pg_mes_add_grid_pager table {
        table-layout: auto !important;
    }
</style>

<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <!-- 검색 div 영역 -->
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <%-- 조회날짜(시작) --%>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <%--조회날짜(끝)--%>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                    <%--조회할 업채명--%>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 condition_main"
                                   id="supp_name_main" autocomplete="off">
                            <%--<i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>--%>
                        </div>
                    </td>

                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- button div 영역 -->
        <div class="clearfix">
            <%--버튼 왼쪽정렬--%>
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <%--조회버튼--%>
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="test()">
                            <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                            </span>
                    </a>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>

<!-- 모달창 import -->
<%@include file="wmsIn_modal1.jsp" %>
<%-- <%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %> --%>



