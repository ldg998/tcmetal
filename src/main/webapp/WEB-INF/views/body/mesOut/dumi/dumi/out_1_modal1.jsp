<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesOUT/mesOut/dumi/out_1_modal1.js"
        charset="UTF-8"></script>
<style>
#addDialog{
   overflow-x:hidden;
    overflow-y:hidden;
}

</style>

<div id="addDialog" title="제품단가관리" style="display: none">


    <!-- button div 왼쪽으로 float 정렬 -->
    <div class="tableTools-container">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <!-- 구분 select 창 -->
                    <td class="wt-px-75 t-align-c td-title padding-a-0" id="part_type">업체</td>
                    <td class="wt-px-100">
                        <input type="text" name="supp_name" class="form-control h-25 condition_main">
                    </td>
                    <!-- 품목코드 검색창 -->
                    <td class="wt-px-75 t-align-c td-title padding-a-0" id="part_group1">기종</td>
                    <td class="wt-px-150">
                        <input type="text" name="keyword"  class="form-control h-25 condition_main" autocomplete="off" />
                    </td>

                    <td class="wt-px-75 t-align-c td-title padding-a-0">외주업체</td>
                    <td class="wt-px-150">
                    <input type="text" class="form-control h-25 condition_main" readonly placeholder="자동표시">
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
                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                        <span>
                            <i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                </a>
                <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                   id="btn-excel" tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                   onclick="excel_download">
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
            <table id="mes_modal_grid"></table>
            <!-- grid-pager 영역 -->
        </div>
    </div>

</div>


