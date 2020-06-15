<%@ page language="java" contentType="text/html; charset=UTF-8"%><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %><!-- 응답 HTTP 헤더에 세션 쿠키가 존재 확인-->
<script type="text/javascript" src="/data-component/mesTPM/RegItem/tpmMachineRegItem/tpmMachineRegItem.js" charset="UTF-8"></script><!-- 스크립트 파일 import -->

<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <!-- button div 영역 -->
        <div class="clearfix">
            <!-- button div 왼쪽으로 float 정렬 -->
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <!-- 조회버튼 -->
                    <a  id="get_btn" class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                                <span>
                                    <i class="fa fa-search bigger-110 blue"></i>
                                    <span>조회</span>
                                </span>
                    </a>
                    <!-- 추가버튼 -->
                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" id="showDialog" onclick="add_btn();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>추가</span>
                                </span>
                    </a>
                    <!-- 삭제버튼 -->
                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                                <span>
                                    <i class="fa fa-trash bigger-110 blue"></i>
                                    <span>삭제</span>
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
<%@include file="tpmMachineRegItem_modal1.jsp"%>



