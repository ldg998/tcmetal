<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesTPM/RegItem/tpmMachineRegComp/tpmMachineRegComp_modal1.js" charset="UTF-8"></script>
<div id="addDialog" title="예방점검관리등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">점검예정일</div>
            <div class="profile-info-value">
                <input type="hidden" autofocus>
                <input name="work_date" type="text" class="form-control modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">라인</div>
            <div class="profile-info-value">
                <input name="line_name" type="text" class="form-control modal_value">
                <input type="hidden" name="line_code" class="modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">설비명</div>
            <div class="profile-info-value">
                <input name="machine_name" type="text" class="form-control modal_value">
                <input type="hidden" name="machine_code" class="modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">점검항목</div>
            <div class="profile-info-value">
                <input name="qc_name" type="text" class="form-control modal_value">
                <input type="hidden" name="qc_code" class="modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">점검유무</div>
            <div class="profile-info-value">
                <select name="check_yn" id="check_yn" class="form-control modal_value" style="width: 100%" onchange="select_change1(this.value)">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">점검결과</div>
            <div class="profile-info-value">
                <select name="check_code" id="result_select" class="form-control modal_value" style="width: 100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">조치사항</div>
            <div class="profile-info-value">
                <input name="measure_name" id="measure_name" type="text" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
    </div>
</div>
