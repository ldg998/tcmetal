package com.mes.mesCrm.mesCrm;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CrmController {
    @RequestMapping(value = "/crmOrderRecp")
    public String crmOrderRecp() {
        return "mesCrm/mesCrm/crmOrderRecp/crmOrderRecp";
    }

    @RequestMapping(value = "/crmPlan")
    public String crmPlan() {
        return "mesCrm/mesCrm/crmPlan/crmPlan";
    }

    @RequestMapping(value = "/crmWorkList")
    public String crmWorkList() { return "mesCrm/mesCrm/crmWorkList/crmWorkList"; }

    @RequestMapping(value = "/crmMoney")
    public String crmMoney() { return "mesCrm/mesCrm/crmMoney/crmMoney"; }

    @RequestMapping(value = "/crmWeList")
    public String crmWeList(){return "mesCrm/mesCrm/crmWeList/crmWeList";}

    @RequestMapping(value = "/crmCalendar")
    public String crmCalendar(){return "mesCrm/mesCrm/crmCalendar/crmCalendar";}

    @RequestMapping(value = "/sysSPart")
    public String sysSPart(){return "mesCrm/mesCrm/sysSPart/sysSPart";}
    @RequestMapping(value = "/sysERate")
    public String sysERate(){return "mesCrm/mesCrm/sysERate/sysERate";}
    @RequestMapping(value = "/sysWood")
    public String sysWood(){return "mesCrm/mesCrm/sysWood/sysWood";}
    @RequestMapping(value = "/crm_4")
    public String crm_4(){return "mesCrm/mesCrm/dumi/crm_4";}
    @RequestMapping(value = "/crm_5")
    public String crm_5(){return "mesCrm/mesCrm/dumi/crm_5";}
    @RequestMapping(value = "/crm_6")
    public String crm_6(){return "mesCrm/mesCrm/dumi/crm_6";}
    @RequestMapping(value = "/crm_7")
    public String crm_7(){return "mesCrm/mesCrm/dumi/crm_7";}
    @RequestMapping(value = "/crm_8")
    public String crm_8(){return "mesCrm/mesCrm/dumi/crm_8";}
    @RequestMapping(value = "/crm_9")
    public String crm_9(){return "mesCrm/mesCrm/dumi/crm_9";}
    @RequestMapping(value = "/crm_10")
    public String crm_10(){return "mesCrm/mesCrm/dumi/crm_10";}


//    @RequestMapping(value = "/crmProdOrder")
//    public String crmProdOrder() { return "mesCrm/Crm/crmProdOrder/crmProdOrder"; }
//
//    @RequestMapping(value = "/crmAssyCable")
//    public String crmAssyCable() { return "mesCrm/Crm/crmAssyCable/crmAssyCable"; }
//
//    @RequestMapping(value = "/crmOutList")
//    public String crmOutList() { return "mesCrm/Crm/crmOutList/crmOutList"; }
}
