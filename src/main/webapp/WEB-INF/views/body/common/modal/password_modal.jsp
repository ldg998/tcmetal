<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/common/modal/password_modal.js" charset="UTF-8"></script>

<div id="passwordDialog" title="비밀번호 변경" style="display: none">
    <form>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 현재 비밀번호 </div>
            <div class="profile-info-value">
                <input type="password" name="password" autocomplete="new-password" class="form-control password_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 신규 비밀번호 </div>

            <div class="profile-info-value">
                <input type="password" name="password_new" autocomplete="new-password" class="form-control password_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 비밀번호 확인 </div>

            <div class="profile-info-value">
                <input type="password" name="password_confirm" autocomplete="new-password" class="form-control password_value">
            </div>
        </div>
    </div>
    </form>
</div>


