<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/sysSPartDrawing/sysSPartDrawing_modal1.js"
        charset="UTF-8"></script>

<style>
    textarea {
        resize: none;
    }

    .name_lee {
        background-color: #f2f2f2;
        border-top: 1px solid #F7FBFF;
        border-right: 1px solid #F7FBFF;
        color: #1d1d1d;
        text-align: center;
        padding: 5px;
        padding-top: 16px;
        font-weight: 400;
        width: 100%;
    }

    .back_col {
        background-color: #f2f2f2;
        border-top: 1px solid #F7FBFF;
        border-right: 1px solid #F7FBFF;
    }

    .a1 {
        grid-area: a1;
    }

    .a2 {
        grid-area: a2;
    }

    .a3 {
        grid-area: a3;
    }

    .a4 {
        grid-area: a4;
    }

    .inline_1 {
        display: inline-block !important;
        float: left !important;
    }

    .grid_lee {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1, 100% 70% 53% 80%);
        grid-auto-rows: minmax(auto, auto);
        grid-template-areas:"a1 a2 a3 a4";
    }
</style>

<div id="addDialog" title="제품관리(도면&사진)" style="display: none">
    <div class="profile-user-info profile-user-info-striped">


        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="hidden" name="supp_code" class="form-control modal_value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off">
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" autocomplete="off">
            </div>
        </div>


        <div class="grid_lee">
            <div class=" a1 name_lee">제품도면</div>
            <div class=" a2 profile-info-value">
                <div class="filebox_lee">
                    <label class='file_labal' for="file_02">업로드버튼</label>
                    <input type='file' id='file_02' name='file2' onchange='file_change(this);'/>
                    <input type='hidden'  name='file2' class="modal_value"/>

                </div>
            </div>

            <div class=" a3 name_lee">주조방안관리</div>
            <div class=" a4 profile-info-value">
                <div class="filebox_lee">
                    <label class='file_labal' for="file_04">업로드버튼</label>
                    <input type='file' id='file_04' name='file4' onchange='file_change2(this);'/>
                    <input type='hidden'  name='file4'  class="modal_value"/>

                </div>

            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">제품사진</div>
            <div class="profile-info-value">
                <div class="filebox_lee">
                    <label class='file_labal' for="file_01">업로드버튼</label>
                    <input type='file' id='file_01' name='file1' onchange='file_change3(this);'/>
                    <input type='hidden'  name='file1'  class="modal_value"/>

                </div>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">비고</div>
            <div class="profile-info-value">
                <textarea cols="42" wrap="off" rows="7" class="modal_value" name="remark2" autofocus>

                </textarea>
            </div>
        </div>


    </div>

</div>
