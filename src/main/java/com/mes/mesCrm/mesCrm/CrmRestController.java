package com.mes.mesCrm.mesCrm;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.mesCrm.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.mesCrm.DTO.CRM_PLAN;
import com.mes.mesCrm.mesCrm.DTO.CRM_WE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
public class CrmRestController {
    @Autowired
    private CrmService crmService;


    @RequestMapping(value = "/crmOrderRecpGet", method = RequestMethod.POST)
    public RESTful crmOrderRecpGet( Page p) {
        return crmService.crmOrderRecpGet(p);
    }


    @RequestMapping(value = "/crmOrderRecpOneGet", method = RequestMethod.POST)
    public CRM_ORD_RECP crmOrderRecpOneGet( Page p) {
        return crmService.crmOrderRecpOneGet(p);
    }

    @RequestMapping(value = "/crmOrderRecpAdd", method = RequestMethod.POST)
    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, MultipartHttpServletRequest req) throws IOException {
       return crmService.crmOrderRecpAdd(crmOrdRecp,req);
    }

    @RequestMapping(value = "/crmOrderRecpDel", method = RequestMethod.POST)
    public Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp){
        return crmService.crmOrderRecpDel(crmOrdRecp);
    }
    @RequestMapping(value = "/crmMoneyGet", method = RequestMethod.POST)
    public RESTful crmMoneyGet(HttpServletRequest req,Page p) { return crmService.crmMoneyGet(req,p);}
    @RequestMapping(value = "/crmMoneyOneGet", method = RequestMethod.POST)
    public CRM_ORD_RECP crmMoneyOneGet(HttpServletRequest req,CRM_ORD_RECP cor){ return crmService.crmMoneyOneGet(req,cor);}
    @RequestMapping(value = "/crmMoneyAdd", method = RequestMethod.POST)
    public Message crmMoneyAdd(HttpServletRequest req, CRM_ORD_RECP cor){ return crmService.crmMoneyAdd(req,cor);}

    @RequestMapping(value = "/crmMoneyComp")
    public Message crmMoneyComp(HttpServletRequest req, CRM_ORD_RECP cor) {return crmService.crmMoneyComp(req,cor);}




    //    @RequestMapping(value = "/crmProdOrderGet", method = RequestMethod.POST)
//    public RESTful crmProdOrderGet(HttpServletRequest req, Page p) {
//        return crmService.crmProdOrderGet(req, p);
//    }
//
//    @RequestMapping(value = "/crmProdOrderOneGet", method = RequestMethod.POST)
//    public CRM_ORD_RECP crmProdOrderOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
//        return crmService.crmProdOrderOneGet(req, cor);
//    }
//
//    @RequestMapping(value = "/crmRecpAdd", method = RequestMethod.POST)
//    public String crmRecpAdd(@Valid CRM_ORD_RECP crmOrdRecp, BindingResult errors, HttpServletRequest req){
//        String msg = null;
//        if(errors.hasErrors()){
//            for (ObjectError objectError : errors.getAllErrors()) {
//                msg = objectError.getDefaultMessage() + "를 입력하세요.";
//            }
//            return msg;
//        }else{
//            return "검증완료";
////            return crmService.crmRecpAdd(crmOrdRecp, req);
//        }
//    }
//
//    @RequestMapping(value = "/crmOrderRecpAdd", method = RequestMethod.POST)
//    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req){
//       return crmService.crmOrderRecpAdd(crmOrdRecp,req);
//    }
//
//    @RequestMapping(value = "/crmWorkListGet", method = RequestMethod.POST)
//    public RESTful crmWorkListGet(HttpServletRequest req, Page p) { return crmService.crmWorkListGet(req, p); }
//
//    @RequestMapping(value = "/crmWorkListOneGet", method = RequestMethod.POST)
//    public CRM_ORD_RECP crmWorkListOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
//        return crmService.crmWorkListOneGet(req, cor);
//    }
//
    @RequestMapping(value = "/crmPlanGet", method = RequestMethod.POST)
    public RESTful crmPlanGet(HttpServletRequest req, Page p) { return crmService.crmPlanGet(req, p); }

    @RequestMapping(value = "/crmPlanOneGet", method = RequestMethod.POST)
    public CRM_PLAN crmPlanOneGet(CRM_PLAN cp) {
        return crmService.crmPlanOneGet(cp); }

    @RequestMapping(value = "/crmPlanAdd", method = RequestMethod.POST)
    public Message crmPlanAdd(CRM_PLAN cp, HttpServletRequest req){
        return crmService.crmPlanAdd(cp,req);
    }

    @RequestMapping(value = "/crmPlanDelete",method = RequestMethod.POST)
    public Message crmPlanDelete (CRM_PLAN cp){
        return crmService.crmPlanDelete(cp);

    }
    @RequestMapping(value = "/crmWorkListUpdate",method = RequestMethod.POST)
    public Message crmWorkListUpdate(CRM_PLAN cp,HttpServletRequest req){
        return crmService.crmWorkListUpdate(cp,req);
    }

    @RequestMapping(value = "/crmWeAddUpdate",method = RequestMethod.POST)
    public Message crmWeAddUpdate(CRM_WE cw, HttpServletRequest req){ return crmService.crmWeAddUpdate(cw,req); }


    @RequestMapping(value = "/crmWeList",method = RequestMethod.POST)
    public RESTful crmWeList(Page p, HttpServletRequest req){ return crmService.crmWeList(p,req); }

    @RequestMapping(value = "/crmWeOneGet",method = RequestMethod.POST)
    public RESTful crmWeOneGet(Page p, HttpServletRequest req){ return crmService.crmWeOneGet(p,req); }

    @RequestMapping(value = "/crmWeListOneGet",method = RequestMethod.POST)
    public List<CRM_WE> crmWeListOneGet(Page p, HttpServletRequest req){ return crmService.crmWeListOneGet(p,req); }

    @RequestMapping(value = "/crmWeDelete",method = RequestMethod.POST)
    public Message crmWeDelete(Page p, HttpServletRequest req){ return crmService.crmWeDelete(p,req); }




//
//
//    @RequestMapping(value = "/crmAssyCableGet", method = RequestMethod.POST)
//    public RESTful crmAssyCableGet(HttpServletRequest req, Page p) { return crmService.crmAssyCableGet(req, p); }
//
//
//    @RequestMapping(value = "/crmAssyCableAdd", method = RequestMethod.POST)
//    public Message crmAssyCableAdd(SYS_ASSY_CABLE sac, HttpServletRequest req){
//        return crmService.crmAssyCableAdd(sac,req);
//    }
//    @RequestMapping(value = "/crmAssyCableDel", method = RequestMethod.POST)
//    public Message crmAssyCableDel(SYS_ASSY_CABLE sac, HttpServletRequest req){
//        return crmService.crmAssyCableDel(sac,req);
//    }
//
//    @RequestMapping(value = "/crmOutListGet", method = RequestMethod.POST)
//    public RESTful crmOutListGet(HttpServletRequest req, Page p) { return crmService.crmOutListGet(req, p); }
//
//    @RequestMapping(value = "/crmProdOrderAdd", method = RequestMethod.POST)
//    public Message crmProdOrderAdd(CRM_ORD_RECP cor, HttpServletRequest req){
//        return crmService.crmProdOrderAdd(cor,req);
//    }
//    @RequestMapping(value = "/crmProdOrderDel", method = RequestMethod.POST)
//    public Message crmProdOrderDel(CRM_ORD_RECP cor, HttpServletRequest req){
//        return crmService.crmProdOrderDel(cor,req);
//    }
//
//    @RequestMapping(value = "/crmWorkListAdd", method = RequestMethod.POST)
//    public Message crmWorkListAdd(CRM_ORD_RECP cor, HttpServletRequest req){
//        return crmService.crmWorkListAdd(cor,req);
//    }
}
