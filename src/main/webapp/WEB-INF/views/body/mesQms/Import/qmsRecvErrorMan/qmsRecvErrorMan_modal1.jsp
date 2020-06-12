<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesQMS/Import/qmsRecvErrorMan/qmsRecvErrorMan_modal1.js" charset="UTF-8"></script>
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
<div id="addDialog" title="수입검사부적합등록" style="display:none">
    <div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
            <div class="profile-info-name">입고일자</div>
            <div class="profile-info-value">
                <input type="text" name="work_date" id="work_date" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">전표번호</div>
            <div class="profile-info-value">
                <input type="text" name="in_no" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">입고LOT</div>
            <div class="profile-info-value">
                <input type="text" name="lot" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">규격</div>
            <div class="profile-info-value">
                <input type="text" name="spec" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">단위</div>
            <div class="profile-info-value">
                <input type="text" name="unit_name" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사종류</div>
            <div class="profile-info-value">
                <input type="text" name="qc_level_name" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">입고수량</div>
            <div class="profile-info-value">
                <input type="text" name="qty" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">불량수량</div>
            <div class="profile-info-value">
                <input type="text" name="ng_qty" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">검사결과</div>
            <div class="profile-info-value">
                <input type="text" name="qc_result_name" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">불량유형</div>
            <div class="profile-info-value">
                <input type="text" name="ng_type_name" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">불량내용</div>
            <div class="profile-info-value">
                <input type="text" name="ng_name" class="form-control modal_value" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">조치구분</div>
            <div class="profile-info-value">
                <select name="act_type" id="act_type_modal" class="form-control modal_value" style="width:100%;">
                    <option value="0">선택안함</option>
                    <option value="1">조치중</option>
                    <option value="2">조치완료</option>
                </select>
            </div>
            <div class="profile-info-name">성적서</div>
            <div class="profile-info-value">
                <div class='filebox'>
                    <label class='file_labal' for='file_01'>업로드</label>
                    <input type='file' id='file_01' name='file1' onchange='file_change(this);' />
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">부적합보고서</div>
            <div class="profile-info-value">
                <div class='filebox'>
                    <label class='file_labal' for='file_02'>업로드</label>
                    <input type='file' id='file_02' name='file2' onchange='file_change(this);' />
                </div>
            </div>
            <div class="profile-info-name">개선조치</div>
            <div class="profile-info-value">
                <div class='filebox'>
                    <label class='file_labal' for='file_03'>업로드</label>
                    <input type='file' id='file_03' name='file3' onchange='file_change(this);' />
                </div>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">검사자</div>
            <div class="profile-info-value">
                <input type="text" name="user_name" class="form-control modal_value" readonly>
            </div>
            <div class="profile-info-name">검사일시</div>
            <div class="profile-info-value">
                <input type="text" name="update_date" class="form-control modal_value" readonly>
            </div>
        </div>
    </div>
</div>
