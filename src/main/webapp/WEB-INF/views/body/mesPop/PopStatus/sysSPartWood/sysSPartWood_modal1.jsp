<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysSPartWood/sysSPartWood_modal1.js"
        charset="UTF-8"></script>

<style>
    textarea {
        resize: none;
    }

</style>

<div id="addDialog" title="고객지급품관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none">

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="hidden" name="supp_code" class="form-control modal_value" autofocus>
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">첨자</div>
            <div class="profile-info-value">
                <input type="text" name="wood_type1" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">재질</div>
            <div class="profile-info-value">
                <input type="text" name="wood_type4" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">형종류</div>
            <div class="profile-info-value">
                <input type="text" name="wood_type2" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">중자수</div>
            <div class="profile-info-value">
                <input type="text" name="wood_type3" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name">지급품도면</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label class='file_labal' for="file_03">업로드버튼</label>
                    <input type='file' id='file_03' name='file3' onchange='file_change(this,this.value);' />
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width: 25%">제작업체</div>
            <div class="profile-info-value" style="width: 25%">
                <input type="text" name="wood_supp_name" id="wood_supp_name" class="form-control modal_value" autocomplete="off" >
            </div>
            <div class="profile-info-name" style="width: 25%">입고일</div>
            <div class="profile-info-value" style="width: 25%">
                <div class="input-icon input-icon-right">
                <input type="text" name="wood_in_date" id="wood_in_date_modal1" class="form-control h-25 modal_value sendDate" readonly>
                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-top: none">
        <div class="profile-info-row">
            <div class="profile-info-name" style="width: 25%;border-top: 1px solid #F7FBFF">비고</div>
            <div class="profile-info-value" style="width: 75%;border-top: 1px dotted #D5E4F1">
                <textarea name="wood_remark" class="modal_value" rows="7" cols="54"></textarea>
            </div>
        </div>
    </div>

</div>