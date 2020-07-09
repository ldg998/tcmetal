<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsMeltSpec/qmsMeltSpec_modal1.js"
        charset="UTF-8"></script>


<div id="addDialog" title="제품단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off" autofocus>
            </div>
            <div class="profile-info-name"> 품번</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 기종</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
            <div class="profile-info-name"> 품명</div>
            <div class="profile-info-value">
                <input type="text" name="" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
    </div>

    <br/>
    <div class="profile-user-info profile-user-info-striped">
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <!-- grid영역 -->
            <table id="mes_modal_grid"></table>
            <!-- grid-pager 영역 -->
        </div>
    </div>
<br/>

    <div class="row">
        <div class="col-xs-12 table-responsive">
            <!-- grid영역 -->
            <table id="mes_modal_grid2"></table>
            <!-- grid-pager 영역 -->
        </div>
    </div>
    </div>

</div>
