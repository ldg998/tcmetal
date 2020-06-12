package com.mes.mesPop.PopStatus;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesPop.Status.MesPopStatusMapper;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN_ORD_CD;
import com.mes.mesPop.PopStatus.DTO.POP_PROD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class PopStatusService extends ReturnFunction {
    @Autowired
    private MesPopStatusMapper mesPopStatusMapper;

    public RESTful popPlanOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN_ORD_CD> rows = mesPopStatusMapper.popPlanOrderGet(p);
        return getListData(rows, p);
    }

    public List<POP_PLAN_ORD_CD> popPlanOrderOrd(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return mesPopStatusMapper.popPlanOrderOrd(p);
    }

    public RESTful popProdRangeGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PROD> rows = mesPopStatusMapper.popProdRangeGet(p);
        return getListData(rows, p);
    }

    public RESTful popProdList1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PROD> rows = mesPopStatusMapper.popProdList1Get(p);
        return getListData(rows, p);
    }
}
