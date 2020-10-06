<%@ page language="java" contentType="text/html; charset=UTF-8"%><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesOUT/stock/outsStockSum/outsStockSum.js" charset="UTF-8"></script> <%--스크립트 파일 import--%>

<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<div id="progressbar1" data-value="0"></div>
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

                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회일자</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="work_date" id="datepicker"
                                       class="form-control h-25 condition_main sendDate" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>

                        <!-- 구분 select 창 -->
                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <%--조회할 업채명--%>
                        <td class="wt-px-200">
                            <select class="form-control condition_main" name="keyword" id="main_select1" style="width: 100%" onchange="main_select_change1(this.value)" ></select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">기종</td>
                        <td class="wt-px-200">
                            <select name="keyword2" id="main_select2" class="form-control condition_main" style="width: 100%;">
                                <option value="">전체</option>
                            </select>
                        </td>
                        <td class="wt-px-100 t-align-c td-title padding-a-0">외주업체</td>
                        <td class="wt-px-200">
                            <select name="keyword3" id="main_select3" class="form-control condition_main" style="width: 100%;">
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
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                        tabindex="0" aria-controls="dynamic-table" data-original-title=""  title="" onclick="get_btn(1);">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="excel_download();">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>저장</span>
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
        <div title="데이터 저장중입니다...." id="preparing-file-modal" style="display: none;">
            <div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>
        </div>
        <div title="알림" id="error-modal" style="display: none;">
            <p>저장 실패. 관리자에게 문의하세요</p>
        </div>
    </div>
</div>
<!-- 모달창 import -->

<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>