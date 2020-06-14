<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>(주)태창금속산업 | MES</title>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
<%--    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=1,maximum-scale=1.0,minimum-scale=1.0" />--%>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="description" CONTENT="SI,MES,MMS,SCM,TPM,WMS 개발 전문기업 (주)투비시스템">
    <meta name="keywords" CONTENT="SI,MES,MMS,SCM,TPM,WMS,투비시스템,(주)투비시스템,TOBESYSTEM,tobesystem,웹개발,CS개발,프로그램개발,인천개발,인천프로그램,인천웹개발,인천프로그램개발">
    <meta name="title" content="소프트웨어 개발 전문기업 (주)투비시스템">
    <meta name="Classification" CONTENT="(주)투비시스템">
    <meta name="robots" content="index,follow" />
    <meta property="og:type" content="website">
    <meta property="og:title" content="(주)투비시스템">
    <meta property="og:description" content="MES 시스템 구축 전문기업 (주)투비시스템">

    <meta name="description" content="Dynamic tables and grids using jqGrid plugin" />

<%--    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />--%>
    <link rel="shortcut icon" href="/ui-component/imagesNew/icon/slogo.png">
    <link rel="stylesheet" href="/ui-component/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/bootstrap-datepicker3.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/ui.jqgrid.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/fonts.googleapis.com.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="/assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
    <![endif]-->
    <link rel="stylesheet" href="/ui-component/assets/css/ace-skins.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/ace-rtl.min.css" />

    <!--[if lte IE 9]>
    <link rel="stylesheet" href="/assets/css/ace-ie.min.css" />


    <![endif]-->
    <script src="/ui-component/assets/js/ace-extra.min.js"></script>
    <!--[if lte IE 8]>
    <script src="/assets/js/html5shiv.min.js"></script>
    <script src="/assets/js/respond.min.js"></script>
    <![endif]-->
    <!--[if !IE]> -->
    <script src="/ui-component/assets/js/jquery-2.1.4.min.js"></script>
    <!-- <![endif]-->

    <!--[if IE]>
    <script src="/assets/js/jquery-1.11.3.min.js"></script>
    <![endif]-->
    <script type="text/javascript">
        if('ontouchstart' in document.documentElement) document.write("<script src='/ui-component/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
    </script>
    <script src="/ui-component/assets/js/jquery-ui.min.js"></script>
    <script src="/ui-component/assets/js/bootstrap.min.js"></script>
    <script src="/ui-component/assets/js/bootstrap-datepicker.min.js"></script>
    <script src="/ui-component/assets/js/bootstrap-datepicker.kr.js"></script>
    <!-- <script src="/assets/js/jquery.jqGrid.min.js"></script> -->
    <script src="/ui-component/assets/js/jquery.jqGrid.min.js"></script>
    <script src="/ui-component/assets/js/jszip.min.js"></script>
    <script src="/ui-component/jqGrid/js/i18n/grid.locale-kr.js"></script>
    <script src="/ui-component/assets/js/ace-elements.min.js"></script>
    <script src="/ui-component/assets/js/ace.min.js"></script>
    <script src="/ui-component/assets/js/jquery.form.min.js"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
    <script src="/ui-component/assets/js/select2-tab.js"></script>
    <%--    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css" rel="stylesheet" />--%>
<%--    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />--%>
<%--    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.full.js"></script>--%>
    <script src="/ui-component/assets/js/fastClick.js"></script>
    <script src="/data-component/common/es6-promise.auto.min.js"></script>
    <script src="/data-component/common/various.js"></script>
    <script src="/ui-component/assets/js/jquery.ui.touch.js"></script>
    <script src="/fullcalendar/core/main.js"></script>
    <script src="/fullcalendar/daygrid/main.js"></script>
    <link rel="stylesheet" href="fullcalendar/core/main.css"  />
    <link rel="stylesheet" href="fullcalendar/daygrid/main.css"  />
    <link rel="stylesheet" href="/ui-component/assets/css/import.css" />
</head>
