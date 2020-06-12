<%@ page language="java" contentType="text/html; charset=UTF-8" %><!-- 페이지 언어, 인코딩 설정 -->
<script type="text/javascript" src="/data-component/mesTpm/RegItem/tpmMachineRegCycle/tpmMachineRegCycle_modal1.js" charset="UTF-8"></script><!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="예방점검주기설정 추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name">라인</div>
            <div class="profile-info-value">
                <input type="hidden" autofocus>
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
            <div class="profile-info-name">점검항목</div>
            <div class="profile-info-value">
                <select name="qc_code" id="qc_select" class="form-control keyword modal_value" style="width: 100%">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">반복구분</div>
            <div class="profile-info-value">
                <select name=cycle_type id="cycle_select" class="form-control keyword modal_value" style="width:100%">
                    <option value="M">월단위</option>
                    <option value="W">주단위</option>
                    <option value="D">일단위</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">반복횟수</div>
            <div class="profile-info-value">
               <input name="cycle_qty" id="cycle_qty" type="text" value="0" class="form-control keyword modal_value" autocomplete="off" onkeyup="num_keyup(this)" style="width:100%">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">시작일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker3"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
    </div>
</div>