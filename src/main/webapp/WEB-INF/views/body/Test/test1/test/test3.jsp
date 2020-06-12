<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-03-23
  Time: 오후 5:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="/ui-component/assets/js/jquery-2.1.4.min.js"></script>
    <script src="/data-component/common/html2canvas.js"></script>
    <style>
         .page_table {
            width: 793px !important;
            margin: auto !important;
            border: 1px solid #444444 !important;
            border-collapse: collapse !important;
        }
          th,  td {
            border: 1px solid #444444 !important;
            padding: 10px !important;
        }
        .theadTitle{
            border-bottom: 1px solid #ffffff !important;
            width:85% !important;
            letter-spacing: 10px !important;
            font-size: 21px !important;
            text-align: center !important;
        }
         .signAreaTitle{
            font-size: 12px !important;
             text-align: center !important;
        }
         .signArea{
            border-bottom: 1px solid #ffffff !important;
            height: 80px !important;
        }
        .menuTable > tbody > tr > .menu {
            letter-spacing: 3px !important;
            font-size: 13px !important;
            width: 10% !important;
            background-color: #efefef !important;
            text-align: center !important;
            font-weight: bold !important;
        }
        .contentArea{
            height: 120px !important;
        }
        .LastContentArea{
            height: 400px !important;
        }
        #all-content{
            width: 21cm !important;
            min-height: 29.7cm !important;
            padding: 2cm !important;
            margin: 1cm auto !important;
            border-radius: 5px !important;
            background: white !important;

            z-index: 100 !important;
        }
        .smallTable {
            width: 350px !important;
            float: right !important;
            border: none !important;

        }
         .smallTable > tbody > tr > .title {
            width: 100px !important;
            text-align: center !important;
            font-size: 12px !important;
            letter-spacing: 3px !important;

        }

         .smalltd {
            border: 1px solid #444444 !important;
            padding: 10px !important;
        }

        .footerSign > td{
            border: none !important;
            text-align: right !important;
            font-size: 12px !important;
        }
        #testDiv{
          position: relative;
            top: 260px;
            left: 500px;
            z-index: 800;
            font-size: 8px !important;
        }

    </style>
    <script>
        //$(function () {

        //
        //     html2canvas($("#all-content").get(0),{
        //         //allowTaint: true,
        //         //taintTest: false,
        //         //useCORS: true,
        //         //width:1500,
        //         //height:1400,
        //         scale:4,
        //         onclone: function (clonedDoc) {
        //             //$(clonedDoc).find("#res").find(".all-content").removeAttr("style");
        //         }
        //     }).then(function(canvas) {
        //         var myImage = canvas.toDataURL("image/png", 1);
        //         downloadURI(myImage,"test.png");
        //
        //     });
        // });
        //
        // function downloadURI(uri,name) {
        //     var link = document.createElement("a")
        //     link.download = name;
        //     link.href = uri;
        //     document.body.appendChild(link);
        //     link.click();
        // }
    </script>
</head>
<body>
<div id="all-content"  >
    <div id="testDiv">${keyword}</div>
    <table class="titleTable page_table">
        <thead>
        <tr>
            <th colspan="3" rowspan="2" class="theadTitle">작업의뢰서</th>
            <th rowspan="1" class="signAreaTitle">승인</th>
        </tr>
        <tr>
            <th class="signArea"></th>
        </tr>

        </thead>
    </table>
    <table class="menuTable page_table">
        <tbody>
        <tr>
            <td class="menu">현장명</td>
            <td></td>
            <td class="menu">제품명</td>
            <td></td>
        </tr>
        <tr>
            <td class="menu">발주처</td>
            <td></td>
            <td class="menu">수량</td>
            <td></td>
        </tr>
        <tr>
            <td class="menu">납기일</td>
            <td></td>
            <td class="menu">작성일</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea">
                <img src="/ui-component/imagesNew/test.jpg"/>
            </td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea">
                <img src="/ui-component/imagesNew/test.jpg"/>
            </td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea">
                <img src="/ui-component/imagesNew/test.jpg"/>
            </td>
        </tr>
        <tr>
            <td colspan="4" class="contentArea">
                <img src="/ui-component/imagesNew/test.jpg"/>
            </td>
        </tr>
        <tr>
            <td colspan="4" class="LastContentArea">
                <table class="smallTable">
                    <tr>
                        <td class="title smalltd">힌지</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="title smalltd">핸들</td>
                        <td class="smalltd"></td>
                    </tr>
                    <tr>
                        <td class="title smalltd">데드락</td>
                        <td class="smalltd"></td>
                    </tr>
                    <tr>
                        <td class="title smalltd">힌지</td>
                        <td class="smalltd"></td>
                    </tr>
                    <tr>
                        <td class="title smalltd">레드락</td>
                        <td class="smalltd"></td>
                    </tr>
                    <tr>
                        <td class="title smalltd">도장</td>
                        <td class="smalltd"></td>
                    </tr>
                    <tr class="footerSign">
                        <td class="title"></td>
                        <td>(주) 사운드 방음</td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>
</html>
