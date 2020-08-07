package com.mes.Common.Various;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Common.Various.DTO.*;
import com.mes.Mapper.Various.VariousMapper;
import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
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
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Service
public class VariousService extends ReturnFunction {

    @Autowired
    private VariousMapper variousMapper;

    public RESTful sysSuppGet(Page p) {
        List<SYSSupp> rows = variousMapper.sysSuppGet(p);
        return getListData(rows , p);
    }


    public List<sysLoc> sysLocAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.sysLocAllGet(p);
    }

    public List<SYSCommon> sysCommonUnitGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.sysCommonUnitGet(p);
    }


    public List<SYSCommon> sysCommonAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.sysCommonAllGet(p);
    }

    public List<SYSPartType> sysPartTypeGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        if (p.getKeyword() == null){
            p.setKeyword("");
        }
        return variousMapper.sysPartTypeGet(p);
    }

    public List<SYS_QC_ITEM> qmsQcItemAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.qmsQcItemAllGet(p);
    }

    public List<TPM_MACHINE_CD> tpmMachineAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.tpmMachineAllGet(p);
    }
    public List<SYSProdLine> getLine(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.getLine(p);
    }

    public List<TPM_REG_ITEM_CD> tpmMachineRegItemAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.tpmMachineRegItemAllGet(p);
    }

    public SYSAuthProgram menuAuthGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return variousMapper.menuAuthGet(p);
    }

    public RESTful crmOrderModalGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<CRM_ORD_RECP> rows = variousMapper.crmOrderModalGet(p);
        return getListData(rows , p);
    }

    public RESTful suppModalGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSSupp> rows = variousMapper.suppModalGet(p);
        return getListData(rows, p);
    }

    public SYSPartType sysPartTypeOneGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.sysPartTypeOneGet(p);
    }


    public List<POP_ROUTE_CD> popRouteGroupAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.popRouteGroupAllGet(p);
    }




    public List<POP_LINE_USER_CD> popLineUserAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.popLineUserAllGet(p);
    }


    public List<SYS_PART_CD> sysPartAllGet(HttpServletRequest req, Page p) {
        return variousMapper.sysPartAllGet(p);
    }

    public SYSMsg msgGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return variousMapper.msgGet(p);
    }

    public Message sysMenuFavoritesAdd(HttpServletRequest req, SYS_MENU_FAVORITES_CD smfc) {
        smfc.setUser_code(getSessionData(req).getUser_code());
        return variousMapper.sysMenuFavoritesAdd(smfc);
    }

    public List<SYS_MENU_FAVORITES_CD> sysMenuFavoritesGet(HttpServletRequest req) {
        SYS_MENU_FAVORITES_CD m = new SYS_MENU_FAVORITES_CD();
        m.setUser_code(getSessionData(req).getUser_code());
        return variousMapper.sysMenuFavoritesGet(m);
    }

    public List<SYSSupp> suppAllGet(Page p) { return variousMapper.suppAllGet(p);
    }

    public List<SYSSupp> suppDeliveryPlaceGet(Page p) {
        return variousMapper.suppDeliveryPlaceGet(p);
    }
}
