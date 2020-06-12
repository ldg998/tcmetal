<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/common/modal/partModal.js" charset="UTF-8"></script>

<div id="part-search-dialog" title="품목 조회" style="display:none">
    <div class="col-lg-12">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">제품유형</td>
                    <td class="wt-px-200">
                        <select class="form-control part_condition" name="keyword" id="part_type_select_modal" onchange="select_part_modal_change1(this.value)" style="width:100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">품목군</td>
                    <td class="wt-px-200">
                        <select class="form-control part_condition" name="keyword2" id="part_group_select_modal" onchange="select_part_modal_change2(this.value)" style="width:100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">제품군</td>
                    <td class="wt-px-200">
                        <select class="form-control part_condition" name="keyword3" id="part_prod_select_modal" style="width:100%">
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
                        <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="partModal_get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                        </a>
                        <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" title="" id="showDialog" onclick="partModal_check();">
                                <span><i class="fa fa-check bigger-110 blue"></i>
                                    <span>선택</span>
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
                <div class="col-xs-12">
                    <table id="partSearchGrid"></table>
                    <div id="partSearchGridPager"></div>
                </div>
            </div>
        </div>
    </div>
</div>
