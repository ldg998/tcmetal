package com.mes.Common.Excel.Util;

import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Orders.DTO.CRM_SHIPPING;
import com.mes.mesManager.Master.DTO.SYSSupp;
import com.mes.mesOut.inOut.DTO.OUTS_IO_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_BCR;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Shipment.DTO.POP_MOLD_WASH;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.InOut.DTO.*;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Stock.DTO.*;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_REV;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

/**
 * <pre>
 *     MakeBody
 *     셀 데이터를 생성하는 클래스
 * </pre>
 *
 * @author 김재일
 * @version 1.0
 * @since 2019-11-27
 **/
@Slf4j
public class MakeBody {
    // 전역변수 선언
    List<Object> obj = null;

    public String dateFormat(String str) {
        return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6);
    }

    public String dateFormat2(String str) {
        return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8) + ' ' + str.substring(8, 10) + ':' + str.substring(10, 12) + ':' + str.substring(12);
    }

    public String doubleFormat(double db) {
        String str = String.format("%,.3f", db);
        String chStr = str.substring(0, str.length() - 1);
        return chStr;
    }

    public int integer(double db) {
        return (int) (Math.floor(db));
    }


    //발주현황
    public List<List<Object>> scmOrderList_Body(List<SCM_IN_ORD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_IN_ORD_SUB data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOrd_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getStatus_name());
                    obj.add(data.getOrd_qty());
                    obj.add(data.getQty());
                    obj.add(data.getNot_qty());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    //자재입고현황
    public List<List<Object>> scmInList_Body(List<SCM_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_IN_SUB data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getQty());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat(data.getUpdate_date()));

                     content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }


    //출고현황
    public List<List<Object>> scmOutList_Body(List<SCM_OUT> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_OUT data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQty());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    //자재반출현황
    public List<List<Object>> scmStockRetList_Body(List<SCM_STOCK_RET_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_RET_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }


    public List<List<Object>> scmStockList_Body(List<SCM_STOCK_LIST> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_LIST data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> scmStockSumDayList_Body(List<SCM_STOCK_SUM_DAY> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_SUM_DAY data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getIn_qty());
                    obj.add(data.getOut_qty());
                    obj.add(data.getQty());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> scmStockSumMonthList_Body(List<SCM_STOCK_SUM_MONTH> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_SUM_MONTH data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getIn_qty());
                    obj.add(data.getOut_qty());
                    obj.add(data.getQty());


                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
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





    public List<List<Object>> qmsProdList_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsOutList_Body(List<OUTS_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_OUT_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsInList_Body(List<OUTS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_IN_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsInReady_Body(List<OUTS_OUT_BCR> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_OUT_BCR data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> tpmMachineError_Body(List<tpmMachineError> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (tpmMachineError data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }


    public List<List<Object>> wmsInList_Body(List<WMS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_IN_SUB data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_weight());
                    obj.add(data.getLot_no());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> wmsOutList_Body(List<WMS_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_OUT_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> wmsOutReady_Body(List<WMS_OUT_ORD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_OUT_ORD_SUB data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getReq_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_weight());
                    obj.add(data.getQty());
                    obj.add(data.getWeight());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
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



    public List<List<Object>> scmIOList_Body(List<SCM_IO> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_IO data : list) {
                    obj = new ArrayList<>();

                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    if(data.getWork_date().length() >4){
                    obj.add(dateFormat(data.getWork_date()));
                    }else {
                        obj.add(data.getWork_date());
                    }
                    obj.add(data.getQty());
                    obj.add(data.getRemark());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> scmStockRevList_Body(List<SCM_STOCK_REV_LIST> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_REV_LIST data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }






    public List<List<Object>> qmsProdError_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsOutsList_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }


    public List<List<Object>> wmsinList_Body(List<WMS_IN_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_IN_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }




    public List<List<Object>> outsIOList_Body(List<OUTS_IO_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_IO_SUB data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getOuts_supp_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    if (data.getWork_date().length()>4){
                    obj.add(dateFormat(data.getWork_date()));
                    }else {
                        obj.add(data.getWork_date());
                    }
                    obj.add(data.getQty());
                    obj.add(data.getRemark());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsInReadyGet_Body(List<OUTS_IO_CD> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_IO_CD data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }



    public List<List<Object>> qmsRecvErrorListSum_Body(List<QMS_RECV_NG_SUM> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_RECV_NG_SUM data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_ratio());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> qmsAssyList_Body(List<QMS_PROD_SUB> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD_SUB data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsAssyErrorListSumGet_Body(List<QMS_ASSY_NG_SUM> list2) {


        List<List<Object>> content = new ArrayList<>();
        try {
            if (list2.size() != 0) {
                for (QMS_ASSY_NG_SUM data : list2) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_ratio());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> sysSuppList_Body(List<SYSSupp> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SYSSupp data : list) {
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
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> scmStockRev_Body(List<SCM_STOCK_REV> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_REV data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getStock_qty());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> scmStockRevListList_Body(List<SCM_STOCK_REV_LIST> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (SCM_STOCK_REV_LIST data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getStock_qty_prev());
                    obj.add(data.getStock_qty());
                    obj.add(data.getRev_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> wmsOutListList_Body(List<WMS_OUT_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_OUT_SUB data : list) {
                    obj = new ArrayList<>();
                    if(data.getOut_date().length() > 4) {
                        obj.add(dateFormat(data.getOut_date()));
                    }else {obj.add(data.getOut_date());}
                    obj.add(data.getOut_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_weight());
                    obj.add(data.getQty());
                    obj.add(data.getWeight());
                    obj.add(data.getLot_no());
                    obj.add(data.getFile1_name());
                    obj.add(data.getReq_no());
                    if(data.getDate1().length() > 4) {
                        obj.add(dateFormat(data.getDate1()));
                    }else {obj.add(data.getDate1());}
                    if(data.getDate2().length() > 4) {
                        obj.add(dateFormat(data.getDate2()));
                    }else {obj.add(data.getDate2());}
                    if(data.getDate3().length() > 4) {
                        obj.add(dateFormat(data.getDate3()));
                    }else {obj.add(data.getDate3());}
                    obj.add(data.getUser_name());
                    if(data.getCreate_date().length() > 4) {
                        obj.add(dateFormat2(data.getCreate_date()));
                    }else { obj.add(data.getCreate_date());}
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> wmsStockSumList_Body(List<WMS_STOCK> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_STOCK data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getPrev_weight());
                    obj.add(data.getIn_qty());
                    obj.add(data.getIn_weight());
                    obj.add(data.getOut_qty());
                    obj.add(data.getOut_weight());
                    obj.add(data.getNg_qty());
                    obj.add(data.getNg_weight());
                    obj.add(data.getQty());
                    obj.add(data.getWeight());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> wmsStockSumMonthList_Body(List<WMS_STOCK> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_STOCK data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getPrev_weight());
                    obj.add(data.getIn_qty());
                    obj.add(data.getIn_weight());
                    obj.add(data.getOut_qty());
                    obj.add(data.getOut_weight());
                    obj.add(data.getNg_qty());
                    obj.add(data.getNg_weight());
                    obj.add(data.getQty());
                    obj.add(data.getWeight());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> wmsStockRevList_Body(List<WMS_STOCK_REV> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (WMS_STOCK_REV data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getRev_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_weight());
                    obj.add(data.getStock_qty_prev());
                    obj.add(data.getStock_qty());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> crmPerform_Body(List<CRM_ORD_RECP> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (CRM_ORD_RECP data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getOrd_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPo_no());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getMoney_unit());
                    obj.add(data.getUnit_cost());
                    obj.add(data.getQty());
                    obj.add(data.getPrice_amount());
                    obj.add(data.getDate1());
                    obj.add(data.getDate2());
                    obj.add(data.getDate3());
                    obj.add(data.getDate4());
                    obj.add(data.getDate5());
                    obj.add(data.getDate6());
                    obj.add(data.getDate7());
                    obj.add(data.getDate8());
                    obj.add(data.getDate9());
                    obj.add(data.getDate10());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> crmShipping_Body(List<CRM_SHIPPING> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (CRM_SHIPPING data : list) {
                    obj = new ArrayList<>();
                    obj.add(dateFormat(data.getOut_date()));
                    obj.add(data.getOut_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getTrans_name());
                    obj.add(data.getShip_cost());
                    obj.add(data.getPort_cost1());
                    obj.add(data.getPort_cost2());
                    obj.add(data.getPort_cost3());
                    obj.add(data.getPort_cost4());
                    obj.add(data.getPort_cost5());
                    obj.add(data.getUnloading_cost());
                    obj.add(data.getLanding_ost());
                    obj.add(data.getHarbor_facility());
                    obj.add(data.getLocal_cost());
                    obj.add(data.getCustoms_fee());
                    obj.add(data.getWood_cost1());
                    obj.add(data.getWood_cost2());
                    obj.add(data.getWood_cost3());
                    obj.add(data.getWeight());
                    obj.add(data.getUnit_cost());
                    obj.add(dateFormat(data.getShip_date()));
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> qmsRecvListList_Body(List<QMS_RECV_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_RECV_SUB data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_type_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getIn_qty());
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getNg_type_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getFile1());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsRecvErrorListList_Body(List<QMS_RECV_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_RECV_SUB data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getSpec());
                    obj.add(data.getUnit_name());
                    obj.add(data.getQc_level_name());
                    obj.add(data.getIn_qty());
                    obj.add(data.getQc_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getNg_name());
                    obj.add(data.getAct_type_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsProdMiddleList_Body(List<QMS_PROD> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getLot_no());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getResult2_name());
                    obj.add(data.getResult3_name());
                    obj.add(data.getFile2_yn());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> qmsProdMiddleList2_Body(List<QMS_PROD> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getLot_no());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getResult2_name());
                    obj.add(data.getResult3_name());
                    obj.add(data.getFile2_yn());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsProdMiddleList3_Body(List<QMS_PROD> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getLot_no());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getResult2_name());
                    obj.add(data.getResult3_name());
                    obj.add(data.getFile2_yn());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getUpdate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsProdErrorListList_Body(List<QMS_PROD_SUB> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (QMS_PROD_SUB data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getQc_no());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getLot_no());
                    obj.add(data.getHard1());
                    obj.add(data.getHard2());
                    obj.add(data.getHard3());
                    obj.add(data.getQc_result_name());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> qmsMoldWashList_Body(List<POP_MOLD_WASH> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_MOLD_WASH data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getTime1());
                    obj.add(data.getValue1());
                    obj.add(data.getUser_name());
                    obj.add(data.getTime2());
                    obj.add(data.getValue2());
                    obj.add(data.getUser_name2());
                    obj.add(data.getTime3());
                    obj.add(data.getValue3());
                    obj.add(data.getUser_name3());
                    obj.add(data.getTime4());
                    obj.add(data.getValue4());
                    obj.add(data.getUser_name4());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> popProdRangeList_Body(List<POP_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    obj.add(data.getLine_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getQty());
                    obj.add(data.getWork_weight());


                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> popProdList1List_Body(List<POP_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    obj.add(data.getLine_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                   if(data.getWork_date().length()>4){
                    obj.add(dateFormat(data.getWork_date()));
                   }else {
                       obj.add(data.getWork_date());
                   }
                    obj.add(data.getQty());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> popProdList2List_Body(List<POP_PLAN> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getLine_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPlan_qty());
                    obj.add(data.getProd_qty());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> popProdReport1List_Body(List<POP_PLAN> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getCharge());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPlan_qty());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> popSpectroList_Body(List<POP_PLAN> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getCharge());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getTest_value1());
                    obj.add(data.getTest_value2());
                    obj.add(data.getTest_value3());
                    obj.add(data.getTest_value4());
                    obj.add(data.getTest_value5());
                    obj.add(data.getTest_value6());
                    obj.add(data.getTest_value7());
                    obj.add(data.getTest_value8());
                    obj.add(data.getTest_value9());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsInListList_Body(List<OUTS_IO_SUB> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_IO_SUB data : list) {
                    obj = new ArrayList<>();


                    obj.add(dateFormat(data.getWork_date()));
                    obj.add(data.getIn_no());
                    obj.add(data.getOuts_supp_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getQty());
                    obj.add(data.getOuts_qc());
                    obj.add(data.getUser_name());
                    obj.add(dateFormat2(data.getCreate_date()));


                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;
    }

    public List<List<Object>> outsStockSumAllList_Body(List<OUTS_STOCK> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_STOCK data : list) {
                    obj = new ArrayList<>();

                    obj.add(data.getOuts_supp_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getIn_qty());
                    obj.add(data.getOut_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQty());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> outsStockSumMonthList_Body(List<OUTS_STOCK> list) {

        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (OUTS_STOCK data : list) {
                    obj = new ArrayList<>();

                    obj.add(data.getOuts_supp_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    obj.add(data.getPrev_qty());
                    obj.add(data.getIn_qty());
                    obj.add(data.getOut_qty());
                    obj.add(data.getNg_qty());
                    obj.add(data.getQty());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> popProdLeadTimeList_Body(List<POP_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();

                    if(data.getWork_date().length()>4){
                    obj.add(dateFormat(data.getWork_date()));
                    }else {
                        obj.add(data.getWork_date());
                    }
                    if(data.getDate1().length()>4){
                        obj.add(dateFormat(data.getDate1()));
                    }else {
                        obj.add(data.getDate1());
                    }


                    obj.add(data.getLine_name());
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_weight());
                    if(data.getDate2().length()>4){
                        obj.add(dateFormat(data.getDate2()));
                    }else {
                        obj.add(data.getDate2());
                    }
                    if(data.getDate3().length()>4){
                        obj.add(dateFormat(data.getDate3()));
                    }else {
                        obj.add(data.getDate3());
                    }
                    obj.add(data.getLot_no());
                    obj.add(data.getRead_time());
                    obj.add(data.getQc_result_name());

                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }

    public List<List<Object>> sysProdSum_Body(List<POP_PLAN> list) {
        List<List<Object>> content = new ArrayList<>();
        try {
            if (list.size() != 0) {
                for (POP_PLAN data : list) {
                    obj = new ArrayList<>();
                    obj.add(data.getSupp_name());
                    obj.add(data.getPart_kind());
                    obj.add(data.getPart_name());
                    obj.add(data.getPart_code());
                    obj.add(data.getPart_weight());
                    obj.add(data.getWork_qty());
                    obj.add(data.getStock_prev());
                    obj.add(data.getWork_name());
                    obj.add(data.getDay1());
                    obj.add(data.getDay2());
                    obj.add(data.getDay3());
                    obj.add(data.getDay4());
                    obj.add(data.getDay5());
                    obj.add(data.getDay6());
                    obj.add(data.getDay7());
                    obj.add(data.getDay8());
                    obj.add(data.getDay9());
                    obj.add(data.getDay10());
                    obj.add(data.getDay11());
                    obj.add(data.getDay12());
                    obj.add(data.getDay13());
                    obj.add(data.getDay14());
                    obj.add(data.getDay15());
                    obj.add(data.getDay16());
                    obj.add(data.getDay17());
                    obj.add(data.getDay18());
                    obj.add(data.getDay19());
                    obj.add(data.getDay20());
                    obj.add(data.getDay21());
                    obj.add(data.getDay22());
                    obj.add(data.getDay23());
                    obj.add(data.getDay24());
//                    obj.add(data.getDay25());
//                    obj.add(data.getDay26());
//                    obj.add(data.getDay27());
//                    obj.add(data.getDay28());
//                    obj.add(data.getDay29());
//                    obj.add(data.getDay30());
//                    obj.add(data.getDay31());
                    content.add(obj);
                }
            }
        } catch (Exception e) {
            log.info("error code : " + e);
        }
        return content;

    }
}


