package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE;
import com.mes.mesCrm.mesCrm.DTO.CRM_SPART;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class CrmStandardRestController {
    @Autowired
    private CrmStandardService crmService;


    @RequestMapping(value = "/sysSpartCostAdd",method = RequestMethod.POST)
    public Message sysSpartCostAdd(CRM_SPART cs, HttpServletRequest req){ return crmService.sysSpartCostAdd(cs,req); }


    @RequestMapping(value = "/sysSPartDel",method = RequestMethod.POST)
    public Message sysSPartDel(CRM_SPART cs, HttpServletRequest req){ return crmService.sysSPartDel(cs,req); }

     @RequestMapping(value = "/sysSPartCostDel",method = RequestMethod.POST)
    public Message sysSPartCostDel(CRM_SPART cs, HttpServletRequest req){ return crmService.sysSPartCostDel(cs,req); }

     @RequestMapping(value = "/sysERateAdd",method = RequestMethod.POST)
    public Message sysERateAdd(SYS_ERATE se, HttpServletRequest req){ return crmService.sysERateAdd(se,req); }

     @RequestMapping(value = "/sysERateGet",method = RequestMethod.POST)
    public RESTful sysERateGet(Page p, HttpServletRequest req){ return crmService.sysERateGet(p,req); }

    @RequestMapping(value = "/sysERateOneGet",method = RequestMethod.POST)
    public RESTful sysERateOneGet(Page p, HttpServletRequest req){ return crmService.sysERateOneGet(p,req); }

    @RequestMapping(value = "/sysERateDel",method = RequestMethod.POST)
    public Message sysERateDel(Page p, HttpServletRequest req){ return crmService.sysERateDel(p,req); }




}
