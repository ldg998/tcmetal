<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdHistory/qmsProdHistory_modal1.js"
        charset="UTF-8"></script>

<style>
    .lin2 {
        border-left: 1px solid #F2F2F2;
        text-align: center;
    }

</style>

<div id="addDialog" title="제품이력관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
            <div class="profile-info-name"> 품번</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">제품이력</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label for="ex_file">업로드</label>
                    <input type="file" id="ex_file">
                </div>
            </div>
        </div>
    </div>
</div>
