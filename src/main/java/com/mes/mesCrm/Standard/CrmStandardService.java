package com.mes.mesCrm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.Standard.StandardMapper;
import com.mes.mesCrm.mesCrm.DTO.CRM_SPART;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;


@Service
public class CrmStandardService extends ReturnFunction {
    @Autowired
    private StandardMapper sm;

    public Message sysSpartCostAdd(CRM_SPART cs, HttpServletRequest req) {
        cs.setUser_code(getSessionData(req).getUser_code());
        return sm.sysSpartCostAdd(cs);
    }
}
