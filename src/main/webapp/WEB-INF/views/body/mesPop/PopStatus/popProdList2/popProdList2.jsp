<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script type="text/javascript" src="/data-component/mesPOP/PopStatus/popProdList2/popProdList2.js" charset="UTF-8"></script>

<div class="main-content-inner">

    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 ">조회일자</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="work_date" id="datepicker" class="form-control h-25 condition_main sendDate" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">공정</td>
                        <td class="wt-px-200">
                            <select id='select1' name="keyword" onchange="main_select_change1(this.value);" class="form-control h-25 condition_main" style="width: 100%;">
                                <option value="">합형</option>
                                <option value="1"></option>
                                <option value="2"></option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 ">세부공정</td>
                        <td class="wt-px-200 border_no">
                            <select id='select2' name="keyword2" class="form-control h-25 condition_main"  style="width: 100%;">
                                <option value="">전체</option>
                                <option value="1"></option>
                                <option value="2"></option>
                            </select>

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
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="excel_download();">
                        <span><i class="fa fa-download bigger-110 blue"></i>
                            <span>저장</span>
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
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="mes_grid2"></table>
                    <div id="mes_grid_pager2"></div>
                </div>
            </div>


        </div>
    </div>
</div>




