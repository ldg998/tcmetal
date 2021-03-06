<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 스크립트 파일 import -->
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn.js" charset="UTF-8"></script>

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
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
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
                        <td class="border_no display_none" style=" width:80px !important;"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                        <tr>
                            <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                            <%--조회할 업채명--%>
                            <td class="wt-px-200">
                                <select class="form-control condition_main" name="keyword" id="supp_select" style="width: 100%">
                                </select>
                            </td>
                            <td class="wt-px-100"></td>
                            <td class="wt-px-200"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- button div 영역 -->
        <div class="clearfix">
            <%--버튼 왼쪽정렬--%>
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <%--조회버튼--%>
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                            <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                            </span>
                    </a>
                    <%--추가버튼--%>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title=""
                       onclick="add_btn();">
                            <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                            </span>
                    </a>
                    <%--삭제버튼--%>
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="delete_btn();">
                        <span>
                        <i class="fa fa-trash bigger-110 blue"></i>
                        <span>삭제</span>
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

        <hr/>
        <!-- jqGrid 영역 -->
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <!-- grid영역 -->
                <table id="mes_grid2"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_grid2_pager"></div>
            </div>
        </div>
    </div>
</div>

<!-- 모달창 import -->
<%@include file="scmIn_modal1.jsp" %>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>



