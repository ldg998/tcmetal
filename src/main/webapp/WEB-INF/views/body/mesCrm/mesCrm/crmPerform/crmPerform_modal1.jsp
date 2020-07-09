<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmPerform/crmPerform_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="실적추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped" style="margin-bottom: 10px">
        <div class="profile-info-row">
            <div class="profile-info-name">계획년도</div>
            <div class="profile-info-value input-icon input-icon-right">
                <input type="text" name="plan_year" id="plan_year" class="form-control modal_value wt-px-150">
                <i class="ace-icon fa fa-calendar dark" style="top: 3px;left: 140px;right: 450px;"></i>
            </div>
        </div>
    </div>

    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">월별</div>
            <div class="profile-info-name">매출계획금액</div>
            <div class="profile-info-name">매출실적</div>
            <div class="profile-info-name">매입금액</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">1월</div>
            <div class="profile-info-value h-25">
                <input id="plan1_modal" name="plan1"  type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work1_modal" name="work1"  autocomplete="off" type="text" class="form-control modal_value modal_value2  wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in1_modal" name="in1"  autocomplete="off" type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">2월</div>
            <div class="profile-info-value">
                <input id="plan2_modal" name="plan2"  type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work2_modal" name="work2" autocomplete="off" type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in2_modal" name="in2"  autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">3월</div>
            <div class="profile-info-value">
                <input id="plan3_modal" name="plan3"  type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work3_modal" name="work3"  autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in3_modal" name="in3"  autocomplete="off"   type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">4월</div>
            <div class="profile-info-value">
                <input id="plan4_modal" name="plan4" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work4_modal" name="work4"  autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in4_modal" name="in4"  autocomplete="off"   type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">5월</div>
            <div class="profile-info-value">
                <input id="plan5_modal" name="plan5" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work5_modal"name="work5"  autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in5_modal" name="in5" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">6월</div>
            <div class="profile-info-value">
                <input id="plan6_modal" name="plan6" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work6_modal" name="work6" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in6_modal" name="in6" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">7월</div>
            <div class="profile-info-value">
                <input id="plan7_modal" name="plan7" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)"  style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work7_modal" name="work7" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in7_modal" name="in7"  autocomplete="off" type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">8월</div>
            <div class="profile-info-value">
                <input id="plan8_modal" name="plan8" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work8_modal" name="work8" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in8_modal" name="in8" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">9월</div>
            <div class="profile-info-value">
                <input id="plan9_modal" name="plan9" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work9_modal" name="work9" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in9_modal" name="in9" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">10월</div>
            <div class="profile-info-value">
                <input id="plan10_modal" name="plan10" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work10_modal" name="work10" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in10_modal" name="in10" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">11월</div>
            <div class="profile-info-value">
                <input id="plan11_modal" name="plan11" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work11_modal" name="work11" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in11_modal" name="in11" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">12월</div>
            <div class="profile-info-value">
                <input id="plan12_modal" name="plan12" type="text" class="form-control modal_value wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="work12_modal" name="work12" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
            <div class="profile-info-value h-25">
                <input id="in12_modal" name="in12" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input id="remark" type="text" name="remark" class="form-control modal_value wt-px-150" >
            </div>
            <div class="profile-info-value">
                <input id="remark2" name="remark2" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" >
            </div>
            <div class="profile-info-value">
                <input id="remark3" name="remark3" autocomplete="off"  type="text" class="form-control modal_value modal_value2 wt-px-150" >
            </div>
        </div>
    </div>
</div>
