<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmPlan/crmPlan_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="계획추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped" style="margin-bottom: 10px">
        <div class="profile-info-row">
            <div class="profile-info-name">계획년도</div>
            <div class="profile-info-value input-icon input-icon-right">
                <input readonly type="text" name="plan_year" id="plan_year" class="form-control modal_value wt-px-150"  >
                <i class="ace-icon fa fa-calendar dark" style="top: 2px;"></i>

<%--                <input  type="hidden" name="plan_year_name" id="plan_year_name" class="form-control modal_value wt-px-150">--%>
            </div>
        </div>
    </div>

    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">월별</div>
            <div class="profile-info-name">계획금액</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">1월</div>
            <div class="profile-info-value h-25">
                <input name="plan1" id="plan1" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" autofocus style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">2월</div>
            <div class="profile-info-value">
                <input name="plan2" id="plan2" type="text" class="form-control modal_value wt-px-150" autocomplete="off"  onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">3월</div>
            <div class="profile-info-value">
                <input name="plan3" id="plan3" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">4월</div>
            <div class="profile-info-value">
                <input name="plan4" id="plan4" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">5월</div>
            <div class="profile-info-value">
                <input name="plan5" id="plan5" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">6월</div>
            <div class="profile-info-value">
                <input name="plan6" id="plan6" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">7월</div>
            <div class="profile-info-value">
                <input name="plan7" id="plan7" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;"> 
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">8월</div>
            <div class="profile-info-value">
                <input name="plan8" id="plan8" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">9월</div>
            <div class="profile-info-value">
                <input name="plan9" id="plan9" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">10월</div>
            <div class="profile-info-value">
                <input name="plan10" id="plan10" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">11월</div>
            <div class="profile-info-value">
                <input name="plan11" id="plan11" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">12월</div>
            <div class="profile-info-value">
                <input name="plan12" id="plan12" type="text" class="form-control modal_value wt-px-150" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input name="remark" id="remark" type="text" class="form-control modal_value wt-px-150" autocomplete="off">
            </div>
        </div>
    </div>
</div>
