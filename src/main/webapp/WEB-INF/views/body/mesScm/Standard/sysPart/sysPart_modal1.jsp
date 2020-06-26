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
                <input type="text" id="modal_part_type" name="modal_part_type" class="form-control modal_value" autocomplete="off" >
            </div>
        </div>
            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" id="part_code" name="part_code" class="form-control modal_value" autocomplete="off" >
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
                    <input type="text" id="unit_code" name="unit_code" class="form-control modal_value" autocomplete="off" >
                </div>
            </div>

            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 modal_value"
                           id="supp_name_modal" onclick="supp_btn();" readonly>
                    <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" id="supp_code_modal" name="supp_code" class="form-control modal_value" readonly>
            </div>
        </div>
            <div class="profile-info-row">
                <div class="profile-info-name">업체2</div>
                <div class="profile-info-value">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="supp_name" class="form-control h-25 modal_value"
                                onclick="supp_btn();" readonly>
                        <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                    </div>
                    <input type="hidden"  name="supp_code" class="form-control modal_value" readonly>
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name">업체3</div>
                <div class="profile-info-value">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="supp_name" class="form-control h-25 modal_value"
                                onclick="supp_btn();" readonly>
                        <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                    </div>
                    <input type="hidden"  name="supp_code" class="form-control modal_value" readonly>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">업체4</div>
                <div class="profile-info-value">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="supp_name" class="form-control h-25 modal_value"
                               onclick="supp_btn();" readonly>
                        <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                    </div>
                    <input type="hidden"  name="supp_code" class="form-control modal_value" readonly>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">업체5</div>
                <div class="profile-info-value">
                    <div class="input-icon input-icon-right">
                        <input type="text" name="supp_name" class="form-control h-25 modal_value"
                               onclick="supp_btn();" readonly>
                        <i class="ace-icon fa fa-search dark" style="top: -2px;"></i>
                    </div>
                    <input type="hidden"  name="supp_code" class="form-control modal_value" readonly>
                </div>
            </div>
            <%-- 외각틀안에 제목과 내용 --%>
        <div class="profile-info-row">
            <div class="profile-info-name">위치</div>
            <div class="profile-info-value">
                <select id="modal_loc_code_select" name="loc_code" class="form-control keyword modal_value"
                        style="width:100%">
                </select>
            </div>
        </div>


    </div>
</div>

<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %> <%-- 업체선택을 위한 모달 --%>


