<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<script type="text/javascript" src="/data-component/mesPOP/PopStatus/popProdReport1/popProdReport1_modal1.js" charset="UTF-8"></script>
<style>
    /*td label {*/
    /*    font-size: 12px!important;*/
    /*    margin-right: 8px;*/
    /*}*/
    input[type=text][name="ord_qty"] {
        height: 18px !important;
    }
    input[type=text][name="remark"] {
        height: 18px !important;
    }
    input[type=text][name="direction"] {
        height: 18px !important;
    }


</style>
<div id="addDialog" title="주입일보현황" style="display: none">
    <div class="col-lg-12">

        <table class="table wt-100" style=" border: 1px solid #E1E1E1;">
            <tbody>
            <tr>
                <td class="wt-8_5 t-align-c td-title padding-a-0">작업일자</td>
                <td class="wt-7_5 t-align-c td-title padding-a-0">용해로 No</td>
                <td class="wt-7_5 t-align-c td-title padding-a-0">Charge No</td>
                <td class="wt-15 t-align-c td-title padding-a-0">재질</td>
                <td class="wt-5 t-align-c td-title padding-a-0">시작시간</td>
                <td class="wt-6_5"><input type="text" name="" class="form-control  modal_value" autocomplete="off" placeholder="11:30 ▼" ></td>
                <td class="wt-5 t-align-c td-title padding-a-0" rowspan="2">사용전력</td>
                <td class="wt-5 t-align-c td-title padding-a-0">시작</td>
                <td class="wt-13"> <input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" > </td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" placeholder="KWA" ></td>

                <td></td>
            </tr>
            <tr>
                <td class="wt-7_5">
                    <div class="input-icon input-icon-right">
                    <input type="text" name="start_date" id="datepicker_modal1"
                           class="form-control h-25 condition_main" readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
                </td>
                <td class="wt-8_5"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-7_5"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-15"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-5 t-align-c td-title padding-a-0">시작시간</td>
                <td class="wt-6_5"><input type="text" name="" class="form-control  modal_value" autocomplete="off" placeholder="11:30 ▼" > </td>


                <td class="wt-5 t-align-c td-title padding-a-0">종료</td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" placeholder="KWA" ></td>
                <td></td>
            </tr>
            </tbody>


        </table>

        <div class="col-lg-6">
            <table class="table wt-100" style=" border: 1px solid #E1E1E1;">
                <colgroup>
                    <col width="15%">
                    <col width="15%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                </colgroup>
                <thead>
               <tr>
                <th colspan="7">원부재료 투입량(Kg)</th>
               </tr>
                <tr>
                    <th colspan="2">항목</th>
                    <th>1차</th>
                    <th>2차</th>
                    <th>3차</th>
                    <th>4차</th>
                    <th>합계</th>
                </tr>

                </thead>

                <tbody>

                <tr>
                    <td colspan="2">고철</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">선철</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td rowspan="2">회추철</td>
                    <td >FC250</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                   <%-- <td rowspan="2">화추철</td>--%>
                    <td>FC300</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">잔탕</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">융탕 총량</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>


                <tr>
                    <td rowspan="2">기탄재</td>
                    <td >P3</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">기탄재</td>--%>
                    <td>전극설</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td rowspan="2">실리콘</td>
                    <td >(Fe-Si)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">실리콘</td>--%>
                    <td>(Si-Cr)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">망간(Fe-Mn)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">유화철(Fe-S)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">구리(Cu)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">크롬(Fe-Cr)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>


                <tr>
                    <td rowspan="2">접종제</td>
                    <td >CAL</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">접종제</td>--%>
                    <td>50Z</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="2">스락스(SLUX)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">Sn</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">코발트(Co)</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                </tbody>
            </table>
        </div>


        <div class="col-lg-6">
            <table class="table wt-100" style=" border: 1px solid #E1E1E1;">
                <colgroup>
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="6">성 분 조 정</th>
                    <th colspan="2">WEDGE</th>

                </tr>
                <tr>
                    <th>No</th>
                    <th>온도</th>
                    <th>시간</th>
                    <th>CE</th>
                    <th>C</th>
                    <th>Si</th>
                    <th>CW</th>
                    <th>PW</th>
                </tr>

                </thead>

                <tbody>
                <tr>
                    <td>1차</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td>2차</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td>3차</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td>최종</td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="8"></td>
                </tr>
                </tbody>
            </table>
            <table class="table wt-100" style=" border: 1px solid #E1E1E1;">
                <colgroup>
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8">주 입 내 역</th>


                </tr>
                <tr>
                    <th>업체</th>
                    <th>기종</th>
                    <th>품명</th>
                    <th>단중</th>
                    <th>수량</th>
                    <th>중량</th>
                    <th>LOT</th>
                    <th>작업자</th>
                </tr>

                </thead>

                <tbody>
                <tr>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                </tbody>
            </table>

            <table class="table wt-100" style=" border: 1px solid #E1E1E1;">
                <colgroup>
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                    <col width="12.5%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8">특이사항</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
</div>
