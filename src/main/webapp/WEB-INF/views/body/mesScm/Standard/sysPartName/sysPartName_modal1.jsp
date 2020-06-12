<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPartName/sysPartName_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="품목명관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 품목명코드 </div>
            <div class="profile-info-value">
                <input type="text" name="part_name_code" class="form-control modal_value" autocomplete="off" readonly placeholder="자동생성">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품목명 </div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>
    </div>
</div>


