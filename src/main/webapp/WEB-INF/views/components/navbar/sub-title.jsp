<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="breadcrumbs ace-save-state" id="breadcrumbs">
    <div class="col-lg-12 ">
            <span class="sp-title">


            	<span id="sub-t-1"></span>
            	<small class="sp-small"><i class="ace-icon fa fa-angle-double-right"></i>
            	Manufacturing Execution System
            	</small>
            </span>
        <span style="float: right">
                <span id="sub-t-2"></span>
            	<i class="ace-icon fa fa-angle-double-right"></i>
                <span id="sub-t-3"></span>
                <i class="ace-icon fa fa-angle-double-right"></i>
                <b><span id="sub-t-4"></span></b>
             <c:if test="${star_check == 1}">
                 <i class="fa fa-star favorites_star" style="cursor: pointer " onclick="favorites_btn();"></i>
             </c:if>
                <c:if test="${star_check == 0}">
                    <i class="fa fa-star-o favorites_star" style="cursor: pointer " onclick="favorites_btn();"></i>
                </c:if>
           </span>
    </div>
</div>