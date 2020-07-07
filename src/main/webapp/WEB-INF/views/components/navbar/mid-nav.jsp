<%@ page import="org.springframework.util.ObjectUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<script src="/data-component/header/header2.js"></script>
<div id="navbar" class="navbar navbar-default ace-save-state" >
    <div class="navbar-container ace-save-state" id="navbar-container" >

        <div class="col-lg-12">
            <button type="button" class="navbar-toggle menu-toggler navbar-brand" id="menu-toggler2" data-target="#sidebar2" style="float:left; height: 30px; width: 30px; margin-top:16px; background-color: #00000033">
                <i class="fa fa-list"></i>
            </button>
            <button type="button" class="navbar-toggle menu-toggler navbar-brand" id="menu-toggler" data-target="#sidebar" style="float:left; height: 30px; width: 30px; margin-top:16px; background-color: #00000033">
                <i class="fa fa-folder-open-o"></i>
            </button>

            <a href="/" class="navbar-brand">
                <img src="/ui-component/assets/images/tclogo2.png" id="main_logo_img" width="180px">
            </a>
            <div class="form-group">
                <a href="javascript:void(0);" class="navbar-brand top_m">
                    <i class="fa fa-user"></i> ${sessionScope.userData.user_name}님 반갑습니다.
                    <input type="hidden" value="${sessionScope.userData.site_code}" id="hstcd">
                    <input type="hidden" value="${sessionScope.userData.user_code}" id="huscd">
                    <input type="hidden" value="${sessionScope.userData.user_name}" id="husnm">
                    <br>
                    <button type="button" class="btn btn-minier btn-dark" onclick="password_add_btn();">암호변경</button>
                    <button type="button" class="btn btn-minier btn-dark" onclick="logout();">로그아웃</button>
                </a>
            </div>
        </div>
    </div>
</div>

<%--<button type="button" class="navbar-toggle menu-toggler" id="menu-toggler" data-target="#sidebar">--%>
<%--    <span class="sr-only">사이드 메뉴</span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--    <span class="icon-bar"></span>--%>
<%--</button>--%>
<%-- 상단 아이콘 메뉴 --%>

<script type="text/javascript">
    try{ace.settings.loadState('main-container')}catch(e){}
</script>
<div id="sidebar2" class="sidebar h-sidebar navbar-collapse collapse ace-save-state" data-sidebar="true"
     data-sidebar-scroll="true" data-sidebar-hover="true">
    <script type="text/javascript">
        try{ace.settings.loadState('sidebar')}catch(e){}
    </script>
    <ul class="nav nav-list of-hidden">
        <%--<li class="hover">--%>
        <%--<a href="/">--%>
        <%--<i class="menu-icon fa fa-home"></i>--%>
        <%--<span class="menu-text"> 메인홈 </span>--%>
        <%--</a>--%>
        <%--<b class="arrow"></b>--%>
        <%--</li>--%>
        <c:set var="doneLoop" value="false"/>
        <c:set var="doneLoop2" value="false"/>
        <c:forEach var="main_list" items="${main_list}" varStatus="starus">
            <c:set var="doneLoop" value="false"/>
            <c:set var="doneLoop3" value="true"/>
            <li id="mid-nav" class="hover <c:out value="${main_list.menu_name}"/>">

                <c:if test="${main_list.menu_name != '게시판'}">
                <a class="dropdown-toggle" href='javascript:void(0);"/>"'>

                    </c:if>

                    <c:if test="${main_list.menu_name eq '관리자'}">
                    <i class="menu-icon fa fa-user"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '자재관리'}">
                    <i class="menu-icon fa fa-cogs"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '출하관리'}">
                    <i class="menu-icon fa fa-truck"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '영업관리'}">
                    <i class="menu-icon fa fa-suitcase"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '품질관리'}">
                    <i class="menu-icon fa fa-check-square-o"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '생산관리'}">
                    <i class="menu-icon fa fa-industry"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '외주관리'}">
                    <i class="menu-icon fa fa-handshake-o"></i>
                    </c:if>
                    <c:if test="${main_list.menu_name eq '설비관리'}">
                    <i class="menu-icon fa fa-wrench"></i>
                    </c:if>

                    <c:if test="${main_list.menu_name eq '게시판'}">
                    <a href="javascript:void(0);" style="cursor:pointer;">
                        <i class="menu-icon fa fa-comments"></i>
                        </c:if>
                        <span class="menu-text2"><c:out value="${main_list.menu_name}"/></span>
                    </a>
                    <b class="arrow"></b>
                    <ul class="submenu">
                        <c:forEach var="under_list2" items="${allSub_list[starus.index]}">
                            <c:if test="${under_list2.level == 2 }">


                                <li class="active hover">
                                    <a href="#" class="dropdown-toggle">
                                        <i class="menu-icon fa fa-caret-right"></i>

                                            ${under_list2.menu_name}
                                        <b class="arrow fa fa-angle-right"></b>
                                    </a>

                                    <b class="arrow"></b>
                                    <ul class="submenu nav-hide" style="display: none;">
                                        <c:forEach var="under_list3" items="${allSub_list[starus.index]}">
                                            <c:if test="${under_list3.level == 3 && under_list3.parent_menu_code == under_list2.menu_code }">

                                                    <li class="hover">
                                                        <c:if test="${main_list.menu_name == '게시판'}">
                                                            <a  onclick="viewBoard('<c:out value="${under_list3.menu_code}"/>');" class="submenu_submenu"  style="cursor: pointer">
                                                                <i class="menu-icon fa fa-caret-right"></i>
                                                                    ${under_list3.menu_name}
                                                            </a>
                                                        </c:if>
                                                        <c:if test="${main_list.menu_name != '게시판'}">
                                                            <a href="${under_list3.menu_code}" class="submenu_submenu">
                                                                <i class="menu-icon fa fa-caret-right"></i>
                                                                    ${under_list3.menu_name}
                                                            </a>
                                                        </c:if>


                                                        <b class="arrow"></b>
                                                    </li>

                                            </c:if>
                                        </c:forEach>
                                    </ul>

                                </li>





                            </c:if>
                        </c:forEach>
                    </ul>

                        <%--                        <c:if test="${doneLoop != true}">--%>
                        <%--                        <c:if test="${under_list2.level == 2 }">--%>
                        <%--                            <c:set var="doneLoop3" value="false"/>--%>







                        <%--                        </c:if>--%>
                        <%--                        <c:if test="${doneLoop3 != true}">--%>
                        <%--                        <c:if test="${under_list2.level == 3 }">--%>
                        <%--                            <c:set var="doneLoop" value="true"/>--%>
                        <%--                        </c:if>--%>
                        <%--                        </c:if>--%>
                        <%--                        </c:if>--%>

                        <%--                                    <ul class="submenu">--%>
                        <%--                                        <li class="active hover">--%>
                        <%--                                            <a href="#" class="dropdown-toggle">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>

                        <%--                                                Layouts--%>
                        <%--                                                <b class="arrow fa fa-angle-down"></b>--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>

                        <%--                                            <ul class="submenu nav-hide" style="display: none;">--%>
                        <%--                                                <li class="active hover">--%>
                        <%--                                                    <a href="top-menu.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Top Menu--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="two-menu-1.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Two Menus 1--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="two-menu-2.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Two Menus 2--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="mobile-menu-1.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Default Mobile Menu--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="mobile-menu-2.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Mobile Menu 2--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="mobile-menu-3.html">--%>
                        <%--                                                        <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                        Mobile Menu 3--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>
                        <%--                                            </ul>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="typography.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Typography--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="elements.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Elements--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="buttons.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Buttons &amp; Icons--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="content-slider.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Content Sliders--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="treeview.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Treeview--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="jquery-ui.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                jQuery UI--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="nestable-list.html">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>
                        <%--                                                Nestable Lists--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>
                        <%--                                        </li>--%>

                        <%--                                        <li class="hover">--%>
                        <%--                                            <a href="#" class="dropdown-toggle">--%>
                        <%--                                                <i class="menu-icon fa fa-caret-right"></i>--%>

                        <%--                                                Three Level Menu--%>
                        <%--                                                <b class="arrow fa fa-angle-down"></b>--%>
                        <%--                                            </a>--%>

                        <%--                                            <b class="arrow"></b>--%>

                        <%--                                            <ul class="submenu can-scroll">--%>
                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="#">--%>
                        <%--                                                        <i class="menu-icon fa fa-leaf green"></i>--%>
                        <%--                                                        Item #1--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>
                        <%--                                                </li>--%>

                        <%--                                                <li class="hover">--%>
                        <%--                                                    <a href="#" class="dropdown-toggle">--%>
                        <%--                                                        <i class="menu-icon fa fa-pencil orange"></i>--%>

                        <%--                                                        4th level--%>
                        <%--                                                        <b class="arrow fa fa-angle-down"></b>--%>
                        <%--                                                    </a>--%>

                        <%--                                                    <b class="arrow"></b>--%>

                        <%--                                                    <ul class="submenu can-scroll">--%>
                        <%--                                                        <li class="hover">--%>
                        <%--                                                            <a href="#">--%>
                        <%--                                                                <i class="menu-icon fa fa-plus purple"></i>--%>
                        <%--                                                                Add Product--%>
                        <%--                                                            </a>--%>

                        <%--                                                            <b class="arrow"></b>--%>
                        <%--                                                        </li>--%>

                        <%--                                                        <li class="hover">--%>
                        <%--                                                            <a href="#">--%>
                        <%--                                                                <i class="menu-icon fa fa-eye pink"></i>--%>
                        <%--                                                                View Products--%>
                        <%--                                                            </a>--%>

                        <%--                                                            <b class="arrow"></b>--%>
                        <%--                                                        </li>--%>
                        <%--                                                    </ul>--%>
                        <%--                                                </li>--%>
                        <%--                                            </ul>--%>
                        <%--                                        </li>--%>
                        <%--                                    </ul>--%>

            </li>
        </c:forEach>
    </ul>
</div>

<%@include file="/WEB-INF/views/body/common/modal/password_modal.jsp" %>