<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/common/modal/crmModal.js" charset="UTF-8"></script>

<div id="crm-search-dialog" title="수주번호조회" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="crm_datepicker" class="form-control h-25 crm_condition" readonly >
                            <input type="hidden"  class="form-control h-25" autofocus readonly >
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">
                        ~
                    </td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="crm_datepicker2" class="form-control h-25 crm_condition" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">업체명</td>
                    <td class="wt-px-200">
                        <input type="text" name="supp_name" id="crm_supp_name" class="form-control h-25 crm_condition" readonly>
                        <input type="hidden" name="keyword" id="crm_supp_code" class="form-control h-25 crm_condition">
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                            onclick="crmModal_get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                        </a>
                        <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="crmModal_check();">
                                <span><i class="fa fa-check bigger-110 blue"></i>
                                    <span>선택</span>
                                </span>
                        </a>
                        <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                           onclick="crmModal_close();">
                                <span>
                                    <i class="fa fa-times bigger-110 blue"></i>
                                    <span>취소</span>
                                </span>
                        </a>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-xs-12">
                    <table id="crmSearchGrid"></table>
                    <div id="crmSearchGridPager"></div>
                </div>
            </div>
        </div>
    </div>
</div>
