<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %>
<!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->

<script type="text/javascript" src="/data-component/mesCRM/orders/crmOrderRecp/crmOrderRecp.js"
        charset="UTF-8"></script>
<!-- 스크립트 파일 import -->

<div class="main-content-inner">
    <div class="page-content">
        <div class="clearfix">

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
                            <td class="t-align-c" style="width:25px !important;">
                                ~
                            </td>
                            <td class="wt-px-200">
                                <div class="input-icon input-icon-right">
                                    <input type="text" name="end_date" id="datepicker2"
                                           class="form-control h-25 condition_main sendDate" readonly>
                                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
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
                                <div class="input-icon input-icon-right">
                                    <select class="form-control condition_main" name="keyword" id="supp_select"
                                            onchange="select_change1(this.value)" style="width: 100%"></select>
                                </div>
                            </td>
                            <td class="wt-px-100 td-title t-align-c padding-a-0">기종</td>
                            <td class="wt-px-200">
                                <select name="keyword2" id="part_kind_select" class="form-control condition_main"
                                        onchange="select_change2(this.value)"
                                        style="width: 100%;">
                                    <option value="">전체</option>
                                </select>
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
                            <td class="wt-px-100 td-title t-align-c padding-a-0">품명</td>
                            <td class="wt-px-200">
                                <select id="part_code_select" name="keyword3" class="form-control condition_main"
                                        style="width: 100%;">
                                    <option value="">전체</option>
                                </select>

                            </td>
                            <td class="wt-px-100 td-title t-align-c padding-a-0">상태</td>
                            <td class="wt-px-200">
                                <select id="status" name="keyword4" class="form-control condition_main"
                                        style="width: 100%;">
                                    <option value="">전체</option>
                                    <option value="0">대기(진행중)</option>
                                    <option value="1">완료</option>
                                </select>
                            </td>
                            <td class="border_no display_none" style=" width:80px !important;"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">

                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="get_end_date_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>납기조회</span>
                        </span>
                    </a>
                    <a id="add_btn"
                       class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn();">
                        <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                        </span>
                    </a>
                    <a id="delete_btn"
                       class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="delete_btn();">
                        <span><i class="fa fa-trash bigger-110 blue"></i>
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
                    <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="Cancel_btn();">
                        <span>
                        <i class="fa fa-times bigger-110 blue"></i>
                        <span>완료취소</span>
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

    </div>
</div>

<!-- 모달창 import -->
<%@include file="crmOrderRecp_modal1.jsp" %>

