<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesManager/Master/sysSupp/sysSupp_modal1.js" charset="UTF-8"></script>
<style>
    .filebox label {
        display: inline-block;
        padding: .5em .75em;
        color: #fff;
        font-size: 6pt;
        line-height: normal;
        vertical-align: middle;
        background-color: #000000;
        cursor: pointer;
        border: 1px solid #000000;
        border-radius: .25em;
        -webkit-transition: background-color 0.2s;
        transition: background-color 0.2s;
    }

    .filebox label:hover {
        background-color: #000000;
    }

    .filebox label:active {
        background-color:#000000;
    }

    .filebox input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>
<div id="addDialog" title="업체코드추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none;">
        <div class="profile-info-row">
            <div class="profile-info-name">업체코드</div>
            <div class="profile-info-value">
                <input type="text" name="supp_code" class="form-control modal_value" autocomplete="off" autofocus/>
            </div>
            <div class="profile-info-name">업체명</div>
            <div class="profile-info-value">
                <input id="tags" type="text" name="supp_name" class="form-control modal_value"  autocomplete="off" />
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">대표자</div>
            <div class="profile-info-value">
                <input type="text" name="ceo" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">업체명(영문)</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name_en" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">사업자번호</div>
            <div class="profile-info-value">
                <input id="tags1" type="text" name="supp_no" class="form-control modal_value"  autocomplete="off"/>
            </div>
            <div class="profile-info-name">전화번호</div>
            <div class="profile-info-value">
                <input type="text" name="tel_no" class="form-control modal_value" onkeyup="num_keyup_hyphen(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업태</div>
            <div class="profile-info-value">
                <input type="text" name="buss_type" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">팩스번호</div>
            <div class="profile-info-value">
                <input type="text" name="fax_no" class="form-control modal_value" onkeyup="num_keyup_hyphen(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name" style="border-bottom: 1px solid #F7FBFF;">종목</div>
            <div class="profile-info-value" style="border-bottom: 1px dotted #DCEBF7;">
                <input type="text" name="category" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">결재방법</div>
            <div class="profile-info-value" style="border-bottom: 1px dotted #DCEBF7;">
                <input type="text" name="give_type" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none; border-top: none;">
        <div class="profile-info-row">
            <div class="profile-info-name" style="border-bottom: 1px solid #F7FBFF">주소</div>
            <div class="profile-info-value">
                <input type="text" name="address" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-bottom: none; border-top: none;">
        <div class="profile-info-row">
            <div class="profile-info-name">담당자</div>
            <div class="profile-info-value" style="border-top: 1px dotted #DCEBF7;">
                <input type="text" name="emp_name" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">담당자(전화)</div>
            <div class="profile-info-value" style="border-top: 1px dotted #DCEBF7;">
                <input type="text" name="emp_tel" class="form-control modal_value" onkeyup="num_keyup_hyphen(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">매입</div>
            <div class="profile-info-value">
                <select name="corp_type1" id="corp_type1" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div class="profile-info-name">매출</div>
            <div class="profile-info-value">
                <select name="corp_type2" id="corp_type2" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">입금은행</div>
            <div class="profile-info-value">
               <input type="text" name="bank" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">계좌번호</div>
            <div class="profile-info-value">
                <input type="text" name="bank_account" class="form-control modal_value" autocomplete="off"/>    
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">예금주</div>
            <div class="profile-info-value">
                <input type="text" name="bank_name" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value"></div>
            <%--            <div class="profile-info-name">사업자등록증</div>--%>
<%--            <div class="profile-info-value">--%>
<%--                <form id="suppForm">--%>
<%--                    <div class='filebox'>--%>
<%--                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold file_labal" for='file_01'>--%>
<%--                             <span><i class="fa fa-upload bigger-110 blue"></i>--%>
<%--                                <span>업로드</span>--%>
<%--                            </span>--%>
<%--                        </label>--%>
<%--                        <input type='file' id='file_01' name='file' onchange='file_change(this);' />--%>
<%--                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="file_del();">--%>
<%--                            <span><i class="fa fa-trash bigger-110 blue"></i>--%>
<%--                                <span id="image_del_btn">삭제</span>--%>
<%--                            </span>--%>
<%--                        </label>--%>
<%--                    </div>--%>

<%--                </form>--%>

<%--            </div>--%>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name" style="border-bottom: 1px solid #F7FBFF;">이메일</div>
            <div class="profile-info-value" style="border-bottom: 1px dotted #DCEBF7;">
                <input type="text" name="emp_email" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">사용유무</div>
            <div class="profile-info-value" style="border-bottom: 1px dotted #DCEBF7;">
                <select name="use_yn" id="use_yn" class="form-control modal_value" style="width:100%">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped" style="border-top:none;">
        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <input type="text" class="form-control" autocomplete="off"/>
            </div>
        </div>
    </div>
</div>
