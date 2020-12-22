<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="/ui-component/assets/js/jquery.fileDownload.js"></script>
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsOutList/wmsOutList.js" charset="UTF-8"></script>
<style>
    .filebox_lee label {
         /*display: unset;*/
         padding: .0em .0em;
         color: #000000;

         line-height: unset;
         vertical-align: unset;
         background-color: transparent;
         cursor: unset;
         border: transparent;
         border-bottom-color:transparent;
         /*border-radius: ;*/
        font-size: 11px;
        margin-bottom: 0px;
        padding-left: 6px;
    }
</style>

<div id="progressbar1" data-value="0"></div>
<div class="main-content-inner">

    <div class="page-content">
        <div class="col-lg-12 padding0 main_condition">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main sendDate" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c" style="width:25px !important;">~</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="end_date" id="datepicker2"
                                       class="form-control h-25 condition_main sendDate" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;" ></i>
                            </div>
                        </td>
                        <td class="border_no display_none" style=" width:80px !important;"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">업체</td>
                        <td class="wt-px-200">
                            <select class="form-control condition_main" name="keyword" id="supp_select" onchange="select_change1(this.value)" style="width: 100%"></select>
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">기종</td>
                        <td class="wt-px-200">
                            <select name="keyword2" id="part_kind_select" class="form-control condition_main" onchange="select_change2(this.value)" style="width: 100%;">
                                <option value="">전체</option>
                            </select>
                        </td>



                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">품명</td>
                        <td class="wt-px-200">
                            <select id="part_code_select" name="keyword4" class="form-control condition_main" style="width: 100%;">
                                <option value="">전체</option>
                            </select>

                        </td>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">LOT</td>
                        <td class="wt-px-200">
                            <input type="text" name="keyword3" id="lot_no"  class="form-control h-25 condition_main" autocomplete="off" style="width: 100%;">

                        </td>
<%--                        <td class="wt-px-100 td-title t-align-c padding-a-0">PO</td>--%>
<%--                        <td class="wt-px-200">--%>
<%--                            <input type="text" name="keyword4"  class="form-control h-25 condition_main" autocomplete="off">--%>
<%--                        </td>--%>
                        <td class="border_no display_none" style=" width:1% !important;"></td>
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="excel_download();">
                        <span><i class="fa fa-download bigger-110 blue"></i>
                            <span>저장</span>
                        </span>
                    </a>
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn()">
                        <span>
                        <i class="fa fa-trash bigger-110 blue"></i>
                        <span>삭제</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="complete_btn();">
                        <span>
                        <i class="fa fa-check-square-o bigger-110 blue"></i>
                        <span>완료처리</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>

        <div title="데이터 저장중입니다...." id="preparing-file-modal" style="display: none;">
            <div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>
        </div>
        <div title="알림" id="error-modal" style="display: none;">
            <p>저장 실패. 관리자에게 문의하세요</p>
        </div>
    </div>
</div>

