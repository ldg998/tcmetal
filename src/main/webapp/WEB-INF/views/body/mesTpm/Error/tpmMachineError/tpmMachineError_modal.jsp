<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesTPM/Error/tpmMachineError/tpmMachineError_modal1.js"
        charset="UTF-8"></script>

<div id="addDialog" title="사후보전관리 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name">점검일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="hidden" autofocus>
                    <input type="text" name="work_date" id="datepicker3"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">라인</div>
            <div class="profile-info-value">
                <select name="line_name" id="line_select2"  class="form-control keyword"  onchange="select_change2(this.value);" style="width: 100%" >
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">설비명</div>
            <div class="profile-info-value">
                <select name="machine_code" id="machine_select2"  class="form-control keyword modal_value" style="width: 100%">
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">고장내용</div>
            <div class="profile-info-value">
                <input name="error_name" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">고장분류</div>
            <div class="profile-info-value">
                <select name="error_type" id="type_select" class="form-control keyword modal_value" style="width: 100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">점검결과</div>
            <div class="profile-info-value">
                <select name="error_result" id="result_select"  class="form-control keyword modal_value" style="width: 100%">
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">조치사항</div>
            <div class="profile-info-value">
                <input type="text" name="measure_name" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">가동중단</div>
            <div class="profile-info-value">
                <select name="stop_yn" id="stop_yn" class="form-control keyword modal_value ynCheck" style="width: 100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">고장시간(분)</div>
            <div class="profile-info-value">
                <input type="text" name="stop_time" class="form-control keyword modal_value" autocomplete="off" onkeyup="num_keyup(this)">
            </div>
        </div>


    </div>
</div>
