<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesOUT/inOut/outsOut/outsOut_modal1.js"
        charset="UTF-8"></script>
<style>
#addDialog{
   overflow-x:hidden;
    overflow-y:hidden;
}

</style>

<div id="addDialog" title="외주출고관리" style="display: none">


    <!-- button div 왼쪽으로 float 정렬 -->
    <div class="tableTools-container">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <!-- 구분 select 창 -->

                    <td class="wt-px-75 td-title t-align-c padding-a-0">업체</td>
                    <td class="wt-px-150">
                        <select class="form-control modal_value" name="supp_code" id="supp_modal_select" style="width: 100%" onchange="select_modal_change1(this.value)" ></select>
                    <input type="hidden" autofocus>
                    </td>

                    <td class="wt-px-75 td-title t-align-c padding-a-0">기종</td>
                    <td class="wt-px-150">
                        <select class="modal_value" id="part_kind_modal_select" name="part_kind" style="width: 100%;">
                            <option value="">전체</option>

                        </select>
                    </td>

                    <td class="wt-px-75 t-align-c td-title padding-a-0">외주업체</td>
                    <td class="wt-px-150">
                        <select class="modal_value" id="outs_supp_modal_select" name="outs_supp_code" style="width: 100%;">
                            <option value="">전체</option>

                        </select>

                    </td>
                    <td class="wt-px-75 t-align-c td-title padding-a-0">출고일짜</td>
                    <td class="wt-px-150">
                        <div class="input-icon input-icon-right">
                            <input type="hidden" name="in_no" class="modal_value" value="">
                            <input type="text" name="work_date" id="datepicker_modal1"
                                   class="form-control h-25 modal_value" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>


                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>


        <div class="btn_center">
            <div class="dt-buttons btn-overlap btn-group modal_btn">
                <!-- 조회버튼 -->
                <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal_get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                </a>
                <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                   id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                   onclick="addUdate_btn()">
                         <span><i class="fa fa-download bigger-110 blue"></i>
                             <span>저장</span>
                         </span>
                </a>

            </div>
        </div>
    </div>
    <%--end 버튼--%>


    <div class="row">
        <div class="col-xs-12 table-responsive">
            <!-- grid영역 -->
            <table id="mes_add_grid2"></table>
            <!-- grid-pager 영역 -->
        </div>
    </div>

</div>


