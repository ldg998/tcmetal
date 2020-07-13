<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/InOut/scmOut/scmOut_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="출고추가" style="display: none">
    <div class="profile-user-info profile-user-info-striped">


        <div class="profile-info-row">
            <div class="profile-info-name"> 출고일자 </div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="work_date" id="datepicker_modal1"
                           class="form-control h-25" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 품번 </div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="part_code" class="form-control h-25 modal_value"
                           id="part_code" onclick="part_btn('A');" readonly>

                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품명 </div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value"  autocomplete="off" readonly >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 규격 </div>
            <div class="profile-info-value">
                <input type="text" name="spec" class="form-control modal_value" autocomplete="off" readonly >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 단위 </div>
            <div class="profile-info-value">
                <input type="text" name="unit_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 출고수량 </div>
            <div class="profile-info-value">
                <input type="text" name="qty" class="form-control modal_value" autofocus autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 비고 </div>
            <div class="profile-info-value">
                <input type="text" name="remark" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

    </div>

</div>


