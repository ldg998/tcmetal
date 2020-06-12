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

//    @RequestMapping(value = "/crmProdOrder")
//    public String crmProdOrder() { return "mesCrm/Crm/crmProdOrder/crmProdOrder"; }
//
//    @RequestMapping(value = "/crmAssyCable")
//    public String crmAssyCable() { return "mesCrm/Crm/crmAssyCable/crmAssyCable"; }
//
//    @RequestMapping(value = "/crmOutList")
//    public String crmOutList() { return "mesCrm/Crm/crmOutList/crmOutList"; }
}
