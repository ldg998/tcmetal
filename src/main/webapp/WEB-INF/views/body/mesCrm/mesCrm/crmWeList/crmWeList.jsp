<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false" %>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js"
        charset="UTF-8"></script>
<!-- 스크립트 파일 import -->
<script type="text/javascript" src="/data-component/common/pdf_ex/js/pdfmake/vfs_fonts.js" charset="UTF-8"></script>
<script src="/data-component/common/html2canvas.js"></script>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmWeList/crmWeList.js" charset="UTF-8"></script>

<div id="progressbar1" data-value="0"></div>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0 border_top">
            <div class="col-lg-4 col-md-12  padding0">
                <table class="table wt-100 margin-bottom-3">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">조회기간</td>
                        <td class="wt-px-150 border_no">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c border_no" style="width:20px !important;">
                            ~
                        </td>
                        <td class="wt-px-150 border_no">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="end_date" id="datepicker2"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="border_no display_none" style=" width:80px !important;"></td>

                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4 col-md-12 padding0">
                <table class="table wt-100">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0 border_no">수신(업체)명</td>
                        <td class="wt-px-150 border_no">
                            <div class="input-icon input-icon-right">
                                <input class="form-control h-25 condition_main enterKey" name="keyword"  autocomplete="off" >
                            </div>
                        </td>
                        <td class="wt-px-100 border_no"></td>
                        <td class="wt-px-150 border_no">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>

        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                    </a>
                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" id="showDialog" onclick="add_btn()">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>추가</span>
                                </span>
                    </a>
                    <a id="" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" id="" onclick="delete_btn()">
                                <span><i class="fa fa-trash bigger-110 blue"></i>
                                    <span>삭제</span>
                                </span>
                    </a>

                    <a id="pdf" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""  onclick="pdfMake_btn2();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>견적서</span>
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


        <hr />

        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="mes_grid2"></table>
                <div id="mes_grid2_pager"></div>
            </div>
        </div>

    </div>

</div>



<%@include file="crmWeList_modal1.jsp" %>
<div id="res" style="width: 100%; display: none; position: absolute" >

</div>



