<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/standard/sysSPart/sysSPart_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="목재단가관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 condition_main"
                           id="supp_name_modal1" onclick="supp_btn('B');" readonly>
                    <input type="hidden" name="keyword" class="form-control h-25 condition_main"
                           id="supp_code_modal1">
                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사이즈</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">GROSS WEIGHT</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단가</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">화폐단위</div>
            <div class="profile-info-value">
                <select id='select_modal1' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value="0">원</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">공정라우팅</div>
            <div class="profile-info-value">
                <select id='select_modal2' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value="0">메인생산</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">외주(열처리)업체</div>
            <div class="profile-info-value">
                <input type="text"  name="" class="form-control modal_value"  autocomplete="off"  placeholder="별도창 검색" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">운송수단</div>
            <div class="profile-info-value">
                <select id='select_modal3' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value="0">페리</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사용유무</div>
            <div class="profile-info-value">
                <select id='select_modal4' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value="0">Y</option>
                    <option value="1">N</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">초도품 생산일</div>
            <div class="profile-info-value">
                    <input type="text" name="" id="datepicker_modal1"
                           class="form-control h-25 condition_main" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재1</div>
            <div class="profile-info-value">
                <select id='select_modal5' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                <option value=""></option>
            </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재2</div>
            <div class="profile-info-value">
                <select id='select_modal6' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value=""></option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재3</div>
            <div class="profile-info-value">
                <select id='select_modal7' name="" class="form-control h-25 condition_main" style="width: 100%;">--%>
                    <option value=""></option>
                </select>
            </div>
        </div>



    </div>
</div>


<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>