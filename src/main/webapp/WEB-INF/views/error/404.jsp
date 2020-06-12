<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>사운드방음문 | MES</title>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,maximum-scale=1.0,minimum-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="description" CONTENT="SI,MES,MMS,SCM,TPM,WMS 개발 전문기업 (주)투비시스템">
    <meta name="keywords" CONTENT="SI,MES,MMS,SCM,TPM,WMS,투비시스템,(주)투비시스템,TOBESYSTEM,tobesystem,웹개발,CS개발,프로그램개발,인천개발,인천프로그램,인천웹개발,인천프로그램개발">
    <meta name="title" content="소프트웨어 개발 전문기업 (주)투비시스템">
    <meta name="Classification" CONTENT="(주)투비시스템">
    <meta name="robots" content="index,follow" />
    <meta property="og:type" content="website">
    <meta property="og:title" content="(주)투비시스템">
    <meta property="og:description" content="MES 시스템 구축 전문기업 (주)투비시스템">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="shortcut icon" href="/ui-component/imagesNew/icon/icon.ico">
    <link rel="stylesheet" href="/ui-component/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/bootstrap-datepicker3.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/ui.jqgrid.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/fonts.googleapis.com.css" />
    <link rel="stylesheet" href="/ui-component/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/ui-component/assets/css/import.css" />
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

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
    <script src="/data-component/common/es6-promise.auto.min.js"></script>
    <script src="/data-component/common/various.js"></script>

</head>
<body class="no-skin">
<div class="error-container">
    <div class="well center">
        <h1 class="grey lighter smaller">
            <span class="blue bigger-125">
                <i class="ace-icon fa fa-sitemap"></i>
                404 ERROR
            </span>
        </h1>

        <hr>
        <h3 class="smaller">해당 페이지를 찾을 수 없습니다.</h3>
        <div>
            <div class="space"></div>
            <h4 class="smaller">자세한 사항은 (주)투비시스템으로 문의 부탁드립니다.</h4>

            <ul class="list-unstyled spaced inline bigger-110 margin-15">
                <li style="text-align: left;">
                    <i class="ace-icon fa fa-hand-o-right blue"></i>
                    <a href="#">
                        헬프데스크 바로 가기
                    </a>
                </li>
                <li style="text-align: left;">
                    <i class="ace-icon fa fa-hand-o-right blue"></i>
                    이메일 : help@tobesystem.co.kr
                </li>
                <li style="text-align: left;">
                    <i class="ace-icon fa fa-hand-o-right blue"></i>
                    직통전화 : 032-546-9813
                </li>
            </ul>
        </div>

        <hr>
        <div class="space"></div>

        <div class="center">
            <a href="javascript:history.back()" class="btn btn-primary">
                <i class="ace-icon fa fa-arrow-left"></i>
                뒤로
            </a>

            <a href="./" class="btn btn-primary">
                <i class="ace-icon fa fa-home"></i>
                홈
            </a>
        </div>
    </div>
</div>
</body>
</html>
