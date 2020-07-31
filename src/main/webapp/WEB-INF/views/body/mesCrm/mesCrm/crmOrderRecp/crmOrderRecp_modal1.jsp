<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmOrderRecp/crmOrderRecp_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->


<div id="addDialog" title="수주등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">수주일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" id="datepicker_modal1" type="text" class="form-control keyword modal_value" readonly style="width: 100%" autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                    <input type="hidden" autofocus>
                </div>
            </div>

            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <select name="supp_code" id="modal_select1" type="text" class="form-control keyword modal_value" onchange="select_change_modal1(this.value);" style="width: 100%;">

                </select>
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <select name="part_kind" id="modal_select2" type="text" class="form-control keyword modal_value" onchange="select_change_modal2(this.value);" style="width: 100%;">

                </select>
            </div>

            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <select name="part_name" id="modal_select3" type="text" class="form-control keyword modal_value" onchange="select_change_modal3(this.value);" style="width: 100%;">

                </select>
            </div>
        </div>

        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">PO</div>
            <div class="profile-info-value">
                <input name="po" type="text" class="form-control keyword modal_value"  style="width: 100%" autocomplete="off">

            </div>
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input name="part_code" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input name="part_weight" type="text" class="form-control keyword modal_value"  style="width: 100%; text-align: right;" autocomplete="off">

            </div>
            <div class="profile-info-name">단가(원)</div>
            <div class="profile-info-value">
                <input name="unit_cost" type="text" class="form-control keyword modal_value"   style="width: 100%; text-align: right;" autocomplete="off">

            </div>
        </div>

            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">수량</div>
                <div class="profile-info-value">
                    <input name="qty" type="text" class="form-control keyword modal_value" style="width: 100%; text-align: right;" autocomplete="off">

                </div>
                <div class="profile-info-name">총금액(원)</div>
                <div class="profile-info-value">
                    <input name="price_amount" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%; text-align: right;" autocomplete="off">

                </div>
            </div>

    </div>
</div>


<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>