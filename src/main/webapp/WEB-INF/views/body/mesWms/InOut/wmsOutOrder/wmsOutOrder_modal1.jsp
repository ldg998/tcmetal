<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsOutOrder/wmsOutOrder_modal1.js" charset="UTF-8"></script>
<style>
    input[type=text][name="req_qty"] {
        height: 18px !important;
    }

</style>
<div id="addDialog" title="제품 출고 요청 추가" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0" id="content1">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">출고일자</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker3" class="form-control h-25 modal_value" >
                            <input type="hidden" autofocus>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 modal_value" readonly
                                   id="supp_name_modal" onclick="supp_btn('B');" readonly>
                            <input type="hidden" name="supp_code" class="form-control h-25 modal_value"
                                   id="supp_code_modal">
                            <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                        </div>
                    </td>

                    <td class="wt-px-100 t-align-c td-title padding-a-0">현장</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="keyword2" class="form-control h-25 modal_value"
                                   id="place_name">
                        </div>
                    </td>

                    <td></td>
                </tr>
                </tbody>
            </table>
            <input type="hidden" name="req_no" id="req_no"  class="form-control h-25 modal_value" readonly>
            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a  id="get_modal_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                            tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_modal_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" onclick="addupdate_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" id="close_btn" onclick="close_modal1_btn();">
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
                    <table id="mes_modal_grid"></table>
                </div>
            </div>
        </div>
    </div>
</div>

