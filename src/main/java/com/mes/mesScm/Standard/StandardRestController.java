package com.mes.mesScm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.PartType;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.Standard.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class StandardRestController {
    @Autowired
    private StandardService standardService;



    @RequestMapping(value = "/sysLocGet", method = RequestMethod.POST)
    public RESTful sysLocGet(HttpServletRequest req, Page p) {
        return standardService.sysLocGet(req, p);
    }

    @RequestMapping(value = "/sysLocAll2Get", method = RequestMethod.POST)
    public List<sysLoc> sysLocAllGet(HttpServletRequest req, Page p) {
        return standardService.sysLocAllGet(req, p);
    }

    @RequestMapping(value = "/sysLocOneGet", method = RequestMethod.POST)
    public sysLoc sysLocOneGet(HttpServletRequest req, Page p) {
        return standardService.sysLocOneGet(req, p);
    }

    @RequestMapping(value = "/sysLocAdd", method = RequestMethod.POST)
    public Message sysLocAdd(HttpServletRequest req, sysLoc vo) {
        return standardService.sysLocAdd(req, vo);
    }

    @RequestMapping(value = "/sysLocDelete", method = RequestMethod.POST)
    public Message sysLocDelete(Page p, HttpServletRequest req) {
        return standardService.sysLocDelete(p, req);
    }





    @RequestMapping(value = "/getPartType", method = RequestMethod.POST)
    public List<PartType> getPartType(HttpServletRequest req) {
        return standardService.getPartType(req);
    }


    @RequestMapping(value = "/sysPartSuppGet", method = RequestMethod.POST)
    public RESTful sysPartSuppGet(HttpServletRequest req, Page p) {
        return standardService.sysPartSuppGet(req, p);
    }


    @RequestMapping(value = "/sysPartGet", method = RequestMethod.POST)
    public RESTful sysPartGet(HttpServletRequest req, Page p) { return standardService.sysPartGet(req, p);
    }

    @RequestMapping(value = "/sysPartOneGet", method = RequestMethod.POST)
    public SYS_PART_CD sysPartOneGet(HttpServletRequest req, Page p) {
        return standardService.sysPartOneGet(req, p);
    }

    @RequestMapping(value = "/sysPartAdd", method = RequestMethod.POST)
    public Message sysPartAdd(HttpServletRequest req, SYS_PART_CD spc) {
        return standardService.sysPartAdd(req, spc);
    }

    @RequestMapping(value = "/sysPartDel", method = RequestMethod.POST)
    public Message sysPartDel(HttpServletRequest req, SYS_PART_CD spc) {
        return standardService.sysPartDel(req, spc);
    }

    @RequestMapping(value = "/sysPartListGet", method = RequestMethod.POST)
    public RESTful sysPartListGet(Page p) { return standardService.sysPartListGet(p); }

    @RequestMapping(value = "/sysPartCostGet", method = RequestMethod.POST)
    public List<SYS_PART_CD> sysPartCostGet(HttpServletRequest req,Page p) { return standardService.sysPartCostGet(req,p); }

    @RequestMapping(value = "/sysPartCostAdd", method = RequestMethod.POST)
    public Message sysPartCostAdd(HttpServletRequest req,SYS_PART_CD spc) { return standardService.sysPartCostAdd(req,spc); }

     @RequestMapping(value = "/sysPartCostDel", method = RequestMethod.POST)
     public Message sysPartCostDel(HttpServletRequest req,SYS_PART_CD spc) { return standardService.sysPartCostDel(req,spc); }




}
