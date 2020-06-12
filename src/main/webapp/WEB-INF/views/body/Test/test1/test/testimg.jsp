<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-03-23
  Time: 오후 1:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<style>
    @media print {
        .page-divide {
            page-break-after: always;
        }
        .no-print-page {

            display: none; //작업의 편리함을 위해 넣은 페이지 구분선. 프린트 시에는 보이지 않음
        }
    }
    h1, h2, h3, h4, h5 {
        page-break-after: avoid;
    }
    table, figure, .sector {
        page-break-inside: avoid;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 1rem;
    }
    thead {

        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
    }
    tbody {
        display: table-row-group;

        vertical-align: middle;
        border-color: inherit;
    }
    .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border-top: 1px solid #eceeef;
    }
</style>
</head>
<body id="test">
<div class="no-print-page">
    ============================================================
</div>
<div class="sector">
    ${ok}
    <h1 id="title">제목</h1>
    <table class="table">
        <thead>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </tbody>
    </table>
</div>
<div class="page-divide"></div>
<div class="sector">
    <h1>제목</h1>
    <table class="table">
        <thead>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </tbody>
    </table>
</div>
<div class="page-divide"></div>
<div class="sector">
    <h1>제목</h1>
    <table class="table">
        <thead>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        <tr>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
            <td>내용</td>
        </tr>
        </tbody>
    </table>
</div>
<div class="no-print-page">
    ============================================================
</div>
</body>
</html>
