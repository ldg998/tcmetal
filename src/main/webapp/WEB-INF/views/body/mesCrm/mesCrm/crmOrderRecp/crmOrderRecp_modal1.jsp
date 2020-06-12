<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmOrderRecp/crmOrderRecp_modal1.js" charset="UTF-8"></script>

<div id="addDialog" title="수주정보추가" style="display:none">
    <div class="profile-user-info profile-user-info-striped border_no_bottom">
        <div class="profile-info-row">
            <div class="profile-info-name">수주일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="work_date" id="datepicker3"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
                <input type="hidden" autofocus>
            </div>
            <div class="profile-info-name">수주번호</div>
            <div class="profile-info-value">
                <input type="text" name="ord_no" class="form-control modal_value" placeholder="자동생성" readonly autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업체명</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="supp_name" class="form-control h-25 modal_value"
                           id="supp_name_modal" onclick="supp_btn('B');" readonly>
                    <input type="hidden" name="supp_code" class="form-control h-25 modal_value"
                           id="supp_code_modal">
                    <i class="ace-icon fa fa-search dark" style="top: -2px;" id="SuppSearch"></i>
                </div>
            </div>
            <div class="profile-info-name">현장명</div>
            <div class="profile-info-value">
                <input type="text" name="place_name" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">담당자</div>
            <div class="profile-info-value">
                <input type="text" id="supp_user_name" name="emp_name" class="form-control modal_value"  autocomplete="off"/>
            </div>
            <div class="profile-info-name">연락처</div>
            <div class="profile-info-value">
                <input type="text" id="supp_tel_no" name="emp_tel" class="form-control modal_value" onkeyup="num_keyup_hyphen(this)" autocomplete="off"/>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">수주내용</div>
            <div class="profile-info-value">
                <input type="text" name="ord_name" class="form-control modal_value" autocomplete="off"/>
            </div>
            <div class="profile-info-name">상태</div>
            <div class="profile-info-value">
                <select class="form-control modal_value" name="status" id="status_modal_select" style="width: 100%;">
                    <option value="0">진행중</option>
                    <option value="1">완료</option>
                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">납품예정일</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="target_date" id="datepicker4"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name">납품일자</div>
            <div class="profile-info-value">
                <div class="input-icon input-icon-right">
                    <input type="text" name="end_date" id="datepicker5"
                           class="form-control h-25 modal_value" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">수주금액</div>
            <div class="profile-info-value">
                <input type="text" name="order_amount" class="form-control modal_value" onkeyup="num_keyup_comma_crm(this)" autocomplete="off" style="text-align:right !important;" />
            </div>
            <div class="profile-info-name"></div>
            <div class="profile-info-value">
                <input type="hidden" name="balance" class="modal_value"/>
                <input type="hidden" name="amount1" class="modal_value"/>
                <input type="hidden" name="amount2" class="modal_value"/>
                <input type="hidden" name="amount3" class="modal_value"/>
                <input type="hidden" name="amount4" class="modal_value"/>
            </div>
        </div>
    </div>

    <div class="profile-user-info profile-user-info-striped border_no_top">
        <div class="profile-info-row ">
            <div class="profile-info-name border_top_modal">비고</div>
            <div class="profile-info-value border_top_dotted_modal">
                <input type="text" name="remark" class="form-control modal_value" autocomplete="off"/>
            </div>
        </div>
    </div>

    <form id="crmImageForm">
        <div class="profile-user-info profile-user-info-striped border_no_top">
            <div class="profile-info-row ">
                <div class="profile-info-name border_top_modal">이미지1</div>
                <div class="profile-info-value border_top_dotted_modal">
                    <label for="image_modal1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                        <i class="fa fa-upload bigger-110 blue"></i>
                        <span id="image_seach_btn1">찾기</span>
                    </label>
                    <input type="file" id="image_modal1" name="imageFile1" class="upload-hidden hidden" onchange="image_change(this.value,1);">
                    <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del(1);">
                        <span>
                            <i class="fa fa-trash bigger-110 blue"></i>
                            <span id="image_del_btn1">삭제</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <div class="profile-user-info profile-user-info-striped border_no_top">
            <div class="profile-info-row ">
                <div class="profile-info-name border_top_modal">이미지2</div>
                <div class="profile-info-value border_top_dotted_modal">
                    <label for="image_modal2" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                        <i class="fa fa-upload bigger-110 blue"></i>
                        <span id="image_seach_btn2">찾기</span>
                    </label>
                    <input type="file" id="image_modal2" name="imageFile2" class="upload-hidden hidden" onchange="image_change(this.value,2);">
                    <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del(2);">
                        <span>
                            <i class="fa fa-trash bigger-110 blue"></i>
                            <span id="image_del_btn2">삭제</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <div class="profile-user-info profile-user-info-striped border_no_top">
            <div class="profile-info-row ">
                <div class="profile-info-name border_top_modal">이미지3</div>
                <div class="profile-info-value border_top_dotted_modal">
                    <label for="image_modal3" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                        <i class="fa fa-upload bigger-110 blue"></i>
                        <span id="image_seach_btn3">찾기</span>
                    </label>
                    <input type="file" id="image_modal3" name="imageFile3" class="upload-hidden hidden" onchange="image_change(this.value,3);">
                    <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del(3);">
                        <span>
                            <i class="fa fa-trash bigger-110 blue"></i>
                            <span id="image_del_btn3">삭제</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <div class="profile-user-info profile-user-info-striped border_no_top">
            <div class="profile-info-row ">
                <div class="profile-info-name border_top_modal">이미지4</div>
                <div class="profile-info-value border_top_dotted_modal">
                    <label for="image_modal4" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                        <i class="fa fa-upload bigger-110 blue"></i>
                        <span id="image_seach_btn4">찾기</span>
                    </label>
                    <input type="file" id="image_modal4" name="imageFile4" class="upload-hidden hidden" onchange="image_change(this.value,4);">
                    <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del(4);">
                        <span>
                            <i class="fa fa-trash bigger-110 blue"></i>
                            <span id="image_del_btn4">삭제</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <div class="profile-user-info profile-user-info-striped border_no_top">
            <div class="profile-info-row ">
                <div class="profile-info-name border_top_modal">이미지5</div>
                <div class="profile-info-value border_top_dotted_modal">
                    <label for="image_modal5" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                        <i class="fa fa-upload bigger-110 blue"></i>
                        <span id="image_seach_btn5">찾기</span>
                    </label>
                    <input type="file" id="image_modal5" name="imageFile5" class="upload-hidden hidden" onchange="image_change(this.value,5);">
                    <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del(5);">
                        <span>
                            <i class="fa fa-trash bigger-110 blue"></i>
                            <span id="image_del_btn5">삭제</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    </form>
</div>




