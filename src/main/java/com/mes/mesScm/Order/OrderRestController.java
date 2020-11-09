package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/scmOrderGet", method = RequestMethod.POST)
    public RESTful scmOrderGet(HttpServletRequest req, Page p){
        return orderService.scmOrderGet(req, p);
    }
    @RequestMapping(value = "/scmOrderSubGet", method = RequestMethod.POST)
    public RESTful scmOrderSubGet(HttpServletRequest req, Page p ) { return orderService.scmOrderSubGet(req, p); }

    @RequestMapping(value = "/scmOrderAdd", method = RequestMethod.POST)
    public Message scmOrderAdd(HttpServletRequest req, SCM_IN_ORD sio) { System.out.println(sio); return orderService.scmOrderAdd(req, sio);}

    @RequestMapping(value ="/scmOrderPartGet", method = RequestMethod.POST)
    public RESTful scmOrderPartGet(HttpServletRequest req, Page p) { return orderService.scmOrderPartGet(req,p); }
    @RequestMapping(value ="/scmOrderPartGet2", method = RequestMethod.POST)
    public RESTful scmOrderPartGet2(HttpServletRequest req, Page p) { return orderService.scmOrderPartGet2(req,p); }

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


   }
