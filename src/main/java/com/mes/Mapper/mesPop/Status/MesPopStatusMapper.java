package com.mes.Mapper.mesPop.Status;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN_ORD_CD;
import com.mes.mesPop.PopStatus.DTO.POP_PROD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesPopStatusMapper {
    List<POP_PLAN_ORD_CD> popPlanOrderGet(Page p);

    List<POP_PLAN_ORD_CD> popPlanOrderOrd(Page p);

    List<POP_PROD> popProdRangeGet(Page p);

    List<POP_PROD> popProdList1Get(Page p);
}
