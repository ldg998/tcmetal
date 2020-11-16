package com.mes.mesWms.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//import com.sun.org.apache.regexp.internal.RE;

@RestController
public class WmsInOutRestController {
    @Autowired
    private WmsInOutService wmsInOutService;

    @RequestMapping(value="/wmsInListGet" , method = RequestMethod.POST)
    public RESTful wmsInListGet(HttpServletRequest req, Page p){
        return wmsInOutService.wmsInListGet(req, p);
    }

    @RequestMapping(value="/wmsOutListGet" , method = RequestMethod.POST)
    public RESTful wmsOutListGet(HttpServletRequest req, Page p){
        return wmsInOutService.wmsOutListGet(req, p);
    }

    @RequestMapping(value="/wmsOutListDel" , method = RequestMethod.POST)
    public Message wmsOutListDel(Page p){
        return wmsInOutService.wmsOutListDel(p);
    }

    @RequestMapping(value = "/wmsOutListAdd", method = RequestMethod.POST)
    public String wmsOutListAdd (MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("out_no"));
        wmsInOutService.wmsOutListAdd(files, req);
        return "수정되었습니다.";
    }

    @RequestMapping(value="/wmsOutReadyGet" , method = RequestMethod.POST)
    public RESTful wmsOutReadyGet(HttpServletRequest req, Page p){
        return wmsInOutService.wmsOutReadyGet(req, p);
    }

    @RequestMapping(value="/wmsOutOrderSubGet" , method = RequestMethod.POST)
    public RESTful wmsOutOrderSubGet(HttpServletRequest req, Page p){
        return wmsInOutService.wmsOutOrderSubGet(req, p);
    }
    @RequestMapping(value="/wmsOutOrderSubOneGet" , method = RequestMethod.POST)
    public List<POP_PLAN> wmsOutOrderSubOneGet(HttpServletRequest req, Page p){
        return wmsInOutService.wmsOutOrderSubOneGet(req, p);
    }

    @RequestMapping(value = "/wmsOrdPlanGet", method = RequestMethod.POST)
    public List<POP_PLAN> wmsOrdPlanGet(HttpServletRequest req, Page p) { return wmsInOutService.wmsOrdPlanGet(req, p); }


    @RequestMapping(value = "/wmsOrdPlanUpGet", method = RequestMethod.POST)
    public List<POP_PLAN> wmsOrdPlanUpGet(HttpServletRequest req, POP_PLAN pp) {
        return wmsInOutService.wmsOrdPlanUpGet(req,pp);
    }

    @RequestMapping(value="/wmsOutListComp" , method = RequestMethod.POST)
    public Message wmsOutListComp(Page p,HttpServletRequest req){
        return wmsInOutService.wmsOutListComp(p,req);
    }




}
