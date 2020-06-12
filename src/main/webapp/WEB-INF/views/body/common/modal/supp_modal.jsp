<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/common/modal/suppModal.js" charset="UTF-8"></script>

<div id="supp-search-dialog" title="업체조회" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title" style="background-color: #ffffff !important;">
                        <input type="hidden" autofocus>
                        <select name="keyword" id="gubun_select" class="form-control keyword suppModal_condition" style="width:100%">
                            <option value="CORP_TYPE1">매입</option>
                            <option value="CORP_TYPE2">매출</option>
                            <option value="CORP_TYPE3">혼합</option>
                        </select>
                    </td>
                    <td class="wt-px-100 td-title t-align-c">업체</td>
                    <td class="wt-px-200">
                        <input name="keyword2" id="supp_code_search" type="text" class="form-control h-25 suppModal_condition" onkeyup="autoSupp_name(this.value)" autocomplete="on" onfocus="autoSupp_name(this.value)">
                    </td>
                    <td class="wt-px-100 td-title t-align-c">사업자번호</td>
                    <td class="wt-px-200">
                        <input name="keyword3" id="supp_no" type="text" class="form-control h-25 suppModal_condition" onkeyup="autoSupp_no(this.value);" autocomplete="on" onfocus="autoSupp_no(this.value)">
                    </td>
                    <td></td>

                </tr>
                </tbody>
            </table>
            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button btn btn-white btn-primary btn-mini btn-bold" title="" onclick="suppModal_get_btn(1)">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                        </a>
                        <a class="dt-button btn btn-white btn-primary btn-mini btn-bold" title="" onclick="suppModal_check()">
                            <span>
                                <i class="fa fa-check bigger-110 blue"></i>
                                <span>선택</span>
                            </span>
                        </a>
                        <a class="dt-button btn btn-white btn-primary btn-mini btn-bold" onclick="suppModal_close()">
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
                    <table id="SuppSearchGrid"></table>
                    <div id="SuppSearchGridPager"></div>
                </div>
            </div>
        </div>
    </div>
</div>
