<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="태창금속산업(주) MES" />
    <title>태창금속산업(주) | LOGIN</title>
    <link rel="shortcut icon" href="/ui-component/imagesNew/icon/slogo.png">

    <link rel="stylesheet" href="/ui-component/assets/neon/js/jquery-ui/css/no-theme/jquery-ui-1.10.3.custom.min.css">
    <link rel="stylesheet" href="/ui-component/assets/neon/font-icons/entypo/css/entypo.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic">
    <link rel="stylesheet" href="/ui-component/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ui-component/assets/neon/css/bootstrap.css">
    <link rel="stylesheet" href="/ui-component/assets/neon/css/neon-core.css">
    <link rel="stylesheet" href="/ui-component/assets/neon/css/neon-theme.css">
    <link rel="stylesheet" href="/ui-component/assets/neon/css/neon-forms.css">
    <link rel="stylesheet" href="/ui-component/assets/neon/css/custom.css">


    <script src="/ui-component/assets/js/jquery-1.11.3.min.js"></script>
    <script src="/ui-component/assets/js/jquery-ui.min.js"></script>
    <script src="/ui-component/assets/js/bootstrap.min.js"></script>
    <script src="/ui-component/assets/neon/js/gsap/TweenMax.min.js"></script>
    <script src="/ui-component/assets/neon/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js"></script>
    <script src="/ui-component/assets/neon/js/bootstrap.js"></script>
    <script src="/ui-component/assets/neon/js/joinable.js"></script>
    <script src="/ui-component/assets/neon/js/resizeable.js"></script>
    <script src="/ui-component/assets/neon/js/neon-api.js"></script>
    <script src="/ui-component/assets/neon/js/jquery.validate.min.js"></script>
    <script src="/ui-component/assets/neon/js/neon-login.js"></script>
    <script src="/ui-component/assets/neon/js/neon-custom.js"></script>
    <script src="/ui-component/assets/neon/js/neon-demo.js"></script>

    <!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<script>
    $(document).ready(function(){
        $('#user_code').focus();
    });
</script>
<body class="page-body login-page login-form-fall">
<div class="login-container">
    <div class="login-header login-caret">
        <div class="login-content">
            <a href="index.html" class="logo">
                <img src="/ui-component/assets/images/tclogo3.png" style="width: 30rem;" alt="" />
            </a>
<%--            <p class="description"> 태창금속산업(주) MES</p>--%>
            <div class="login-progressbar-indicator">
                <h3>43%</h3>
                <span>데이터 요청중입니다..</span>
            </div>
        </div>
    </div>
    <div class="login-progressbar">
        <div></div>
    </div>
    <div class="login-form">
        <div class="login-content">
            <div class="form-login-error">
                <h3>로그인 실패.</h3>
                <p><strong>아이디</strong>나<strong>비밀번호</strong>를 확인하세요.</p>
            </div>
            <form method="post" role="form" id="form_login">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="entypo-user"></i>
                        </div>
                        <input type="text" class="form-control" name="user_code" id="user_code" placeholder="아이디" autocomplete="off" />
                    </div>
                </div>
                <div class="form-group">

                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="entypo-key"></i>
                        </div>

                        <input type="password" class="form-control" name="user_pwd" id="user_pwd" placeholder="비밀번호" autocomplete="off" />
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block btn-login">
                        <i class="entypo-login"></i>
                        로그인
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>

