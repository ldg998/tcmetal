<%@ page language="java" contentType="text/html; charset=UTF-8"%> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<%@ page session="false" %> <!-- 응답 HTTP 헤더에 세션 쿠키가 존재함을 확인할 수 있습니다. -->
<script type="text/javascript" src="/data-component/mesCRM/orders/wmsInvoiceForm/wmsInvoiceForm_modal1.js" charset="UTF-8"></script> <!-- 스크립트 파일 import -->

<style>
    textarea {
        resize: none;
    }


    .filebox label {
        display: inline-block;
        padding: .5em .75em;
        color: #999;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: .25em;
    }

    .filebox input[type="file"] {  /* 파일 필드 숨기기 */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
    }



</style>

<div id="addDialog" title="수주등록" style="display:none">

    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value"  style="width: 100%" autocomplete="off">
            </div>

            <div class="profile-info-name">명칭</div>
            <div class="profile-info-value">
                <input name="" type="text" class="form-control keyword modal_value" placeholder="요코하마(수동입력)"  style="width: 100%" autocomplete="off">
            </div>
        </div>

        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-value"></div>
            <div class="profile-info-value"></div>

            <div class="profile-info-name">운송수단</div>
            <div class="profile-info-value">
               <select id="_select_modal1" style="width: 100%">
                   <option value="">벌크</option>
                   <option></option>
                   <option></option>

               </select>

            </div>
        </div>

            <br/>
        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Seller</div>
            <div class="profile-info-value">
                <textarea cols="36" rows="7">

                </textarea>
            </div>
            <div class="profile-info-name">Consignee</div>
            <div class="profile-info-value">
              <textarea cols="36" rows="7">

                </textarea>
            </div>
        </div>


        <%--4--%>
        <div class="profile-info-row">
            <div class="profile-info-name">Buyer NOTIFY</div>
            <div class="profile-info-value">
               <textarea cols="36" rows="7">

                </textarea>
            </div>

            <div class="profile-info-name">Vessel/VOY</div>
            <div class="profile-info-value">
                <textarea cols="36" rows="7">

                </textarea>
            </div>
        </div>

            <%--5--%>
            <div class="profile-info-row">
                <div class="profile-info-name">Terms of Delivery<br>and Payment </div>
                <div class="profile-info-value">
                   <textarea cols="36" rows="7">

                </textarea>
                </div>
                <div class="profile-info-name">Remark</div>
                <div class="profile-info-value">
                    <textarea cols="36" rows="7">

                </textarea>
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">Signed By </div>
                <div class="profile-info-value">
                    <div class="filebox">
                        <label for="ex_file">사진첨부</label>
                        <input type="file" id="ex_file">
                    </div>
                </div>
                <div class="profile-info-value"></div>
                <div class="profile-info-value"></div>
            </div>
    </div>
<br>
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name">SHIPPING MARK#1</div>
            <div class="profile-info-name">SHIPPING MARK#2</div>
            <div class="profile-info-name">SHIPPING MARK#3</div>
            <div class="profile-info-name">SHIPPING MARK#4</div>
            <div class="profile-info-name">SHIPPING MARK#5</div>

        </div>

            <div class="profile-info-row">
                <div class="profile-info-value">

                    <div class="col-lg-12" style=" padding-left: 0px;">
                        <div class="img-wrap" id="img_div1" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text1">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img1">
                        </div>
                    </div>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" >
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads1" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del1">삭제</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="profile-info-value">
                    <div class="col-lg-12" style=" padding-left: 0px;">
                        <div class="img-wrap" id="img_div2" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text2">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img2">
                        </div>
                    </div>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" >
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads2" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del2">삭제</span>
                            </span>
                        </label>
                    </div>

                </div>

                <div class="profile-info-value">

                    <div class="col-lg-12" style=" padding-left: 0px;">
                        <div class="img-wrap" id="img_div3" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text3">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img3">
                        </div>
                    </div>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" >
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads3" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del3">삭제</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="profile-info-value">

                    <div class="col-lg-12" style=" padding-left: 0px;">
                        <div class="img-wrap" id="img_div4" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text4">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img4">
                        </div>
                    </div>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" >
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads4" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del4">삭제</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="profile-info-value">

                    <div class="col-lg-12" style=" padding-left: 0px;">
                        <div class="img-wrap" id="img_div5" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text5">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img5">
                        </div>
                    </div>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" >
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads5" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold delm" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del5">삭제</span>
                            </span>
                        </label>
                    </div>
                </div>

            </div>
    </div>

</div>
