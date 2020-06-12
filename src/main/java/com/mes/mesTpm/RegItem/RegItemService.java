package com.mes.mesTpm.RegItem;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesTpm.RegItem.RegitemMapper;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_ALARM;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_PLAN;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class RegItemService extends ReturnFunction {
    @Autowired
    private RegitemMapper regitemMapper;

    public RESTful tpmMachineRegItemGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<TPM_REG_ITEM_CD> rows = regitemMapper.tpmMachineRegItemGet(p);
        return getListData(rows , p);
    }

    public TPM_REG_ITEM_CD tpmMachineRegItemOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegItemOneGet(p);
    }

    public Message tpmMachineRegItemAdd(HttpServletRequest req, TPM_REG_ITEM_CD tric) {
        tric.setSite_code(getSessionData(req).getSite_code());
        tric.setUser_code(getSessionData(req).getUser_code());
        return regitemMapper.tpmMachineRegItemAdd(tric);
    }

    public Message tpmMachineRegItemDel(TPM_REG_ITEM_CD tric, HttpServletRequest req) {
        tric.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegItemDel(tric);
    }

    public RESTful tpmMachineRegGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<TPM_MACHINE_REG> rows = regitemMapper.tpmMachineRegGet(p);
        return getListData(rows, p);
    }

    public Message tpmMachineRegDel(TPM_MACHINE_REG tmr, HttpServletRequest req) {
        tmr.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegDel(tmr);
    }

    public Message tpmMachineRegAdd(HttpServletRequest req, TPM_MACHINE_REG tmr) {
        tmr.setSite_code(getSessionData(req).getSite_code());
        tmr.setUser_code(getSessionData(req).getUser_code());
        return regitemMapper.tpmMachineRegAdd(tmr);
    }

    public TPM_MACHINE_REG tpmMachineRegOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegOneGet(p);
    }

    public RESTful tpmMachineRegCompGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<TPM_MACHINE_REG_PLAN> rows = regitemMapper.tpmMachineRegCompGet(p);
        return getListData(rows, p);
    }

    public TPM_MACHINE_REG_PLAN tpmMachineRegCompOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegCompOneGet(p);
    }

    public Message tpmMachineRegCompAdd(HttpServletRequest req, TPM_MACHINE_REG_PLAN tmrp) {
        tmrp.setSite_code(getSessionData(req).getSite_code());
        tmrp.setCheck_user_code(getSessionData(req).getUser_code());
        return regitemMapper.tpmMachineRegCompAdd(tmrp);
    }

    public RESTful tpmMachineRegAlarmGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<TPM_MACHINE_REG_ALARM> rows = regitemMapper.tpmMachineRegAlarmGet(p);
        return getListData(rows , p);
    }

    public List<TPM_MACHINE_REG_ALARM> tpmMachineRegAlarmAllGet(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra) {
        tmra.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegAlarmAllGet(tmra);
    }

    public Message tpmMachineRegAlarmAdd(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra) {
        tmra.setSite_code(getSessionData(req).getSite_code());
        tmra.setUser_code(getSessionData(req).getUser_code());
        return regitemMapper.tpmMachineRegAlarmAdd(tmra);
    }

    public Message tpmMachineRegAlarmDel(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra) {
        tmra.setSite_code(getSessionData(req).getSite_code());
        return regitemMapper.tpmMachineRegAlarmDel(tmra);
    }
}
