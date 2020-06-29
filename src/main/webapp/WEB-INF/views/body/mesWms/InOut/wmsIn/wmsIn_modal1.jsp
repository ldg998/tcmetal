<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesWMS/InOut/wmsIn/wmsIn_modal1.js" charset="UTF-8"></script>
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

<div id="addDialog" title="제품입고관리" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">입고일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                <input name="" id="datepicker_modal" type="text" class="form-control keyword modal_value" readonly style="width: 100%" autocomplete="off">
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>

            <div class="profile-info-name"></div>
            <div class="profile-info-value"> </div>
        </div>

            <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 condition_main"
                           id="supp_name_main" onclick="supp_btn('A');" readonly>
                    <input type="hidden" name="keyword" class="form-control h-25 condition_main"
                           id="supp_code_main">
                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                </div>
            </div>

            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <select name="keyword2" id="1_select" class="form-control condition_main" style="width: 100%">
                    <option value="">전체</option>
                    <option value="0">진행중</option>
                    <option value="1">완료</option>
                </select>
            </div>
        </div>

            <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">

                <select name="keyword2" id="2_select" class="form-control condition_main" style="width: 100%">
                    <option value="">전체</option>
                    <option value="0">진행중</option>
                    <option value="1">완료</option>
                </select>
            </div>
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>


            <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>

            <div class="profile-info-name">제품LOT</div>
            <div class="profile-info-value input-icon input-icon-right">
                <input name="" type="text" class="form-control keyword modal_value" autofocus style="width: 100%" autocomplete="off">
<%--                <i class="ace-icon fa fa-search bigger-110 blue" style="top: 2px"; ></i>--%>

            </div>
        </div>

    </div>
</div>