<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesSCM/Order/scmOrderImage/scmOrderImage_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="발주이미지추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <form id="scmOrderImage_Form">
            <div class="profile-info-row">
                <div class="profile-info-name">양식코드</div>
                <div class="profile-info-value">
                    <input type="text" name="img_code" class="form-control modal_value"  readonly placeholder="자동생성">
                </div>
            </div>

            <div class="profile-info-row">
                <div class="profile-info-name">양식명</div>

                <div class="profile-info-value">
                    <input type="text" name="img_name" class="form-control modal_value"  autofocus autocomplete="off">
                </div>
            </div>
            <div class="profile-info-row" style="text-align:center">
                <div class="profile-info-name">이미지</div>
                <div class="profile-info-value">
                        <div class="dt-buttons btn-overlap btn-group filebox" style="margin-bottom: 6px">
                        <a style="margin-right: 6px;">
                            <label for="xlsUploads" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                                <i class="fa fa-upload bigger-110 blue"></i>
                                첨부
                            </label>
                            <input type="file" id="xlsUploads" name="files" class="upload-hidden" onchange="readURL(this,this.value);">
                        </a>
                        <a>
                            <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove()">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>삭제</span>
                            </span>
                            </label>
                        </a>
                    </div>
                    <div class="img-wrap wt-100" id="img_div" style="height: 200px; border:1px solid #D5D5D5;">
                        <div class="img-text" id="img-text">미리보기가 표시됩니다.</div>
                        <img style="display:none; width: 100%; height: 100%;" id="img">
                    </div>
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name">비고</div>
                <div class="profile-info-value">
                    <textarea class="modal_value" name="remark" cols="100" rows="10" style="resize: none; width: 100%"></textarea>
                </div>
            </div>
        </form>
    </div>
</div>
