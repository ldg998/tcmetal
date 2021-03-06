package com.mes.Mapper.mesScm.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.InOut.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InOutMapper {
    List<SCM_OUT> scmOutListGet(Page p);

    List<SCM_IN_SUB> scmInListGet(Page p);

    List<SCM_IO> scmIOListGet(Page p);

    Message scmInAdd(SCM_IN si);

    List<SCM_IN> scmInGet(Page p);

    List<SCM_OUT> scmOutGet(Page p);

    List<SCM_RET_SUB> scmStockRetGet(Page p);

    List<SCM_IN_SUB> scmInSub1Get(Page p);

    Message scmInDel(Page p);

    List<SCM_RET_SUB> scmStockRetListGet(Page p);

    List<SCM_IN_SUB_ORD> scmInLot2Get(Page p);

    Message scmOutAdd(SCM_OUT out);


    Message scmOutDel(Page p);

    List<SCM_IN_ORD_MODAL> scmInOrdModalGet(Page p);

    List<SCM_IN_SUB> scmInSub2Get(Page p);
}
