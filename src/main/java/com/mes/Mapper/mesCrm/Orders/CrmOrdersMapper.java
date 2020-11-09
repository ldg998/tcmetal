package com.mes.Mapper.mesCrm.Orders;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Orders.DTO.*;
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

    CRM_INVOICE_REPORT wmsInvoiceFormOneGet(Page p);

    Message wmsInvoiceFormDel(Page p);

    List<CRM_INVOICE> wmsInvoiceGet(Page p);

    List<CRM_INVOICE_REPORT> invoiceRptNameGet(Page p);

    List<CRM_INVOICE_REPORT> invoiceTransGet(Page p);

    Message wmsInvoiceAdd(CRM_INVOICE ci);

    CRM_INVOICE wmsInvoiceOneGet(Page p);

    WMS_OUT_ORD_SUB_UPDATE wmsOutOrderUpdateGet(WMS_OUT_ORD_SUB_UPDATE woos);

    Message wmsOutOrderUpdate(WMS_OUT_ORD_SUB_UPDATE woos);

    List<List<Object>> crmInvoicePackingGet(Page p);

    List<CRM_ORD_RECP> crmOrderRecpEndDateGet(Page p);

    List<CRM_ORD_RECP> crmOrderRecpGet2(Page p);

    Message crmOrderRecpCancel(CRM_ORD_RECP crmOrdRecp);
}
