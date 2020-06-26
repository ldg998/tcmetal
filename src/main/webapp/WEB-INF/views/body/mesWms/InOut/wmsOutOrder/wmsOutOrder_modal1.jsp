<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsOutOrder/wmsOutOrder_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="제품입고관리" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">출고일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" id="datepicker_modal" type="text" class="form-control keyword modal_value" readonly style="width: 100%" autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>

            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name=""  type="text" class="form-control keyword modal_value" autocomplete="off">
                </div>
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
            </div>
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
            </div>

        </div>

        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>

            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>
            <div class="profile-info-name">차량번호</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%" autocomplete="off">
            </div>

        </div>
    </div>
</div>