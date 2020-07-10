<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Stock/scmStockRev/scmStockRev_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="재고조정 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name">구분</div>
            <div class="profile-info-value">
                <input name="part_type_name" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input name="part_code" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input name="part_name" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">규격</div>
            <div class="profile-info-value">
                <input name="spec" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <input name="unit_name" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">조정전 재고</div>
            <div class="profile-info-value">
                <input name="stock_qty" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">조정후 재고</div>
            <div class="profile-info-value">
                <input name="rev_qty" id="rev_qty" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off" onkeyup="num_keyup(this)">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">조정사유</div>
            <div class="profile-info-value">
                <select name="rev_code" id="rev_code" class="form-control keyword modal_value" style="width: 100%" >
                </select>
            </div>
        </div>

    </div>
</div>
