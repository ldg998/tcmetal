<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %>
<!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmShipping/crmShipping_modal1.js" charset="UTF-8"></script>
<!-- 스크립트 파일 import -->

<style>
    .grid_lee {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1, 40% 60.3% 99.7%);
        grid-template-rows: repeat(5, 1fr);
        grid-template-areas:". a2 a3" ". a4 a5" "a1 a6 a7" ". a8 a9" ". a10 a11";
    }
    .grid_lee2 {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1, 100% 50% 50%);
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas:"b1 b2 b7"
        "b3 b4 b8"
        "b5 b6 b9";
    }
    .name_lee {
        color: #1d1d1d;
        background-color: #f2f2f2;
        border-top: 1px solid #F7FBFF;
        border-right: 1px solid #F7FBFF;
        text-align: center;
        padding: 5px;
        font-weight: 400;
        width: 100%;
        vertical-align: middle;
    }

    .a1 {grid-area: a1;}  .a2 {grid-area: a2;}  .a3 {grid-area: a3;}  .a4 {grid-area: a4;}  .a5 {grid-area: a5;}  .a6 {grid-area: a6;}  .a7 {grid-area: a7;}  .a8 {grid-area: a8;}  .a9 {grid-area: a9;}  .a10 {grid-area: a10;}  .a11 {grid-area: a11;}
    .a1 {
        grid-row: span 5;
    }
    .b1{grid-area: b1;}.b2{grid-area: b2;}.b3{grid-area: b3;}.b4{grid-area: b4;}.b5{grid-area: b5;}.b6{grid-area: b6;}

.inline_1{
    display: inline-block !important;
    float: left !important;
}
</style>

<div id="addDialog" title="운송비용 관리" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">출하번호</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" id="datepicker_modal" type="text" class="form-control keyword modal_value"
                           placeholder="별도창검색" readonly style="width: 100%" autocomplete="off">
                </div>
            </div>

            <div class="profile-info-name">출고일자</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동표시" readonly
                       style="width: 100%" autocomplete="off">
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동표시" readonly
                       style="width: 100%" autocomplete="off">
            </div>
            <div class="profile-info-name">납품(선적)일자</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="자동표시" readonly
                       style="width: 100%" autocomplete="off">
            </div>
        </div>
    </div>
    <br/>
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name " style="width: 50%">운송수단</div>
            <div class="profile-info-value " style="width: 50%">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value" placeholder="자동표시" readonly
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>
        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name ">해상운임</div>
            <div class="profile-info-value ">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>
        </div>

        <div class="grid_lee">
            <div class="name_lee a1"><br/><br/><br/><br/>항구비용</div>

            <div class="name_lee a2">터미널 핸들링비용</div>
            <div class="profile-info-value a3">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>

            <div class="name_lee a4">환경</div>
            <div class="profile-info-value a5">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>

            <div class="name_lee a6">쇼링비</div>
            <div class="profile-info-value a7">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>

            <div class="name_lee a8">부두이용료</div>
            <div class="profile-info-value a9">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>

            <div class="name_lee a10">서류발급비</div>
            <div class="profile-info-value a11">
                <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                       autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">하역료</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">보험료</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">항만시설보안료</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">국내운송비</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">관세대행수수료</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>



            <div class="grid_lee2">

                <div class="name_lee b1">목재비1</div>
                <div class="profile-info-value b2">
                    <select id="_select" class="form-control h-25 condition_main" name="keyword2" style="width: 100%">
                        <option value="">440</option>
                        <option value="0"></option>
                        <option value="1"></option>
                    </select>
                </div>
                <div class="profile-info-value b7 text-center" >
                    <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                           autocomplete="off">
                </div>

                <div class="name_lee b3">목재비2</div>
                <div class="profile-info-value b4">
                    <select id="_select2" class="form-control h-25 condition_main" name="keyword2" style="width: 100%">
                        <option value="">1090</option>
                        <option value="0"></option>
                        <option value="1"></option>
                    </select>
                </div>
                <div class="profile-info-value b8 text-center">
                    <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                           autocomplete="off">
                </div>



                <div class="name_lee b5">목재비3</div>
                <div class="profile-info-value b6">
                    <select  id="_select3" class="form-control h-25 condition_main" name="keyword2" style="width: 100%">
                        <option value="">파렛트</option>
                        <option value="0"></option>
                        <option value="1"></option>
                    </select>
                </div>
                <div class="profile-info-value b9 text-center">
                    <input name="" type="text" class="form-control keyword modal_value" style="width: 100%"
                           autocomplete="off">
                </div>

            </div>

        <div class="profile-info-row">
            <div class="profile-info-name">순중량</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value"
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단가</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input name="" type="text" class="form-control keyword modal_value" placeholder="자동계산" readonly
                           style="width: 100%" autocomplete="off">
                </div>
            </div>
        </div>


    </div>

</div>
</div>


<%@include file="/WEB-INF/views/body/common/modal/supp_modal.jsp" %>