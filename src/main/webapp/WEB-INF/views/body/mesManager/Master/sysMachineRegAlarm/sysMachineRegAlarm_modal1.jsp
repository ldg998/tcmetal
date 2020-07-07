<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<script type="text/javascript" src="/data-component/mesManager/Master/sysMachineRegAlarm/sysMachineRegAlarm_modal1.js"
        charset="UTF-8"></script>
<div id="addDialog" title="예방점검알림추가" style="display: none">
    <div class="clearfix margin-at">
        <div class="col-xs-12">
            <div class="col-xs-5">
                <table class="table wt-75 board_line">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 t-align-c td-title padding-a-0">부서</td>
                        <td class="wt-px-150">
                            <input type="hidden" autofocus>
                            <select name="keyword" class="form-control h-25 modal_value2" id="select_modal1"
                                    style="width: 100%">
                            </select>
                        </td>

                    </tr>
                    </tbody>
                </table>
                <div class="col-xs-12 padding0">
                    <div class="tableTools-container pull-left">
                        <div class="dt-buttons btn-overlap btn-group">
                            <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                               id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                               onclick="excel_download">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>저장</span>
                                        </span>
                            </a>

                            <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                               tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                               onclick="close_modal1_btn()">
                            <span>
                                <i class="fa fa-times bigger-110 blue"></i>
                                <span>취소</span>
                            </span>
                            </a>

                        </div>
                    </div>
                </div>
                <div class="col-xs-12 padding0" id="content1">
                    <table id="mes_modal1_grid1"></table>
                    <div id="mes_modal1_grid1_pager"></div>
                </div>
            </div>
            <div class="col-xs-7">
                <table class="table wt-50 board_line">
                    <tbody>
                    <tr>
                        <td class="wt-px-50 t-align-c td-title padding-a-0">구분</td>
                        <td class="wt-px-100">
                            <select name="line_code" id="select_modal2" class="form-control h-25 modal_send_data"
                                    style="width: 100%">
                                <option value="">중간검사(폐기)</option>
                            </select>
                        </td>

                    </tr>
                    </tbody>
                </table>
                <div class="col-xs-12 padding0" style="height: 29px">
                    <div class="tableTools-container pull-left">
                        <div class="dt-buttons btn-overlap btn-group">

                        </div>
                    </div>
                </div>
                <div class="col-xs-12 padding0" id="content2">
                    <table id="mes_modal1_grid2"></table>
                </div>
            </div>
        </div>
    </div>
</div>