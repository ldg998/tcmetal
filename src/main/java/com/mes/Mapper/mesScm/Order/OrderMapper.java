package com.mes.Mapper.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Order.DTO.*;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper {

    List<SCM_IN_ORD> scmOrderGet(Page p);

    List<SCM_IN_ORD_SUB> scmOrderSubGet(Page p);

    Message scmOrderAdd(SCM_IN_ORD sio);

    Message scmOrderDel(SCM_IN_ORD sio);

    List<SCM_IN_ORD_SUB> scmOrderListGet(Page p);

    List<SCM_IN_ORD_SUB> scmOrderPartOneGet(SCM_IN_ORD_SUB sios);

    SCM_IN_ORD scmOrderOneGet(SCM_IN_ORD sio);

    Message scmOrderComp(SCM_IN_ORD sio);

    Message scmOrderReady(SCM_IN_ORD sio);


    List<SYS_PART_CD> scmOrderPartGet(Page p);

    List<SYS_PART_CD> scmOrderPartGet2(Page p);
}
