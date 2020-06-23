<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>

<script src="/data-component/common/html2canvas.js"></script>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlanCheck/popPlanCheck.js" charset="UTF-8"></script>

<div id="progressbar1" data-value="0"></div>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 border_top">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">조회기간</td>
                        <td class="wt-px-150 border_no">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c border_no" style="width:20px !important;">
                            ~
                        </td>
                        <td class="wt-px-150 border_no">
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
                <table class="table wt-100">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">현장명</td>
                        <td class="wt-px-150 border_no">
                            <div class="input-icon input-icon-right">
                                <input id="place_name" onkeyup="Enter_Check()" class="form-control h-25 condition_main" name="keyword" autocomplete="off">
                            </div>
                        </td>
                        <td class="wt-px-100 border_no"></td>
                        <td class="wt-px-150 border_no"></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0"
                        aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                    </a>
<%--                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"--%>
<%--                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="excel_download()">--%>
<%--                                <span>--%>
<%--                                    <i class="fa fa-download bigger-110 blue"></i>--%>
<%--                                    <span>저장</span>--%>
<%--                                </span>--%>
<%--                    </a>--%>

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
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

<%@include file="popPlanCheck_Modal1.jsp" %>
