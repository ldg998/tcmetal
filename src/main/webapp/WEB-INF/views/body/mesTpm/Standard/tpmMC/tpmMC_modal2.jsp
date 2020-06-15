<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesTPM/Standard/tpmMC/tpmMC_modal2.js" charset="UTF-8"></script>

<div id="addDialog2" title="설비정보 부품 추가" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 부품명 </div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 규격 </div>

            <div class="profile-info-value">
                <input type="text" name="spec" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 소요수량 </div>

            <div class="profile-info-value">
                <input type="text" name="qty" class="form-control modal_value2" autocomplete="off" onkeyup="num_keyup_float(this)">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 구매처 </div>

            <div class="profile-info-value">
                <input type="text" name="buy_corp_name" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 연락처 </div>

            <div class="profile-info-value">
                <input type="text" name="corp_tel_no" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 비고 </div>

            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value2" autocomplete="off">
            </div>
        </div>

    </div>
</div>


