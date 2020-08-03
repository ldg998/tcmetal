package com.mes.Mapper.mesCrm.Orders;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Orders.DTO.*;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CrmOrdersMapper {

    List<CRM_ORD_RECP> crmOrderRecpGet(Page p);

    Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp);

    Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp);

    CRM_ORD_RECP crmOrderRecpOneGet(Page p);


    List<CRM_ORD_RECP> crmOrderRecpModalGet(Page p);

    Message wmsOutOrderAdd(WMS_OUT_ORD_SUB woos);

    List<WMS_OUT_ORD_SUB> wmsOutOrderGet(Page p);
}
