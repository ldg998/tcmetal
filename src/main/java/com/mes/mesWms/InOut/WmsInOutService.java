package com.mes.mesWms.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesWms.InOut.WmsInOutMapper;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class WmsInOutService extends UploadFunction {
    @Autowired
    private WmsInOutMapper wmsInOutMapper;

    public RESTful wmsInListGet(HttpServletRequest req, Page p) {
        List<WMS_IN_SUB> rows = wmsInOutMapper.wmsInListGet(p);
        return getListData(rows , p);
    }

    public RESTful wmsOutListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<WMS_OUT_SUB> rows = wmsInOutMapper.wmsOutListGet(p);
        return getListData(rows , p);
    }

    public RESTful wmsOutReadyGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<WMS_OUT_ORD_SUB> rows = wmsInOutMapper.wmsOutReadyGet(p);
        return getListData(rows , p);
    }

    public RESTful wmsOutOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<WMS_OUT_ORD> rows = wmsInOutMapper.wmsOutOrderGet(p);
        return getListData(rows , p);
    }

    public RESTful wmsOutOrderSubGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<WMS_OUT_ORD_SUB> rows = wmsInOutMapper.wmsOutOrderSubGet(p);
        return getListData(rows , p);
    }

    public List<POP_PLAN> wmsOutOrderSubOneGet(HttpServletRequest req, Page p) {
        return wmsInOutMapper.wmsOutOrderSubOneGet(p);
    }

    public Message wmsOutOrderAdd(HttpServletRequest req, WMS_OUT_ORD_SUB woos) {
        woos.setSite_code(getSessionData(req).getSite_code());
        woos.setUser_code(getSessionData(req).getUser_code());
        return wmsInOutMapper.wmsOutOrderAdd(woos);
    }

    public Message wmsOutOrderDel(HttpServletRequest req, Page p) {
        return wmsInOutMapper.wmsOutOrderDel(p);
    }

    public List<POP_PLAN> wmsOrdPlanGet(HttpServletRequest req, Page p) {
        return wmsInOutMapper.wmsOrdPlanGet(p);

    }

    public List<WMS_OUT_ORD> wmsOutOrderOneGet(HttpServletRequest req, WMS_OUT_ORD woo) {
        return wmsInOutMapper.wmsOutOrderOneGet(woo);
    }

    public List<POP_PLAN> wmsOrdPlanUpGet(HttpServletRequest req, POP_PLAN pp) {
        return wmsInOutMapper.wmsOrdPlanUpGet(pp);
    }


    public void wmsOutListAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "wmsOutList";
        Files newFiles = qmsInspMachineAdd(page_name,req,"C:/UploadFile/tcmetal/wmsOutList/");
        files.setKey_value(newFiles.getKey_value());
        wmsInOutMapper.wmsOutListAdd(files);
    }

    public Message wmsOutListDel(Page p) {
        return wmsInOutMapper.wmsOutListDel(p);
    }

    public Message wmsOutListComp(Page p,HttpServletRequest req) {
        p.setUser_code(getSessionData(req).getUser_code());
        return wmsInOutMapper.wmsOutListComp(p);

    }
}
