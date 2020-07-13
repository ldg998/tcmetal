<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->

<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmOrderRecp/crmOrderRecp.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<div class="main-content-inner">
    <div class="page-content">
        <div class="clearfix">

            <div class="col-lg-12 padding0">
                <table class="table wt-100 board_line">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c" style="width:25px !important;">
                            ~
                        </td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="end_date" id="datepicker2"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="supp_name" class="form-control h-25 condition_main">
<%--                                <input type="text" name="supp_name" class="form-control h-25 condition_main"--%>
<%--                                       id="supp_name_main" onclick="supp_btn('A');" readonly>--%>
<%--                                <input type="hidden" name="keyword" class="form-control h-25 condition_main"--%>
<%--                                       id="supp_code_main">--%>
<%--                                <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>--%>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">

                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn();">
                        <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                        </span>
                    </a>
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                        <span><i class="fa fa-trash bigger-110 blue"></i>
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
    </div>
</div>

<!-- 모달창 import -->
<%@include file="crmOrderRecp_modal1.jsp"%>



<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>
