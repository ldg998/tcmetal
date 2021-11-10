<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="/ui-component/assets/css/index2.css" />
<!DOCTYPE html>
<tiles:insertAttribute name="header"/>
<script type="text/javascript" src="/data-component/common/index2.js" charset="UTF-8"></script>
<html>
<body style="">
<tiles:insertAttribute name="mid"/>
<div class="main-container ace-save-state" id="main-container">

    <div class="main-content-inner col-lg-12 back_img">
        <div class="lo2 col-lg-12" style="display: block; float: left">
            <div class="col-lg-5 h_68">
                <div class="lo col-xs-12 table-responsive">
                            <span>
                                <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 합형현황</span>
                                </span>
                    <table style="width: 100%;" border="1" class="table_border box">
                        <colgroup>

                            <col width="20%">
                            <col width="30%">
                            <col width="21%">
                            <col width="9%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr class="thFont" style="height: 40px;">
                            <th>업체</th>
                            <th>기종</th>
                            <th>품명</th>
                            <th>LOT</th>
                            <th>작업자</th>
                        </tr>
                        </thead>
                        <tbody class="list1">
                        </tbody>
                    </table>
                    <%--<table id="mes_grid"></table>--%>

                </div>
                <%--end lo--%>
            </div>
            <%-- end col-lg-6 --%>


            <div class="col-lg-7 h_55">
                <div class="lo col-xs-12 table-responsive">
                             <span>
                                    <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 용해 주입 일보현황</span>
                                </span>
                    <table style="width: 100%;" border="1" class="table_border">
                        <colgroup>
                            <col width="5%">
                            <col width="20%">
                            <col width="15%">
                            <col width="10%">
                            <col width="10%">
                            <col width="5%">
                            <col width="5%">
                        </colgroup>

                        <thead>
                        <tr class="thFont" style="height: 40px;">
                            <th>CGH</th>
                            <th>업체</th>
                            <th>기종</th>
                            <th>품명</th>
                            <th>중량</th>
                            <th>개수</th>
                            <th>작업자</th>

                        </tr>
                        </thead>

                        <tbody class="list2">

                        </tbody>

                    </table>


                    <%--<table id="mes_grid2"></table>--%>
                </div>
                <%--end lo--%>
            </div>
            <%-- end col-lg-6 --%>

            <div class="col-lg-6 h_45" style="float: right;">
                <div class="lo col-xs-12 table-responsive">
                            <span>
                                    <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 중간검사현황</span>
                                </span>

                    <table style="width: 100%;" border="1" class="table_border box">
                        <colgroup>
                            <col width="22%">
                            <col width="15%">
                            <col width="13%">
                            <col width="19%">
                            <col width="13%">
                            <col width="8%">
                            <col width="10%">
                        </colgroup>

                        <thead>
                        <tr class="thFont" style="height: 40px;">
                            <th>업체</th>
                            <th>기종</th>
                            <th>품명</th>
                            <th>품번</th>
                            <th>LOT</th>
                            <th>결과</th>
                            <th>등록자</th>

                        </tr>
                        </thead>


                        <tbody class="list3">

                        </tbody>


                    </table>
                    <%--<table id="mes_grid3"></table>--%>
                </div>
                <%--end lo--%>
            </div>

            <div class="col-lg-6 h_30" style="float: left;">
                <div class="lo col-xs-12 table-responsive">
                            <span>
                                    <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 공지사항</span>
                                </span>


                    <table style="width: 100%;" border="1" class="table_border box">
                        <colgroup>
                            <col width="90%">
                            <col width="10%">


                        </colgroup>

                        <thead>
                        <tr class="thFont" style="height: 40px;">
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                        </thead>


                        <tbody class="list4">

                        </tbody>

                    </table>

                    <%--<table id="mes_grid4"></table>--%>
                </div>
                <%--end lo--%>
            </div>
            <%-- end col-lg-6 --%>


            <%-- end col-lg-6 --%>
        </div>
    </div>
</div>
</div>

</body>
</html>