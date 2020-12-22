<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<style>
    .lo {
        /*background-color: #0b2e13;*/
        height: 90% !important;
        padding: 2px;!important;
        margin: 6px;!important;
        border: 1px #ffffff solid;
    }

    .lo2 {
        /*background-color: red;*/
        height: 100% !important;
        padding: 0;
    !important;
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

    .h_60 {
        height: 60% !important;
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

    .back_img {
        /*/ui-component/assets/images/main/main.jpg */
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url("/ui-component/assets/images/main/main.jpg");
        opacity: 1;
        background-size: 98%;
        position: relative;
        z-index: -1;


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
</style>

<!DOCTYPE html>
<tiles:insertAttribute name="header"/>
<script type="text/javascript" src="/data-component/common/index2.js" charset="UTF-8"></script>
<html>
<body class="no-skin ">
<tiles:insertAttribute name="mid"/>
<div class="main-container ace-save-state " id="main-container">
    <div class="main-content-inner col-lg-12 back_img">

        <div class="row h_46">
            <div class="col-lg-6">
                <div class="lo table-responsive">

                    <table id="mes_grid"></table>


                </div><%--end lo--%>
            </div> <%-- end col-lg-6 --%>


            <div class="col-lg-6">
                <div class="lo table-responsive">
                    <table id="mes_grid2"></table>

                </div><%--end lo--%>
            </div> <%-- end col-lg-6 --%>

        </div>

        <div class="row h_46">
            <div class="col-lg-6">
                <div class="lo table-responsive">
                    <table id="mes_grid3"></table>

                </div><%--end lo--%>
            </div> <%-- end col-lg-6 --%>

            <div class="col-lg-6">
                <div class="lo table-responsive">
                    <table id="mes_grid4"></table>

                </div><%--end lo--%>
            </div> <%-- end col-lg-6 --%>
        </div>

    </div>
</div>
</div>

</body>
</html>