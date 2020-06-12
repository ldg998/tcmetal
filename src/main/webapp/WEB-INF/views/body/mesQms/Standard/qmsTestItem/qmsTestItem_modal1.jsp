<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsTestItem/qmsTestItem_modal1.js" charset="UTF-8"></script>
<form method="POST" action="/qmsQcItemAdd" id="qmsTestltem">
<div id="addDialog" title="검사항목추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">검사구분</div>
            <div class="profile-info-value">
                <input type="text" name="qc_group_name" id="qc_group_name" class="form-control modal_value" readonly>
                <input type="hidden" name="qc_group" id="qc_group" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">코드그룹</div>
            <div class="profile-info-value">
                <input type="text" name="qc_type_name" id="qc_type_name" class="form-control modal_value" readonly>
                <input type="hidden" name="qc_type" id="qc_type" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사코드</div>
            <div class="profile-info-value">
                <input type="text" name="qc_code" class="form-control modal_value"  value="test"  readonly placeholder="자동생성">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사명</div>
            <div class="profile-info-value">
                <input type="text"  name="qc_name" class="form-control modal_value" value="test" autofocus autocomplete="off">
            </div>
        </div>
<%--        <div class="profile-info-row">--%>
<%--            <div class="profile-info-name">사용유무</div>--%>
<%--            <div class="profile-info-value">--%>
<%--                <select name="use_yn" id="use_yn" class="form-control modal_value ynCheck" style="width: 100%;">--%>
<%--                    <option>Y</option>--%>
<%--                    <option>N</option>--%>
<%--                </select>--%>
<%--            </div>--%>
<%--        </div>--%>
    </div>
</div>
</form>


