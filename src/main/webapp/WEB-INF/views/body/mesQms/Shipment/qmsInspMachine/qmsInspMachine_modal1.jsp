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
                <input type="text" name="" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">설비명</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기기번호</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">공칭능력</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">제원</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">교정기관</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">교정일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">

                <input type="text" id="datepicker_modal" name="" class="form-control modal_value" readonly autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">유효일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                <input type="text" id="datepicker_modal2" name="" class="form-control modal_value" readonly autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사전알림</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off">
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">이미지</div>
            <div class="profile-info-value">
                <div class="filebox">
                    <label for="ex_file">업로드</label>
                    <input type="file" id="ex_file">
                </div>
            </div>
        </div>

    </div>
</div>
