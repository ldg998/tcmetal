package com.mes.mesCrm.Orders;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.Orders.CrmOrdersMapper;
import com.mes.mesCrm.Orders.DTO.*;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
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
}
