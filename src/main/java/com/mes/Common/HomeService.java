package com.mes.Common;


import com.mes.Common.DataTransferObject.Page;
import com.mes.Mapper.Home.Home.HomeMapper;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class HomeService {

    @Autowired
    private HomeMapper mapper;

    public List<POP_PLAN> monitoringGet(HttpServletRequest req, Page p) {
        return  mapper.monitoringGet(req);
    }

    public List<POP_PLAN> prodReport1Get(HttpServletRequest req, Page p) {
        return mapper.prodReport1Get(req);
    }

    public List<QMS_PROD> prodMiddleListGet(HttpServletRequest req, Page p) {
        return mapper.prodMiddleListGet(req);
    }

    public List<POP_PLAN> prodLeadTimeGet(HttpServletRequest req, Page p) {
        return mapper.prodLeadTimeGet(req);
    }
}
