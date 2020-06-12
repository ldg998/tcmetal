<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/Standard/popReportSpec/popReportSpec_modal1.js" charset="UTF-8"></script>


<div id="addDialog" title="작업의뢰서 설정" style="display:none">

    <div class="profile-user-info profile-user-info-striped border_no_bottom">
        <div class="profile-info-row">
            <div class="profile-info-name w-105">제품구분</div>
            <div class="profile-info-value w-139">
                <input type="text" name="prod_type_name" class="form-control modal_value"  readonly autocomplete="off"/>
                <input type="hidden" class="form-control modal_value" name="prod_type">
                <input type="hidden" autofocus>
            </div>
            <div class="profile-info-name w-105">제품명</div>
            <div class="profile-info-value w-139">
                <input type="text" name="prod_name" class="form-control modal_value" readonly autocomplete="off"/>
                <input type="hidden" class="form-control modal_value" name="prod_code">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name w-105">원자재</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code" id="part_name_code_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name w-105">공정라우팅</div>
            <div class="profile-info-value w-139">
                <select name="route_code" id="route_select_modal" class="form-control modal_value"  style="width: 100%;">

                </select>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped border_no_top border_no_bottom">
        <div class="profile-info-row ">
            <div class="profile-info-name border_top_modal w-105">문짝이미지</div>
            <div class="profile-info-value border_top_dotted_modal w-398" style="width: 392px !important;">
                <div class="dt-buttons btn-overlap btn-group filebox">
                    <form id="formRS_id">

                        <label for="image_modal" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                            <i class="fa fa-upload bigger-110 blue"></i>
                            <span id="image_seach_btn">찾기</span>
                        </label>
                        <input type="file" id="image_modal" name="imageFile" class="upload-hidden" onchange="image_change(this.value);">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del();">
                                    <span>
                                        <i class="fa fa-trash bigger-110 blue"></i>
                                        <span id="image_del_btn">삭제</span>
                                    </span>
                        </label>
                    </form>
                </div>
            </div>

        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped border_no_top border_no_bottom">
        <div class="profile-info-row ">
            <div class="profile-info-name border_top_modal w-105">비고</div>
            <div class="profile-info-value border_top_dotted_modal w-398">
                <textarea id="bcr_contents" class="modal_value" name="remark" cols="30" rows="10" style="resize:none; width: 100%;" autocomplete="off"></textarea>
            </div>
        </div>
    </div>
    <div class="profile-user-info profile-user-info-striped border_no_top">
        <div class="profile-info-row">
            <div class="profile-info-name border_top_modal w-105">자재목록1</div>
            <div class="profile-info-value border_top_dotted_modal w-139">
                <select name="part_name_code1" id="part_name_code1_select_modal" class="form-control modal_value"  style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name border_top_modal w-105">자재목록6</div>
            <div class="profile-info-value border_top_dotted_modal w-139">
                <select name="part_name_code6" id="part_name_code6_select_modal" class="form-control modal_value"  style="width: 100%;">

                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name w-105">자재목록2</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code2" id="part_name_code2_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name w-105">자재목록7</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code7" id="part_name_code7_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name w-105">자재목록3</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code3" id="part_name_code3_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name w-105">자재목록8</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code8" id="part_name_code8_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name w-105">자재목록4</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code4" id="part_name_code4_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name w-105">자재목록9</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code9" id="part_name_code9_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name w-105">자재목록5</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code5" id="part_name_code5_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
            <div class="profile-info-name w-105">자재목록10</div>
            <div class="profile-info-value w-139">
                <select name="part_name_code10" id="part_name_code10_select_modal" class="form-control modal_value" style="width: 100%;">

                </select>
            </div>
        </div>
    </div>

</div>




