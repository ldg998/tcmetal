<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/popProdList2/popProdList2_modal1.js"
        charset="UTF-8"></script>


<div id="addDialog" title="공정 LOT수정" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        


       <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" readonly autocomplete="off" >
                <input type="hidden" name="supp_code" class="form-control modal_value" autocomplete="off" style="text-align: right">
                <input type="hidden" name="work_date" class="form-control modal_value sendDate">

            </div>
        </div>
       <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" readonly autocomplete="off" >
            </div>
        </div>
       <div class="profile-info-row">
            <div class="profile-info-name">품번</div>
            <div class="profile-info-value">
                <input type="text" name="part_code" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">변경전 LOT</div>
            <div class="profile-info-value">
                <input type="text" name="prev_lot" class="form-control modal_value" readonly autocomplete="off">
            </div>
        </div>


        <div class="profile-info-row">
            <div class="profile-info-name">변경후 LOT</div>
            <div class="profile-info-value">
                <input type="text" name="lot_no" class="form-control modal_value" autocomplete="off">
            </div>
        </div>

     

    </div>
   
</div>
