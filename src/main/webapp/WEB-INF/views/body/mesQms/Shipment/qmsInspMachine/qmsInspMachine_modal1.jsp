<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsInspMachine/qmsInspMachine_modal1.js"
        charset="UTF-8"></script>

<style>
    .filebox {display:inline-block; margin-right: 10px;}
    .filebox label {
        display: inline-block;
        padding: .5em 1.2em;
        color: #999;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: .25em;
    }
    .filebox input[type="file"] {  /* 파일 필드 숨기기 */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
    }
</style>

<div id="addDialog" title="검사설비관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">설비번호</div>
            <div class="profile-info-value">
                <input type="text" name="machine_code" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">설비명</div>
            <div class="profile-info-value">
                <input type="text" name="machine_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">기기번호</div>
            <div class="profile-info-value">
                <input type="text" name="device_no" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">공정능력</div>
            <div class="profile-info-value">
                <input type="text" name="capa" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제원</div>
            <div class="profile-info-value">
                <input type="text" name="spec" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">교정기관</div>
            <div class="profile-info-value">
                <input type="text" name="correct_corp_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">교정일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                <input type="text" id="datepicker_modal" name="correct_date" class="form-control modal_value sendDate" readonly autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">유효일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                <input type="text" id="datepicker_modal2" name="end_date" class="form-control modal_value sendDate" readonly autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사전알림(일)</div>
            <div class="profile-info-value">
                <input type="text" name="alarm_day" class="form-control modal_value qty" onkeyup="num_keyup(this)" autocomplete="off" style="text-align: right">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">이미지</div>
            <div class="profile-info-value">
                <div class="filebox">
                    <label class='file_labal' for="file_01">업로드</label>
                    <input type='file' id='file_01' name='file1' onchange='file_change(this);' />
                </div>
            </div>
        </div>

    </div>
</div>