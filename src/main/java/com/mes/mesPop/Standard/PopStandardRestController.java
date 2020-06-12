package com.mes.mesPop.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesPop.Standard.DTO.*;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class PopStandardRestController {

    @Autowired
    private PopStandardService popStandardService;


    @RequestMapping(value = "/popRouteGet", method = RequestMethod.POST)
    public RESTful popRouteGet(HttpServletRequest req, Page p) {
        return popStandardService.popRouteGet(req, p);
    }

    @RequestMapping(value = "/popRouteOneGet", method = RequestMethod.POST)
    public POP_ROUTE_CD popRouteOneGet(HttpServletRequest req, POP_ROUTE_CD pr) {
        return popStandardService.popRouteOneGet(req, pr);
    }

    @RequestMapping(value = "/popRouteAdd", method = RequestMethod.POST)
    public Message popRouteAdd(HttpServletRequest req, POP_ROUTE_CD pr) {
        return popStandardService.popRouteAdd(req,pr);
    }
    @RequestMapping(value ="/popRouteDel", method = RequestMethod.POST)
    public Message popRouteDel(HttpServletRequest req, POP_ROUTE_CD pr) {
        return popStandardService.popRouteDel(req, pr);
    }


    @RequestMapping(value = "/popReportSpecGet", method = RequestMethod.POST)
    public RESTful popReportSpecGet(HttpServletRequest req, Page p) {
        return popStandardService.popReportSpecGet(req, p);
    }

    @RequestMapping(value = "/popReportSpecOneGet", method = RequestMethod.POST)
    public SYS_PROD_REPORT_SPEC popReportSpecOneGet(HttpServletRequest req, Page p) {
        return popStandardService.popReportSpecOneGet(req, p);
    }

    @RequestMapping(value = "/popReportSpecAdd", method = RequestMethod.POST)
    public Message popReportSpecAdd(MultipartHttpServletRequest req, SYS_PROD_REPORT_SPEC sprs) throws IOException {
        return popStandardService.popReportSpecAdd(req, sprs);
    }





    @RequestMapping(value = "/popBcrFormGet", method = RequestMethod.POST)
    public RESTful popBcrFormGet(HttpServletRequest req, Page p){
        return popStandardService.popBcrFormGet(req, p);
    }

    @RequestMapping(value = "/popBcrFormOneGet", method = RequestMethod.POST)
    public POP_BCR_FORM popBcrFormOneGet(HttpServletRequest req, POP_BCR_FORM pbf) {
        return popStandardService.popBcrFormOneGet(req,pbf);
    }
    @RequestMapping(value = "/popBcrFormAdd", method = RequestMethod.POST)
    public Message popBcrFormAdd(HttpServletRequest req, POP_BCR_FORM pbf) {
        return popStandardService.popBcrFormAdd(req, pbf);
    }

    @RequestMapping(value = "/popBcrFormDel", method = RequestMethod.POST)
    public Message popBcrFormDel(HttpServletRequest req, POP_BCR_FORM pbf) {
        return popStandardService.popBcrFormDel(req,pbf);
    }


    @RequestMapping(value = "/popLineUserGet", method = RequestMethod.POST)
    public RESTful popLineUserGet(HttpServletRequest req, Page p) {
        return popStandardService.popLineUserGet(req, p);
    }

    @RequestMapping(value = "/popLineUserAdd", method = RequestMethod.POST)
    public Message popLineUserAdd(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        return popStandardService.popLineUserAdd(req,pluc);
    }

    @RequestMapping(value ="/popLineUserDel", method = RequestMethod.POST)
    public Message popLineUserDel(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        return popStandardService.popLineUserDel(req, pluc);
    }


    @RequestMapping(value = "/popErrorTypeAdd", method = RequestMethod.POST)
    public Message popErrorTypeAdd(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        return popStandardService.popErrorTypeAdd(req,plec);
    }

    @RequestMapping(value = "/popErrorTypeGet", method = RequestMethod.POST)
    public RESTful popErrorTypeGet(HttpServletRequest req, Page p) {
        return popStandardService.popErrorTypeGet(req, p);
    }

    @RequestMapping(value ="/popErrorTypeDel", method = RequestMethod.POST)
    public Message popErrorTypeDel(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        return popStandardService.popErrorTypeDel(req, plec);
    }

    @RequestMapping(value = "/popSpecGet", method = RequestMethod.POST)
    public RESTful popSpecGet(HttpServletRequest req, Page p) {
        return popStandardService.popSpecGet(req, p);
    }

    @RequestMapping(value = "/popSpecAdd", method = RequestMethod.POST)
    public Message popSpecAdd(HttpServletRequest req, POP_SPEC ps) {
        return popStandardService.popSpecAdd(req,ps);
    }

    @RequestMapping(value = "/popSpecOneGet", method = RequestMethod.POST)
    public POP_SPEC popSpecOneGet(HttpServletRequest req, POP_SPEC ps) {
        return popStandardService.popSpecOneGet(req, ps);
    }

    @RequestMapping(value ="/popSpecDel", method = RequestMethod.POST)
    public Message popSpecDel(HttpServletRequest req, POP_SPEC ps) {
        return popStandardService.popSpecDel(req, ps);
    }

}
