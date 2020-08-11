package com.mes.mesCrm.Orders;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.Orders.DTO.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
public class CrmOrdersRestController {
    @Autowired
    private CrmOrdersService crmOrdersService;


    @RequestMapping(value = "/crmOrderRecpGet", method = RequestMethod.POST)
    public RESTful crmOrderRecpGet( Page p) {
        return crmOrdersService.crmOrderRecpGet(p);
    }


    @RequestMapping(value = "/crmOrderRecpOneGet", method = RequestMethod.POST)
    public CRM_ORD_RECP crmOrderRecpOneGet( Page p) {
        return crmOrdersService.crmOrderRecpOneGet(p);
    }

    @RequestMapping(value = "/crmOrderRecpAdd", method = RequestMethod.POST)
    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req) throws IOException {
       return crmOrdersService.crmOrderRecpAdd(crmOrdRecp,req);
    }

    @RequestMapping(value = "/crmOrderRecpDel", method = RequestMethod.POST)
    public Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp){
        return crmOrdersService.crmOrderRecpDel(crmOrdRecp);
    }

    @RequestMapping(value = "/crmOrderRecpModalGet", method = RequestMethod.POST)
    public List<CRM_ORD_RECP> crmOrderRecpModalGet( Page p) {
        return crmOrdersService.crmOrderRecpModalGet(p);
    }

    @RequestMapping(value="/wmsOutOrderAdd" , method = RequestMethod.POST)
    public Message wmsOutOrderAdd(HttpServletRequest req, WMS_OUT_ORD_SUB woos){
        return crmOrdersService.wmsOutOrderAdd(req, woos);
    }

    @RequestMapping(value="/wmsOutOrderGet" , method = RequestMethod.POST)
    public RESTful wmsOutOrderGet(Page p){
        return crmOrdersService.wmsOutOrderGet( p);
    }

    @RequestMapping(value = "/wmsOutOrderOneGet", method = RequestMethod.POST)
    public List<WMS_OUT_ORD_SUB> wmsOutOrderOneGet(Page p) {
        return crmOrdersService.wmsOutOrderOneGet(p);
    }

    @RequestMapping(value="/wmsOutOrderDel" , method = RequestMethod.POST)
    public Message wmsOutOrderDel(Page p){
        return crmOrdersService.wmsOutOrderDel( p);
    }








}
