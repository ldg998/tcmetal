package com.mes.mesPop.Pop;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesPop.Pop.MesPopPopMapper;
import com.mes.mesPop.Pop.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class PopService extends ReturnFunction {
    @Autowired
    private MesPopPopMapper mesPopPopMapper;

    public RESTful popPlan1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN1_CD> rows = mesPopPopMapper.popPlan1Get(p);
        return getListData(rows, p);
    }

    public Message popPlan1Add(HttpServletRequest req, POP_PLAN1_CD pp1c) {
        pp1c.setSite_code(getSessionData(req).getSite_code());
        pp1c.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlan1Add(pp1c);
    }

    public Message popPlan2Add2(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlan2Add2(p);
    }

    public RESTful popPlan2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN2_CD> rows = mesPopPopMapper.popPlan2Get(p);
        return getListData(rows, p);
    }

    public POP_PLAN1_CD popPlan1OneGet(HttpServletRequest req, POP_PLAN1_CD pp1c) {
        pp1c.setSite_code(getSessionData(req).getSite_code());
        pp1c.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlan1OneGet(pp1c);
    }

    public Message popPlan1Del(HttpServletRequest req, POP_PLAN1_CD pp1c) {
        pp1c.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlan1Del(pp1c);
    }

    public Message popPlan2Add(HttpServletRequest req, POP_PLAN2_CD ppc) {
        ppc.setSite_code(getSessionData(req).getSite_code());
        ppc.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlan2Add(ppc);
    }

    public RESTful popPlan2Get2(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN2_CD> rows = mesPopPopMapper.popPlan2Get2(p);
        return getListData(rows, p);
    }

    public Message popPlan3Add(HttpServletRequest req, POP_PLAN3_CD ppc3) {
        ppc3.setSite_code(getSessionData(req).getSite_code());
        ppc3.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlan3Add(ppc3);
    }

    public RESTful popPlan3Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN3_CD> rows = mesPopPopMapper.popPlan3Get(p);
        return getListData(rows, p);
    }

    public List<POP_PLAN3_CD> popPlan3AllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlan3Get(p);
    }

//    public RESTful popPlanSubGet(HttpServletRequest req, Page p) {
//        p.setSite_code(getSessionData(req).getSite_code());
//        List<POP_PLAN_SUB_CD> rows = mesPopPopMapper.popPlanSubGet(p);
//        return getListData(rows, p);
//    }

    public Message popPlanSubAdd(HttpServletRequest req, POP_PLAN_SUB_CD ppsc) {
        ppsc.setSite_code(getSessionData(req).getSite_code());
        ppsc.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlanSubAdd(ppsc);
    }

    public POP_PLAN_SUB_CD popPlanSubOneGet(HttpServletRequest req, POP_PLAN_SUB_CD ppsc) {
        ppsc.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlanSubOneGet(ppsc);
    }

    public Message popPlanSubDel(HttpServletRequest req, POP_PLAN_SUB_CD ppsc) {
        ppsc.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlanSubDel(ppsc);
    }

    public RESTful popPlanASSYGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN_ASSY_CD> rows = mesPopPopMapper.popPlanASSYGet(p);
        return getListData(rows, p);
    }

    public Message popPlanASSYAdd(HttpServletRequest req, POP_PLAN_ASSY_CD ppac) {
        ppac.setSite_code(getSessionData(req).getSite_code());
        ppac.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlanASSYAdd(ppac);
    }

    public POP_PLAN_ASSY_CD popPlanASSYOneGet(HttpServletRequest req, POP_PLAN_ASSY_CD ppac) {
        ppac.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlanASSYOneGet(ppac);
    }

    public Message popPlanASSYDel(HttpServletRequest req, POP_PLAN_ASSY_CD ppac) {
        ppac.setSite_code(getSessionData(req).getSite_code());
        return mesPopPopMapper.popPlanASSYDel(ppac);
    }

    public Message popPlanAdd(HttpServletRequest req, POP_PLAN pp) {
        pp.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlanAdd(pp);

    }

    public RESTful popPlanGet(Page p) {
        List<POP_PLAN> rows = mesPopPopMapper.popPlanGet(p);
        return getListData(rows, p);
    }

    public POP_PLAN popPlanOneGet(Page p) {
        return mesPopPopMapper.popPlanOneGet(p);
    }

    public List<POP_PLAN_SUB> popPlanSubGet(Page p) {
        return mesPopPopMapper.popPlanSubGet(p);
    }

    public List<POP_PLAN> popPlanListGet(Page p) { return mesPopPopMapper.popPlanListGet(p); }

    public List<POP_PLAN> popPlanListOneGet(POP_PLAN p) {return  mesPopPopMapper.popPlanListOneGet(p);
    }

    public List<POP_PLAN> popPlanCheckGet(POP_PLAN p) { return mesPopPopMapper.popPlanCheckGet(p);
    }

    public Message popPlanCheckStatusUpdate(POP_PLAN p) {return mesPopPopMapper.popPlanCheckStatusUpdate(p);}

    public List<POP_PLAN> popPlanWorkDateGet(Page p) {
        return mesPopPopMapper.popPlanWorkDateGet(p);
    }

    public Message popPlanDel(Page p) {
        return mesPopPopMapper.popPlanDel(p);
    }

    public Message popPlanAdd2(HttpServletRequest req, POP_PLAN pp) {
        pp.setUser_code(getSessionData(req).getUser_code());
        return mesPopPopMapper.popPlanAdd2(pp);
    }

    public Message popPlanComp(Page p) {
        return mesPopPopMapper.popPlanComp(p);
    }

    public Message popPlanReturn(Page p) {return mesPopPopMapper.popPlanReturn(p);
    }

    public RESTful popPlanMeltGet2(Page p) {
        List<POP_PLAN> rows = mesPopPopMapper.popPlanMeltGet2(p);
        return getListData(rows, p);

    }
}
