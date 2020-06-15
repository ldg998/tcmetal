<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script type="text/javascript" src="/data-component/mesManager/Master/sysCargo/sysCargo_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="창고관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name"> 창고코드 </div>

            <div class="profile-info-value">
                <input type="text" name="cargo_code" class="form-control modal_value" autocomplete="off" autofocus>
            </div>

        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 창고명 </div>
            <div class="profile-info-value">
                <input type="text" name="cargo_name" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 사용유무 </div>
            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control modal_value ynCheck" style="width: 100%;" autocomplete="off">
                    <option>Y</option>
                    <option>N</option>
                </select>
            </div>
        </div>

    </div>
</div>


