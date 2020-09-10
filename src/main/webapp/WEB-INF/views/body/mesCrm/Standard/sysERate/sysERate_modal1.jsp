<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %>
<!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/standard/sysERate/sysERate_modal1.js"
        charset="UTF-8"></script>
<!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="환율관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name"> 화폐단위</div>
            <div class="profile-info-value">
                <select name="currency_code" id="modal_select1" class="form-control modal_value" style="width: 100%">
                </select>
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">시작일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" id="datepicker_modal" name="start_date" class="form-control modal_value" readonly
                           autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">종료일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" id="datepicker_modal2" name="stop_date" class="form-control modal_value" readonly
                           autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">환율</div>
            <div class="profile-info-value">
                <input type="text" name="exch_rate" id="exch_rate" class="form-control modal_value" style="text-align: right" onkeyup="num_keyup_float(this)"
                       autocomplete="off">
            </div>
        </div>
    </div>
</div>


