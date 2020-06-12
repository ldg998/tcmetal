<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysCommon/sysCommon_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="공용코드추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 코드그룹</div>
            <div class="profile-info-value">
                <input type="text" name="group_name" id="group_name" class="form-control modal_value" readonly autocomplete="off"/>
                <input type="hidden" name="group_code" id="group_code" class="form-control modal_value" />
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 코드</div>
            <div class="profile-info-value">
                <input type="text" name="code_value" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"> 명칭1</div>
            <div class="profile-info-value">
                <input type="text" name="code_name1" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 명칭2</div>
            <div class="profile-info-value">
                <input type="text" name="code_name2" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"> 명칭3</div>
            <div class="profile-info-value">
                <input type="text" name="code_name3" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 명칭4</div>
            <div class="profile-info-value">
                <input type="text" name="code_name4" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"> 명칭5</div>
            <div class="profile-info-value">
                <input type="text" name="code_name5" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 명칭6</div>
            <div class="profile-info-value">
                <input type="text" name="code_name6" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"> 명칭7</div>
            <div class="profile-info-value">
                <input type="text" name="code_name7" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 명칭8</div>
            <div class="profile-info-value">
                <input type="text" name="code_name8" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"> 사용유무</div>
            <div class="profile-info-value">
                <select name="use_yn" id="use_yn" class="form-control keyword modal_value ynCheck" style="width: 100%;">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
    </div>
</div>
