package com.mes.mesCrm.Orders;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CrmOrdersController {
    @RequestMapping(value = "/crmOrderRecp")
    public String crmOrderRecp() {
        return "mesCrm/mesCrm/crmOrderRecp/crmOrderRecp";
    }

    @RequestMapping(value = "/crmPlan")
    public String crmPlan() {
        return "mesCrm/mesCrm/crmPlan/crmPlan";
    }

    @RequestMapping(value = "/crmPerform")
    public String crmPerform() { return "mesCrm/mesCrm/crmPerform/crmPerform"; }

    @RequestMapping(value = "/crmMoney")
    public String crmMoney() { return "mesCrm/mesCrm/crmMoney/crmMoney"; }

    @RequestMapping(value = "/crmWeList")
    public String crmWeList(){return "mesCrm/mesCrm/crmWeList/crmWeList";}

    @RequestMapping(value = "/crmCalendar")
    public String crmCalendar(){return "mesCrm/mesCrm/crmCalendar/crmCalendar";}



    @RequestMapping(value = "/crm_4")
    public String crm_4(){return "mesCrm/mesCrm/dumi/crm_4";}


    @RequestMapping(value = "/crmShipping")
    public String crmShipping(){return "mesCrm/mesCrm/crmShipping/crmShipping";}

    @RequestMapping(value = "/crm_7")
    public String crm_7(){return "mesCrm/mesCrm/dumi/crm_7";}

    @RequestMapping(value = "/wmsInvoiceForm")
    public String wmsInvoiceForm(){return "mesCrm/mesCrm/wmsInvoiceForm/wmsInvoiceForm";}

    @RequestMapping(value = "/wmsInvoice")
    public String wmsInvoice(){return "mesCrm/mesCrm/wmsInvoice/wmsInvoice";}

    @RequestMapping(value = "/wmsOutOrder")
    public String wmsOutOrder(){return "mesCrm/mesCrm/wmsOutOrder/wmsOutOrder";}


//    @RequestMapping(value = "/crmProdOrder")
//    public String crmProdOrder() { return "mesCrm/Crm/crmProdOrder/crmProdOrder"; }
//
//    @RequestMapping(value = "/crmAssyCable")
//    public String crmAssyCable() { return "mesCrm/Crm/crmAssyCable/crmAssyCable"; }
//
//    @RequestMapping(value = "/crmOutList")
//    public String crmOutList() { return "mesCrm/Crm/crmOutList/crmOutList"; }
}
