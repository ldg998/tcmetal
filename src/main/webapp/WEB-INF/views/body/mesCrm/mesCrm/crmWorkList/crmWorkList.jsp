<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmWorkList/crmWorkList.js" charset="UTF-8"></script>

<style>
    .td-title{
        border-left: none !important;
        font-size: 11px !important;
    }

    .crmWorkInput{
        height:30px !important;
        text-align: right !important;
    }

    .crmWorkTd{
        vertical-align: middle !important;
    }
</style>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
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
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
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
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                            <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                            </span>
                    </a>
                </div>
            </div>
        </div>

            <div class="row">
                <div class="col-xs-8 table-responsive">
                    <table id="mes_grid"></table>
                    <div id="mes_grid_pager"></div>
                </div>
                <div class="col-xs-4 table-responsive">
                    <div class="col-lg-12" style="height: 100% !important;">
                        <span class="sp-title">실적관리</span>
                        <table class="table multi_table pd-4" style="margin-top:5px; width:100% !important; height: 500px !important;">
                            <tbody>
                            <tr>
                                <td class="td-title t-align-c padding-a-0" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">월별</td>
                                <td class="td-title t-align-c padding-a-0" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">매출계획금액</td>
                                <td class="td-title t-align-c padding-a-0" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">매출실적</td>
                                <td class="td-title t-align-c padding-a-0" style="font-size:15px !important;">매입금액</td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">1월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control table_main crmWorkInput" readonly name="plan1" id="plan1" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control table_main crmWorkInput" readonly name="work1" id="work1" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control table_main crmWorkInput" readonly name="in1" id="in1" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">2월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control table_main crmWorkInput" readonly name="plan2" id="plan2" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control  table_main crmWorkInput" readonly name="work2" id="work2" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control  table_main crmWorkInput" readonly name="in2" id="in2" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">3월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control table_main crmWorkInput" readonly name="plan3" id="plan3" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work3" id="work3" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in3" id="in3" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">4월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan4" id="plan4" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work4" id="work4" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in4" id="in4" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">5월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan5" id="plan5" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work5" id="work5" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in5" id="in5" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">6월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan6" id="plan6" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work6" id="work6" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in6" id="in6" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">7월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan7" id="plan7" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work7" id="work7" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in7" id="in7" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">8월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan8" id="plan8" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work8" id="work8" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in8" id="in8" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">9월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan9" id="plan9" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work9" id="work9" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in9" id="in9" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">10월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan10" id="plan10" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work10" id="work10" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in10" id="in10" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">11월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan11" id="plan11" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work11" id="work11" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in11" id="in11" style="font-size:13px !important;">
                                </td>
                            </tr>
                            <tr>
                                <td class="td-title t-align-c padding-a-0 wt-px-50" style="border-right: 1px solid #b5b5b5 !important; font-size:13px !important;">12월</td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="plan12" id="plan12" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="work12" id="work12" style="font-size:13px !important;">
                                </td>
                                <td class="crmWorkTd">
                                    <input type="text" class="form-control crmWorkInput table_main" readonly name="in12" id="in12" style="font-size:13px !important;">
                                </td>
                            </tr>
                            </tbody>
                        </table>

                </div>
            </div>
        </div>
    </div>

</div>

<%@include file="crmWorkList_modal1.jsp"%>