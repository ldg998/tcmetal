<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsTestItem/qmsTestItem_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="검사항목추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">검사구분</div>
            <div class="profile-info-value">
                <select id="select_modal1" style="width: 100%;">
                    <option value="">수입검사</option>
                    <option></option>

                </select>

            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">코드그룹</div>
            <div class="profile-info-value">
                <select id="select_modal2" style="width: 100%;">
                    <option value="">불량유형</option>
                    <option></option>
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">검사코드</div>
            <div class="profile-info-value">
                <input type="text" name="qc_code" class="form-control modal_value" autofocus autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사명</div>
            <div class="profile-info-value">
                <input type="text"  name="qc_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사용유무</div>
            <div class="profile-info-value">
                <input type="text"  name="qc_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

    </div>
</div>



