<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style>
    #mes_grid {
        color: #ffffff;
    }

    #mes_grid2 {
        color: #ffffff;
    }

    #mes_grid3 {
        color: #ffffff;
    }

    #mes_grid4 {
        color: #ffffff;
    }

    .table-responsive {
        padding: 6px !important;
    }

    .ui-jqgrid-labels {

    }

    .ui-jqgrid-bdiv {
        /*width: 90%;*/
        color: #F0F9FF;
    }

    .ui-jqgrid-view > .ui-jqgrid-titlebar {
        /*width: 90%;*/
    }

    .table_title {
        color: #F0F9FF;
        font-size: 1.8em;

    }

    .lo {
        /*background-color: #0b2e13;*/
        height: 90% !important;
        padding: 2px;
    !important;
        margin: 6px;
    !important;
        border: 2px rgba(192, 192, 192, 0.7) solid;
        border-radius: 15px;
        background-color: rgba(28, 22, 22, 0.4);

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    .lo::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }

    .lo2 {

        margin: 5px;

        padding-top: 10px;
        height: 98%;
        border: 2px rgba(192, 192, 192, 0.7) solid;
        border-radius: 15px;

        background-color: rgba(21, 17, 17, 0.4);
    }

    .main-content:before {
        content: "";
        display: block !important;
    }

    .h_5 {
        height: 5% !important;
    }

    .h_8 {
        height: 8% !important;
    }

    .h_10 {
        height: 10% !important;
    }

    .h_20 {
        height: 20% !important;
    }

    .h_30 {
        height: 30% !important;
    }

    .h_40 {
        height: 40% !important;
    }

    .h_46 {
        height: 46% !important;
    }

    .h_50 {
        height: 50% !important;
    }

    .h_55 {
        height: 55% !important;
    }

    .h_60 {
        height: 60% !important;
    }

    .h_68 {
        height: 68% !important;
    }
    .h_70 {
        height: 70% !important;
    }

    .h_80 {
        height: 80% !important;
    }

    .h_90 {
        height: 90% !important;
    }

    .h_100 {
        height: 100% !important;
    }

    .mark_img {
        background-image: url("/ui-component/assets/images/mark.png");
        background-color: #000000;
        background-size: cover;
        background-repeat: no-repeat;
        width: 15px;
        height: 15px;
        max-width: 15px;

        margin: auto;

    }

    .back_img {
        margin: 0px;
        padding: 0px;
        height: 92%;
        /*/ui-component/assets/images/main/main.jpg */
        background-image: linear-gradient(rgba(20, 20, 20, 0.7) 100%, rgba(20, 20, 20, 0.7) 100%), url("/ui-component/assets/images/main/main3.jpg");
        opacity: 1;
        background-size: 98%;
        position: relative;

        /*z-index: -10;*/


    }


    /*.back_img:after {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    content: "";*/
    /*    background-image: url("/ui-component/assets/images/main/main.jpg");*/

    /*    top: 0;*/
    /*    left: 0;*/
    /*    z-index: -1;*/
    /*    opacity: 0.5;*/
    /*}*/

    .thFont {
        /*background: linear-gradient(to bottom, #504b4b 0%, #807a7a 50%,#504b4b 100%);*/
        background-color: #504b4b;
        border: 1px #ffffff solid;

    }

    .thFont > th {
        text-align: center;
        color: #d5d3d3;
        font-weight: bolder;
    }

    .tdFont {
        color: #d5d3d3;
        text-align: center;
    }

    .table_border {
        border: 1px #ffffff solid;
        /*border-color : #ffffff;*/
    }


</style>

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
                            <th>등록자</th>
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


            <div class="col-lg-7 h_50">
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
                            <th>등록자</th>

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


            <div class="col-lg-6 h_50" style="float: right;">
                <div class="lo col-xs-12 table-responsive">
                            <span>
                                    <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 공지사항</span>
                                </span>


                    <table style="width: 100%;" border="1" class="table_border box">
                        <colgroup>
                            <col width="65%">
                            <col width="20%">
                            <col width="15%">

                        </colgroup>

                        <thead>
                        <tr class="thFont" style="height: 40px;">
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
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

            <div class="col-lg-6 h_30" style="float: left;">
                <div class="lo col-xs-12 table-responsive">
                            <span>
                                    <i class="fa mark_img"></i>
                                    <span class="table_title">&nbsp; 중간검사현황</span>
                                </span>

                    <table style="width: 100%;" border="1" class="table_border box">
                        <colgroup>
                            <col width="22%">
                            <col width="15%">
                            <col width="15%">
                            <col width="15%">
                            <col width="15%">
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
            <%-- end col-lg-6 --%>
        </div>
    </div>
</div>
</div>

</body>
</html>