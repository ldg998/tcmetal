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
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text"  class="form-control h-25 condition_main">
            </div>
        </div>

            <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text"  class="form-control h-25 condition_main">
            </div>
        </div>

            <%--3--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품명</div>
                <div class="profile-info-value">
                    <input type="text"  class="form-control h-25 condition_main">
                </div>
            </div>
            <%--4--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품번</div>
                <div class="profile-info-value">
                    <input type="text"  class="form-control h-25 condition_main">
                </div>
            </div>
            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">단중</div>
                <div class="profile-info-value">
                    <input type="text"  class="form-control h-25 condition_main">
                </div>
            </div>
            <%--6--%>
            <div class="profile-info-row">
                <div class="profile-info-name">제품LOT</div>
                <div class="profile-info-value">
                    <input type="text"  class="form-control h-25 condition_main">
                </div>
            </div>


            <%--7--%>
        <div class="profile-info-row">
            <div class="profile-info-name">상태</div>
            <div class="profile-info-value">
                <select name="keyword2" id="select_modal1" class="form-control condition_main" style="width: 100%">
                    <option value="0">정상</option>
                    <option value="1">비정상</option>
                </select>
            </div>
        </div>


            <%--8--%>
            <div class="profile-info-row">
                <div class="profile-info-name">조정사유</div>
                <div class="profile-info-value">

                    <select name="keyword2" id="select_modal2" class="form-control condition_main" style="width: 100%">
                        <option value="">분실</option>
                        <option value="0"></option>
                        <option value="1"></option>
                    </select>
                </div>
            </div>

    </div>
</div>