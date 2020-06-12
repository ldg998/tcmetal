<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script type="text/javascript" src="/data-component/mesTPM/RegItem/tpmMachineRegAlarm/tpmMachineRegAlarm.js" charset="UTF-8"></script>
<style>
    #mes_modal1_grid1_pager #pg_mes_modal1_grid1_pager table{
        table-layout:auto !important;
    }
</style>
<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">라인</td>
                    <td class="wt-px-200">
                        <select name="keyword" id="line_select" class="form-control keyword condition_main" onchange="select_change1(this.value);" style="width:100%">
                            <option value="">전체</option>
                        </select>
                    </td>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">설비</td>
                    <td class="wt-px-200">
                        <select name="keyword2" class="form-control h-25 condition_main" id="machine_select" style="width:100%">
                            <option value="">전체</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="dt-buttons btn-overlap btn-group">
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1)">
                            <span>
                                <i class="fa fa-search bigger-110 blue"></i>
                                <span>조회</span>
                            </span>
                    </a>
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>추가</span>
                            </span>
                    </a>
                    <a class="dt-button btn btn-white btn-primary btn-mini btn-bold"
                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn()">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>삭제</span>
                            </span>
                    </a>
                </div>
            </div>
            <div class="row">

                <div class="col-xs-12 table-responsive">
                    <table id="mes_grid"></table>
                    <div id="mes_grid_pager"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<%@include file="tpmMachineRegAlarm_modal1.jsp" %>




