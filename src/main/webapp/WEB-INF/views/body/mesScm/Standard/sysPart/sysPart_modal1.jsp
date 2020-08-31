<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<script type="text/javascript" src="/data-component/mesSCM/Standard/sysPart/sysPart_modal1.js" charset="UTF-8"></script>
<!-- 스크립트 파일 import -->
<%-- 숨겨진 Dialog div (모달창) 설정 --%>
<div id="addDialog" title="품목정보 추가" style="display:none">
    <%-- 다이로그 틀 안에 외각틀 --%>
    <div class="profile-user-info profile-user-info-striped">
        <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">구분</div>
            <div class="profile-info-value">
                <select name="part_type" id="part_type_modal1" class="form-control modal_value"  style="width:100%">

                </select>
            </div>
        </div>
            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" id="part_code_modal" name="part_code" class="form-control modal_value" autofocus autocomplete="off" >
            </div>
        </div>

            <div class="profile-info-row">
                <div class="profile-info-name">품명</div>
                <div class="profile-info-value">
                    <input type="text" id="part_name" name="part_name" class="form-control modal_value" autocomplete="off" >
                </div>
            </div>


            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">규격</div>
            <div class="profile-info-value">
                <input type="text" id="spec" name="spec" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>

            <%-- 외각틀안에 제목과 내용 --%>
            <div class="profile-info-row">
                <div class="profile-info-name">단위</div>
                <div class="profile-info-value">
                    <select name="unit_code" id="unit_code_modal1" class="form-control modal_value"  style="width:100%">
                        <option value="">Kg</option>
                        <option value="0"></option>
                        <option value="1"></option>
                    </select>

                </div>
            </div>

            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <select class="form-control modal_value" name="supp_code" id="supp_modal_select" style="width: 100%">
                </select>
            </div>
        </div>
            <div class="profile-info-row">
                <div class="profile-info-name">업체2</div>
                <div class="profile-info-value">
                    <select class="form-control modal_value" name="supp_code2" id="supp_modal_select2" style="width: 100%">
                    </select>
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name">업체3</div>
                <div class="profile-info-value">
                    <select class="form-control modal_value" name="supp_code3" id="supp_modal_select3" style="width: 100%">
                    </select>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">업체4</div>
                <div class="profile-info-value">
                    <select class="form-control modal_value" name="supp_code4" id="supp_modal_select4" style="width: 100%">
                    </select>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">업체5</div>
                <div class="profile-info-value">
                    <select class="form-control modal_value" name="supp_code5" id="supp_modal_select5" style="width: 100%">
                    </select>
                </div>
            </div>
            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">위치</div>
            <div class="profile-info-value">
                <select id="loc_code_modal1" name="loc_code" class="form-control keyword modal_value"
                        style="width:100%">
                </select>
            </div>
        </div>

            <div class="profile-info-row">
                <div class="profile-info-name">품질레벨</div>
                <div class="profile-info-value">
                    <select id="qc_level" name="qc_level" class="form-control keyword modal_value"
                            style="width:100%">
                        <option value="0">무검사</option>
                        <option value="1">샘플검사</option>
                        <option value="2">전수검사</option>

                    </select>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">재고관리</div>
                <div class="profile-info-value">
                    <select id="stock_yn" name="stock_yn" class="form-control keyword modal_value"
                            style="width:100%">
                        <option value="Y">Y</option>
                        <option value="N">N</option>


                    </select>
                </div>
            </div>


    </div>
</div>

<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %> <%-- 업체선택을 위한 모달 --%>


