<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/wmsInvoiceForm/wmsInvoiceForm_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

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

<div id="addDialog" title="수주등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value"  style="width: 100%" autocomplete="off">
            </div>

            <div class="profile-info-name">명칭</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-value"></div>
            <div class="profile-info-value"></div>

            <div class="profile-info-name">운송수단</div>
            <div class="profile-info-value">
               <select id="_select_modal1" style="width: 100%">
                   <option value="">벌크</option>
                   <option></option>
                   <option></option>

               </select>

            </div>
        </div>

            <br/>
        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Seller</div>
            <div class="profile-info-value">
                <textarea cols="18" rows="7">

                </textarea>
            </div>
            <div class="profile-info-name">Consignee</div>
            <div class="profile-info-value">
              <textarea cols="18" rows="7">

                </textarea>
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Buyer NOTIFY</div>
            <div class="profile-info-value">
               <textarea cols="18" rows="7">

                </textarea>
            </div>

            <div class="profile-info-name">Vessel/VOY</div>
            <div class="profile-info-value">
                <textarea cols="18" rows="7">

                </textarea>
            </div>
        </div>

            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">Terms of Delivery<br>and Payment </div>
                <div class="profile-info-value">
                   <textarea cols="18" rows="7">

                </textarea>
                </div>
                <div class="profile-info-name">Remark</div>
                <div class="profile-info-value">
                    <textarea cols="18" rows="7">

                </textarea>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">Signed By </div>
                <div class="profile-info-value">
                    <div class="filebox">
                        <label for="ex_file">사진첨부</label>
                        <input type="file" id="ex_file">
                    </div>
                </div>
                <div class="profile-info-value"></div>
                <div class="profile-info-value"></div>
            </div>


    </div>
</div>
