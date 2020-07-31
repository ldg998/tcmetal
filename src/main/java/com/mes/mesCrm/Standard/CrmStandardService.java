package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.Standard.StandardMapper;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE;
import com.mes.mesCrm.mesCrm.DTO.CRM_SPART;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
public class CrmStandardService extends ReturnFunction {
    @Autowired
    private StandardMapper sm;

    public Message sysSpartCostAdd(CRM_SPART cs, HttpServletRequest req) {
        cs.setUser_code(getSessionData(req).getUser_code());
        return sm.sysSpartCostAdd(cs);
    }

    public Message sysSPartDel(CRM_SPART cs, HttpServletRequest req) { return sm.sysSPartDel(cs);
    }

    public Message sysSPartCostDel(CRM_SPART cs, HttpServletRequest req) { return sm.sysSPartCostDel(cs);
    }

    public Message sysERateAdd(SYS_ERATE se, HttpServletRequest req) {
        se.setUser_code(getSessionData(req).getUser_code());
        return sm.sysERateAdd(se);
    }

    public RESTful sysERateGet(Page p, HttpServletRequest req) {  List<SYS_ERATE> rows = sm.sysERateGet(p);
        return getListData(rows, p);
    }

    public RESTful sysERateOneGet(Page p, HttpServletRequest req) {
        List<SYS_ERATE> rows = sm.sysERateOneGet(p);
        return getListData(rows, p);
    }

    public Message sysERateDel(Page p, HttpServletRequest req) { return sm.sysERateDel(p);
    }

    public List<CRM_SPART> sysSpartAllGet(Page p, HttpServletRequest req) {
        return sm.sysSpartAllGet(p);
    }

    public CRM_SPART sysSpartOneGet(Page p, HttpServletRequest req) {
        return sm.sysSpartOneGet(p);
    }
}
