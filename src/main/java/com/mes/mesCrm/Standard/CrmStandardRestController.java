package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE_CD;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class CrmStandardRestController {
    @Autowired
    private CrmStandardService crmService;


    @RequestMapping(value = "/sysSpartCostAdd", method = RequestMethod.POST)
    public Message sysSpartCostAdd(SYS_SPART_CD cs, HttpServletRequest req) {
        return crmService.sysSpartCostAdd(cs, req);
    }


    @RequestMapping(value = "/sysSPartDel", method = RequestMethod.POST)
    public Message sysSPartDel(SYS_SPART_CD cs, HttpServletRequest req) {
        return crmService.sysSPartDel(cs, req);
    }

    @RequestMapping(value = "/sysSPartCostDel", method = RequestMethod.POST)
    public Message sysSPartCostDel(SYS_SPART_CD cs, HttpServletRequest req) {
        return crmService.sysSPartCostDel(cs, req);
    }

    @RequestMapping(value = "/sysERateAdd", method = RequestMethod.POST)
    public Message sysERateAdd(SYS_ERATE_CD se, HttpServletRequest req) {
        return crmService.sysERateAdd(se, req);
    }

    @RequestMapping(value = "/sysERateGet", method = RequestMethod.POST)
    public RESTful sysERateGet(Page p, HttpServletRequest req) {
        return crmService.sysERateGet(p, req);
    }

    @RequestMapping(value = "/sysERateOneGet", method = RequestMethod.POST)
    public RESTful sysERateOneGet(Page p, HttpServletRequest req) {
        return crmService.sysERateOneGet(p, req);
    }

    @RequestMapping(value = "/sysERateDel", method = RequestMethod.POST)
    public Message sysERateDel(Page p, HttpServletRequest req) {
        return crmService.sysERateDel(p, req);
    }

    @RequestMapping(value = "/sysSpartAllGet", method = RequestMethod.POST)
    public List<SYS_SPART_CD> sysSpartAllGet(Page p, HttpServletRequest req) {
        return crmService.sysSpartAllGet(p, req);
    }

    @RequestMapping(value = "/sysSpartOneGet", method = RequestMethod.POST)
    public SYS_SPART_CD sysSpartOneGet(Page p, HttpServletRequest req) {
        return crmService.sysSpartOneGet(p, req);
    }

    @RequestMapping(value = "/sysWoodGet", method = RequestMethod.POST)
    public RESTful sysWoodGet(Page p, HttpServletRequest req) {
        return crmService.sysWoodGet(p, req);
    }

    @RequestMapping(value = "/sysWoodOneGet", method = RequestMethod.POST)
    public List<SYS_WOOD_CD> sysWoodOneGet(Page p, HttpServletRequest req) {
        return crmService.sysWoodOneGet(p, req);
    }

    @RequestMapping(value = "/sysWoodAdd", method = RequestMethod.POST)
    public Message sysWoodAdd(SYS_WOOD_CD wo, HttpServletRequest req) {
        return crmService.sysWoodAdd(wo, req);
    }

    @RequestMapping(value = "/sysWoodDelete", method = RequestMethod.POST)
    public Message sysWoodDelete(SYS_WOOD_CD wo, HttpServletRequest req) {
        return crmService.sysWoodDelete(wo, req);
    }

    @RequestMapping(value = "/sysWoodAllGet", method = RequestMethod.POST)
    public List<SYS_WOOD_CD> sysWoodAllGet(SYS_WOOD_CD wo, HttpServletRequest req) {
        return crmService.sysWoodAllGet(wo, req);
    }

    @RequestMapping(value = "/sysSpartAdd", method = RequestMethod.POST)
    public Message sysSpartAdd(SYS_SPART_CD cs, HttpServletRequest req) {
        return crmService.sysSpartAdd(cs, req);
    }

    @RequestMapping(value = "/sysSpartGet", method = RequestMethod.POST)
    public RESTful sysSpartGet(Page p, HttpServletRequest req) {
        return crmService.sysSpartGet(p, req);
    }

    @RequestMapping(value = "/partKindGet", method = RequestMethod.POST)
    public List<SYS_SPART_CD> partKindGet(Page p, HttpServletRequest req) {
        return crmService.partKindGet(p, req);
    }

    @RequestMapping(value = "/sysSpartCostGet", method = RequestMethod.POST)
    public RESTful sysSpartCostGet(Page p, HttpServletRequest req) {
        return crmService.sysSpartCostGet(p, req);
    }
}
