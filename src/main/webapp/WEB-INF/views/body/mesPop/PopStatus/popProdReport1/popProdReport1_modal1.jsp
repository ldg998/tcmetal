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

    .table {
        margin-bottom: 5px !important;
    }

    .col_lee{
        background-color: #F3F3F3;
        border-left: 0.5px solid #DDDDDD !important;
        border-right: 0.5px solid #DDDDDD !important;
        border-top: 1px solid #b5b5b5 !important;
        border-bottom: 2px solid #DDDDDD !important;

        padding: 3px;
        color: #707070;
        font-family: 'NanumBarunGothic';
        font-size: 11px;
        font-weight: 700;

    }

    input[disabled] {
        background-color: #fff!important;
    }
    .right>tr>td>input{
        text-align: right;
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
                <td class="wt-6_5"><input type="text" name="start_time" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-5 t-align-c td-title padding-a-0" rowspan="2">사용전력</td>

                <td class="wt-5 t-align-c td-title padding-a-0">시작</td>
                <td class="wt-13"> <input type="text" name="kwa_start1" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-13"><input type="text" name="kwa_start2" class="form-control  modal_value"autocomplete="off" > </td>
                <td class="wt-13"><input type="text" name="" class="form-control  modal_value" autocomplete="off" placeholder="KWA" ></td>

                <td></td>
            </tr>
            <tr>
                <td class="wt-7_5">
                    <div class="input-icon input-icon-right">
                    <input type="text" name="work_date" id="datepicker_modal1"
                           class="form-control h-25 modal_value"  readonly>
                    <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                </div>
                </td>
                <td class="wt-8_5"><input type="text" name="line_code" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-7_5"><input type="text" name="charge" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-15"><input type="text" name="mat_group" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-5 t-align-c td-title padding-a-0">종료시간</td>
                <td class="wt-6_5"><input type="text" name="stop_time" class="form-control  modal_value" autocomplete="off" > </td>


                <td class="wt-5 t-align-c td-title padding-a-0">종료</td>
                <td class="wt-13"><input type="text" name="kwa_stop1" class="form-control  modal_value" autocomplete="off" ></td>
                <td class="wt-13"><input type="text" name="kwa_stop2" class="form-control  modal_value"  autocomplete="off" ></td>
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

                <tbody class="right">

                <tr>
                    <td colspan="2">고철</td>
                    <td><input type="text" name="1input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">선철</td>
                    <td><input type="text" name="2input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td rowspan="2">회추철</td>
                    <td >FC250</td>
                    <td><input type="text" name="3input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                   <%-- <td rowspan="2">화추철</td>--%>
                    <td>FC300</td>
                    <td><input type="text" name="4input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">잔탕</td>
                    <td><input type="text" name="5input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">융탕 총량</td>
                    <td><input type="text" name="6input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="6input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="6input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="6input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="6input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>


                <tr>
                    <td rowspan="2">기탄재</td>
                    <td >P3</td>
                    <td><input type="text" name="7input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="7input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="7input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="7input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="7input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">기탄재</td>--%>
                    <td>전극설</td>
                    <td><input type="text" name="8input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="8input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="8input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="8input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="8input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td rowspan="2">실리콘</td>
                    <td >(Fe-Si)</td>
                    <td><input type="text" name="9input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="9input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="9input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="9input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="9input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">실리콘</td>--%>
                    <td>(Si-Cr)</td>
                    <td><input type="text" name="10input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="10input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="10input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="10input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="10input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">망간(Fe-Mn)</td>
                    <td><input type="text" name="11input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="11input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="11input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="11input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="11input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">유화철(Fe-S)</td>
                    <td><input type="text" name="12input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="12input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="12input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="12input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="12input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">구리(Cu)</td>
                    <td><input type="text" name="13input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="13input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="13input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="13input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="13input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">크롬(Fe-Cr)</td>
                    <td><input type="text" name="14input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="14input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="14input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="14input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="14input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>


                <tr>
                    <td rowspan="2">접종제</td>
                    <td >CAL</td>
                    <td><input type="text" name="15input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="15input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="15input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="15input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="15input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <%-- <td rowspan="2">접종제</td>--%>
                    <td>50Z</td>
                    <td><input type="text" name="16input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="16input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="16input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="16input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="16input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td colspan="2">스락스(SLUX)</td>
                    <td><input type="text" name="17input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="17input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="17input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="17input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="17input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">Sn</td>
                    <td><input type="text" name="18input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="18input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="18input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="18input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="18input_sum" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td colspan="2">코발트(Co)</td>
                    <td><input type="text" name="19input1" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="19input2" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="19input3" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="19input4" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="19input_sum" class="form-control  modal_value" autocomplete="off" ></td>
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

                <tbody class="right">
                <tr>
                    <td>1차</td>
                    <td><input type="text" name="1chg_temp" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1chg_time" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1chg_ce" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1chg_c" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1chg_si" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1wedge_cw" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1wedge_pw" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td>2차</td>
                    <td><input type="text" name="2chg_temp" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2chg_time" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2chg_ce" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2chg_c" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2chg_si" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2wedge_cw" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2wedge_pw" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td>3차</td>
                    <td><input type="text" name="3chg_temp" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3chg_time" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3chg_ce" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3chg_c" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3chg_si" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3wedge_cw" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3wedge_pw" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td>최종</td>
                    <td><input type="text" name="4chg_temp" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4chg_time" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4chg_ce" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4chg_c" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4chg_si" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4wedge_cw" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4wedge_pw" class="form-control  modal_value" autocomplete="off" ></td>
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
                    <td colspan="8">

                        <input type="text" name="" class="form-control  modal_value" autocomplete="off" >
                    </td>
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
                    <td><input type="text" name="1supp_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1part_kind" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1part_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1part_weight" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="1qty" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="1weigth" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="1lot_no" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="1user_name" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                <tr>
                    <td><input type="text" name="2supp_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2part_kind" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2part_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2part_weight" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="2qty" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="2weigth" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="2lot_no" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="2user_name" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="3supp_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3part_kind" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3part_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3part_weight" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="3qty" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="3weigth" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="3lot_no" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="3user_name" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="4supp_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4part_kind" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4part_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4part_weight" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="4qty" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="4weigth" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="4lot_no" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="4user_name" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>
                <tr>
                    <td><input type="text" name="5supp_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5part_kind" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5part_name" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5part_weight" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="5qty" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="5weigth" class="form-control  modal_value" autocomplete="off" style="text-align: right"></td>
                    <td><input type="text" name="5lot_no" class="form-control  modal_value" autocomplete="off" ></td>
                    <td><input type="text" name="5user_name" class="form-control  modal_value" autocomplete="off" ></td>
                </tr>

                </tbody>
            </table>

                <div class="col_lee" >특 이 사 항</div>


            <div >
                <textarea class="modal_value" name="remark" style="width: 100%;height: 130px; resize: none;" > </textarea>
            </div>


<%--            <table class="table wt-100" style=" border: 1px solid #E1E1E1;">--%>
<%--                <colgroup>--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                    <col width="12.5%">--%>
<%--                </colgroup>--%>
<%--                <thead>--%>
<%--                <tr>--%>
<%--                    <th colspan="8">특이사항</th>--%>
<%--                </tr>--%>
<%--                </thead>--%>

<%--                <tbody>--%>
<%--                <tr>--%>
<%--                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <td colspan="8"><input type="text" name="" class="form-control  modal_value" autocomplete="off" ></td>--%>
<%--                </tr>--%>

<%--                </tbody>--%>
<%--            </table>--%>

        </div>
    </div>
</div>
