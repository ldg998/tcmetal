<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesWMS/Stock/wmsStockRev/wmsStockRev_modal1.js" charset="UTF-8"></script>
<style>
    /*td label {*/
    /*    font-size: 12px!important;*/
    /*    margin-right: 8px;*/
    /*}*/
    input[type=text][name="ord_qty"] {
        height: 18px !important;
    }
    input[type=text][name="remark"] {
        height: 18px !important;
    }
    input[type=text][name="direction"] {
        height: 18px !important;
    }
</style>

<div id="addDialog" title="제품재고조정" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">위치</div>
            <div class="profile-info-value">
                <input name="outs_supp_name" id="outs_supp_name" type="text" class="form-control keyword modal_value"   style="width: 100%;" autocomplete="off" readonly>
                <input name="outs_supp_code" id="outs_supp_code" type="hidden" class="form-control keyword modal_value"   style="width: 100%; text-align: right;" autocomplete="off" readonly>
            </div>
           </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="hidden" name="rev_no"  class="form-control h-25 modal_value" autocomplete="off">
                <select name="supp_code" id="modal_select1" type="text" class="form-control keyword modal_value" onchange="select_change_modal1(this.value);" style="width: 100%;">

                </select>
            </div>
        </div>

            <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <select name="part_kind" id="modal_select2" type="text" class="form-control keyword modal_value" onchange="select_change_modal2(this.value);" style="width: 100%;">

                </select>
            </div>
        </div>

            <%--3--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품명</div>
                <div class="profile-info-value">
                    <select name="part_name" id="modal_select3" type="text" class="form-control keyword modal_value" onchange="select_change_modal3(this.value);" style="width: 100%;">

                    </select>
                </div>
            </div>
            <%--4--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품번</div>
                <div class="profile-info-value">
                    <input name="part_code" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
                </div>
            </div>
            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">단중</div>
                <div class="profile-info-value">
                    <input name="part_weight" type="text" class="form-control keyword modal_value qty" onkeyup="num_keyup_comma_crm3(this);"  style="width: 100%; text-align: right;" autocomplete="off" readonly>
                </div>
            </div>
            <%--6--%>
            <div class="profile-info-row">
                <div class="profile-info-name">조정전재고</div>
                <div class="profile-info-value">
                    <input type="text" name="stock_qty_prev"  class="form-control h-25 modal_value qty" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;" readonly>
                </div>
            </div>


            <%--7--%>
        <div class="profile-info-row">
            <div class="profile-info-name">조정후재고</div>
            <div class="profile-info-value">
                <input type="text" name="stock_qty"  class="form-control h-25 modal_value qty" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
            </div>
        </div>


            <%--8--%>
            <div class="profile-info-row">
                <div class="profile-info-name">조정사유</div>
                <div class="profile-info-value">

                    <select name="rev_code" id="modal_select5" class="form-control modal_value" style="width: 100%">
                        <option value="">분실</option>
                        <option value="0">1</option>
                        <option value="1">2</option>
                    </select>
                </div>
            </div>

    </div>
</div>