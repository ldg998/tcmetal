package com.mes.mesScm.InOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesScm.InOut.InOutMapper;
import com.mes.mesScm.InOut.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class InOutService extends ReturnFunction {
    @Autowired
    private InOutMapper inOutMapper;
    //실제 사용 소스
    public RESTful scmOutListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_OUT> rows = inOutMapper.scmOutListGet(p);
        return getListData(rows, p);
    }
    public RESTful scmInListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN> rows = inOutMapper.scmInListGet(p);
        return getListData(rows , p);
    }



    // 기존 프로젝트에서 긁어온 소스
    public Message scmInAdd(HttpServletRequest req, SCM_IN si)
    {
        si.setSite_code(getSessionData(req).getSite_code());
        si.setUser_code(getSessionData(req).getUser_code());
        return inOutMapper.scmInAdd(si);
    }

    public RESTful scmInGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN> rows = inOutMapper.scmInGet(p);
        return getListData(rows , p);
    }

    public RESTful scmInLineGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_LINE> rows = inOutMapper.scmInLineGet(p);
        return getListData(rows , p);
    }

    public RESTful scmStockRetGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_RET_SUB> rows = inOutMapper.scmStockRetGet(p);
        return getListData(rows , p);
    }

    public RESTful scmOutGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_OUT> rows = inOutMapper.scmOutGet(p);
        return getListData(rows , p);
    }



    public RESTful scmInSub1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_SUB> rows = inOutMapper.scmInSub1Get(p);
        return getListData(rows , p);
    }

    public List<SCM_IN_SUB> scmInSub2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return  inOutMapper.scmInSub1Get(p);
    }

    public Message scmInDel(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return  inOutMapper.scmInDel(p);
    }






    public RESTful scmOutOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_OUT_ORD> rows = inOutMapper.scmOutOrderGet(p);
        return getListData(rows , p);
    }

    public Message scmOutOrderAdd(HttpServletRequest req, SCM_OUT_ORD soo) {
        soo.setSite_code(getSessionData(req).getSite_code());
        soo.setUser_code(getSessionData(req).getUser_code());
        return inOutMapper.scmOutOrderAdd(soo);
    }

    public RESTful scmOutOrderSup1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_OUT_ORD_SUB> rows = inOutMapper.scmOutOrderSup1Get(p);
        return getListData(rows , p);
    }

    public List<SCM_OUT_ORD_SUB> scmOutOrderSup2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return inOutMapper.scmOutOrderSup1Get(p);
    }

    public Message scmOutOrderDel(HttpServletRequest req, SCM_OUT_ORD soo) {
        soo.setSite_code(getSessionData(req).getSite_code());
        return inOutMapper.scmOutOrderDel(soo);
    }

    public RESTful scmStockRetListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_RET_SUB> rows = inOutMapper.scmStockRetListGet(p);
        return  getListData(rows,p);
    }

    public RESTful scmInLineListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REIN_SUB> rows = inOutMapper.scmInLineListGet(p);
        return getListData(rows,p);
    }

    public RESTful scmInLineSubListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REIN_BCR> rows = inOutMapper.scmInLineSubListGet(p);
        return getListData(rows,p);
    }

    public RESTful scmInLot2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_SUB_ORD> rows = inOutMapper.scmInLot2Get(p);
        return getListData(rows , p);
    }

    public RESTful scmIOListGet(HttpServletRequest req, Page p) {
        List<SCM_IO> rows = inOutMapper.scmIOListGet(p);
        return getListData(rows , p);
        }

    public Message scmOutAdd(SCM_OUT out, HttpServletRequest req) {
        out.setSite_code(getSessionData(req).getSite_code());
        out.setUser_code(getSessionData(req).getUser_code());

        return inOutMapper.scmOutAdd(out);
    }

    public RESTful scmOutGet_lee(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_OUT> rows = inOutMapper.scmOutGet_lee(p);
        return getListData(rows , p);
    }

    public Message scmOutDel(HttpServletRequest req, Page p) {

        return inOutMapper.scmOutDel(p);
    }
}
