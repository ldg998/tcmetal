<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%--<%@ page session="false" %>--%> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->

<script type="text/javascript" src="/data-component/mesManager/User/sysUserLog/sysUserLog.js" charset="UTF-8"></script>

<style>
    #colchooser_sysUserLog_mes_grid{height: 300px !important;}
</style>

<div class="main-content-inner sysUserLog">
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <table class="table wt-100">
                <tbody>
                <tr>
                    <%-- 조회날짜(시작) --%>
                    <td class="wt-px-100 td-title t-align-c padding-a-0">조회기간</td>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="start_date" id="sysUserLog_datepicker"
                                   class="form-control h-25 condition_main sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class="t-align-c" style="width:25px !important;">~</td>
                    <%--조회날짜(끝)--%>
                    <td class="wt-px-200">
                        <div class="input-icon input-icon-right">
                            <input type="text" name="end_date" id="sysUserLog_datepicker2"
                                   class="form-control h-25 condition_main sendDate" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix">
            <div class="pull-left tableTools-container">
                <div class="btn-overlap btn-group">
                    <a class="btn btn-white btn-primary btn-mini btn-bold" onclick="sysUserLog_get_btn(1)">
                        <span><i class="fa fa-search bigger-110 blue"></i>
                            <span>조회</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="sysUserLog_mes_grid"></table>
                <div id="sysUserLog_mes_grid_pager"></div>
            </div>
        </div>
    </div>
</div>


