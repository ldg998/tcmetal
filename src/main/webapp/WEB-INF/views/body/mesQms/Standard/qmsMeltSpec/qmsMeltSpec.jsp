<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsMeltSpec/qmsMeltSpec.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <select class="form-control condition_main" name="keyword" id="supp_select" style="width: 100%" onchange="select_change1(this.value)" ></select>
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">기종</td>
                        <td class="wt-px-200">
                            <select id="part_kind_select" name="keyword2"  class="condition_main" style="width: 100%;">
                                <option value="">전체</option>

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
                        <td class="wt-px-100 t-align-c td-title padding-a-0">상태</td>
                        <td class="wt-px-200">
                            <select id="status" style="width: 100%" class="condition_main">
                                <option value="">전체</option>
                                <option value="0">등록</option>
                                <option value="1">미등록</option>

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
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table"  data-original-title="" title="" onclick="get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
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




<%@include file="qmsMeltSpec_modal1.jsp"%>




