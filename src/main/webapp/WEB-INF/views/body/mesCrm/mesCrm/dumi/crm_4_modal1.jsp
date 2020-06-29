<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crm_4/crm_4_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->


<div id="addDialog" title="수주등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">수주일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" id="datepicker_modal" type="text" class="form-control keyword modal_value" readonly style="width: 100%" autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>

            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>

            <div class="profile-info-name">PO</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autofocus autocomplete="off">
            </div>
        </div>

        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="별도창검색" readonly style="width: 100%" autocomplete="off">

            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동(수동)" readonly style="width: 100%" autocomplete="off">

            </div>
            <div class="profile-info-name">단가(원)</div>
            <div class="profile-info-value input-icon input-icon-right">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동(수동)" readonly style="width: 100%" autocomplete="off">

            </div>
        </div>

            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">수량</div>
                <div class="profile-info-value">
                    <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">

                </div>
                <div class="profile-info-name">총금액(원)</div>
                <div class="profile-info-value input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">

                </div>
            </div>

    </div>
</div>


<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>