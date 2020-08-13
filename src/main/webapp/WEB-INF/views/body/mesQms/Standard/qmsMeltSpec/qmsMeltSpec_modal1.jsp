<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Standard/qmsMeltSpec/qmsMeltSpec_modal1.js"
        charset="UTF-8"></script>
<style>
    .board_line {
        border-right: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;
        text-align: center;
    }

    .w_100 {width: 100%; height: 18px !important;}
    .w_20 {width: 20%;}
    .right {text-align: right !important;}
    .left {text-align: left !important;}
    #addDialog::-webkit-scrollbar {display: none;}

    input[type=text][name="range2"] {
        height: 18px !important;
    }
    input[type=text][name="remark"] {
        height: 18px !important;
    }
    input[type=text][name="range1"] {
        height: 18px !important;
    }
</style>

<div id="addDialog" title="제품단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" autofocus readonly>
                <input type="hidden" name="supp_code" class="form-control modal_value">

            </div>
            <div class="profile-info-name"> 품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name"> 기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off" readonly>
            </div>
            <div class="profile-info-name"> 품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
    </div>

    <br/>
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row ">
            <div class="profile-info-name board_line w_20"> 구분</div>
            <div class="profile-info-name board_line w_20"> 투입량(%)</div>
            <div class="profile-info-name board_line"> 비고</div>
        </div>
        <div class="profile-info-row ">
            <div class="profile-info-value board_line left">고철</div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron1_value" class="modal_value w_100 right" autocomplete="off" onkeyup="num_keyup_float(this);">
            </div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron1_remark" class="modal_value w_100" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value board_line left">선철</div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron2_value" class="modal_value w_100 right" autocomplete="off" onkeyup="num_keyup_float(this);">
            </div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron2_remark" class="modal_value w_100" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-value board_line left">회수철</div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron3_value" class="modal_value w_100 right" autocomplete="off" onkeyup="num_keyup_float(this);"></div>
            <div class="profile-info-value board_line">
                <input type="text" name="iron3_remark" class="modal_value w_100" autocomplete="off">
            </div>

        </div>
    </div>

    <br/>

        <div class="col-xs-12 table-responsive">
            <table id="mes_modal_grid2"></table>

        </div>


</div>

</div>
