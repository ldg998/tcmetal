package com.mes.mesScm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.PartType;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesScm.Standard.ScmStandardMapper;
import com.mes.mesScm.Standard.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class StandardService extends ReturnFunction {
    @Autowired
    private ScmStandardMapper scmStandardMapper;



    public RESTful sysLocGet(HttpServletRequest req, Page p) {
        List<sysLoc> rows = scmStandardMapper.sysLocGet(p);
        return getListData(rows , p);
    }

    public Message sysLocAdd(HttpServletRequest req, sysLoc vo) {
        vo.setUser_code(getSessionData(req).getUser_code());
        return scmStandardMapper.sysLocAdd(vo);
    }

    public Message sysLocDelete(Page p, HttpServletRequest req) {
        p.setKeyword(p.getKeyword());
        return scmStandardMapper.sysLocDelete(p);
    }

    public List<PartType> getPartType(HttpServletRequest req) {
        return scmStandardMapper.getPartType(getSessionData(req).getSite_code());
    }

    public sysLoc sysLocOneGet(HttpServletRequest req, Page p) {
        return scmStandardMapper.sysLocOneGet(p);
    }


    public List<sysLoc> sysLocAllGet(HttpServletRequest req, Page p) {
        return scmStandardMapper.sysLocGet(p);
    }


    public RESTful sysPartSuppGet(HttpServletRequest req, Page p) {
        List<SYS_PART_CD> rows = scmStandardMapper.sysPartSuppGet(p);
        return getListData(rows , p);
    }



    public RESTful sysPartGet(HttpServletRequest req, Page p) {
        List<SYS_PART_CD> rows = scmStandardMapper.sysPartGet(p);
        return getListData(rows ,p);
    }

    public SYS_PART_CD sysPartOneGet(HttpServletRequest req, Page p) {
        return scmStandardMapper.sysPartOneGet(p);
    }

    public Message sysPartAdd(HttpServletRequest req, SYS_PART_CD spc) {
        spc.setUser_code(getSessionData(req).getUser_code());
        return scmStandardMapper.sysPartAdd(spc);
    }

    public Message sysPartDel(HttpServletRequest req, SYS_PART_CD spc) {
        return scmStandardMapper.sysPartDel(spc);
    }

    public RESTful sysPartListGet(Page p) {

        List<SYS_PART_CD> rows = scmStandardMapper.sysPartListGet(p);
        return getListData(rows ,p);
    }


    public List<SYS_PART_CD> sysPartCostGet(HttpServletRequest req,Page p) {
        p.setUser_code(getSessionData(req).getUser_code());
        return scmStandardMapper.sysPartCostGet(p);
    }

    public Message sysPartCostAdd(HttpServletRequest req,SYS_PART_CD spc) {
        spc.setUser_code(getSessionData(req).getUser_code());
        return scmStandardMapper.sysPartCostAdd(spc);
    }

    public Message sysPartCostDel(HttpServletRequest req, SYS_PART_CD spc) { return scmStandardMapper.sysPartCostDel(spc);
    }
}
