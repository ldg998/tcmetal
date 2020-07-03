<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesQMS/Qms/dumi/qms_1.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-50 board_line">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 condition_main"
                                   id="supp_name_main" onclick="supp_btn('A');" readonly>
                            <input type="hidden" name="keyword" class="form-control h-25 condition_main"
                                   id="supp_code_main">
                            <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">기종</td>
                    <td class="wt-px-200">
                        <input type="text" name="" class="form-control h-25 condition_main">

                    </td>

                    <td class="wt-px-100 t-align-c td-title padding-a-0">상태</td>
                    <td class="wt-px-100">
                       <select id="_select" style="width: 100%">
                           <option value="">전체</option>
                           <option></option>
                       </select>

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="test()">
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




<%@include file="qms_1_modal1.jsp"%>
<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>




