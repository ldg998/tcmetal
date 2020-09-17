<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesCRM/orders/crmShippingList/crmShippingList.js" charset="UTF-8"></script>

<style>
    #gview_mes_grid>.ui-jqgrid-hdiv {
        line-height: 0 !important;
        max-height: 60px !important;
        color: black;
        white-space:normal !important;
        height:auto !important;
    }
    #gview_mes_grid >.ui-jqgrid-hdiv>.ui-jqgrid-hbox>.ui-jqgrid-htable >thead>.ui-jqgrid-labels>.ui-state-default {
        border-left: 0 none;
        background-color: #f1f1f1 !important;

    }
    #gview_mes_grid >.ui-jqgrid-hdiv>.ui-jqgrid-hbox>.ui-jqgrid-htable >thead>.ui-jqgrid-labels>th{
        text-align: center !important;
    }

    .ui-th-column-header{
        border-bottom: 1px solid #E1E1E1 !important;
    }
</style>
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
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main sendDate" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c" style="width:25px !important;">
                            ~
                        </td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="end_date" id="datepicker2"
                                       class="form-control h-25 condition_main sendDate" readonly>
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
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <select class="form-control condition_main" name="keyword" id="main_select1" style="width: 100%"  ></select>
                            </div>
                        </td>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">운송수단</td>
                        <td class="wt-px-200">
                            <select id="main_select2" name="keyword2" style="width: 100%" class="form-control condition_main">
                                <option value="">전체</option>
                                <option></option>
                                <option></option>

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
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" >
                        <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>저장</span>
                        </span>
                    </a>

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="mes_grid" class="mes_grid" style=""></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-xs-12">
                <div id="chart_div" style="border:1px solid black;"></div>
            </div>
        </div>

    </div>
</div>

