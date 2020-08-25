<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesQMS/Shipment/qmsProdErrorReq/qmsProdErrorReq_modal1.js"
        charset="UTF-8"></script>
<style>


    .name_lee {
        color: #1d1d1d;
        background-color: #f2f2f2;
        border-top: 1px solid #F7FBFF;
        border-right: 1px solid #F7FBFF;
        text-align: center;
        padding: 5px;
        font-weight: 400;
        width: 100%;
    }

    .a1 {grid-area: a1;}
    .a2 {grid-area: a2;}
    .a3 {grid-area: a3;}
    .a4 {grid-area: a4;}
    .inline_1{
        display: inline-block !important;
        float: left !important;
    }
    .grid_lee {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1, 244%);
        grid-auto-rows: minmax(auto, auto);
        grid-template-areas:"a1";
    }
</style>

<div id="addDialog" title="부적합관리" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        <%--1--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">접수일자</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="work_date" id="datepicker_modal1" class="form-control h-25 modal_value sendDate" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
            <div class="profile-info-name" style="width:15%">제품LOT</div>
            <div class="profile-info-value" style="width:35%"><input type="text" name="lot_no"
                                                                     class="form-control h-25 modal_value" autofocus></div>
        </div>
        <%--2--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">업체</div>
            <div class="profile-info-value" style="width:35%">
                <select name="supp_code" id="modal_select1" type="text" class="form-control keyword modal_value" onchange="select_change_modal1(this.value);" style="width: 100%;">
                </select>
            </div>
            <div class="profile-info-name" style="width:15%">기종</div>

            <div class="profile-info-value" style="width:35%">
                <select name="part_kind" id="modal_select2" type="text" class="form-control keyword modal_value" onchange="select_change_modal2(this.value);" style="width: 100%;">
                </select>
            </div>
        </div>


        <%--3--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">품명</div>
            <div class="profile-info-value" style="width:35%">
                <select name="part_name" id="modal_select3" type="text" class="form-control keyword modal_value" onchange="select_change_modal3(this.value);" style="width: 100%;">
                </select>

            </div>

            <div class="profile-info-name" style="width:15%">품번</div>
            <div class="profile-info-value" style="width:35%">
                <input name="part_code" id="part_code" type="text" class="form-control keyword modal_value" placeholder="자동생성" readonly style="width: 100%" autocomplete="off">
            </div>
        </div>
        <%--4--%>

            <div class="profile-info-row">
                <div class="profile-info-name">부적합분류</div>
                <div class="grid_lee">
                    <div class="profile-info-value a1">
                      <select name="ng_type" id="modal_select4" type="text" class="form-control modal_value"style="width:100%;"> </select>
                    </div>
                </div>
              </div>

        <%--5--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">대책서송부</div>
            <div class="profile-info-value" style="width:35%">
                <select id="select_modal1" name="report_type" style="width: 100%;" class="modal_value">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>

            </div>
            <div class="profile-info-name" style="width:20%">대책서 송부일</div>
            <div class="profile-info-value" style="width:30%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="report_date" id="datepicker_modal2" class="form-control h-25 modal_value sendDate" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <%--6--%>
            <div class="profile-info-row">

                      <div class="profile-info-name">대책방안</div>
                <div class="grid_lee">
                            <div class="profile-info-value a1" style="width:100%">
                                <input type="text" name="measuer_name" class="form-control modal_value">
                            </div>
                </div>
            </div>

        <%--7--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">처리구분</div>
            <div class="profile-info-value" style="width:35%">

                <select id="select_modal2" name="act_type" style="width: 100%;" class="modal_value">
                    <option value="0">빈값</option>
                    <option value="1">조치중</option>
                    <option value="2">조치완료</option>
                </select>

            </div>
            <div class="profile-info-name" style="width:15%">처리일자</div>
            <div class="profile-info-value" style="width:35%">
                <div class="input-icon input-icon-right">
                    <input type="text" name="act_date" id="datepicker_modal3" class="form-control h-25 modal_value sendDate" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
            </div>
        </div>
        <%--8--%>
        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">부적합연락서</div>
            <div class="profile-info-value" style="width:35%">
                <div class="filebox_lee">
                    <label for="file_01" class="file_labal">업로드</label>
                    <input type="file"  id="file_01" onchange='file_change(this);'>
                    <input name="file_key"  type="hidden" class="modal_value">
                </div>

            </div>
            <div class="profile-info-name" style="width:15%">대책서</div>
            <div class="profile-info-value" style="width:35%">
                <div class="filebox_lee">
                    <label for="file_02" class="file_labal">업로드</label>
                    <input type="file"  id="file_02" onchange='file_change(this);'>
                    <input name="file_key2"  type="hidden" class="modal_value">
                </div>
            </div>
        </div>
        <%--9--%>

        <div class="profile-info-row">
            <div class="profile-info-name" style="width:15%">부적합부서</div>
            <div class="profile-info-value" style="width:35%">
                <select name="ret_dept_code" class="form-control modal_value"  onchange="select_change_modal4(this.value);" id="dept_select2" style="width: 100%;">
                    <option value="">선택안함</option>
                </select>

            </div>
            <div class="profile-info-name" style="width:15%">담당자</div>
            <div class="profile-info-value" style="width:35%">
            <select id="select_modal5" style="width: 100%;" name="ret_user_code" class="modal_value">
                <option value="">선택없음</option>
            </select>
            </div>
        </div>
    </div>
</div>
