<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/orders/wmsOutOrder/wmsOutOrder_modal2.js"
        charset="UTF-8"></script>

<!-- dialog 모달창 설정 -->
<div id="addDialog2" title="출하지시" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name"> 지시번호 </div>
            <div class="profile-info-value">
                <input type="text" name="req_no" class="form-control modal_value2" autofocus autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 수주번호 </div>
            <div class="profile-info-value">
                <input type="text" name="ord_no" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> PO </div>
            <div class="profile-info-value">
                <input type="text" name="po_no" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 업체명 </div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value2"  autocomplete="off" readonly>
                <input type="hidden" name="supp_code" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 기종 </div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품명 </div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품번 </div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value2"  autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 단중 </div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value2 qty"  autocomplete="off" readonly style="text-align: right;">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 수주수량 </div>
            <div class="profile-info-value">
                <input type="text" name="ord_qty" class="form-control modal_value2 qty"  autocomplete="off" readonly  style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 기납품수량 </div>
            <div class="profile-info-value">
                <input type="text" name="prev_qty" class="form-control modal_value2 qty"  autocomplete="off" readonly  style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 총지시수량 </div>
            <div class="profile-info-value">
                <input type="text" name="wms_qty" class="form-control modal_value2 qty"  autocomplete="off" readonly style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 완료수량 </div>
            <div class="profile-info-value">
                <input type="text" name="comp_qty" class="form-control modal_value2 qty"  autocomplete="off" readonly style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 지시수량 </div>
            <div class="profile-info-value">
                <input type="text" name="qty" class="form-control modal_value2 qty"  autocomplete="off" readonly style="text-align: right;">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 수정수량 </div>
            <div class="profile-info-value">
                <input type="text" name="update_qty" class="form-control modal_value2 qty"  onfocus="num_focus_reset(this);" onkeyup="num_keyup_comma(this);" autocomplete="off" style="text-align: right;" placeholder="">
            </div>
        </div>

    </div>
</div>


