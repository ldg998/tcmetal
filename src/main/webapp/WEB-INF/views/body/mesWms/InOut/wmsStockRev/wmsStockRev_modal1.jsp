<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsStockRev/wmsStockRev_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="제품재고조정" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
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
        </div>

            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품명</div>
                <div class="profile-info-value">
                    <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
                </div>
            </div>

            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">품번</div>
                <div class="profile-info-value">
                    <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
                </div>
            </div>
            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">단중</div>
                <div class="profile-info-value">
                    <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
                </div>
            </div>

            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">제품LOT</div>
                <div class="profile-info-value">
                    <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
                </div>
            </div>

            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">상태</div>
                <div class="profile-info-value">

                    <select id='select_modal1' name="keyword" class="form-control h-25 condition_main" style="width: 100%">--%>
                        <option value="">정상</option>

                    </select>
                </div>
            </div>

            <%--2--%>
            <div class="profile-info-row">
                <div class="profile-info-name">조정사유</div>
                <div class="profile-info-value">
                    <select id='select_modal2' name="keyword2" class="form-control h-25 condition_main" style="width: 100%">--%>
                        <option value="">분실</option>
                    </select>
                </div>
            </div>





    </div>
</div>