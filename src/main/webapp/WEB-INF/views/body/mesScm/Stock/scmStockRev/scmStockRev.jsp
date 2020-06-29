<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesSCM/Stock/scmStockRev/scmStockRev.js" charset="UTF-8"></script>

<%--<div id="progressbar1" data-value="0"></div>--%>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">구분</td>
                    <td class="wt-px-200">
                        <select name="keyword" id="part_type_select" class="form-control keyword condition_main" style="width:100%">
                        <option value="">전체</option>
                            <option></option>
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">품번</td>
                    <td class="wt-px-200">
                        <input type="text" name="part_no" class="form-control h-25 condition_main"
                               id="part_no"  autocomplete="off" >
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
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                  <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                      id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="">
                       <span><i class="fa fa-download bigger-110 blue"></i>
                           <span>저장</span>
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

        <%--        <div title="데이터 저장중입니다...." id="preparing-file-modal" style="display: none;">--%>
        <%--            <div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>--%>
        <%--        </div>--%>
        <%--        <div title="알림" id="error-modal" style="display: none;">--%>
        <%--            <p>저장 실패. 관리자에게 문의하세요</p>--%>
        <%--        </div>--%>

    </div>
</div>

<%@include file="scmStockRev_modal1.jsp" %>