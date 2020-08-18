<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %>
<!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesOUT/stock/outsError/outsError_modal1.js"
        charset="UTF-8"></script>
<!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="외주불량" style="display: none">
    <div class="profile-user-info profile-user-info-striped">


        <div class="profile-info-row">
            <div class="profile-info-name">검사일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" readonly id="datepicker_modal1" class="form-control modal_value"
                           autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name">검사번호</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <select class="form-control modal_value" name="keyword" id="modal_select1" style="width: 100%" onchange="select_change_modal1(this.value)" ></select>

            </div>
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <select name="keyword2" id="modal_select2" class="form-control modal_value" style="width: 100%;" onchange="select_change_modal2(this.value)">
                    <option value="">선택없음</option>
                </select>
            </div>
        </div>


        <div class="profile-info-row">

            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <select name="keyword4" id="modal_select3" class="form-control modal_value" style="width: 100%;" onchange="select_change_modal3(this.value)">
                    <option value="">선택없음</option>
                </select>
            </div>

            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                   <input type="text" name="part_code" class="form-control modal_value" style="width: 100%;" placeholder="자동생성" readonly>
            </div>

        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" style="width: 100%; text-align: right" placeholder="자동생성" readonly>
            </div>
            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value">
                <input type="text" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 수정</div>
            <div class="profile-info-value">
                <select name="keyword2" id="select_modal1" class="form-control condition_main" style="width: 100%">
                    <option value="">용접</option>
                    <option value="0"></option>
                    <option value="1"></option>
                </select>
            </div>

            <div class="profile-info-name"> 폐기</div>
            <div class="profile-info-value">
                <select name="keyword2" id="select_modal2" class="form-control condition_main" style="width: 100%">
                    <option value=""></option>
                    <option value="0"></option>
                    <option value="1"></option>
                </select>
            </div>
        </div>


    </div>
</div>


