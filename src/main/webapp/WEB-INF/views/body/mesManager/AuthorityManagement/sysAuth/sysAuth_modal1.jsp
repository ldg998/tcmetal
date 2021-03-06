<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesManager/Auth/sysAuth/sysAuth_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="권한그룹관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name"> 권한그룹코드 </div>
            <div class="profile-info-value">
                <input type="text" name="auth_code" class="form-control modal_value" autofocus autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 권한그룹명 </div>
            <div class="profile-info-value">
                <input type="text" name="auth_name" class="form-control modal_value"  autocomplete="off">
            </div>
        </div>

    </div>
</div>


