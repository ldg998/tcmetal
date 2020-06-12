<%@ page language="java" contentType="text/html; charset=UTF-8" %> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesManager/Auth/sysAuthProgram/sysAuthProgram.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<!-- body 해당 전체 컨테이너 div 영역 -->
<div class="main-content-inner">
    <!-- 전체 컨테이너 div 안 페이지 영역 -->
    <div class="page-content">
        <div class="col-lg-12 padding0">
            <div class="row">
                <!-- 여백 정렬용 -->
                <div class="col-md-4">
                </div>
                <!-- selectBox 업무분류 영역 -->
                <div class="col-md-8">
                    <table class="table wt-100">
                        <tbody>
                        <tr>
                            <td class="wt-px-100 t-align-c td-title padding-a-0">업무분류</td>
                            <td class="wt-px-200">
                                <select name="keyword2" class="form-control keyword condition_main" id="code_group" onchange="main_select_change(this);">
                                </select>
                            </td>
                            <td class="t-align-c wt-px-50">
                                <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                                   tabindex="0" aria-controls="dynamic-table" onclick="check_add_btn();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>저장</span>
                                </span>
                                </a>
                            </td>
                            <!-- 여백 정렬용 -->
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <div class="row">
                        <div class="col-md-4">
                            <!-- 좌측 그리드 -->
                            <table id="mes_grid"></table>
                        </div>

                        <div class="col-md-8">
                            <!-- 우측 그리드 -->
                            <table id="mes_grid2"></table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>



