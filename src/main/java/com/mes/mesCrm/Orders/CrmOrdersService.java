package com.mes.mesCrm.Orders;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.Orders.CrmOrdersMapper;
import com.mes.mesCrm.Orders.DTO.*;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Service
public class CrmOrdersService extends ReturnFunction {
    @Autowired
    private CrmOrdersMapper crmOrdersMapper;

    public RESTful crmOrderRecpGet( Page p) {
        List<CRM_ORD_RECP> rows = crmOrdersMapper.crmOrderRecpGet(p);
        return getListData(rows , p);
    }

    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req) {
        crmOrdRecp.setUser_code(getSessionData(req).getUser_code());
        return crmOrdersMapper.crmOrderRecpAdd(crmOrdRecp);
    }

    public Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp) {


        return crmOrdersMapper.crmOrderRecpDel(crmOrdRecp);
    }

    public CRM_ORD_RECP crmOrderRecpOneGet(Page p) {
        return crmOrdersMapper.crmOrderRecpOneGet(p);

    }


    public List<CRM_ORD_RECP> crmOrderRecpModalGet(Page p) {
       return crmOrdersMapper.crmOrderRecpModalGet(p);
    }

    public Message wmsOutOrderAdd(HttpServletRequest req, WMS_OUT_ORD_SUB woos) {
        woos.setUser_code(getSessionData(req).getUser_code());
        return crmOrdersMapper.wmsOutOrderAdd(woos);
    }

    public RESTful wmsOutOrderGet(Page p) {
        List<WMS_OUT_ORD_SUB> rows = crmOrdersMapper.wmsOutOrderGet(p);
        return getListData(rows , p);
    }

    public List<WMS_OUT_ORD_SUB> wmsOutOrderOneGet(Page p) {
        return crmOrdersMapper.wmsOutOrderOneGet(p);
    }

    public Message wmsOutOrderDel(Page p) {
        return crmOrdersMapper.wmsOutOrderDel(p);
    }

    public RESTful crmShippingWmsOutGet(Page p) {
        List<WMS_OUT_SUB> rows = crmOrdersMapper.crmShippingWmsOutGet(p);
        return getListData(rows , p);
    }

    public WMS_OUT_SUB crmShippingWmsOutOneGet(Page p) {
        return crmOrdersMapper.crmShippingWmsOutOneGet(p);
    }

    public Message crmShippingAdd(CRM_SHIPPING cs, HttpServletRequest req) {
        cs.setUser_code(getSessionData(req).getUser_code());
        return crmOrdersMapper.crmShippingAdd(cs);
    }

    public RESTful crmShippingGet(Page p) {
        List<CRM_SHIPPING> rows = crmOrdersMapper.crmShippingGet(p);
        return getListData(rows , p);
    }

    public CRM_SHIPPING crmShippingOneGet(Page p) {
        return crmOrdersMapper.crmShippingOneGet(p);
    }

    public Message crmShippingDel(Page p) {
        return crmOrdersMapper.crmShippingDel(p);
    }


    public Message crmOrderRecpComp(HttpServletRequest req, CRM_ORD_RECP crmOrdRecp) {
        return crmOrdersMapper.crmOrderRecpComp(crmOrdRecp);
    }

    public Message wmsOutOrderComp(Page p) {
        return crmOrdersMapper.wmsOutOrderComp(p);
    }

    public RESTful crmPerformGet(Page p) {
        List<CRM_ORD_RECP> rows = crmOrdersMapper.crmPerformGet(p);
        return getListData(rows , p);
    }

    public List<CRM_SHIPPING> crmShippingListGet(Page p) {
        return crmOrdersMapper.crmShippingListGet(p);
    }

    public Message wmsInvoiceFormAdd(MultipartHttpServletRequest req, CRM_INVOICE_REPORT cir) throws IOException {
            cir.setUser_code(getSessionData(req).getUser_code());

            MultipartFile uploadedFile = null;
            File file = null;
            String FileName2 = "";
            String FileName3 = "";
            uploadedFile = req.getFile("file" );
        if (uploadedFile != null) {

            Date now = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss" );
            String FileName = format.format(now) + "_wmsInvoiceForm";
            String[] name = uploadedFile.getOriginalFilename().split("\\." );
            FileName2 = FileName + "." + name[name.length - 1];
            FileName3 = "/uploadFile/tcmetal/" + FileName2;

        }
        cir.setSigned_file(FileName3);

            Message m = crmOrdersMapper.wmsInvoiceFormAdd(cir);
            if (uploadedFile != null){
                if (!m.getResult().equals("NG")) {

                    File dir = new File("C:/UploadFile/tcmetal/wmsInvoiceForm" );
                    if (!dir.exists()) {
                        dir.mkdirs();
                    }


                    file = new File("C:/UploadFile/tcmetal/wmsInvoiceForm", FileName2);
                    //uploadedFile 을 file로 저장한다.
                    //물리적인 공간에 저장.
                    uploadedFile.transferTo(file);


                }
            }
            return m;
    }

    public RESTful wmsInvoiceFormGet(Page p) {
        List<CRM_INVOICE_REPORT> rows = crmOrdersMapper.wmsInvoiceFormGet(p);
        return getListData(rows , p);
    }

    public CRM_INVOICE_REPORT wmsInvoiceFormOneGet(Page p) {
        return crmOrdersMapper.wmsInvoiceFormOneGet(p);
    }

    public Message wmsInvoiceFormDel(Page p) {
        return crmOrdersMapper.wmsInvoiceFormDel(p);
    }
}
