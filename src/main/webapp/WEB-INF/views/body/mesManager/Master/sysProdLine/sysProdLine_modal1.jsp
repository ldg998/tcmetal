<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysProdLine/sysProdLine_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="공정정보" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 부서 </div>
            <div class="profile-info-value">
                <select name="dept_code" class="form-control modal_value"  id="dept_select" style="width:100%">
                    <option value="">선택안함</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 공정코드 </div>
            <div class="profile-info-value">
                <input type="text" name="line_code" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 생산공정 </div>
            <div class="profile-info-value">
                <input type="text" name="line_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 코드 </div>
            <div class="profile-info-value">
                <input type="text" name="line_char" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
       
    </div>
</div>