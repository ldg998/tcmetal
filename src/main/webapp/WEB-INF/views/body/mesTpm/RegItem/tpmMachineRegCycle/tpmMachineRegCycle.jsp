<%@ page language="java" contentType="text/html; charset=UTF-8" %> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="/data-component/mesTPM/RegItem/tpmMachineRegCycle/tpmMachineRegCycle.js" charset="UTF-8"></script>

<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">

        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">라인</td>
                    <td class="wt-px-200">
                        <select name="keyword" id="line_select" class="form-control keyword condition_main" onchange="select_change1(this.value);" style="width:100%">
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">설비명</td>
                    <td class="wt-px-200">
                        <select name="keyword2" class="form-control h-25 condition_main" id="machine_select" style="width:100%">
                            <option value="">전체</option>
                        </select>
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
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>
                    <!-- 추가버튼 -->
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>추가</span>
                            </span>
                    </a>
                    <!-- 삭제버튼 -->
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn()">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>삭제</span>
                            </span>
                    </a>
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
</div>

<!-- 모달창 import -->
<%@include file="tpmMachineRegCycle_modal1.jsp" %>




