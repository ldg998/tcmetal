package com.mes.Common.Excel.Util;

import com.mes.mesCrm.mesCrm.DTO.CRM_OUT_SUB;
import com.mes.mesCrm.mesCrm.DTO.CRM_PLAN;
import com.mes.mesManager.Master.DTO.SYSSupp;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_BCR;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.InOut.DTO.*;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Standard.DTO.SYS_PART_PRICE;
import com.mes.mesScm.Standard.DTO.sysBPart;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_MONTH;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

/** *
 * <pre>
 *     MakeBody
 *     셀 데이터를 생성하는 클래스
 * </pre>
 * @author 김재일
 * @since 2019-11-27
 * @version 1.0
 * **/
@Slf4j
public class MakeBody {
    // 전역변수 선언
    List<Object> obj = null;
    public String dateFormat(String str) { return str.substring(0,4)+'-'+str.substring(4,6)+'-'+str.substring(6); }
    public String dateFormat2(String str) { return str.substring(0,4)+'-'+str.substring(4,6)+'-'+str.substring(6,8)+' '+str.substring(8,10)+':'+str.substring(10,12)+':'+str.substring(12); }
    public String doubleFormat(double db) { String str= String.format("%,.3f",db); String chStr = str.substring(0,str.length()-1);return chStr; }
    public int integer(double db) {return  (int)(Math.floor(db));}
    //자재단가
    public List<List<Object>> sysPartPrice_Body(List<SYS_PART_PRICE> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SYS_PART_PRICE data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getSupp_name());
                    obj.add(dateFormat(data.getStart_date()));
                    obj.add(dateFormat(data.getStop_date()));
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getCurrency_name());
                    obj.add(doubleFormat(data.getUnit_price()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    //발주현황
    public List<List<Object>> scmOrderList_Body(List<SCM_IN_ORD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_IN_ORD_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOrd_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getStatus_name());
                    obj.add(integer(data.getOrd_qty()));
                    obj.add(integer(data.getQty()));
                    obj.add(integer(data.getNot_qty())); // 미입고 임시로 입고수량 받을 예정
                    obj.add(data.getUnit_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    //입고현황
    public List<List<Object>> scmInList_Body(List<SCM_IN> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_IN data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    //재입고현황
    public List<List<Object>> scmInLineList_Body(List<SCM_REIN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_REIN_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getLine_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getQty()));
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    //출고현황
    public List<List<Object>> scmOutList_Body(List<SCM_OUT> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_OUT data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    //자재반출현황
    public List<List<Object>> scmStockRetList_Body(List<SCM_STOCK_RET_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_STOCK_RET_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getRet_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getQty()));
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }





    // sysBPart 데이터 생성 함수
    public List<List<Object>> sysBPart_Body(List<sysBPart> list){
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(sysBPart data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_grp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getLoc_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getPart_grp_code());
                    obj.add(data.getI_standard_name());
                    obj.add(data.getI_category_name());
                    obj.add(data.getMax_qty());
                    obj.add(data.getMin_qty());
                    obj.add(data.getUser_name());
                    obj.add(data.getUpdate_date());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }


    public List<List<Object>> scmReqOrder_Body(List<SCM_REQ_ORD> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_REQ_ORD data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getWork_date());
                    obj.add(data.getReq_no());
                    obj.add(data.getOrd_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getEnd_supp_name());
                    obj.add(data.getEnd_date());
                    obj.add(data.getPart_grp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(integer(data.getQty()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }


    public List<List<Object>> scmStockList_Body(List<SCM_STOCK_LIST> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_STOCK_LIST data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getSupp_name());
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> scmStockSumDayList_Body(List<SCM_STOCK_SUM_DAY> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_STOCK_SUM_DAY data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getSupp_name());
                    obj.add(integer(data.getPrev_qty()));
                    obj.add(integer(data.getIn_qty()));
                    obj.add(integer(data.getOut_qty()));
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> scmStockSumMonthList_Body(List<SCM_STOCK_SUM_MONTH> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_STOCK_SUM_MONTH data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getSupp_name());
                    obj.add(integer(data.getPrev_qty()));
                    obj.add(integer(data.getIn_qty()));
                    obj.add(integer(data.getOut_qty()));
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

//    public List<List<Object>> crmWorkList_Body(List<CRM_ORD_RECP> list) {
//        List<List<Object>> content = new ArrayList<>();
//        try{
//            if(list.size()!=0){
//                for(CRM_ORD_RECP data : list){
//                    obj = new ArrayList<>();
//                    obj.add(dateFormat(data.getWork_date()));
//                    obj.add(data.getOrd_no());
//                    obj.add(data.getSupp_name());
//                    obj.add(data.getEnd_supp_name());
//                    obj.add(data.getStatus1_name());
//                    obj.add(data.getStatus2_name());
//                    obj.add(dateFormat(data.getEnd_date()));
//                    obj.add(data.getStatus3_name());
//                    obj.add(data.getPart_no());
//                    obj.add(data.getQty());
//                    obj.add(data.getUnit_name());
//                    obj.add(data.getTube_name());
//                    obj.add(data.getRemark());
//                    content.add(obj);
//                }
//            }
//        }catch (Exception e){
//            log.info("error code : "+ e);
//        }
//        return content;
//    }

    public List<List<Object>> qmsRecvList_Body(List<QMS_RECV_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_RECV_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(data.getQc_result_name());
                    obj.add(integer(data.getQty()));
                    obj.add(integer(data.getQc_qty()));
                    obj.add(integer(data.getNg_qty()));
                    obj.add(data.getNg_type_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile1_name());
                    obj.add(data.getFile2_name());
                    obj.add(data.getFile3_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> qmsRecvErrorMan_Body(List<QMS_RECV_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_RECV_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getLot());
                    obj.add(data.getQc_level_name());
                    obj.add(data.getQc_result_name());
                    obj.add(integer(data.getQty()));
                    obj.add(integer(data.getQc_qty()));
                    obj.add(integer(data.getNg_qty()));
                    obj.add(data.getNg_type_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile1_name());
                    obj.add(data.getFile2_name());
                    obj.add(data.getFile3_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> qmsProdList_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_PROD_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getWork_date());
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(doubleFormat(data.getIn_qty()));
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getQc_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile1_name());
                    obj.add(data.getFile2_name());
                    obj.add(data.getFile3_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> outsOutList_Body(List<OUTS_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(OUTS_OUT_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getQty()));
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> outsInList_Body(List<OUTS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(OUTS_IN_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getWork_date());
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_grp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getOut_qty());
                    obj.add(data.getOut_loss());
                    obj.add(data.getQc_loss());
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUser_name());
                    obj.add(data.getUpdate_date());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> outsInReady_Body(List<OUTS_OUT_BCR> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(OUTS_OUT_BCR data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getWork_date());
                    obj.add(data.getOut_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_grp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getOut_qty());
                    obj.add(data.getBcr_no());
                    obj.add(data.getUser_name());
                    obj.add(data.getUpdate_date());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> tpmMachineError_Body(List<tpmMachineError> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(tpmMachineError data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getWork_date());
                    obj.add(data.getLine_name());
                    obj.add(data.getMachine_name());
                    obj.add(data.getCode_name1());
                    obj.add(data.getCn());
                    obj.add(data.getMeasure_name());
                    obj.add(data.getUser_name());
                    obj.add(data.getCheck_date());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }



    public List<List<Object>> wmsInList_Body(List<WMS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_IN_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getPlan_no());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> wmsOutList_Body(List<WMS_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_OUT_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getPlan_no());
                    obj.add(data.getOrd_no());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> wmsOutReady_Body(List<WMS_OUT_ORD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_OUT_ORD_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getReq_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_no());
                    obj.add(data.getOrd_no());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

//    public List<List<Object>> crmProdOrder_Body(List<CRM_ORD_RECP> list) {
//        List<List<Object>> content = new ArrayList<>();
//        try{
//            if(list.size()!=0){
//                for(CRM_ORD_RECP data : list){
//                    obj = new ArrayList<>();
//                    obj.add(dateFormat(data.getWork_date()));
//                    obj.add(data.getOrd_no());
//                    obj.add(data.getSupp_name());
//                    obj.add(data.getEnd_supp_name());
//                    obj.add(data.getStatus1_name());
//                    obj.add(data.getStatus2_name());
//                    obj.add(dateFormat(data.getEnd_date()));
//                    obj.add(data.getStatus3_name());
//                    obj.add(data.getPart_no());
//                    obj.add(data.getSpec());
//                    obj.add(doubleFormat(data.getQty()));
//                    obj.add(data.getUnit_name());
//                    obj.add(data.getTube_name());
//                    obj.add(data.getRemark());
//                    content.add(obj);
//                }
//            }
//        }catch (Exception e){
//            log.info("error code : "+ e);
//        }
//        return content;
//    }

    public List<List<Object>> crmOutList_Body(List<CRM_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(CRM_OUT_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getUnit_price()));
                    obj.add(doubleFormat(data.getQty()));
                    obj.add(data.getUser_name());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> scmIOList_Body(List<SCM_IO> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_IO data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getWork_date());
                    obj.add(integer(data.getQty()));
                    obj.add(data.getUnit_name());
                    obj.add(data.getRemark());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> scmStockRevList_Body(List<SCM_STOCK_REV_LIST> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SCM_STOCK_REV_LIST data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getSupp_name());
                    obj.add(integer(data.getStock_qty_prev()));
                    obj.add(integer(data.getStock_qty()));
                    obj.add(data.getUnit_name());
                    obj.add(data.getRev_name());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }





    public List<List<Object>> wmsStockList_Body(List<WMS_STOCK> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_STOCK data : list){
                    obj = new ArrayList<>();

                    obj.add(data.getPlan_date());
                    obj.add(data.getOrd_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getPlan_no());
                    obj.add(data.getWork_date());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> wmsStockIOSumDayList_Body(List<WMS_STOCK> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_STOCK data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getPrev_qty()));
                    obj.add(doubleFormat(data.getIn_qty()));
                    obj.add(doubleFormat(data.getOut_qty()));
                    obj.add(doubleFormat(data.getQty()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> wmsStockIOSumMonthList_Body(List<WMS_STOCK> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_STOCK data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(doubleFormat(data.getPrev_qty()));
                    obj.add(doubleFormat(data.getIn_qty()));
                    obj.add(doubleFormat(data.getOut_qty()));
                    obj.add(doubleFormat(data.getQty()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> crmPlan_Body(List<CRM_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(CRM_PLAN data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getPart_name());
//                    obj.add(data.getPlan_name());
//                    obj.add(doubleFormat(data.getMonth_plan1()));
//                    obj.add(doubleFormat(data.getMonth_plan2()));
//                    obj.add(doubleFormat(data.getMonth_plan3()));
//                    obj.add(doubleFormat(data.getPlan_qty()));
//                    obj.add(doubleFormat(data.getTotal_qty()));
//                    obj.add(doubleFormat(data.getDiff_qty()));
//                    obj.add(doubleFormat(data.getProd_qty()));
//                    obj.add(doubleFormat(data.getStock_qty()));
//                    obj.add(data.getProd_desc());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> qmsProdError_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_PROD_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getQc_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
    public List<List<Object>> qmsOutsList_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_PROD_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getPlan_no());
                    obj.add(data.getPlace_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getQc_name());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getNg_type_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile2_name());
                    obj.add(data.getFile3_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }


    public List<List<Object>> wmsinList_Body(List<WMS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(WMS_IN_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getPlan_no());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }



    public List<List<Object>> qmsRecvError_Body(List<QMS_RECV_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_RECV_SUB data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(integer(data.getQty()));
                    obj.add(integer(data.getIn_qty()));
                    obj.add(integer(data.getNg_qty()));
                    obj.add(data.getQc_result_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> outsIOList_Body(List<OUTS_IO_CD> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(OUTS_IO_CD data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getBcr_no());
                    obj.add(data.getOut_user_name());
                    obj.add(dateFormat2(data.getOut_date()));
                    obj.add(data.getIn_user_name());
                    obj.add(dateFormat(data.getIn_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> outsInReadyGet_Body(List<OUTS_IO_CD> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(OUTS_IO_CD data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat2(data.getOut_date()));
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getBcr_no());
                    obj.add(data.getIn_user_name());
                    obj.add(dateFormat2(data.getOut_date()));
                    obj.add(dateFormat(data.getExpect_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> popPlanList_Body(List<POP_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(POP_PLAN data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getPlan_date()));
                    obj.add(data.getPlan_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPlace_name());
                    obj.add(data.getProd_type_name());
                    obj.add(data.getProd_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getStatus_name());
                    obj.add(data.getRoute_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> qmsRecvErrorListSum_Body(List<QMS_RECV_NG_SUM> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_RECV_NG_SUM data : list){
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_ratio());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;

    }

    public List<List<Object>> qmsAssyList_Body(List<QMS_PROD_SUB> list) {

        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(QMS_PROD_SUB data : list){
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getPlan_no());
                    obj.add(data.getPlace_name());
                    obj.add(data.getPlan_name());
                    obj.add(data.getQc_name());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getNg_type_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile2_name());
                    obj.add(data.getFile3_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));

                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> qmsAssyErrorListSumGet_Body(List<QMS_ASSY_NG_SUM> list2) {


        List<List<Object>> content = new ArrayList<>();
        try{
            if(list2.size()!=0){
                for(QMS_ASSY_NG_SUM data : list2){
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_ratio());
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }

    public List<List<Object>> sysSuppList_Body(List<SYSSupp> list) {
        List<List<Object>> content = new ArrayList<>();
        try{
            if(list.size()!=0){
                for(SYSSupp data : list){
                    obj = new ArrayList<>();
                    obj.add(data.getSupp_code());
                    obj.add(data.getSupp_name());
                    obj.add(data.getCeo());
                    obj.add(data.getSupp_name2());
                    obj.add(data.getSupp_no());
                    obj.add(data.getTel_no());
                    obj.add(data.getBuss_type());
                    obj.add(data.getFax_no());
                    obj.add(data.getCategory());
                    obj.add(data.getGive_type());
                    obj.add(data.getAddress());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        }catch (Exception e){
            log.info("error code : "+ e);
        }
        return content;
    }
}


