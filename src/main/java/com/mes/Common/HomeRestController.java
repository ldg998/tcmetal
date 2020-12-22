package com.mes.Common;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class HomeRestController {

    @Autowired
    private HomeService homeService;

    @RequestMapping(value = "/monitoringGet", method = RequestMethod.POST)
    public List<POP_PLAN> monitoringGet(HttpServletRequest req, Page p){
        return homeService.monitoringGet(req, p);
    }


     @RequestMapping(value = "/prodReport1Get", method = RequestMethod.POST)
    public List<POP_PLAN> prodReport1Get(HttpServletRequest req, Page p){
        return homeService.prodReport1Get(req, p);
    }


     @RequestMapping(value = "/prodMiddleListGet", method = RequestMethod.POST)
    public List<QMS_PROD> prodMiddleListGet(HttpServletRequest req, Page p){
        return homeService.prodMiddleListGet(req, p);
    }


     @RequestMapping(value = "/prodLeadTimeGet", method = RequestMethod.POST)
    public List<POP_PLAN> prodLeadTimeGet(HttpServletRequest req, Page p){
        return homeService.prodLeadTimeGet(req, p);
    }




}
