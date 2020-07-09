<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/static/data-component/mesQMS/Qms/dumi/qms_7_modal1.js"
        charset="UTF-8"></script>

<style>
    .lin2 {
        border-left: 1px solid #F2F2F2;
        text-align: center;
    }

</style>

<div id="addDialog" title="도형제관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name"style="width:25%">측정일자</div>
            <div class="profile-info-value" style="width:25%">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker_modal"
                                   class="form-control h-25 condition_main" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
            </div>
            <div class="profile-info-value" style="width:25%"></div>
            <div class="profile-info-value" style="width:25%"></div>
        </div>
    </div>
        <br/>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">구분</div>
            <div class="profile-info-name">측정시간</div>
            <div class="profile-info-name">측정값</div>
            <div class="profile-info-name">작업자</div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">1차</div>
            <div class="profile-info-value"><input type="text" name="" class="form-control modal_value" autofocus autocomplete="off"></div>
            <div class="profile-info-value"> <input type="text" name="" class="form-control modal_value" autocomplete="off"></div>
            <div class="profile-info-value"> <select id="modal_select1" style="width: 100%"><option value="">▼</option><option></option><option></option></select></div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">2차</div>
            <div class="profile-info-value"><input type="text" name="" class="form-control modal_value" autocomplete="off"></div>
            <div class="profile-info-value"> <input type="text" name="" class="form-control modal_value" autocomplete="off"></div>
            <div class="profile-info-value"> <select id="modal_select2" style="width: 100%"><option value="">▼</option><option></option><option></option></select></div>
        </div> <div class="profile-info-row">
        <div class="profile-info-name">3차</div>
        <div class="profile-info-value"><input type="text" name="" class="form-control modal_value" autocomplete="off"></div>
        <div class="profile-info-value"> <input type="text" name="" class="form-control modal_value" autocomplete="off"></div>
        <div class="profile-info-value"> <select id="modal_select3" style="width: 100%"><option value="">▼</option><option></option><option></option></select></div>
    </div>

    </div>
</div>
