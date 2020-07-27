package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
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

}
