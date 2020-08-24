<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdList/qmsProdList_modal1.js"
        charset="UTF-8"></script>
<style>
    .w_20{
        width: 20%;
    }

</style>


<div id="addDialog" title="출하검사현황" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name w_20">검사일자</div>
            <div class="profile-info-value">
                <input type="text" name="work_date" class="form-control modal_value" autocomplete="off" autofocus readonly>
            </div>
            <div class="profile-info-name w_20"> 검사번호</div>
            <div class="profile-info-value">
                <input type="text" name="qc_no" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" readonly>
                <input type="hidden" name="supp_code" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off" readonly>
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" autocomplete="off" readonly style="text-align: right">
            </div>
            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value">
                <input type="text" name="lot_no" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사결과</div>
            <div class="profile-info-value">
                <input type="text" name="qc_result_name" class="form-control modal_value" autocomplete="off" readonly>
                <input type="hidden" name="qc_result">
            </div>
            <div class="profile-info-name">성적서</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label for="file_01" class="file_labal">업로드</label>
                    <input type="file"  id="file_01" onchange='file_change(this);'>
                    <input name="file_key"  type="hidden" class="modal_value">
                </div>
            </div>
        </div>

    </div>
        <br/>

    <div class="profile-user-info profile-user-info-striped">
        <div class="col-xs-12 padding0" id="content2">
            <table id="mes_modal1_grid2"></table>
        </div>
    </div>
</div>
