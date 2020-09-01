<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlanMelt/popPlanMelt_modal1.js"
        charset="UTF-8"></script>
<style>
    #addDialog{
        overflow-x:hidden;
        overflow-y:hidden;
    }
    input[type=text][name="plan_qty"] {
        height: 18px !important;
    }
    input[type=text][name="lot_no"] {
        height: 18px !important;
    }
</style>

<div id="addDialog" title="주입계획서" style="display: none">
    <!-- button div 왼쪽으로 float 정렬 -->
    <div class="tableTools-container">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <!-- 구분 select 창 -->
                    <td class="wt-px-75 t-align-c td-title padding-a-0" id="part_type">생산일자</td>
                    <td class="wt-px-100">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="datepicker_modal1"
                                   class="form-control h-25 modal_value sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <input type="hidden" autofocus>
                    <td class="wt-px-75 t-align-c td-title padding-a-0">라인그룹</td>
                    <td class="wt-px-100">
                        <select id="modal1_select1" class="form-control h-25 modal_value" name="keyword" onchange="modal1_select_change1(this.value);"
                                style="width: 100%">
                            <option value="">합형1</option>
                            <option value="0">합형2</option>
                            <option value="1">합형3</option>
                        </select>
                    </td>
                    <td class="wt-px-75 t-align-c td-title padding-a-0">라인명</td>
                    <td class="wt-px-100">
                        <select id="modal1_select2" class="form-control h-25 modal_value" name="keyword2" onchange="modal1_select_change2();"
                                style="width: 100%">
                            <option value="">합형1</option>
                            <option value="0">합형2</option>
                            <option value="1">합형3</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


        <div class="btn_center">
            <div class="dt-buttons btn-overlap btn-group modal_btn">
                <!-- 조회버튼 -->
                <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                   id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                   onclick="addUdate_btn();">
                                        <span><i class="fa fa-plus bigger-110 blue"></i>
                                            <span>저장</span>
                                        </span>
                </a>
                <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                   onclick="modal_close();">
                                <span>
                                    <i class="fa fa-times bigger-110 blue"></i>
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
            <table id="mes_modal1_grid1"></table>
            <!-- grid-pager 영역 -->
        </div>
    </div>

</div>


