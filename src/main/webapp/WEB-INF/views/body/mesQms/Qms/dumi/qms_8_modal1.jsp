<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Qms/dumi/qms_8_modal1.js"
        charset="UTF-8"></script>
<style>
    .grid_lee {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1, 100% 560%);
        grid-template-areas:"a1 a2";
    }

    .name_lee {
        color: #1d1d1d;
        background-color: #f2f2f2;
        border-top: 1px solid #F7FBFF;
        border-right: 1px solid #F7FBFF;
        text-align: center;
        padding: 5px;
        font-weight: 400;
        width: 100%;
        vertical-align: middle;
    }

    .a1 {grid-area: a1;}
    .a2 {grid-area: a2;}
    .a3 {grid-area: a3;}
    .a4 {grid-area: a4;}
    .inline_1{
        display: inline-block !important;
        float: left !important;
    }
</style>

<div id="addDialog" title="도형제관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">접수일자</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker_modal1" class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name" style="width:15%">제품LOT</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main" autofocus></div>
        </div>
        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">업체</div>
            <div class="profile-info-value" style="width:35%">

                <input type="text" class="form-control h-25 condition_main">


            </div>
            <div class="profile-info-name" style="width:15%">기종</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main"></div>
        </div>
        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">품번</div>
            <div class="profile-info-value" style="width:35%">

                <input type="text" class="form-control h-25 condition_main">

            </div>
            <div class="profile-info-name" style="width:15%">품명</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main"></div>
        </div>
        <%--4--%>

            <div class="grid_lee">
                <div class="name_lee a1">부적합분류</div>
                <div class="profile-info-value a2">
                <input type="text" class="form-control h-25 condition_main" readonly placeholder="별도창 검색">
                </div>

            </div>
        <%--5--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">대책서송부</div>
            <div class="profile-info-value" style="width:35%">
                <select id="select_modal1" style="width: 100%;">
                    <option value="">Y</option>
                    <option value="">N</option>
                </select>

            </div>
            <div class="profile-info-name" style="width:15%">대책서 송부일</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker_modal2" class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <%--6--%>
            <div class="grid_lee">
                <div class="name_lee a1">대책방안</div>
                <div class="profile-info-value a2">
                    <input type="text" class="form-control h-25 condition_main">
                </div>

            </div>

        <%--7--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">처리구분</div>
            <div class="profile-info-value" style="width:35%">

                <select id="select_modal2" style="width: 100%;">
                    <option value="">수정</option>
                    <option value="">폐기</option>
                </select>

            </div>
            <div class="profile-info-name" style="width:15%">처리일자</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker_modal3" class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <%--8--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">부적합연락서</div>
            <div class="profile-info-value" style="width:35%">

                <input type="text" class="form-control h-25 condition_main">

            </div>
            <div class="profile-info-name" style="width:15%">대책서</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main">
            </div>
        </div>
        <%--9--%>

        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">부적합부서</div>
            <div class="profile-info-value" style="width:35%">

                <select id="select_modal4" style="width: 100%;">
                    <option value=""></option>
                    <option value=""></option>
                </select>

            </div>
            <div class="profile-info-name" style="width:15%">담당자</div>
            <div class="profile-info-value" style="width:35%">
            <select id="select_modal5" style="width: 100%;">
                <option value=""></option>
                <option value=""></option>
            </select>
            </div>
        </div>
    </div>
</div>
