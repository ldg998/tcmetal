<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Qms/dumi/qms_8_modal1.js"
        charset="UTF-8"></script>

<style>
    .lin2 {
        border-left: 1px solid #F2F2F2;
        text-align: center;
    }

</style>

<div id="addDialog" title="도형제관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">접수일자</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name" style="width:15%">제품LOT</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main"></div>
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
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">부적합분류</div>
            <div class="profile-info-value">
                <input type="text" class="form-control h-25 condition_main">
            </div>
        </div>
        <%--5--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">대책서송부</div>
            <div class="profile-info-value" style="width:35%">

                <input type="text" class="form-control h-25 condition_main">

            </div>
            <div class="profile-info-name" style="width:15%">대책서 송부일</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main"></div>
        </div>
        <%--6--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">대책방안</div>
            <div class="profile-info-value">

                <input type="text" class="form-control h-25 condition_main" >

            </div>
        </div>

        <%--7--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">처리구분</div>
            <div class="profile-info-value" style="width:35%">

                <input type="text" class="form-control h-25 condition_main">

            </div>
            <div class="profile-info-name" style="width:15%">처리일자</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main">
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

                <input type="text" class="form-control h-25 condition_main">

            </div>
            <div class="profile-info-name" style="width:15%">담당자</div>
            <div class="profile-info-value" style="width:35%"><input type="text"
                                                                     class="form-control h-25 condition_main">
            </div>
        </div>
    </div>
</div>
