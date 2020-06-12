<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesPOP/Standard/popBcrForm/popBcrForm_modal1.js" charset="UTF-8"></script>
<div id="addDialog" title="바코드 양식" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">양식코드</div>
            <div class="profile-info-value">
                <input name="bcr_form_code" type="text" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">양식명</div>
            <div class="profile-info-value">
                <input name="bcr_form_name" type="text" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">폼양식</div>
            <div class="profile-info-value">
                <textarea id="bcr_contents" name="bcr_contents" cols="50" rows="20" style="resize:none;" autocomplete="off"></textarea>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input name="remark" type="text" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
    </div>
</div>




