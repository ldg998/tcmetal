<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysProdSum/sysProdSum.js" charset="UTF-8"></script>


<div id="progressbar1" data-value="0"></div>
<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회일자</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="work_date" id="datepicker"
                                       class="form-control h-25 condition_main sendDate " readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <select class="form-control condition_main" name="supp_code" id="supp_select" style="width: 100%" onchange="select_change1(this.value)" ></select>

                            </div>
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
                            <div class="input-icon input-icon-right">
                                <select id="part_kind_select" name="part_kind" class="form-control condition_main"  style="width: 100%;">
                                    <option value="">전체</option>
                                </select>
                            </div>
                        </td>
                        <td class="wt-px-100"></td>
                        <td class="wt-px-200"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick=" get_btn(1);">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>

<%--                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"--%>
<%--                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""--%>
<%--                       onclick="excel_download()">--%>
<%--                        <span><i class="fa fa-download bigger-110 blue"></i>--%>
<%--                            <span>저장</span>--%>
<%--                        </span>--%>
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


