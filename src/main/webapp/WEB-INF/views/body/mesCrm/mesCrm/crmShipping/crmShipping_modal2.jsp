<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/orders/crmShipping/crmShipping_modal2.js" charset="UTF-8"></script>

<div id="addDialog2" title="출하조회" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker_modal"
                                   class="form-control h-25 modal_value2 sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2_modal"
                                   class="form-control h-25 modal_value2 sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                        <input type="hidden" name="req_no" class="modal_value"  autofocus>
                    </td>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-125">
                        <select class="form-control modal_value2" id="modal2_select1" name="keyword"  style="width: 100%"  ></select>
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
                       onclick="modal2_get_btn(1)">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>

                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="modal2_check();">
                                        <span><i class="fa fa-check bigger-110 blue"></i>
                                            <span>선택</span>
                                        </span>
                    </a>
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal1_close_btn();">
                                <span>
                                    <i class="fa fa-times bigger-110 blue"></i>
                                    <span>취소</span>
                                </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <!-- grid영역 -->
                <table id="mes_modal2_grid1"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_modal2_grid1_pager"></div>
            </div>
        </div>
    </div>
</div>
