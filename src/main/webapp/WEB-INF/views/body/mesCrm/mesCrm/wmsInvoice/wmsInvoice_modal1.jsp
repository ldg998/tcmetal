<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/wmsInvoice/wmsInvoice_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<style>
    textarea {
        resize: none;
    }
</style>

<div id="addDialog" title="수주등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"  style="width: 100%" autocomplete="off">
                </div>
            </div>

            <div class="profile-info-name">명칭</div>
            <div class="profile-info-value">
                <select id="_select_modal2" style="width: 100%">
                    <option value="">요코하마</option>
                    <option></option>
                    <option></option>

                </select>
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
            <div class="profile-info-row">
                <div class="profile-info-name">No. & Date  of  Invoice</div>
                <div class="profile-info-value">
                    <input type="text" name="" class="form-control">
                </div>

                <div class="profile-info-name">No. & Date of  L/C</div>
                <div class="profile-info-value">
                    <input type="text" name="" class="form-control">
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name">L/C  Issuing  Bank</div>
                <div class="profile-info-value">
                    <input type="text" name="" class="form-control">
                </div>

                <div class="profile-info-name">Departure  Date </div>
                <div class="profile-info-value">
                    <input type="text" name="" class="form-control">
                </div>
            </div>
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




    </div>
</div>
