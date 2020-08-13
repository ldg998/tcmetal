<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysSPartDrawing/sysSPartDrawing_modal1.js"
        charset="UTF-8"></script>

<style>
    textarea {
        resize: none;
    }
</style>

<div id="addDialog" title="제품단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        
        
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="hidden" name="supp_code" class="form-control modal_value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
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
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">제품도면</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label class='file_labal' for="file_02">업로드버튼</label>
                    <input type='file' id='file_02' name='file2' onchange='file_change(this);' />
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <textarea cols="42" rows="7" class="modal_value" name="remark2" autofocus>

                </textarea>
            </div>
        </div>
       
     

    </div>
   
</div>
