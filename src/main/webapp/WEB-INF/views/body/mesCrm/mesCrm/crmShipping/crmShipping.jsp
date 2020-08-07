<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesCRM/orders/crmShipping/crmShipping.js" charset="UTF-8"></script>

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
        <div class="col-lg-12 padding0">
            <table class="table wt-100 board_line">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 condition_main"
                                   id="supp_name_main" autocomplete="off" >
                        </div>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">운송수단</td>
                    <td class="wt-px-200">
                       <select id="1_select" style="width: 100%">
                           <option value="">전체</option>
                           <option></option>
                           <option></option>

                       </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="test()">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="test();">
                        <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                        </span>
                    </a>

                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="">
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
                <table id="mes_grid" class="mes_grid" style=""></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>

    </div>
</div>

<%@include file="crmShipping_modal1.jsp"%>
