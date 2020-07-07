<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crm_10/crm_10_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="출고지시서" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--        <div class="profile-info-row">--%>
        <%--            <div class="profile-info-name">점검일</div>--%>
        <%--            <div class="profile-info-value">--%>
        <%--                <div class="input-icon input-icon-right">--%>
        <%--                    <input type="hidden" autofocus>--%>
        <%--                    <input type="text" name="work_date" id="datepicker3"--%>
        <%--                           class="form-control h-25 modal_value" readonly>--%>
        <%--                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>--%>
        <%--                </div>--%>
        <%--            </div>--%>
        <%--        </div>--%>

        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker_modal"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="datepicker2_modal"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-50 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-100">
                        <input type="text" name="" class="form-control h-25 condition_main" autofocus>
                    </td>

                    <td class="wt-px-50 td-title t-align-c padding-a-0">출고일자</td>
                    <td class="wt-px-100">
                        <input type="text" name="" id="datepicker3_modal" class="form-control h-25 condition_main" readonly>
                    </td>

                    <td class="wt-px-50 td-title t-align-c padding-a-0">납품장소</td>
                    <td class="wt-px-75">
                        <select name="keyword" id="_select" class="form-control keyword condition_main" style="width:100%">
                            <option value="">성우</option>
                        </select>
                    </td>

                    <td class="wt-px-50 td-title t-align-c padding-a-0">운송수단</td>
                    <td class="wt-px-75">
                        <select name="keyword2" id="_select2" class="form-control keyword condition_main" style="width:100%">
                            <option value="">벌크</option>
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
                       onclick="get_btn(1)">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>

                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="excel_download">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>저장</span>
                                        </span>
                    </a>
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="partModal_close();">
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
                <table id="mes_modal_grid"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_modal_grid_pager"></div>
            </div>
        </div>
    </div>
</div>