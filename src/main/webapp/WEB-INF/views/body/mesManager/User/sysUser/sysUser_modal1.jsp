<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/User/sysUser/sysUser_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="사용자관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 사용자코드 </div>
            <div class="profile-info-value">
                <input type="text" name="user_code" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 사용자명 </div>

            <div class="profile-info-value">
                <input type="text" name="user_name" class="form-control modal_value" autocomplete="off">
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 부서 </div>
            <div class="profile-info-value">
                <select name="dept_code" class="form-control modal_value" id="dept_select2" style="width: 100%;">
                    <option value="">선택안함</option>
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 직책 </div>
            <div class="profile-info-value">
                <select name="duty_code" class="form-control modal_value" id="duty_select" style="width: 100%;">
                    <option value="">선택안함</option>
                </select>
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 권한 </div>
            <div class="profile-info-value">
                <select name="auth_code" class="form-control modal_value" id="auth_select" style="width: 100%;">
                    <option value="">선택안함</option>
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 전화번호 </div>
            <div class="profile-info-value">
                <input type="text" name="tel_no" class="form-control modal_value" onkeyup="num_keyup_hyphen(this)">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 이메일 </div>
            <div class="profile-info-value">
                <input type="text" name="email" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 사용유무 </div>
            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control modal_value ynCheck" style="width: 100%;">
                    <option>Y</option>
                    <option>N</option>
                </select>
            </div>
        </div>
    </div>
</div>


