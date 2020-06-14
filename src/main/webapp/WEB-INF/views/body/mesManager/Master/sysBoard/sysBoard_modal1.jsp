<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysBoard/sysBoard_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="게시판관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 게시판코드 </div>
            <div class="profile-info-value">
                <input type="text" name="board_code" class="form-control modal_value" autocomplete="off" autofocus >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 영문명 </div>
            <div class="profile-info-value">
                <input type="text" name="board_en" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 한글명 </div>
            <div class="profile-info-value">
                <input type="text" name="board_kr" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 최대파일수 </div>
            <div class="profile-info-value">
                <input type="text" name="files" class="form-control modal_value" onkeyup="num_keyup(this);" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 최대파일크기(MB) </div>
            <div class="profile-info-value">
                <input type="text" name="file_size" class="form-control modal_value"  onkeyup="num_keyup(this);" autocomplete="off">
            </div>
        </div>

    </div>
</div>

