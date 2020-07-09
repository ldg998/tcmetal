<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdList/qmsProdList_modal1.js"
        charset="UTF-8"></script>


<style>
    textarea {
        resize: none;
    }
    .filebox {display:inline-block; margin-right: 10px;}
    .filebox label {
        display: inline-block;
        padding: .5em .75em;
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

<div id="addDialog" title="출하검사현황" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name">검사일자</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
            <div class="profile-info-name"> 검사번호</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사결과</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name">성적서</div>
            <div class="profile-info-value">
                <div class="filebox">
                    <label for="ex_file">사진첨부</label>
                    <input type="file" id="ex_file">
                </div>
            </div>
        </div>

    </div>
        <br/>
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name board_right">검사항목</div><div class="profile-info-name" style="width: 20%;">체크</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-value">
            <input type="text" name="" class="form-control modal_value pl" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

    </div>
</div>
