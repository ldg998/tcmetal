<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="data-component/mesPOP/PopStatus/popSpectro/popSpectro.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100 board_line">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">조회기간</td>
                    <td class="wt-px-200 border_no">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker"
                                   class="form-control h-25 condition_main sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c border_no" style="width:20px !important;">
                        ~
                    </td>
                    <td class="wt-px-200 border_no">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2"
                                   class="form-control h-25 condition_main sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>

                    <td class="wt-px-75 td-title t-align-c padding-a-0 border_no">라인그룹</td>
                    <td class="wt-px-150 border_no">
                        <select id="main_select1" class="form-control h-25 condition_main" name="keyword"
                                style="width: 100%" onchange="main_select_change1(this.value);">
                            <option value="">합형1</option>
                            <option value="0">합형2</option>
                            <option value="1">합형3</option>
                        </select>
                    </td>
                    <td class="wt-px-75 td-title t-align-c padding-a-0 border_no">라인명</td>
                    <td class="wt-px-150 border_no">
                        <select id="main_select2" class="form-control h-25 condition_main" name="keyword2"
                                style="width: 100%">
                            <option value="">합형1</option>
                            <option value="0">합형2</option>
                            <option value="1">합형3</option>
                        </select>
                    </td>

                    <td class="wt-px-75 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-150">
                        <select class="form-control condition_main" name="supp_code" id="supp_select" style="width: 100%" onchange="select_change1(this.value)" ></select>
                    </td>

                    <td class="wt-px-75 td-title t-align-c padding-a-0">기종</td>
                    <td class="wt-px-150">
                        <select id="part_kind_select" name="part_kind" class="form-control condition_main"  style="width: 100%;">
                            <option value="">선택안함</option>
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
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick=" get_btn(1);">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="excel_download()">
                        <span><i class="fa fa-download bigger-110 blue"></i>
                            <span>저장</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>


    </div>
</div>

<%@include file="popSpectro_modal1.jsp"%>
