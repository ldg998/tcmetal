package com.mes.mesScm.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.InOut.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class InOutRestController {

    @Autowired
    private InOutService inOutService;

    //현재 실제 사용 소스
    @RequestMapping(value = "/scmOutListGet", method = RequestMethod.POST)
    public RESTful scmOutListGet(HttpServletRequest req, Page p) {
        return inOutService.scmOutListGet(req, p);
    }

    @RequestMapping(value = "/scmIOListGet", method = RequestMethod.POST)
    public RESTful scmIOListGet(HttpServletRequest req, Page p) {
        return inOutService.scmIOListGet(req, p);
    }

    @RequestMapping(value = "/scmOutGet", method = RequestMethod.POST)
    public RESTful scmOutGet(HttpServletRequest req, Page p) {
        return inOutService.scmOutGet(req, p);
    }

    @RequestMapping(value = "/scmStockRetGet", method = RequestMethod.POST)
    public RESTful scmStockRetGet(HttpServletRequest req, Page p) {
        return inOutService.scmStockRetGet(req, p);
    }



    @RequestMapping(value = "/scmStockRetListGet", method = RequestMethod.POST)
    public RESTful scmStockRetListGet(HttpServletRequest req, Page p) {
        return inOutService.scmStockRetListGet(req, p);
    }


    @RequestMapping(value = "/scmOutAdd", method = RequestMethod.POST)
    public Message scmOutAdd(SCM_OUT out, HttpServletRequest req) {
        return inOutService.scmOutAdd(out, req);
    }


    @RequestMapping(value = "/scmOutGet_lee", method = RequestMethod.POST)
    public RESTful scmOutGet_lee(HttpServletRequest req, Page p) {
        return inOutService.scmOutGet_lee(req, p);
    }

    @RequestMapping(value = "/scmOutDel", method = RequestMethod.POST)
    public Message scmOutDel(HttpServletRequest req, Page p) {
        return inOutService.scmOutDel(req, p);
    }


    @RequestMapping(value = "/scmInGet", method = RequestMethod.POST)
    public RESTful scmInGet(HttpServletRequest req, Page p) {
        return inOutService.scmInGet(req, p);
    }

    @RequestMapping(value = "/scmInSub1Get", method = RequestMethod.POST)
    public RESTful scmInSub1Get(HttpServletRequest req, Page p) {
        return inOutService.scmInSub1Get(req, p);
    }

    @RequestMapping(value = "/scmInSub2Get", method = RequestMethod.POST)
    public List<SCM_IN_SUB> scmInSub2Get(HttpServletRequest req, Page p) {
        return inOutService.scmInSub2Get(req, p);
    }


    @RequestMapping(value = "/scmInAdd", method = RequestMethod.POST)
    public Message scmInAdd(HttpServletRequest req, SCM_IN si) {
        return inOutService.scmInAdd(req, si);
    }

    @RequestMapping(value = "/scmInDel", method = RequestMethod.POST)
    public Message scmInDel(Page p) {
        return inOutService.scmInDel(p);
    }


    @RequestMapping(value = "/scmInOrdModalGet", method = RequestMethod.POST)
    public List<SCM_IN_ORD_MODAL> scmInOrdModalGet(Page p) {
        return inOutService.scmInOrdModalGet(p);
    }

    @RequestMapping(value = "/scmInListGet", method = RequestMethod.POST)
    public RESTful smcInListGet(Page p) {
        return inOutService.scmInListGet(p);
    }
}
