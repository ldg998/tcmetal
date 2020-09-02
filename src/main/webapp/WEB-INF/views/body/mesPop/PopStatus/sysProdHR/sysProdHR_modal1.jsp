<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysProdHR/sysProdHR_modal1.js"
        charset="UTF-8"></script>


<div id="addDialog" title="작업공수관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        
        
        <div class="profile-info-row">
            <div class="profile-info-name">작업일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="work_date" id="datepicker_modal1"
                           class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">공정</div>
            <div class="profile-info-value">
                <select id="select_modal2" style="width: 100%">
                    <option value="">합형</option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">작업인원</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autofocus autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">조퇴(시간)</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">지각(시간)</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">잔업(시간)</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">특근(시간)</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>


    </div>
   
</div>
