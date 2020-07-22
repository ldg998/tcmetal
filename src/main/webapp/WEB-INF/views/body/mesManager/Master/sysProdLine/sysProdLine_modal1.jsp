<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysProdLine/sysProdLine_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="라인정보" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 부서명 </div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" placeholder="생산(현장)" readonly autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 라인코드 </div>
            <div class="profile-info-value">
                <input type="text" name="line_code" class="form-control modal_value" autofocus autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 라인명 </div>
            <div class="profile-info-value">
                <input type="text" name="line_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 라인그룹 </div>
            <div class="profile-info-value">
                <select id='line_type_select' name="line_grp_code" class="form-control h-25 modal_value" style="width: 100%;">--%>
                </select>
            </div>
        </div>




    </div>
</div>