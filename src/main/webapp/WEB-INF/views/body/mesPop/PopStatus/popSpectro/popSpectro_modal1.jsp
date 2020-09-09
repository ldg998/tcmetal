<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/popSpectro/popSpectro_modal1.js"
        charset="UTF-8"></script>


<div id="addDialog" title="성분분석" style="display: none">
    <div class="profile-user-info profile-user-info-striped">
        
        
        <div class="profile-info-row">
            <div class="profile-info-name">계획일자</div>
            <div class="profile-info-value">
                <input type="text" name="work_date" class="form-control modal_value" autocomplete="off" readonly >
                <input type="hidden" name="line_code" class="modal_value" autocomplete="off">
                <input type="hidden" name="seq" class="modal_value" autocomplete="off">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">CHARGE</div>
            <div class="profile-info-value">
                <input type="text" name="charge" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">업체</div>
            <div class="profile-info-value">
                <input type="text" name="supp_name" class="form-control modal_value" autocomplete="off" readonly>
                <input type="hidden" name="supp_code" class="modal_value" autocomplete="off" readonly>

            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">기종</div>
            <div class="profile-info-value">
                <input type="text" name="part_kind" class="form-control modal_value" autocomplete="off" readonly>
            </div>
        </div>
        <div class="profile-info-row">
            <div class="profile-info-name">품명</div>
            <div class="profile-info-value">
                <input type="text" name="part_name" class="form-control modal_value" autocomplete="off" readonly>
                <input type="hidden" name="part_code" class="modal_value" readonly>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">단중</div>
            <div class="profile-info-value">
                <input type="text" name="part_weight" class="form-control modal_value" autocomplete="off" readonly style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">C</div>
            <div class="profile-info-value">
                <input type="text" name="test_value1" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Si</div>
            <div class="profile-info-value">
                <input type="text" name="test_value2" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Mn</div>
            <div class="profile-info-value">
                <input type="text" name="test_value3" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">P</div>
            <div class="profile-info-value">
                <input type="text" name="test_value4" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">S</div>
            <div class="profile-info-value">
                <input type="text" name="test_value5" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Cr</div>
            <div class="profile-info-value">
                <input type="text" name="test_value6" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Ni</div>
            <div class="profile-info-value">
                <input type="text" name="test_value7" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Cu</div>
            <div class="profile-info-value">
                <input type="text" name="test_value8" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Sn</div>
            <div class="profile-info-value">
                <input type="text" name="test_value9" class="form-control modal_value" autocomplete="off" onfocus="num_focus_reset(this);" onkeyup="num_keyup_float(this)" style="text-align: right">
            </div>
        </div>
       
     

    </div>
   
</div>
