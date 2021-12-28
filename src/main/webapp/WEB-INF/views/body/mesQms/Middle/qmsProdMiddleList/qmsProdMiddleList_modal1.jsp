<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Middle/qmsProdMiddleList/qmsProdMiddleList_modal1.js"
        charset="UTF-8"></script>

<style>
   .lin2{
        border-left: 1px solid #F2F2F2;
        text-align: center;
    }

</style>

<div id="addDialog" title="중간검사현황" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">검사일자</div>
            <div class="profile-info-value">
                <input type="text" name="work_date" class="form-control modal_value" autocomplete="off" autofocus readonly>
            </div>
            <div class="profile-info-name"> 검사번호</div>
            <div class="profile-info-value">
                <input type="text" name="qc_no" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" readonly>
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
                <input type="text" name="part_weight" class="form-control modal_value" autocomplete="off" readonly>
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
            </div>
            <div class="profile-info-name">수정</div>
            <div class="profile-info-value">
                <input type="text" name="result2_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">폐기</div>
            <div class="profile-info-value">
                <input type="text" name="result3_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
    </div>
        <br/>
    <div class="profile-user-info profile-user-info-striped">
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <table id="mes_modal_grid"></table>

        </div>
    </div>
    </div>
</div>
