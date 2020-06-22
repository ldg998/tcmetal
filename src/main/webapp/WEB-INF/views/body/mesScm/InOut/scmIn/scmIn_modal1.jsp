<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmIn/scmIn_modal1.js" charset="UTF-8"></script>
<style>
    /*td label {*/
    /*    font-size: 12px!important;*/
    /*    margin-right: 8px;*/
    /*}*/
    input[type=text][name="ord_qty"] {
        height: 18px !important;
    }
    input[type=text][name="remark"] {
        height: 18px !important;
    }
    input[type=text][name="direction"] {
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
                          <span class="input-icon input-icon-right">
                            <input type="text" name="supp_name" class="form-control h-25 modal_value" id="supp_name_modal" >

<%--                          <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch-Main"></i>--%>
                          </span>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">입고일자</td>
                    <td class="wt-px-140">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="start_date" id="datepicker3"
                               class="form-control h-25 condition_main" readonly>
                        <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                    </div>
                    </td>


                    <td class="wt-px-100 t-align-c td-title padding-a-0">비고</td>
                    <td class="wt-px-140"><input type="text" class="form-control h-25 modal_value"></td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                        </a>

                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">
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
