<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script type="text/javascript" src="/data-component/mesPOP/Standard/popLineUser/popLineUser.js" charset="UTF-8"></script>

<div class="main-content-inner">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-15" style="border-bottom: 1px solid #DDDDDD">
                <tbody>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">공정</td>
                    <td class="wt-px-200" style="border-right: 1px solid #DDDDDD">
                        <select name="keyword" id="select1" class="form-control keyword condition_main" style="width: 100%">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="wt-px-100 t-align-c td-title padding-a-0">세부</td>
                    <td class="wt-px-200" style="border-right: 1px solid #DDDDDD">
                        <select name="keyword" id="select2" class="form-control keyword condition_main" style="width: 100%">
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="row">
                <div class="col-md-6">
                    <div class="clearfix">
                        <div class="pull-left tableTools-container">
                            <div class="dt-buttons btn-overlap btn-group">
                                <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="get_btn(1);">
                                    <span>
                                        <i class="fa fa-search bigger-110 blue"></i>
                                        <span>조회</span>
                                    </span>
                                </a>
                                <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="delete_btn();">
                                    <span>
                                        <i class="fa fa-trash bigger-110 blue"></i>
                                        <span>삭제</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="clearfix">
                        <div class="pull-left tableTools-container">
                            <div class="dt-buttons btn-overlap btn-group">
                                <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="add_btn();">
                                    <span>
                                        <i class="fa fa-plus bigger-110 blue"></i>
                                        <span>추가</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-xs-12 table-responsive">
                    <div class="row">
                        <div class="col-md-6 ">
                            <table id="mes_grid"></table>
                            <div id="mes_grid_pager"></div>
                        </div>
                        <div class="col-md-6">
                            <table id="mes_grid2"></table>
                            <div id="mes_grid2_pager"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



