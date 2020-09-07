package com.mes.Mapper.mesCrm.Orders;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Orders.DTO.CRM_INVOICE_REPORT;
import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Orders.DTO.CRM_SHIPPING;
import com.mes.mesCrm.Orders.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
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

    List<WMS_OUT_ORD_SUB> wmsOutOrderOneGet(Page p);

    Message wmsOutOrderDel(Page p);

    List<WMS_OUT_SUB> crmShippingWmsOutGet(Page p);

    WMS_OUT_SUB crmShippingWmsOutOneGet(Page p);

    Message crmShippingAdd(CRM_SHIPPING cs);

    List<CRM_SHIPPING> crmShippingGet(Page p);

    CRM_SHIPPING crmShippingOneGet(Page p);

    Message crmShippingDel(Page p);

    Message crmOrderRecpComp(CRM_ORD_RECP crmOrdRecp);

    Message wmsOutOrderComp(Page p);

    List<CRM_ORD_RECP> crmPerformGet(Page p);

    List<CRM_SHIPPING> crmShippingListGet(Page p);

    Message wmsInvoiceFormAdd(CRM_INVOICE_REPORT cir);

    List<CRM_INVOICE_REPORT> wmsInvoiceFormGet(Page p);
}
