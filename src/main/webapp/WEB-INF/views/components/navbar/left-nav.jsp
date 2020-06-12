<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div id="sidebar" class="sidebar responsive ace-save-state" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">
    <script type="text/javascript">
        var under_active = '${under_active}';
        var home_req = '${home}';
        $(function() {
            if (home_req !== "home"){

                var tagName = $('.menu-text1').text();
                var name = "#mid-nav " + tagName;
                var tag = $("#mid-nav").find(tagName);

                if(tag.selector == name){
                    $("#mid-nav").removeClass('active');
                    $("."+tagName).addClass('active');
                }
            }
        });
    </script>
    <script type="text/javascript">
        try{ace.settings.loadState('main-container')}catch(e){}
        try{ace.settings.loadState('sidebar')}catch(e){}
    </script>
    <ul class="nav nav-list">
        <li class="li_top" style="display: none">
            <a>
                <i class="menu-icon fa fa-tachometer"></i>
                <c:if test="${left_list != null }">
                    <span class="menu-text1">${left_list[0][0].menu_name }</span>
                </c:if>
                <c:if test="${left_list == null }">
                    <span class="menu-text1"></span>
                </c:if>
            </a>
        </li>
        <li class="active open">
            <a href="javascript:void(0)" class="dropdown-toggle">
                <i class="menu-icon fa fa-list-ul"></i>
                <span class="menu-text"> 즐겨찾기 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu" id="left_submenu">
                <c:forEach var="subLeft_list" items="${favorites_list}">
                    <li class="${subLeft_list.menu_code } ${under_active == subLeft_list.menu_code ? 'active' : ''}" >
                        <a href="${subLeft_list.menu_code }">${subLeft_list.menu_name }</a>
                        <b class="arrow"></b>
                    </li>
                </c:forEach>
            </ul>
        </li>
<%--        <c:forEach var="mainLeft_list" items="${left_list[0] }" varStatus="status">--%>
<%--            <c:if test="${status.index != 0 }">--%>
<%--                <li class="${top_active == mainLeft_list.menu_code ? 'active open' : ''}">--%>
<%--                    <c:if test="${mainLeft_list.level != 1 }">--%>
<%--                        <a href="javascript:void(0)" class="dropdown-toggle">--%>
<%--                            <i class="menu-icon fa fa-list-ul"></i>--%>
<%--                            <span class="menu-text"> ${mainLeft_list.menu_name} </span>--%>
<%--                            <b class="arrow fa fa-angle-down"></b>--%>
<%--                        </a>--%>
<%--                        <b class="arrow"></b>--%>

<%--                        <ul class="submenu">--%>
<%--                            <c:forEach var="subLeft_list" items="${left_list[1]}">--%>
<%--                                <c:if test="${mainLeft_list.menu_code == subLeft_list.parent_menu_code }">--%>
<%--                                <c:if test="${mainLeft_list.menu_code == 'topBoard1'}">--%>
<%--                                    <li class="${subLeft_list.menu_code } ${under_active == subLeft_list.menu_code ? 'active' : ''}" >--%>
<%--                                        <a onclick="viewBoard('<c:out value="${subLeft_list.menu_code}"/>');">${subLeft_list.menu_name }</a>--%>
<%--                                        <b class="arrow"></b>--%>
<%--                                    </li>--%>
<%--                                </c:if>--%>
<%--                                    <c:if test="${mainLeft_list.menu_code != 'topBoard1'}">--%>
<%--                                        <li class="${subLeft_list.menu_code } ${under_active == subLeft_list.menu_code ? 'active' : ''}" >--%>
<%--                                            <a href="${subLeft_list.menu_code }">${subLeft_list.menu_name }</a>--%>
<%--                                            <b class="arrow"></b>--%>
<%--                                        </li>--%>
<%--                                    </c:if>--%>
<%--                                </c:if>--%>
<%--                            </c:forEach>--%>
<%--                        </ul>--%>
<%--                    </c:if>--%>
<%--                </li>--%>
<%--            </c:if>--%>
<%--        </c:forEach>--%>
    </ul>
</div>