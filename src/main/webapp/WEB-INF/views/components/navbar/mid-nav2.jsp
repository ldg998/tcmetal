<%@ page import="org.springframework.util.ObjectUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<style>

    .test span {
        background: linear-gradient(to bottom, #f1f1f1, #8ca6ce);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .index2_title{
        color: white;
        font-size: 30px;
        font-weight:bolder ;
        word-spacing: 30px;
        text-align: center;

        top: 30%;
    }

    .index2_today{
        color: white;
        font-size: 18px;
        font-weight: inherit ;
        word-spacing: 10px;
        text-align: right;
        top: 70%;



    }

    .title_text{

    position: relative;
    }
    .navbar{
        background-image: url("ui-component/assets/images/nav.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        max-width: 100%;
        height: auto;
    }

    .log_img {
        /*/ui-component/assets/images/main/main.jpg */
    /*linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),*/
        background-image: url("/ui-component/assets/images/tclogo3.png");
        /*float: left;*/
        background-repeat: no-repeat;
        background-position: left;
        background-size: 29%;
        max-width: 100%;
        height: auto;
        display: block;


    }
</style>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <div id="navbar" class="navbar navbar-default ace-save-state h_8">
        <div class="navbar-container ace-save-state" id="navbar-container">
            <div class="col-lg-12" >
                <div class="row title_text h_100">

                    <div class="log_img col-lg-4 h_100"></div>
<%--                    <img src="/ui-component/assets/images/tclogo3.png" id="main_logo_img" width="160px">--%>
                    <div class="test col-lg-4 h_100 index2_title" ><span>종   합   현   황   판</span>  </div>
<%--                종   합   현   황   판--%>
                    <div class="col-lg-4 h_100 day_dong index2_today"> 시간 </div>
<%--                    <div class="form-group"></div>--%>

                </div>
            </div>
        </div>
    </div>


