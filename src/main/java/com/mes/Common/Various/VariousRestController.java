package com.mes.Common.Various;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Various.DTO.SYSPartType;
import com.mes.Common.Various.DTO.SYSSupp;
import com.mes.Common.Various.DTO.SYS_MENU_FAVORITES_CD;
import com.mes.Common.Various.DTO.SYS_QC_ITEM_CD;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import com.mes.mesManager.Master.DTO.SYSCommon;
import com.mes.mesManager.Master.DTO.SYSMsg;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesPop.Standard.DTO.POP_LINE_USER_CD;
import com.mes.mesPop.Standard.DTO.POP_ROUTE_CD;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
import com.mes.mesScm.Standard.DTO.sysLoc;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
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



    @RequestMapping(value = "/sysLocAllGet", method = RequestMethod.POST)
    public List<sysLoc> sysLocAllGet(Page p, HttpServletRequest req) {
        return variousService.sysLocAllGet(p, req);

    }
    @RequestMapping(value = "/syslineAllGroupGet", method = RequestMethod.POST)
    public List<sysLoc> syslineAllGroupGet(Page p, HttpServletRequest req) {
        return variousService.syslineAllGroupGet(p, req);

    }

    @RequestMapping(value = "/sysCommonUnitGet", method = RequestMethod.POST)
    public List<SYSCommon> sysCommonUnitGet(Page p, HttpServletRequest req) {
        return variousService.sysCommonUnitGet(p, req);

    }

    @RequestMapping(value ="/sysProdLineAllGet",method = RequestMethod.POST)
    public List<SYSProdLine> sysProdLineAllGet(HttpServletRequest req, Page p){
        return variousService.sysProdLineAllGet(req, p);}


    @RequestMapping(value = "/sysCommonAllGet", method = RequestMethod.POST)
    public List<SYSCommon> sysCommonAllGet(Page p, HttpServletRequest req) {
        return variousService.sysCommonAllGet(p, req);

    }

    @RequestMapping(value = "/sysLineGroupAllGet", method = RequestMethod.POST)
    public List<SYSCommon> sysLineGroupAllGet(Page p) {
        return variousService.sysLineGroupAllGet(p);

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




    @RequestMapping(value ="/popRouteGroupAllGet",method = RequestMethod.POST)
    public List<POP_ROUTE_CD> popRouteGroupAllGet(HttpServletRequest req, Page p){ return variousService.popRouteGroupAllGet(req, p);}


    @RequestMapping(value ="/popLineUserAllGet",method = RequestMethod.POST)
    public List<POP_LINE_USER_CD> popLineUserAllGet(HttpServletRequest req, Page p){ return variousService.popLineUserAllGet(req, p);}


    @RequestMapping(value ="/sysPartAllGet",method = RequestMethod.POST)
    public List<SYS_PART_CD> sysPartAllGet(HttpServletRequest req, Page p){ return variousService.sysPartAllGet(req, p);}

     @RequestMapping(value ="/sysQcItemCdAll",method = RequestMethod.POST)
    public List<SYS_QC_ITEM_CD> sysQcItemCdAll(HttpServletRequest req, Page p){ return variousService.sysQcItemCdAll(req, p);}

    @RequestMapping(value ="/msgGet")
    public SYSMsg msgGet(HttpServletRequest req, Page p) {return variousService.msgGet(req,p);}


    @RequestMapping(value ="/sysMenuFavoritesAdd",method = RequestMethod.POST)
    public Message sysMenuFavoritesAdd(HttpServletRequest req, SYS_MENU_FAVORITES_CD smfc){ return variousService.sysMenuFavoritesAdd(req, smfc);}

    @RequestMapping(value ="/sysMenuFavoritesGet",method = RequestMethod.POST)
    public List<SYS_MENU_FAVORITES_CD> sysMenuFavoritesGet(HttpServletRequest req){ return variousService.sysMenuFavoritesGet(req);}

    @RequestMapping(value ="/suppAllGet",method = RequestMethod.POST)
    public List<SYSSupp> suppAllGet(HttpServletRequest req,Page p){ return variousService.suppAllGet(p);}

    @RequestMapping(value ="/suppDeliveryPlaceGet",method = RequestMethod.POST)
    public List<SYSSupp> suppDeliveryPlaceGet(Page p){ return variousService.suppDeliveryPlaceGet(p);}


}
