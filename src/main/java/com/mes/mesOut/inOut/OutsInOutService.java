package com.mes.mesOut.inOut;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesOut.mesOut.MesOutMapper;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class OutsInOutService extends ReturnFunction {
    @Autowired
    private MesOutMapper mesOutMapper;

    public RESTful outsOutListGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<OUTS_OUT_SUB> rows = mesOutMapper.outsOutListGet(p);
        return getListData(rows , p);
    }

    public RESTful outsInListGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<OUTS_IN_SUB> rows = mesOutMapper.outsInListGet(p);
        return getListData(rows , p);
    }

    public RESTful outsInReadyGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<OUTS_IO_CD> rows = mesOutMapper.outsInReadyGet(p);
        return getListData(rows , p);
    }

    public RESTful outsIOListGet(Page p, HttpServletRequest req) {
        List<OUTS_IO_CD> rows = mesOutMapper.outsIOListGet(p);
        return getListData(rows , p);
    }

    public RESTful outsOutModalListGet(Page p, HttpServletRequest req) {
        List<OUTS_IN_SUB> rows = mesOutMapper.outsOutModalListGet(p);
        return getListData(rows , p);
    }
}
