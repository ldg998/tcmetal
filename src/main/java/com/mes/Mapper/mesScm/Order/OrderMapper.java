package com.mes.Mapper.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Order.DTO.*;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderMapper {
    List<SYS_ORD_IMAGE_CD> scmOrderImageGet(Page p);
    Message scmOrderImageAdd(SYS_ORD_IMAGE_CD soi);
    SYS_ORD_IMAGE_CD scmOrderImageOneGet(Page p2);
    void scmOrderImageUpdate(Page p2);
    Message scmOrderImageDel(SYS_ORD_IMAGE_CD soi);
    List<SYS_ORD_IMAGE_CD> scmOrderImageList(SYS_ORD_IMAGE_CD soi);
    List<SCM_IN_ORD> scmOrderGet(Page p);
    List<SCM_IN_ORD_SUB> scmOrderSubGet(Page p);
    Message scmOrderAdd(SCM_IN_ORD sio);
    Message scmOrderDel(SCM_IN_ORD sio);
    List<SCM_IN_ORD_SUB> scmOrderListGet(Page p);



    List<SCM_REQ_ORD> scmReqOrderGet(Page p);



    List<SCM_IN_ORD_SUB> scmOrderSub1Get(Page p);

    Message scmReqOrderAdd(SCM_REQ_ORD_SUB sros);

    Message scmOrderAdd2(SCM_IN_ORD sio);

    List<SCM_REQ_ORD_SUB> scmReqOrderSubGet(Page p);

    Message scmReqOrderDel(SCM_REQ_ORD sro);

    Message scmOrderCancel(SCM_IN_ORD sio);


    List<SCM_IN_ORD_SUB> scmOrderPartOneGet(SCM_IN_ORD_SUB sios);

    SCM_IN_ORD scmOrderOneGet(SCM_IN_ORD sio);

    Message scmOrderComp(SCM_IN_ORD sio);

    Message scmOrderReady(SCM_IN_ORD sio);

    List<SCM_IN_ORD_SUB_PDF> scmOrderSubPdfGet(Page p);

    List<SYS_PART_CD> scmOrderPartGet(Page p);
}
