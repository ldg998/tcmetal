package com.mes.mesCrm.mesCrm;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.mesCrm.DTO.*;
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


    @RequestMapping(value = "/sysWoodGet",method = RequestMethod.POST)
    public RESTful sysWoodGet(Page p, HttpServletRequest req){ return crmService.sysWoodGet(p,req); }

     @RequestMapping(value = "/sysWoodOneGet",method = RequestMethod.POST)
    public List<CRM_WOOD> sysWoodOneGet(Page p, HttpServletRequest req){ return crmService.sysWoodOneGet(p,req); }


    @RequestMapping(value = "/sysWoodAdd",method = RequestMethod.POST)
    public Message sysWoodAdd(CRM_WOOD wo, HttpServletRequest req){ return crmService.sysWoodAdd(wo,req); }

    @RequestMapping(value = "/sysWoodDelete",method = RequestMethod.POST)
    public Message sysWoodDelete(CRM_WOOD wo, HttpServletRequest req){ return crmService.sysWoodDelete(wo,req); }

    @RequestMapping(value = "/sysWoodAllGet",method = RequestMethod.POST)
    public List<CRM_WOOD> sysWoodAllGet(CRM_WOOD wo, HttpServletRequest req){ return crmService.sysWoodAllGet(wo,req); }


    @RequestMapping(value = "/sysSpartAdd",method = RequestMethod.POST)
    public Message sysSpartAdd(CRM_SPART cs, HttpServletRequest req){ return crmService.sysSpartAdd(cs,req); }

    @RequestMapping(value = "/sysSpartGet",method = RequestMethod.POST)
    public RESTful sysSpartGet(Page p, HttpServletRequest req){ return crmService.sysSpartGet(p,req); }








}
