<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="/data-component/mesCRM/mesCrm/crmWeList/crmWeList_modal1.js"
        charset="UTF-8"></script>
<style>
    input[name="part_name"] {
        margin: 0;
        padding: 0;
        height: 18px !important;

    }
    input[name="spec"] {
        height: 18px !important;
    }
    input[name="qty"] {
        height: 18px !important;
    }
    input[name="unit_name"] {
        height: 18px !important;
    }
    input[name="price"] {
        height: 18px !important;
    }
    input[name="remark2"] {
        height: 18px !important;
    }

</style>

<div id="addDialog" title="견선서관리" style="display:none; ">
    <div id="container">

        <%--<ul class="tabs">
            <li class="active" rel="tab1">메인정보</li>
            <li rel="tab2">견적</li>
            <li rel="tab3">참고사항</li>
        </ul>


        <div class="tab_container">

            <div id="tab1" class="tab_content">

                <ul>--%>

                    <div class="profile-user-info profile-user-info-striped border_no_bottom">
                        <div class="profile-info-row ">
                           
                            <div class="profile-info-name border_top_modal w-105">견적일</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139 input-icon input-icon-right">
                                <input type="text" name="work_date" id="datepicker3"
                                       class="form-control h-25  modal_value" readonly>
                                <input type="hidden" name="we_no"  class="modal_value">
                                <i class="ace-icon fa fa-calendar dark" style="top: 2px"></i>
                            </div>
                            
                            <div class="profile-info-name border_top_modal w-105">수신</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text" name="supp_name" class="form-control modal_value"
                                       autocomplete="off" autofocus/>
                            </div>
                        </div>
                    </div>

                  
                    <div class="profile-user-info profile-user-info-striped border_no_top border_no_bottom">
                        <div class="profile-info-row ">
                            
                            <div class="profile-info-name border_top_modal w-105">참조</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text" name="reference" class="form-control modal_value"
                                       autocomplete="off"/>
                            </div>
                            <div class="profile-info-name border_top_modal w-105">TEL</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text" name="tel" class="form-control modal_value"
                                       autocomplete="off"/>
                            </div>
                            
                        </div>
                    </div>

                    

                    <div class="profile-user-info profile-user-info-striped border_no_top ">
                        <div class="profile-info-row ">
                            <div class="profile-info-name border_top_modal w-105">FAX</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text" name="fax" class="form-control modal_value"
                                       autocomplete="off"/>
                            </div>
                            <div class="profile-info-name border_top_modal w-105">공사명</div>
                            <div class="profile-info-value border_top_dotted_modal  w-139">
                                <input type="text" name="work_name" class="form-control modal_value"
                                       autocomplete="off"/>
                            </div>
                        </div>
                    </div>

                  <br>

<%--                </ul>--%>
<%--            </div>--%>

          <%--  <div id="tab2" class="tab_content" style="width: 800px;">
                <ul>--%>
                    <div class="col-xs-12">
                        <div class="clearfix">
                            <div class="pull-left tableTools-container">
                                <div class="dt-buttons btn-overlap btn-group">

                                    <a id="add_btn"
                                       class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                                       id="showDialog" onclick="modal1_rowAdd();">
                                <span><i class="fa fa-plus bigger-110 blue"></i>
                                    <span>줄추가</span>
                                </span>
                                    </a>

                                    <a id="delete_btn"
                                       class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                                       tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                                       onclick="modal1_rowDel();">
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

               <%-- </ul>
            </div>--%>

            <%--<div id="tab3" class="tab_content">
                <ul>--%>

                    <div class="profile-user-info profile-user-info-striped">
                        <div class="profile-info-row">
                            <div class="profile-info-name w-105" id="part_name1">비고</div>
                            <div class="profile-info-value wt-px-200">
                                <textarea  name="remark" class="modal_value" cols="100" rows="7" style=" resize: none; " ></textarea>
                            </div>
                        </div>
                    </div>

           <%-- </ul>
            </div>--%>

                 <%-- </div>--%>
    </div>
</div>



