package com.mes.Mapper.mesPop.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.Standard.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesPopMapper {
    List<POP_BCR_FORM> popBcrFormGet(Page p);

    POP_BCR_FORM popBcrFormOneGet(POP_BCR_FORM pbf);

    Message popBcrFormAdd(POP_BCR_FORM pbf);

    Message popBcrFormDel(POP_BCR_FORM pbf);

    List<POP_ROUTE_CD> popRouteGet(Page p);

    POP_ROUTE_CD popRouteOneGet(POP_ROUTE_CD pr);

    Message popRouteAdd(POP_ROUTE_CD pr);

    Message popRouteDel(POP_ROUTE_CD pr);


    List<POP_LINE_USER_CD> popLineUserGet(Page p);

    Message popLineUserAdd(POP_LINE_USER_CD pluc);

    Message popLineUserDel(POP_LINE_USER_CD pluc);

    Message popErrorTypeAdd(POP_LINE_ERROR_CD plec);

    List<POP_LINE_ERROR_CD> popErrorTypeGet(Page p);

    Message popErrorTypeDel(POP_LINE_ERROR_CD plec);

    List<POP_SPEC> popSpecGet(Page p);

    Message popSpecAdd(POP_SPEC ps);

    POP_SPEC popSpecOneGet(POP_SPEC ps);

    Message popSpecDel(POP_SPEC ps);

    List<SYS_PROD_REPORT_SPEC> popReportSpecGet(Page p);

    SYS_PROD_REPORT_SPEC popReportSpecOneGet(Page p);

    Message popReportSpecAdd(SYS_PROD_REPORT_SPEC sprs);

    void popReportSpecImageUpdate(Page p2);
}
