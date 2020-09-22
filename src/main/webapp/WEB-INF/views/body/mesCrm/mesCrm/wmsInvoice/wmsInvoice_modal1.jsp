<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/orders/wmsInvoice/wmsInvoice_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<style>
    textarea {
        resize: none;
    }
</style>

<div id="addDialog" title="인보이스 관리" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <select name="supp_code" id="modal_select1" type="text" class="form-control keyword modal_value" onchange="select_change_modal1(this.value);" style="width: 100%;">

                    </select>
                    <input type="hidden" class="modal_value" name="req_no" >
                    <input type="hidden" class="modal_value modal_value2" name="signed_file" >
                </div>
            </div>

            <div class="profile-info-name">명칭</div>
            <div class="profile-info-value">
                <select name="rpt_name" id="modal_select2" type="text" class="form-control keyword modal_value" onchange="select_change_modal2(this.value);" style="width: 100%;">

                </select>
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">


            <div class="profile-info-name">운송수단</div>
            <div class="profile-info-value">
                <select name="trans_code" id="modal_select3" type="text" class="form-control keyword modal_value" onchange="select_change_modal3(this.value);" style="width: 100%;">

                </select>

            </div>
            <div class="profile-info-value"></div>
            <div class="profile-info-value"></div>
        </div>

            <br/>
            <div class="profile-info-row">
                <div class="profile-info-name">No. & Date  of  Invoice</div>
                <div class="profile-info-value">
                    <input type="text" name="item1" class="form-control modal_value" autocomplete="off">
                </div>

                <div class="profile-info-name">No. & Date of  L/C</div>
                <div class="profile-info-value">
                    <input type="text" name="item2" class="form-control modal_value" autocomplete="off">
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name">L/C  Issuing  Bank</div>
                <div class="profile-info-value">
                    <input type="text" name="item3" class="form-control modal_value" autocomplete="off">
                </div>

                <div class="profile-info-name">Departure  Date </div>
                <div class="profile-info-value">
                    <input type="text" name="item4" class="form-control modal_value" autocomplete="off">
                </div>
            </div>
        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Seller</div>
            <div class="profile-info-value">
                <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice1" autocomplete="off"></textarea>
            </div>
            <div class="profile-info-name">Consignee</div>
            <div class="profile-info-value">
              <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice2" autocomplete="off"></textarea>
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Buyer NOTIFY</div>
            <div class="profile-info-value">
               <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice3" autocomplete="off"></textarea>
            </div>

            <div class="profile-info-name">Vessel/VOY</div>
            <div class="profile-info-value">
                <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice4" autocomplete="off"></textarea>
            </div>
        </div>

            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">Terms of Delivery<br>and Payment </div>
                <div class="profile-info-value">
                   <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice5" autocomplete="off"></textarea>
                </div>
                <div class="profile-info-name">Remark</div>
                <div class="profile-info-value">
                    <textarea wrap="off"  cols="36" rows="7" class="modal_value modal_value2" name="notice6" autocomplete="off"></textarea>
                </div>
            </div>

    </div>
    <br>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">SHIPPING MARK#1</div>
            <div class="profile-info-name">SHIPPING MARK#2</div>
            <div class="profile-info-name">SHIPPING MARK#3</div>
            <div class="profile-info-name">SHIPPING MARK#4</div>
            <div class="profile-info-name">SHIPPING MARK#5</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value"> <textarea wrap="off"  name="mark1" class="modal_value modal_value2" cols="17.8" rows="7" autocomplete="off"></textarea></div>
            <div class="profile-info-value"> <textarea wrap="off"  name="mark2" class="modal_value modal_value2" cols="17.8" rows="7" autocomplete="off"></textarea></div>
            <div class="profile-info-value"> <textarea wrap="off"  name="mark3" class="modal_value modal_value2" cols="17.8" rows="7" autocomplete="off"></textarea></div>
            <div class="profile-info-value"> <textarea wrap="off"  name="mark4" class="modal_value modal_value2" cols="17.8" rows="7" autocomplete="off"></textarea></div>
            <div class="profile-info-value"> <textarea wrap="off"  name="mark5" class="modal_value modal_value2" cols="17.8" rows="7" autocomplete="off"></textarea></div>
        </div>

    </div>
</div>
