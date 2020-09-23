package com.mes.Mapper.mesWms.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WmsInOutMapper {

    List<WMS_IN_SUB> wmsInListGet(Page p);

    List<WMS_OUT_SUB> wmsOutListGet(Page p);

    List<WMS_OUT_ORD_SUB> wmsOutReadyGet(Page p);

    List<WMS_OUT_ORD> wmsOutOrderGet(Page p);

    List<WMS_OUT_ORD_SUB> wmsOutOrderSubGet(Page p);

    Message wmsOutOrderAdd(WMS_OUT_ORD_SUB woos);

    Message wmsOutOrderDel(Page p);

    List<POP_PLAN> wmsOrdPlanGet(Page p);

    List<POP_PLAN> wmsOutOrderSubOneGet(Page p);

    List<WMS_OUT_ORD> wmsOutOrderOneGet(WMS_OUT_ORD woo);

    List<POP_PLAN> wmsOrdPlanUpGet(POP_PLAN pp);

    void wmsOutListAdd(Files files);

    Message wmsOutListDel(Page p);
}
