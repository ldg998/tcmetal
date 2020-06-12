<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="/data-component/mesPOP/Pop/popPlan/popPlan_modal1.js" charset="UTF-8"></script>
<style>
    ul.tabs {
        margin: 0;
        padding: 0;
        float: left;
        list-style: none;
        height: 32px;
        border-bottom: 1px solid #eee;
        border-left: 1px solid #eee;
        width: 100%;
        font-family: "dotum";
        font-size: 12px;
    }

    ul.tabs li {
        float: left;
        text-align: center;
        cursor: pointer;
        width: 82px;
        height: 31px;
        line-height: 31px;
        border: 1px solid #eee;
        border-left: none;
        font-weight: bold;
        background: #fafafa;
        overflow: hidden;
        position: relative;
    }

    ul.tabs li.active {
        background: #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
    }

    .tab_container {
        border: 1px solid #eee;
        border-top: none;
        clear: both;
        float: left;
        background: #FFFFFF;
    }

    .tab_content {
        padding: 5px;
        font-size: 12px;
        display: none;
    }

    .tab_container .tab_content ul {
        width: 100%;
        margin: 0px;
        padding: 0px;
    }

    .tab_container .tab_content ul li {
        padding: 5px;
        list-style: none
    }

    #container {

        margin: 0 auto;
    }
    .ui-resizable{
        width: auto !important;
        height: auto !important;
    }


    input[type=text][name="width"] {
        height: 18px !important;
    }
    input[type=text][name="height"] {
        height: 18px !important;
    }
    input[type=text][name="length"] {
        height: 18px !important;
    }
    input[type=text][name="cycle_qty"] {
        height: 18px !important;
    }
    input[type=text][name="door_sill_spec1"] {
        height: 18px !important;
    }
    input[type=text][name="door_sill_spec2"] {
        height: 18px !important;
    }
    input[type=text][name="door_sill_size"] {
        height: 18px !important;
    }
    input[type=text][name="gap"] {
        height: 18px !important;
    }
    select[name="door_sill"]{
        height: 18px !important;
        width: 100% !important;
    }

</style>

<div id="addDialog" title="생산계획관리" style="display:none; ">
    <div id="container">
        <ul class="tabs">
            <li class="active" rel="tab1">기본정보</li>
            <li rel="tab2">길이</li>
            <li rel="tab3">자재목록</li>
        </ul>
        <div class="tab_container">
            <div id="tab1" class="tab_content">
                <ul>
                    <div class="profile-user-info profile-user-info-striped border_no_bottom">

                        <div class="profile-info-row">
                            <div class="profile-info-name w-105">현장명</div>
                            <div class="profile-info-value w-139">
                                <input type="text" name="place_name" class="form-control modal_value" placeholder="자동표시"
                                       readonly autocomplete="off"/>
                                <input type="hidden" name="ord_no" class="form-control modal_value">
                                <input type="hidden" name="plan_no" class="form-control modal_value">
                                <input type="hidden" autofocus>
                            </div>
                            <div class="profile-info-name w-105">제품구분</div>
                            <div class="profile-info-value  w-139">
                                <select id="prod_type_modal1_select" name="prod_type" class="form-control modal_value" onchange="select_modal_change1(this.value);" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row">
                            <div class="profile-info-name w-105">자재</div>
                            <div class="profile-info-value  w-139">
                                <select id="part_name_code_modal1_select" name="part_name_code" class="form-control modal_value" style="width: 100%;">
                                </select>
                            </div>
                            <div class="profile-info-name w-105">제품명</div>
                            <div class="profile-info-value  w-139">
                                <select id="prod_code_modal1_select" name="prod_code" class="form-control modal_value" onchange="select_modal_change2(this.value);" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row">
                            <div class="profile-info-name w-105">공정라우팅</div>
                            <div class="profile-info-value  w-139">
                                <select id="route_code_modal1_select" name="route_code" class="form-control modal_value" style="width: 100%;">
                                </select>
                            </div>
                            <div class="profile-info-name w-105">계획일자</div>
                            <div class="profile-info-value w-139">
                                <div class="input-icon input-icon-right">
                                    <input type="text" name="plan_date" id="datepicker3"
                                           class="form-control h-25 modal_value" readonly>
                                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                                </div>
                            </div>

                        </div>
                        <div class="profile-info-row ">

                            <div class="profile-info-name border_top_modal w-105">계획명</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text"  name="plan_name" class="form-control modal_value"
                                       autocomplete="off" />
                            </div>
                            <div class="profile-info-name border_top_modal w-105">유형</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <select id="prod_type1_modal1_select" name="prod_type1" class="form-control modal_value" style="width: 100%;">
                                    <option value="1">K-1400</option>
                                    <option value="2">195힌지</option>
                                </select>
                            </div>
                        </div>
                    </div>
<%--                    <div class="profile-user-info profile-user-info-striped border_no_top border_no_bottom">--%>
<%--                        <div class="profile-info-row ">--%>

<%--                            <div class="profile-info-name border_top_modal w-105">내용</div>--%>
<%--                            <div class="profile-info-value border_top_dotted_modal  w-398">--%>
<%--                                <input type="text"  name="plan_name" class="form-control modal_value"--%>
<%--                                       autocomplete="off" />--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <div class="profile-user-info profile-user-info-striped border_no_top border_no_bottom">--%>
<%--                        <div class="profile-info-row ">--%>

<%--                            <div class="profile-info-name  border_top_modal w-105">참고이미지</div>--%>
<%--                            <div class="profile-info-value border_top_dotted_modal  w-398">--%>
<%--                                <div class="dt-buttons btn-overlap btn-group filebox">--%>
<%--                                    <form id="formRS_id">--%>

<%--                                        <label for="image_modal" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">--%>
<%--                                            <i class="fa fa-upload bigger-110 blue"></i>--%>
<%--                                            <span id="image_seach_btn">찾기</span>--%>
<%--                                        </label>--%>
<%--                                        <input type="file" id="image_modal" name="imageFile" class="upload-hidden" onchange="image_change(this.value);">--%>
<%--                                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="image_del();">--%>
<%--                                            <i class="fa fa-trash bigger-110 blue"></i>--%>
<%--                                            <span>--%>
<%--                                                <span id="image_del_btn">삭제</span>--%>
<%--                                            </span>--%>
<%--                                        </label>--%>
<%--                                    </form>--%>
<%--                                </div>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                    </div>--%>
                    <div class="profile-user-info profile-user-info-striped border_no_top">
                        <div class="profile-info-row ">
                            <div class="profile-info-name border_top_modal w-105">비고</div>
                            <div class="profile-info-value border_top_dotted_modal  w-398">
                                <textarea id="bcr_contents" class="modal_value" name="remark" cols="30" rows="10" style="resize:none; width: 100%;" autocomplete="off"></textarea>
                            </div>
                        </div>
                    </div>


                </ul>
            </div>
            <div id="tab2" class="tab_content" style="width: 800px;">
                <ul>
                    <div class="col-xs-12">
                        <div class="clearfix">
                            <div class="pull-left tableTools-container">
                                <div class="dt-buttons btn-overlap btn-group">

                                    <a id="add_btn" class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" id="showDialog" onclick="modal1_rowAdd();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>줄추가</span>
                                </span>
                                    </a>

                                    <a id="delete_btn" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" tabindex="0" aria-controls="dynamic-table" data-original-title="" title="" onclick="modal1_rowDel();">
                                <span>
                                    <i class="fa fa-trash bigger-110 blue"></i>
                                    <span>줄삭제</span>
                                </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                        <div class="col-xs-12">
                            <div class="col-xs-12 padding0" id="content1">
                                <table id="mes_modal1_grid1"></table>

                            </div>
                        </div>

                </ul>

            </div>
            <div id="tab3" class="tab_content">
                <ul>
                    <div class="profile-user-info profile-user-info-striped">
                        <div class="profile-info-row">
                            <div class="profile-info-name" id="part_name1">

                            </div>
                            <div class="profile-info-value wt-px-200">

                                <select id="part_code1" name="part_code1" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                            <div class="profile-info-name" id="part_name6">

                            </div>
                            <div class="profile-info-value  wt-px-200">
                                <select id="part_code6" name="part_code6" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row">
                            <div class="profile-info-name" id="part_name2">

                            </div>
                            <div class="profile-info-value">
                                <select id="part_code2" name="part_code2" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                            <div class="profile-info-name"  id="part_name7">

                            </div>
                            <div class="profile-info-value">
                                <select id="part_code7" name="part_code7" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row">
                            <div class="profile-info-name" id="part_name3">

                            </div>
                            <div class="profile-info-value">
                                <select id="part_code3" name="part_code3" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                            <div class="profile-info-name" id="part_name8">

                            </div>
                            <div class="profile-info-value" >
                                <select id="part_code8" name="part_code8" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row" >
                            <div class="profile-info-name" id="part_name4">

                            </div>
                            <div class="profile-info-value" >
                                <select id="part_code4" name="part_code4" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                            <div class="profile-info-name" id="part_name9">

                            </div>
                            <div class="profile-info-value" >
                                <select id="part_code9" name="part_code9" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                        </div>
                        <div class="profile-info-row">
                            <div class="profile-info-name" id="part_name5">

                            </div>
                            <div class="profile-info-value">
                                <select id="part_code5" name="part_code5" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                            <div class="profile-info-name" id="part_name10">

                            </div>
                            <div class="profile-info-value">
                                <select id="part_code10" name="part_code10" class="form-control modal_value" style="width: 100%;">
                                    <option value="">선택안함</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</div>



