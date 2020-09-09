<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/orders/wmsOutOrder/wmsOutOrder_modal1.js"
        charset="UTF-8"></script>
<style>

    input[type=text][name="qty"] {
        height: 18px !important;
    }

</style>
<div id="addDialog" title="출고지시서" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker_modal"
                                   class="form-control h-25 modal_value sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2_modal"
                                   class="form-control h-25 modal_value sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                        <input type="hidden" name="req_no" class="modal_value"  autofocus>
                    </td>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-125">
                        <select class="form-control modal_value" id="modal1_select1" name="supp_code" onchange="select_change_modal1(this.value);"  style="width: 100%"  ></select>
                    </td>

                    <td class="wt-px-50 td-title t-align-c padding-a-0">출고일자</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker3_modal" class="form-control h-25 modal_value sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>

                    <td class="wt-px-50 td-title t-align-c padding-a-0">납품장소</td>
                    <td class="wt-px-125">
                        <select name="delivery_place" id="modal1_select2" class="form-control keyword modal_value" style="width:100%">
                            <option value="">성우</option>
                        </select>
                    </td>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">선적일자</td>
                    <td class="wt-px-125">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="ship_date" id="datepicker4_modal" class="form-control h-25 modal_value sendDate" readonly>
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
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" id="modal_get_btn"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="get_modal1_btn()">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>

                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="modal_add_btn" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="addUdate_btn();">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>저장</span>
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
                <table id="mes_modal1_grid1"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_modal1_grid1_pager"></div>
            </div>
        </div>
    </div>
</div>
