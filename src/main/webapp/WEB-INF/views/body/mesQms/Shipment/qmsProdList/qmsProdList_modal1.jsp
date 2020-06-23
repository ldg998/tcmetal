<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdList/qmsProdList_modal1.js" charset="UTF-8"></script>
<form method="POST" action="/qmsQcItemAdd" id="qmsTestltem">
<div id="addDialog" title="검사항목추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">검사일자</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
            <div class="profile-info-name">검사번호</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">검사결과</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
            <div class="profile-info-name">성적서</div>
            <div class="profile-info-value">
                <input type="text" name=""  class="form-control modal_value" >
                <input type="hidden" name=""  class="form-control modal_value">
            </div>
        </div>

        <div class="profile-info-row"></div>

    </div>
</div>
</form>


