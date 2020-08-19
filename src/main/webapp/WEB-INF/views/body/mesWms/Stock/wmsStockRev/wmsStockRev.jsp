<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<script type="text/javascript" src="/data-component/mesWMS/Stock/wmsStockRev/wmsStockRev.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100 board_line">
                <tbody>
                <tr>

                    <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-200">
                        <select class="form-control condition_main" name="keyword" id="supp_select" style="width: 100%" onchange="select_change1(this.value)" ></select>
                    </td>

                    <td class="wt-px-100 td-title t-align-c padding-a-0">기종</td>
                    <td class="wt-px-200">
                        <select id="part_kind_select" class="form-control condition_main" name="keyword2" style="width: 100%;">
                            <option value="">전체</option>

                        </select>
                    </td>


                    <td class="wt-px-50 td-title t-align-c padding-a-0">위치</td>
                    <td class="wt-px-200">
                        <select name="keyword3" id="main_select3" class="form-control condition_main" style="width: 100%;">
                            <option value="1">등록</option>
                            <option value="2">삭제</option>

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
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn();">
                        <span><i class="fa fa-plus bigger-110 blue"></i><span>추가</span></span>
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


<%@include file="wmsStockRev_modal1.jsp" %>

