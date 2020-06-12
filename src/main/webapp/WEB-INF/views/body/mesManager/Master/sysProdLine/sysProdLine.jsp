<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysProdLine/sysProdLine.js" charset="UTF-8"></script>


<div class="main-content-inner">
    <div class="page-content">
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
                        <span><i class="fa fa-plus bigger-110 blue"></i>
                            <span>추가</span>
                        </span>
                        <input type="hidden" name="dept_code" id="default_code" value="D9000">
                        <input type="hidden" name="dept_name" id="default_name" value="생산(현장)">
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
        </div>
        <div class="row">

            <div class="col-xs-12 table-responsive">
                <table id="mes_grid"></table>
                <div id="mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>

<%@include file="sysProdLine_modal1.jsp"%>


