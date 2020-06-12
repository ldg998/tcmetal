<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmMoney/crmMoney_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="수금등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none;">
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">수주일자</div>
            <div class="profile-info-value wt-px-150 h-25">
                <div class="input-icon input-icon-right">
                    <input type="text" name="work_date"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" autofocus>
            </div>
            <div class="profile-info-name wt-px-100">수주번호</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="ord_no" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">업체명</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="supp_name" readonly>
            </div>
            <div class="profile-info-name wt-px-100">현장명</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="place_name" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">담당자</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="emp_name" readonly>
            </div>
            <div class="profile-info-name wt-px-100">연락처</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="emp_tel" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">수주내용</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="ord_name" readonly>
            </div>
            <div class="profile-info-name wt-px-100">수주금액</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="order_amount" id="order_amount" readonly style="text-align: right">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">결재일자1</div>
            <div class="profile-info-value wt-px-150 h-25">
                <div class="input-icon input-icon-right">
                    <input type="text" name="in_date1" id="datepicker3"
                           class="form-control h-25 modal_value" readonly onchange="in_date1_change(this.value)">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name wt-px-100">결재금액1</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="amount1" id="amount1" style="text-align: right" onkeyup="num_keyup_comma_crmMoney(this)" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">결재일자2</div>
            <div class="profile-info-value h-25 wt-px-150">
                <div class="input-icon input-icon-right">
                    <input type="text" name="in_date2" id="datepicker4"
                           class="form-control h-25 modal_value" readonly onchange="in_date2_change(this.value)">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name wt-px-100">결재금액2</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="amount2" id="amount2" style="text-align: right" onkeyup="num_keyup_comma_crmMoney(this)" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100">결재일자3</div>
            <div class="profile-info-value h-25 wt-px-150">
                <div class="input-icon input-icon-right">
                    <input type="text" name="in_date3" id="datepicker5"
                           class="form-control h-25 modal_value" readonly onchange="in_date3_change(this.value)">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name wt-px-100">결재금액3</div>
            <div class="profile-info-value h-25">
                <input type="text" class="form-control modal_value wt-px-150" name="amount3" id="amount3" style="text-align: right" onkeyup="num_keyup_comma_crmMoney(this)" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100" style="border-bottom: none!important;">결재일자4</div>
            <div class="profile-info-value h-25 wt-px-150" style="border-bottom: 1px dotted #DCEBF7;">
                <div class="input-icon input-icon-right">
                    <input type="text" name="in_date4" id="datepicker6"
                           class="form-control h-25 modal_value" readonly onchange="in_date4_change(this.value)">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name wt-px-100" style="border-bottom: none!important;">결재금액4</div>
            <div class="profile-info-value h-25" style="border-bottom: 1px dotted #DCEBF7;">
                <input type="text" class="form-control modal_value wt-px-150" name="amount4" id="amount4" style="text-align: right" onkeyup="num_keyup_comma_crmMoney(this)" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name wt-px-100" style="border-bottom: none!important;"></div>
            <div class="profile-info-value h-25 wt-px-150" style="border-bottom: 1px dotted #DCEBF7;"></div>
            <div class="profile-info-name wt-px-100" style="border-bottom: none!important;">잔액</div>
            <div class="profile-info-value h-25" style="border-bottom: 1px dotted #DCEBF7;">
                <input type="text" class="form-control modal_value wt-px-150" name="balance" id="balance" style="text-align: right" readonly>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-top:none!important;">
        <div class="profile-info-name wt-px-100" style="width:98px; border-top: 1px solid #F7FBFF;">비고</div>
        <div class="profile-info-value h-25" style="border-top: none">
            <input type="text" class="form-control modal_value" name="remark" autocomplete="off">
        </div>
    </div>
</div>
