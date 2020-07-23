package com.mes.mesOut.mesOut;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OutsOutRestController {
    @Autowired
    private OutsOutService outsOutService;
//
//    @RequestMapping(value = "/outsOutListGet", method = RequestMethod.POST)
//    public RESTful outsOutListGet(Page p, HttpServletRequest req) {
//        return outsOutService.outsOutListGet(p, req);
//    }

//
//    @RequestMapping(value = "/outsInListGet", method = RequestMethod.POST)
//    public RESTful outsInListGet(Page p, HttpServletRequest req) {
//        return outsOutService.outsInListGet(p, req);
//    }

//
//    @RequestMapping(value = "/outsInReadyGet", method = RequestMethod.POST)
//    public RESTful outsInReadyGet(Page p, HttpServletRequest req) {
//        return outsOutService.outsInReadyGet(p, req);
//    }
//
//
//    @RequestMapping(value = "/outsIOListGet", method = RequestMethod.POST)
//    public RESTful outsIOListGet(Page p, HttpServletRequest req ) {return outsOutService.outsIOListGet(p,req);}

}
