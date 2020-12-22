<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesCRM/standard/sysSPart/sysSPart.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <select class="form-control condition_main" name="keyword" id="supp_select" onchange="select_change1(this.value);" style="width: 100%" <%--onchange="supp_select_change()"--%>></select>

                        </td>

                        <td class="wt-px-100 t-align-c td-title padding-a-0">기종</td>
                        <td class="wt-px-200">
                            <select id='part_kind_select' name="keyword2" class="form-control h-25 condition_main" onchange="select_change2(this.value)" style="width: 100%;">--%>
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
                        <td class="wt-px-100 td-title t-align-c padding-a-0">품명</td>
                        <td class="wt-px-200">
                            <select id="part_code_select" name="keyword3" class="form-control condition_main" style="width: 100%;">
                                <option value="">전체</option>
                            </select>
                        </td>
                        <td class="wt-px-100"></td>
                        <td class="wt-px-200"></td>
                        <td class="border_no display_none" style=" width:4% !important;"></td>

                    </tr>
                    </tbody>
                </table>
            </div>



        </div>
        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                        <span>
                            <i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                        </span>
                    </a>
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
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
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>



<%@include file="sysSPart_modal1.jsp" %>



