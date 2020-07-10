<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysSPartWood/sysSPartWood_modal1.js"
        charset="UTF-8"></script>

<style>
    textarea {
        resize: none;
    }

</style>

<div id="addDialog" title="제품단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none">

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">첨자</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">재질</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">형종류</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">중지수</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">지급품도면</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label for="ex_file">업로드</label>
                    <input type="file" id="ex_file">
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width: 25%">제작업체</div>
            <div class="profile-info-value" style="width: 25%">
                <select id="select_modal1" style="width: 100%">
                    <option></option>
                </select>
            </div>
            <div class="profile-info-name" style="width: 25%">입고일</div>
            <div class="profile-info-value" style="width: 25%">
                <div class="input-icon input-icon-right">
                <input type="text"  id="datepicker_modal1" class="form-control h-25 condition_main" readonly>
                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-top: none">
        <div class="profile-info-row">
            <div class="profile-info-name" style="width: 25%;border-top: 1px solid #F7FBFF">비고</div>
            <div class="profile-info-value" style="width: 75%;border-top: 1px dotted #D5E4F1">
                <textarea rows="7" cols="54"></textarea>
            </div>
        </div>
    </div>

</div>
