package com.mes.Mapper.mesPop.Pop;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.Pop.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesPopPopMapper {
    List<POP_PLAN1_CD> popPlan1Get(Page p);

    Message popPlan1Add(POP_PLAN1_CD pp1c);

    Message popPlan2Add2(Page p);

    List<POP_PLAN2_CD> popPlan2Get(Page p);

    POP_PLAN1_CD popPlan1OneGet(POP_PLAN1_CD pp1c);

    Message popPlan1Del(POP_PLAN1_CD pp1c);

    Message popPlan2Add(POP_PLAN2_CD ppc);

    List<POP_PLAN2_CD> popPlan2Get2(Page p);

    Message popPlan3Add(POP_PLAN3_CD ppc3);

    List<POP_PLAN3_CD> popPlan3Get(Page p);



    Message popPlanSubAdd(POP_PLAN_SUB_CD ppsc);

    POP_PLAN_SUB_CD popPlanSubOneGet(POP_PLAN_SUB_CD ppsc);

    Message popPlanSubDel(POP_PLAN_SUB_CD ppsc);

    List<POP_PLAN_ASSY_CD> popPlanASSYGet(Page p);

    Message popPlanASSYAdd(POP_PLAN_ASSY_CD ppac);

    POP_PLAN_ASSY_CD popPlanASSYOneGet(POP_PLAN_ASSY_CD ppac);

    Message popPlanASSYDel(POP_PLAN_ASSY_CD ppac);

    Message popPlanAdd(POP_PLAN pp);

    POP_PLAN popPlanOneGet(Page p2);

    void popPlanImage5Update(Page p2);

    List<POP_PLAN> popPlanGet(Page p);

    List<POP_PLAN_SUB> popPlanSubGet(Page p);

    List<POP_PLAN> popPlanListGet(Page p);

    List<POP_PLAN> popPlanListOneGet(POP_PLAN p);

    List<POP_PLAN> popPlanCheckGet(POP_PLAN p);

    Message popPlanCheckStatusUpdate(POP_PLAN p);

    List<POP_PLAN> popPlanWorkDateGet(Page p);

    Message popPlanDel(Page p);

    Message popPlanAdd2(POP_PLAN pp);
}
