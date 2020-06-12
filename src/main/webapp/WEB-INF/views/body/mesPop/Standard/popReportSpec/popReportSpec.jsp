<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesPOP/Standard/popReportSpec/popReportSpec.js" charset="UTF-8"></script>

<div id="progressbar1" data-value="0"></div>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 border_top">

            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">제품구분</td>
                        <td class="wt-px-150 border_no">
                            <select id="prod_type_select_main"  class="form-control h-25 condition_main" name="keyword" onchange="select_change1(this.value);" style="width: 100%">

                            </select>
                        </td>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">제품명</td>
                        <td class="wt-px-150 border_no">
                            <select id="prod_select_main" class="form-control h-25 condition_main" name="keyword2" style="width: 100%">

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
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
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

<%@include file="popReportSpec_modal1.jsp" %>
<%@include file="popReportSpec_modal2.jsp" %>



