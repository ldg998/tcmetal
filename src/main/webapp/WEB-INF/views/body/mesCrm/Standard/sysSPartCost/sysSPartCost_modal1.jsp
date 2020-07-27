<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/standard/sysSPartCost/sysSPartCost_modal1.js"
        charset="UTF-8"></script>

<style>
    .tableTools-container >.btn_center > .modal_btn > a {
        padding: 3px 15px !important;
        font-size: 6px !important;
        line-height: 1.3333333 !important;
        border-radius: 6px !important;
        margin-left: 10px;
        margin-right: 10px;
    }
    .btn_center{
        text-align: left;

    }
#addDialog
 {overflow-y: hidden; overflow-x: hidden;}




</style>

<div id="addDialog" title="제품단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 기종</div>
            <div class="profile-info-value">
                <input type="hidden" name="supp_code" class="form-control modal_value">
                <input type="text" name="part_kind" class="form-control modal_value"  readonly autocomplete="off" autofocus>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 화폐단위</div>
            <div class="profile-info-value">
                <input type="text" name="currency_code" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name"> 변경일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker1_modal"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 단가</div>
            <div class="profile-info-value">
                <input type="text" name="unit_cost" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
    </div>
    <%-- end_input_data --%>
    <br/>
    <!-- button div 왼쪽으로 float 정렬 -->
    <div class="tableTools-container">
        <div class="btn_center">
            <div class="dt-buttons btn-overlap btn-group modal_btn">
                <!-- 조회버튼 -->
                <a class="btn btn-secondary btn-lg"
                   tabindex="0" aria-controls="dynamic-table" onclick="add_modal1_btn()" data-original-title="" title="">
                        <span>
                            <span>저장</span>
                        </span>
                </a>
                <a class="btn btn-secondary btn-lg"
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="">
                        <span>
                            <span>삭제</span>
                        </span>
                </a>

            </div>
        </div>
    </div>
    <%--end 버튼--%>
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <!-- grid영역 -->
            <table id="mes_modal_grid"></table>
            <!-- grid-pager 영역 -->
            <div id="mes_modal_grid_pager"></div>
        </div>
    </div>

</div>


