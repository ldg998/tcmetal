package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.Order.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/scmOrderImageGet", method = RequestMethod.POST)
    public RESTful scmOrderImageGet(HttpServletRequest req, Page p) { return orderService.scmOrderImageGet(req, p); }
    @RequestMapping(value = "/scmOrderImageAdd", method = RequestMethod.POST)
    public Message scmOrderImageAdd(MultipartHttpServletRequest req, SYS_ORD_IMAGE_CD soi) throws IOException { return orderService.scmOrderImageAdd(req, soi); }
    @RequestMapping(value ="/scmOrderImageOneGet", method = RequestMethod.POST)
    public SYS_ORD_IMAGE_CD scmOrderImageOneGet(HttpServletRequest req, Page p) { return orderService.scmOrderImageOneGet(req, p); }
    @RequestMapping(value = "/scmOrderImageDel", method = RequestMethod.POST)
    public Message scmOrderImageDel(HttpServletRequest req, SYS_ORD_IMAGE_CD soi) throws IOException { return orderService.scmOrderImageDel(req, soi); }
    @RequestMapping(value = "scmOrderImageList", method = RequestMethod.POST)
    public List<SYS_ORD_IMAGE_CD> scmOrderImageList(HttpServletRequest req, SYS_ORD_IMAGE_CD soi){ return orderService.scmOrderImageList(req, soi); }

    @RequestMapping(value = "/scmOrderGet", method = RequestMethod.POST)
    public RESTful scmOrderGet(HttpServletRequest req, Page p){
        return orderService.scmOrderGet(req, p);
    }
    @RequestMapping(value = "/scmOrderSubGet", method = RequestMethod.POST)
    public RESTful scmOrderSubGet(HttpServletRequest req, Page p ) { return orderService.scmOrderSubGet(req, p); }
    @RequestMapping(value = "/scmOrderSubPdfGet", method = RequestMethod.POST)
    public List<SCM_IN_ORD_SUB_PDF> scmOrderSubPdfGet(Page p ) { return orderService.scmOrderSubPdfGet(p); }
    @RequestMapping(value = "/scmOrderAdd", method = RequestMethod.POST)
    public Message scmOrderAdd(HttpServletRequest req, SCM_IN_ORD sio) { return orderService.scmOrderAdd(req, sio);}

    @RequestMapping(value ="/scmOrderPartGet", method = RequestMethod.POST)
    public RESTful scmOrderPartGet(HttpServletRequest req, Page p) { return orderService.scmOrderPartGet(req,p); }

    @RequestMapping(value = "/scmOrderPartOneGet", method = RequestMethod.POST)
    public List<SCM_IN_ORD_SUB> scmOrderPartOneGet(HttpServletRequest req, SCM_IN_ORD_SUB sios) { return orderService.scmOrderPartOneGet(req,sios); }
    @RequestMapping(value = "/scmOrderOneGet", method = RequestMethod.POST)
    public SCM_IN_ORD scmOrderOneGet(HttpServletRequest req, SCM_IN_ORD sio){ return orderService.scmOrderOneGet(req,sio); }
    @RequestMapping(value = "/scmOrderDel", method = RequestMethod.POST)
    public Message scmOrderDel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderDel(req, sio);
    }
    @RequestMapping(value = "/scmOrderComp", method = RequestMethod.POST)
    public Message scmOrderComp(HttpServletRequest req, SCM_IN_ORD sio) { return orderService.scmOrderComp(req, sio);}
    @RequestMapping(value = "/scmOrderListGet", method = RequestMethod.POST)
    public RESTful scmOrderListGet(HttpServletRequest req, Page p) { return orderService.scmOrderListGet(req, p); }
    @RequestMapping(value = "/scmOrderReady", method = RequestMethod.POST)
    public Message scmOrderReady(HttpServletRequest req, SCM_IN_ORD sio) { return orderService.scmOrderReady(req, sio);}


    @RequestMapping(value = "/scmReqOrderGet", method = RequestMethod.POST)
    public RESTful scmReqOrderGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderSubGet", method = RequestMethod.POST)
    public RESTful scmReqOrderSubGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderSubGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderSubAllGet", method = RequestMethod.POST)
    public List<SCM_REQ_ORD_SUB> scmReqOrderSubAllGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderSubAllGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderAdd", method = RequestMethod.POST)
    public Message scmReqOrderAdd(HttpServletRequest req, SCM_REQ_ORD_SUB sros) { return orderService.scmReqOrderAdd(req, sros); }

    @RequestMapping(value = "/scmReqOrderDel", method = RequestMethod.POST)
    public Message scmReqOrderDel(HttpServletRequest req, SCM_REQ_ORD sro) { return orderService.scmReqOrderDel(req, sro); }





    @RequestMapping(value = "/scmOrderAdd2", method = RequestMethod.POST)
    public Message scmOrderAdd2(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderAdd2(req, sio);
    }



    @RequestMapping(value = "/scmOrderCancel", method = RequestMethod.POST)
    public Message scmOrderCancel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderCancel(req, sio);
    }


    @RequestMapping(value = "/scmOrderSub1Get", method = RequestMethod.POST)
    public RESTful scmOrderSub1Get(HttpServletRequest req, Page p){
        return orderService.scmOrderSub1Get(req, p);
    }
    @RequestMapping(value = "/scmOrderSub2Get", method = RequestMethod.POST)
    public List<SCM_IN_ORD_SUB> scmOrderSub2Get(HttpServletRequest req, Page p){
        return orderService.scmOrderSub2Get(req, p);
    }

   }
