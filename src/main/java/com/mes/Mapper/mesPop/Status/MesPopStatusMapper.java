package com.mes.Mapper.mesPop.Status;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.File.DTO.Files;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN_ORD_CD;
import com.mes.mesPop.PopStatus.DTO.POP_PROD;
import com.mes.mesPop.PopStatus.DTO.POP_PROD_MHR;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesPopStatusMapper {
    List<POP_PLAN_ORD_CD> popPlanOrderGet(Page p);

    List<POP_PLAN_ORD_CD> popPlanOrderOrd(Page p);

    List<POP_PLAN> popProdRangeGet(Page p);

    List<POP_PROD> popProdList1Get(Page p);

    void sysSPartDrawingAdd(Files files);

    void sysSPartDrawingAdd2(Files files);

    void sysSPartWoodAdd(Files files);

    void sysSPartWoodAdd2(Files files);

    List<POP_PLAN> popProdAnalysisGet(Page p);

    List<POP_PLAN> popProdReport1Get(Page p);

    List<POP_PLAN> popSpectroGet(Page p);

    List<POP_PROD_MHR> sysProdHRGet(Page p);

    List<POP_PLAN> sysProdSumGet(Page p);

    List<POP_PLAN> popProdListGet(Page p);

    List<POP_PLAN> popProdList2Get(Page p);

    List<POP_PROD> popProdReportGet(Page p);

    List<POP_PLAN> popMonitoringGet(Page p);

    List<POP_PLAN> popLotTrackingGet(Page p);

    Message sysProdHrAdd(POP_PROD_MHR ppm);

    Message sysProdHrDel(POP_PROD_MHR ppm);

    List<POP_PROD> popDownTimeGet(Page p);

    Message popSpectroAdd(POP_PLAN pp);

    List<List<Object>> popProdMeltGet(POP_PLAN pp);
}
