package com.mes.mesQms.Standard;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesQms.Standard.QmsStandardMapper;
import com.mes.mesQms.Standard.DTO.SYS_QC_DIAMETER;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@Slf4j
public class QmsStandardService extends ReturnFunction {

    @Autowired
    private QmsStandardMapper qmsStandardMapper;

    public Message qmsQcItemAdd(HttpServletRequest req, SYS_QC_ITEM sysQcItem) {
        sysQcItem.setSite_code(getSessionData(req).getSite_code());
        sysQcItem.setUser_code(getSessionData(req).getUser_code());
        return qmsStandardMapper.qmsQcItemAdd(sysQcItem);
    }
    public RESTful qmsQcItemGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_QC_ITEM> rows = qmsStandardMapper.qmsQcItemGet(p);
        return getListData(rows , p);
    }
    public SYS_QC_ITEM qmsQcItemOneGet(SYS_QC_ITEM sysQcItem, HttpServletRequest req) {
        sysQcItem.setSite_code(getSessionData(req).getSite_code());
        return qmsStandardMapper.qmsQcItemOneGet(sysQcItem);
    }

    public Message qmsQcItemDel(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return qmsStandardMapper.qmsQcItemDel(p);
    }

    public RESTful qmsTestStdGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_QC_DIAMETER> rows = qmsStandardMapper.qmsTestStdGet(p);
        return getListData(rows, p);
    }

    public Message qmsTestStdAdd(HttpServletRequest req, SYS_QC_DIAMETER vo) {
        vo.setSite_code(getSessionData(req).getSite_code());
        vo.setUser_code(getSessionData(req).getUser_code());
        return qmsStandardMapper.qmsTestStdAdd(vo);
    }

    public SYS_QC_DIAMETER qmsTestStdOneGet(SYS_QC_DIAMETER vo, HttpServletRequest req) {
        vo.setSite_code(getSessionData(req).getSite_code());
        return qmsStandardMapper.qmsTestStdOneGet(vo);
    }

    public Message qmsTestStdDelete(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsStandardMapper.qmsTestStdDelete(p);
    }
}
