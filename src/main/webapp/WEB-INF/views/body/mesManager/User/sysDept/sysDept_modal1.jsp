<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesManager/User/sysDept/sysDept_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="부서관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 부서코드 </div>
            <div class="profile-info-value">
                <input type="text" name="dept_code" class="form-control modal_value" autocomplete="off" readonly placeholder="자동생성">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 부서명 </div>
            <div class="profile-info-value">
                <input type="text" name="dept_name" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 사용유무 </div>

            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control modal_value ynCheck" style="width:100%;">
                    <option>Y</option>
                    <option>N</option>
                </select>
            </div>
        </div>

    </div>
</div>


