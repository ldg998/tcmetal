package com.mes.mesOut.inOut;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class OutsInOutRestController {
    @Autowired
    private OutsInOutService outsOutService;

    @RequestMapping(value = "/outsOutListGet", method = RequestMethod.POST)
    public RESTful outsOutListGet(Page p, HttpServletRequest req) {
        return outsOutService.outsOutListGet(p, req);
    }

     @RequestMapping(value = "/outsOutModalListGet", method = RequestMethod.POST)
    public RESTful outsOutModalListGet(Page p, HttpServletRequest req) {
        return outsOutService.outsOutModalListGet(p, req);
    }

    @RequestMapping(value = "/outsInListGet", method = RequestMethod.POST)
    public RESTful outsInListGet(Page p, HttpServletRequest req) {
        return outsOutService.outsInListGet(p, req);
    }

    @RequestMapping(value = "/outsInReadyGet", method = RequestMethod.POST)
    public RESTful outsInReadyGet(Page p, HttpServletRequest req) {
        return outsOutService.outsInReadyGet(p, req);
    }

    @RequestMapping(value = "/outsIOListGet", method = RequestMethod.POST)
    public RESTful outsIOListGet(Page p, HttpServletRequest req ) {return outsOutService.outsIOListGet(p,req);}

}
