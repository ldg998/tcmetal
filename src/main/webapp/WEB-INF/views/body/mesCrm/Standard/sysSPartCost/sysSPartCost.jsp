<%@ page language="java" contentType="text/html; charset=UTF-8"%><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/standard/sysSPartCost/sysSPartCost.js" charset="UTF-8"></script> <%--스크립트 파일 import--%>
<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <!-- 검색 div 영역 -->
        <div class="col-lg-12 padding0">
            <table class="table wt-100 board_line">
                <tbody>
                <tr>

                    <!-- 구분 select 창 -->
                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_type">업체</td>
                    <td class="wt-px-200">
                        <select class="form-control condition_main" name="keyword" id="supp_select" style="width: 100%" onchange="select_change1(this.value);" ></select>


                    </td>
                    <!-- 품목코드 검색창 -->
                    <td class="wt-px-100 t-align-c td-title padding-a-0" id="part_group1">기종</td>
                    <td class="wt-px-200">
                        <select id='part_kind_select' name="keyword2" class="form-control h-25 condition_main" style="width: 100%;">--%>
                        </select>
                    </td>

                    <td class="wt-px-75 t-align-c td-title padding-a-0">출고일짜</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="work_date" id="datepicker1"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>



                    <td class="wt-px-100 t-align-c td-title padding-a-0">단가</td>
                    <td class="wt-px-200">
                        <input type="text" id='part_weight' name="part_weight" class="form-control h-25 condition_main" onkeyup="num_keyup_comma(this)" autocomplete="off" style="width: 100%;">

                    </td>

                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- button div 영역 -->
        <div class="clearfix">
            <!-- button div 왼쪽으로 float 정렬 -->
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <!-- 조회버튼 -->
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                        tabindex="0" aria-controls="dynamic-table" data-original-title=""  title="" onclick="get_btn(1);">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                    <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                       id="btn-weight" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                       onclick="add_part_weight()">
                                        <span><i class="fa fa-download bigger-110 blue"></i>
                                            <span>단가적용</span>
                                        </span>
                    </a>

                </div>
            </div>
        </div>
        <!-- jqGrid 영역 -->
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <!-- grid영역 -->
                <table id="mes_grid"></table>
                <!-- grid-pager 영역 -->
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>
<!-- 모달창 import -->
<%@include file="sysSPartCost_modal1.jsp"%>
