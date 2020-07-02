<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->

<script type="text/javascript" src="/data-component/mesOUT/mesOut/dumi/out_5.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<div class="main-content-inner">
    <div class="page-content">
        <div class="clearfix">

            <div class="col-lg-12 padding0">
                <table class="table wt-100">
                    <tbody>
                    <tr>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="start_date" id="datepicker"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>
                        <td class="t-align-c" style="width:25px !important;">
                            ~
                        </td>
                        <td class="wt-px-200">
                            <div class="input-icon input-icon-right">
                                <input type="text" name="end_date" id="datepicker2"
                                       class="form-control h-25 condition_main" readonly>
                                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                            </div>
                        </td>

                        <td class="wt-px-100 td-title t-align-c padding-a-0">구분</td>
                        <td class="wt-px-200">
                            <select name="keyword2" id="select1" class="form-control condition_main"  style="width:100%">
                                <option value="">전체</option>
                                <option value="0">수정</option>
                                <option value="1">폐기</option>
                            </select>
                        </td>
                        <td class="wt-px-100 td-title t-align-c padding-a-0">외주업체</td>
                        <td class="wt-px-200">
                            <select name="keyword2" id="select2" class="form-control condition_main"  style="width:100%">
                                <option value="">반드시 선택</option>
                                <option value="0"></option>
                                <option value="1"></option>
                            </select>
                        </td>
                        <td></td>


                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">

                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="test();">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="excel_download">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>저장</span>
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
<%@include file="out_5_modal1.jsp"%>



