<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPartCost/sysPartCost_modal1.js"
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
        text-align: center;

    }
#addDialog
 {overflow-y: hidden; overflow-x: hidden;}




</style>

<div id="addDialog" title="세부항목" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name"> 품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off" autofocus readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 규격</div>
            <div class="profile-info-value">
                <input type="text" name="spec" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 단위</div>
            <div class="profile-info-value">
                <input type="text" name="unit_name" class="form-control modal_value" autocomplete="off" readonly >
                <input type="hidden" name="unit_code" class="modal_value">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 변경일자</div>
            <div class="profile-info-value">

                <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker"
                           class="form-control h-25 modal_value sendDate " readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name"> 단가</div>
            <div class="profile-info-value">
                <input type="text" name="unit_cost" class="form-control modal_value" onkeyup="num_keyup_comma(this)" autocomplete="off" style="text-align: right">
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
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_modal1_btn()">
                        <span>
                            <span>저장</span>
                        </span>
                </a>

                <a class="btn btn-secondary btn-lg"
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_modal_btn()">
                        <span>
                            <span>삭제</span>
                        </span>
                </a>

                <a class="btn btn-secondary btn-lg"
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal_close()">
                        <span>
                            <span>취소</span>
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
        </div>
    </div>

</div>


