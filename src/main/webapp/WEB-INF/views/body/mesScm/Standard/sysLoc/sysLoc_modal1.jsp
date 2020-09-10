<%@ page language="java" contentType="text/html; charset=UTF-8" %><!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!-- JSTL 태그 라이브러리 -->
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysLoc/sysLoc_modal1.js"
        charset="UTF-8"></script><!-- 스크립트 파일 import -->
<!-- dialog 모달창 설정 -->
<div id="addDialog" title="로케이션추가" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 위치코드</div>
            <div class="profile-info-value">
                <input type="text" name="loc_code" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 위치명</div>
            <div class="profile-info-value">
                <input type="text" name="loc_name" class="form-control modal_value" autocomplete="off" autocomplete="off">
            </div>
        </div>

    </div>
</div>