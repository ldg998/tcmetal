package com.mes.mesCrm.Orders;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.Orders.DTO.*;

import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;


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

    @RequestMapping(value="/crmOrderRecpComp" , method = RequestMethod.POST)
    public Message crmOrderRecpComp(HttpServletRequest req, CRM_ORD_RECP crmOrdRecp){
        return crmOrdersService.crmOrderRecpComp(req, crmOrdRecp);
    }

    @RequestMapping(value = "/crmOrderRecpModalGet", method = RequestMethod.POST)
    public List<CRM_ORD_RECP> crmOrderRecpModalGet( Page p) {
        return crmOrdersService.crmOrderRecpModalGet(p);
    }

    @RequestMapping(value="/wmsOutOrderAdd" , method = RequestMethod.POST)
    public Message wmsOutOrderAdd(HttpServletRequest req, WMS_OUT_ORD_SUB woos){
        return crmOrdersService.wmsOutOrderAdd(req, woos);
    }

    @RequestMapping(value = "/wmsInvoiceFormGet", method = RequestMethod.POST)
    public RESTful wmsInvoiceFormGet( Page p) {
        return crmOrdersService.wmsInvoiceFormGet(p);
    }

    @RequestMapping(value="/wmsInvoiceFormAdd" , method = RequestMethod.POST)
    public Message wmsInvoiceFormAdd(MultipartHttpServletRequest req, CRM_INVOICE_REPORT cir) throws IOException {
        return crmOrdersService.wmsInvoiceFormAdd(req, cir);
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

    @RequestMapping(value="/wmsOutOrderComp" , method = RequestMethod.POST)
    public Message wmsOutOrderComp(Page p){
        return crmOrdersService.wmsOutOrderComp( p);
    }

    @RequestMapping(value = "/crmShippingWmsOutGet", method = RequestMethod.POST)
    public RESTful crmShippingWmsOutGet( Page p) {
        return crmOrdersService.crmShippingWmsOutGet(p);
    }

    @RequestMapping(value = "/crmShippingWmsOutOneGet", method = RequestMethod.POST)
    public WMS_OUT_SUB crmShippingWmsOutOneGet(Page p) {
        return crmOrdersService.crmShippingWmsOutOneGet(p);
    }


    @RequestMapping(value = "/crmShippingAdd", method = RequestMethod.POST)
    public Message crmOrderRecpAdd(CRM_SHIPPING cs, HttpServletRequest req) throws IOException {
        return crmOrdersService.crmShippingAdd(cs,req);
    }

    @RequestMapping(value = "/crmShippingGet", method = RequestMethod.POST)
    public RESTful crmShippingGet( Page p) {
        return crmOrdersService.crmShippingGet(p);
    }

    @RequestMapping(value = "/crmShippingOneGet", method = RequestMethod.POST)
    public CRM_SHIPPING crmShippingOneGet( Page p) {
        return crmOrdersService.crmShippingOneGet(p);
    }

    @RequestMapping(value="/crmShippingDel" , method = RequestMethod.POST)
    public Message crmShippingDel(Page p){
        return crmOrdersService.crmShippingDel( p);
    }

    @RequestMapping(value = "/crmPerformGet", method = RequestMethod.POST)
    public RESTful crmPerformGet( Page p) {
        return crmOrdersService.crmPerformGet(p);
    }

    @RequestMapping(value = "/crmShippingListGet", method = RequestMethod.POST)
    public List<CRM_SHIPPING> crmShippingListGet( Page p) {
        return crmOrdersService.crmShippingListGet(p);
    }
}
