<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/standard/sysSPart/sysSPart_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="제품품목정보관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">

                    <select class="form-control modal_value" name="supp_code" id="supp_modal_select" style="width: 100%"></select>

                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text"  name="part_kind" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text"  name="part_name" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text"  name="part_code" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text"  name="part_weight" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사이즈</div>
            <div class="profile-info-value">
                <input type="text"  name="part_size" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">포장무게</div>
            <div class="profile-info-value">
                <input type="text"  name="gross_weight" class="form-control modal_value"  autocomplete="off" >
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">화폐단위</div>
            <div class="profile-info-value">
                <select id='select_modal1' name="currency_code" class="form-control h-25 modal_value" style="width: 100%;">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">공정라우팅</div>
            <div class="profile-info-value">
                <select id='select_modal2' name="route_code" class="form-control h-25 modal_value" style="width: 100%;">
                <option value="1">내수</option>
                <option value="2">수출</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">외주(열처리)업체</div>
            <div class="profile-info-value">
                <select id='select_modal3' name="outs_supp_code" class="form-control h-25 modal_value" style="width: 100%;">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">운송수단</div>
            <div class="profile-info-value">
                <select id='select_modal4' name="trans_code" class="form-control h-25 modal_value" style="width: 100%;">
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사용유무</div>
            <div class="profile-info-value">
                <select id='select_modal5' name="use_yn" class="form-control h-25 modal_value" style="width: 100%;">
                    <option value="1">Y</option>
                    <option value="2">N</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">초도품 생산일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="startup_date" id="datepicker_modal1"
                           class="form-control h-25 modal_value" readonly>
                <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재1</div>
            <div class="profile-info-value">
                <select id='select_modal6' name="wood_code1" class="form-control h-25 modal_value" style="width: 100%;">
            </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재2</div>
            <div class="profile-info-value">
                <select id='select_modal7' name="wood_code2" class="form-control h-25 modal_value" style="width: 100%;">

                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">목재3</div>
            <div class="profile-info-value">
                <select id='select_modal8' name="wood_code3" class="form-control h-25 modal_value" style="width: 100%;">

                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">출장검사</div>
            <div class="profile-info-value">
                <select id='select_modal9' name="outs_qc" class="form-control h-25 modal_value" style="width: 100%;">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>


    </div>
</div>

