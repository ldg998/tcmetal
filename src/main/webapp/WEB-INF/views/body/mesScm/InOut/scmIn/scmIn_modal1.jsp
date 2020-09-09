<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn_modal1.js" charset="UTF-8"></script>
<style>
    /*td label {*/
    /*    font-size: 12px!important;*/
    /*    margin-right: 8px;*/
    /*}*/
    input[type=text][name="in_qty"] {
        height: 18px !important;
    }
    select[name="status"] {
        height: 18px !important;
    }
    select[name="qc_result"] {
        height: 18px !important;
    }
    input[type=text][name="qc_qty"] {
        height: 18px !important;
    }
    input[type=text][name="ng_qty"] {
        height: 18px !important;
    }
    select[name="ng_type"] {
        height: 18px !important;
    }
    input[type=text][name="ng_name"] {
        height: 18px !important;
    }
    select[name="act_type"] {
        height: 18px !important;
    }



</style>
<div id="addDialog" title="자재입고" style="display: none">
    <div class="col-lg-12">

            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">업체</td>
                    <td class="wt-px-140">
                        <select class="form-control modal_value" name="keyword" id="supp_modal_select" style="width: 100%"></select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">입고일자</td>
                    <td class="wt-px-140">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="work_date" id="datepicker3"
                               class="form-control h-25 modal_value" readonly>
                        <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                    </div>
                    </td>


                    <td class="wt-px-100 t-align-c td-title padding-a-0">비고</td>
                    <td class="wt-px-140"><input type="text" id="modal1_remark" name="keyword2" class="form-control h-25 modal_value" autofocus></td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a id="modal_get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_modal1_btn();">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                        </a>

                        <a id="modal_add_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_modal1_btn();">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="close_modal1_btn();">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>취소</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <table id="mes_add_grid"></table>
                    <div id="mes_add_grid_pager"></div>
                </div>
            </div>

    </div>
</div>
