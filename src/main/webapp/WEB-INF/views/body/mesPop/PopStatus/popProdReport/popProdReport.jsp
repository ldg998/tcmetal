<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/popProdReport/popProdReport.js" charset="UTF-8"></script>

<div id="progressbar1" data-value="0"></div>

<div class="main-content-inner">

    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker" class="form-control h-25 condition_main sendDate"  readonly>                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c" style="width:25px !important;">~</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="stop_date" id="datepicker2" class="form-control h-25 condition_main sendDate"  readonly>
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
                        <td class="wt-px-100 t-align-c td-title padding-a-0">라인그룹</td>
                        <td class="wt-px-200">
                            <select name="keyword" id="main_select1" class="form-control  condition_main" onchange="main_select_change1(this.value)" style="width:100%">
                                <option value="">전체</option>
                            </select>
                        </td>

                        <td class="wt-px-100 t-align-c td-title padding-a-0">라인명</td>
                        <td class="wt-px-200">
                            <select name="keyword2" id="main_select2" class="form-control  condition_main" style="width:100%">
                                <option value="">전체</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>

                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="mes_grid"></table>
                    <div id="mes_grid_pager"></div>
                </div>
            </div>

            <hr/>

            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="mes_grid2"></table>
                    <div id="mes_grid2_pager"></div>
                </div>
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





