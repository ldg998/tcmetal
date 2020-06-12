package com.mes.Common.Various;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Various.DTO.*;
import com.mes.mesCrm.mesCrm.DTO.SYS_ASSY_CABLE;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import com.mes.mesManager.Master.DTO.SYSCargo;
import com.mes.mesManager.Master.DTO.SYSCommon;
import com.mes.mesManager.Master.DTO.SYSMsg;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesPop.Standard.DTO.POP_LINE_USER_CD;
import com.mes.mesPop.Standard.DTO.POP_ROUTE_CD;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import com.mes.mesScm.Standard.DTO.*;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_TOTAL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class VariousRestController {

    @Autowired
    private VariousService variousService;

    @RequestMapping(value = "/sysSuppGet", method = RequestMethod.POST)
    public RESTful sysSuppGet(Page p) {
        return variousService.sysSuppGet(p);
    }


    @RequestMapping(value = "/sysBPartGroupSelectGet", method = RequestMethod.POST)
    public List<sysBPartGroup> sysBPartGroupSelectGet(Page p, HttpServletRequest req) {
        return variousService.sysBPartGroupSelectGet(p, req);

    }

    @RequestMapping(value = "/sysLocAllGet", method = RequestMethod.POST)
    public List<sysLoc> sysLocAllGet(Page p, HttpServletRequest req) {
        return variousService.sysLocAllGet(p, req);

    }

    @RequestMapping(value = "/sysCommonUnitGet", method = RequestMethod.POST)
    public List<SYSCommon> sysCommonUnitGet(Page p, HttpServletRequest req) {
        return variousService.sysCommonUnitGet(p, req);

    }


    @RequestMapping(value = "/sysBPartModalGet", method = RequestMethod.POST)
    public RESTful sysBPartModalGet(Page p, HttpServletRequest req) {
        return variousService.sysBPartModalGet(p, req);

    }

    @RequestMapping(value = "/sysBPartAllGet", method = RequestMethod.POST)
    public List<sysBPart> sysBPartAllGet(Page p, HttpServletRequest req) {
        return variousService.sysBPartAllGet(p, req);

    }

    @RequestMapping(value = "/sysCommonAllGet", method = RequestMethod.POST)
    public List<SYSCommon> sysCommonAllGet(Page p, HttpServletRequest req) {
        return variousService.sysCommonAllGet(p, req);

    }
    @RequestMapping(value = "/sysPartTypeGet", method = RequestMethod.POST)
    public List<SYSPartType> sysPartTypeGet(Page p, HttpServletRequest req) {
        return variousService.sysPartTypeGet(p, req);

    }

    @RequestMapping(value = "/sysPartTypeOneGet", method = RequestMethod.POST)
    public SYSPartType sysPartTypeOneGet(Page p, HttpServletRequest req) {
        return variousService.sysPartTypeOneGet(p, req);

    }

    @RequestMapping(value = "/qmsQcItemAllGet", method = RequestMethod.POST)
    public List<SYS_QC_ITEM> qmsQcItemAllGet(Page p, HttpServletRequest req) {
        return variousService.qmsQcItemAllGet(p, req);
    }
    @RequestMapping(value = "/tpmMachineAllGet", method = RequestMethod.POST)
    public List<TPM_MACHINE_CD> tpmMachineAllGet(Page p, HttpServletRequest req) {
        return variousService.tpmMachineAllGet(p,req);
    }

    @RequestMapping(value = "/getLine", method = RequestMethod.POST)
    public List<SYSProdLine> getLine(HttpServletRequest req, Page p) { return variousService.getLine(req, p); }

    @RequestMapping(value ="/tpmMachineRegItemAllGet", method = RequestMethod.POST)
    public List<TPM_REG_ITEM_CD> tpmMachineRegItemAllGet(HttpServletRequest req, Page p) { return variousService.tpmMachineRegItemAllGet(req,p); }

    @RequestMapping(value ="/menuAuthGet", method = RequestMethod.POST)
    public SYSAuthProgram menuAuthGet(HttpServletRequest req, Page p) { return variousService.menuAuthGet(req,p); }

    @RequestMapping(value = "/crmOrderModalGet", method = RequestMethod.POST)
    public RESTful crmOrderModalGet(HttpServletRequest req,Page p) {
        return variousService.crmOrderModalGet(req,p);
    }

    @RequestMapping(value = "/suppModalGet", method = RequestMethod.POST)
    public RESTful suppModalGet(HttpServletRequest req, Page p) {
        return variousService.suppModalGet(req,p);
    }

    @RequestMapping(value = "/sysPartGroupAllGet", method = RequestMethod.POST)
    public List<SYS_PART_GROUP> sysPartGroupAllGet(HttpServletRequest req,Page p){ return variousService.sysPartGroupAllGet(req,p);}

    @RequestMapping(value ="/partGroup1", method = RequestMethod.POST)
    public List<VT_PART_GROUP> partGroup1(HttpServletRequest req, Page p) { return variousService.partGroup1(req,p); }

    @RequestMapping(value ="/partGroup2", method = RequestMethod.POST)
    public List<VT_PART_GROUP> partGroup2(HttpServletRequest req, Page p) { return variousService.partGroup2(req,p); }

    @RequestMapping(value ="/partGroup3", method = RequestMethod.POST)
    public List<VT_PART_GROUP> partGroup3(HttpServletRequest req, Page p) { return variousService.partGroup3(req,p); }

    @RequestMapping(value = "/crmAssyCableAllGet", method = RequestMethod.POST)
    public List<SYS_ASSY_CABLE> crmAssyCableAllGet(HttpServletRequest req, Page p) { return variousService.crmAssyCableAllGet(req, p); }

    @RequestMapping(value = "/sysPartNameGroupAllGet", method = RequestMethod.POST)
    public List<SYS_COMMON2_CD> sysPartNameGroupAllGet(HttpServletRequest req, Page p){ return variousService.sysPartNameGroupAllGet(req,p);}

    @RequestMapping(value ="/popRouteGroupAllGet",method = RequestMethod.POST)
    public List<POP_ROUTE_CD> popRouteGroupAllGet(HttpServletRequest req, Page p){ return variousService.popRouteGroupAllGet(req, p);}

    @RequestMapping(value ="/sysPartNameAllGet",method = RequestMethod.POST)
    public List<SYS_PART_NAME> sysPartNameAllGet(HttpServletRequest req, Page p){ return variousService.sysPartNameAllGet(req, p);}

    @RequestMapping(value ="/sysProdLineAllGet",method = RequestMethod.POST)
    public List<SYSProdLine> sysProdLineAllGet(HttpServletRequest req, Page p){ return variousService.sysProdLineAllGet(req, p);}

    @RequestMapping(value ="/popLineUserAllGet",method = RequestMethod.POST)
    public List<POP_LINE_USER_CD> popLineUserAllGet(HttpServletRequest req, Page p){ return variousService.popLineUserAllGet(req, p);}

    @RequestMapping(value ="/wmsStockTotalOneGet",method = RequestMethod.POST)
    public WMS_STOCK_TOTAL wmsStockTotalOneGet(HttpServletRequest req, Page p){ return variousService.wmsStockTotalOneGet(req, p);}

    @RequestMapping(value ="/sysCargoAllGet",method = RequestMethod.POST)
    public List<SYSCargo> sysCargoAllGet(HttpServletRequest req, Page p){ return variousService.sysCargoAllGet(req, p);}

    @RequestMapping(value ="/sysProdTypeAllGet",method = RequestMethod.POST)
    public List<SYS_PROD_TYPE> sysProdTypeAllGet(HttpServletRequest req, Page p){ return variousService.sysProdTypeAllGet(req, p);}

    @RequestMapping(value ="/sysProdAllGet",method = RequestMethod.POST)
    public List<SYS_PROD_CD> sysProdAllGet(HttpServletRequest req, Page p){ return variousService.sysProdAllGet(req, p);}

    @RequestMapping(value ="/sysPartAllGet",method = RequestMethod.POST)
    public List<SYS_PART_CD> sysPartAllGet(HttpServletRequest req, Page p){ return variousService.sysPartAllGet(req, p);}

    @RequestMapping(value ="/msgGet")
    public SYSMsg msgGet(HttpServletRequest req, Page p) {return variousService.msgGet(req,p);}

    @RequestMapping(value ="/sysPartNamePartAllGet",method = RequestMethod.POST)
    public List<SYS_PART_CD> sysPartNamePartAllGet(HttpServletRequest req, Page p){ return variousService.sysPartNamePartAllGet(req, p);}

    @RequestMapping(value ="/sysMenuFavoritesAdd",method = RequestMethod.POST)
    public Message sysMenuFavoritesAdd(HttpServletRequest req, SYS_MENU_FAVORITES_CD smfc){ return variousService.sysMenuFavoritesAdd(req, smfc);}

    @RequestMapping(value ="/sysMenuFavoritesGet",method = RequestMethod.POST)
    public List<SYS_MENU_FAVORITES_CD> sysMenuFavoritesGet(HttpServletRequest req){ return variousService.sysMenuFavoritesGet(req);}
}
