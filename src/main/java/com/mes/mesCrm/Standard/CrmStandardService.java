package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.Standard.CrmStandardMapper;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE_CD;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
public class CrmStandardService extends ReturnFunction {
    @Autowired
    private CrmStandardMapper sm;

    public Message sysSpartCostAdd(SYS_SPART_CD cs, HttpServletRequest req) {
        cs.setUser_code(getSessionData(req).getUser_code());
        return sm.sysSpartCostAdd(cs);
    }

    public Message sysSPartDel(SYS_SPART_CD cs, HttpServletRequest req) { return sm.sysSPartDel(cs);
    }

    public Message sysSPartCostDel(SYS_SPART_CD cs, HttpServletRequest req) { return sm.sysSPartCostDel(cs);
    }

    public Message sysERateAdd(SYS_ERATE_CD se, HttpServletRequest req) {
        se.setUser_code(getSessionData(req).getUser_code());
        return sm.sysERateAdd(se);
    }

    public RESTful sysERateGet(Page p, HttpServletRequest req) {  List<SYS_ERATE_CD> rows = sm.sysERateGet(p);
        return getListData(rows, p);
    }

    public RESTful sysERateOneGet(Page p, HttpServletRequest req) {
        List<SYS_ERATE_CD> rows = sm.sysERateOneGet(p);
        return getListData(rows, p);
    }

    public Message sysERateDel(Page p, HttpServletRequest req) { return sm.sysERateDel(p);
    }

    public List<SYS_SPART_CD> sysSpartAllGet(Page p, HttpServletRequest req) {
        return sm.sysSpartAllGet(p);
    }

    public SYS_SPART_CD sysSpartOneGet(Page p, HttpServletRequest req) {
        return sm.sysSpartOneGet(p);
    }

    public Message sysWoodAdd(SYS_WOOD_CD wo, HttpServletRequest req) {
        wo.setUser_code(getSessionData(req).getUser_code());
        return sm.sysWoodAdd(wo);
    }

    public RESTful sysWoodGet(Page p, HttpServletRequest req) {
        List<SYS_WOOD_CD> rows = sm.sysWoodGet(p);
        return getListData(rows, p);
    }

    public List<SYS_WOOD_CD> sysWoodOneGet(Page p, HttpServletRequest req) {

        return sm.sysWoodOneGet(p);
    }

    public Message sysWoodDelete(SYS_WOOD_CD wo, HttpServletRequest req) {
        return sm.sysWoodDelete(wo);
    }

    public List<SYS_WOOD_CD> sysWoodAllGet(SYS_WOOD_CD wo, HttpServletRequest req) {
        return  sm.sysWoodAllGet(wo);
    }

    public Message sysSpartAdd(SYS_SPART_CD cs, HttpServletRequest req) {
        cs.setUser_code(getSessionData(req).getUser_code());
        return sm.sysSpartAdd(cs);
    }

    public RESTful sysSpartGet(Page p, HttpServletRequest req) {
        List<SYS_SPART_CD> rows = sm.sysSpartGet(p);
        return getListData(rows, p);
    }

    public List<SYS_SPART_CD> partKindGet(Page p, HttpServletRequest req) { return sm.partKindGet(p);
    }

    public RESTful sysSpartCostGet(Page p, HttpServletRequest req) {
        List<SYS_SPART_CD> rows = sm.sysSpartCostGet(p);
        return getListData(rows, p);
    }

    public Message sysSpartCostAddWeight(SYS_SPART_CD ssc, HttpServletRequest req) {
        ssc.setUser_code(getSessionData(req).getUser_code());
        return sm.sysSpartCostAddWeight(ssc);
    }
}
