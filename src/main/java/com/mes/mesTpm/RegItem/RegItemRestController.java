package com.mes.mesTpm.RegItem;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_ALARM;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_PLAN;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class RegItemRestController {
    @Autowired
    private RegItemService regItemService;

    @RequestMapping(value = "/tpmMachineRegItemGet", method = RequestMethod.POST)
    public RESTful tpmMachineRegItemGet(HttpServletRequest req, Page p) {
        return regItemService.tpmMachineRegItemGet(req, p);
    }
    @RequestMapping(value = "/tpmMachineRegItemOneGet", method = RequestMethod.POST)
    public TPM_REG_ITEM_CD tpmMachineRegItemOneGet(HttpServletRequest req, Page p) {
        return regItemService.tpmMachineRegItemOneGet(req, p);
    }

    @RequestMapping(value = "/tpmMachineRegItemAdd", method = RequestMethod.POST)
    public Message tpmMachineRegItemAdd(HttpServletRequest req, TPM_REG_ITEM_CD tric) {

        return regItemService.tpmMachineRegItemAdd(req, tric);
    }
    @RequestMapping(value = "/tpmMachineRegItemDel", method = RequestMethod.POST)
    public Message tpmMachineRegItemDel(TPM_REG_ITEM_CD tric, HttpServletRequest req) {
        return regItemService.tpmMachineRegItemDel(tric, req);

    }

    @RequestMapping(value = "/tpmMachineRegGet", method = RequestMethod.POST)
    public RESTful tpmMachineRegGet(HttpServletRequest req, Page p) {
        return regItemService.tpmMachineRegGet(req,p);
    }

    @RequestMapping(value = "/tpmMachineRegDel", method = RequestMethod.POST)
    public Message tpmMachineRegDel(TPM_MACHINE_REG tmr, HttpServletRequest req) {
        return regItemService.tpmMachineRegDel(tmr, req);
    }

    @RequestMapping(value = "/tpmMachineRegAdd", method = RequestMethod.POST)
    public Message tpmMachineRegAdd(HttpServletRequest req, TPM_MACHINE_REG tmr) {
        return regItemService.tpmMachineRegAdd(req,tmr);
    }

    @RequestMapping(value = "/tpmMachineRegOneGet", method = RequestMethod.POST)
    public TPM_MACHINE_REG tpmMachineRegOneGet(HttpServletRequest req, Page p){
        return regItemService.tpmMachineRegOneGet(req,p);
    }

    @RequestMapping(value = "/tpmMachineRegCompGet", method = RequestMethod.POST)
    public RESTful tpmMachineRegCompGet(HttpServletRequest req, Page p) {
        return regItemService.tpmMachineRegCompGet(req, p);
    }

    @RequestMapping(value ="/tpmMachineRegCompOneGet", method = RequestMethod.POST)
    public TPM_MACHINE_REG_PLAN tpmMachineRegCompOneGet(HttpServletRequest req,Page p){
        return regItemService.tpmMachineRegCompOneGet(req,p);
    }

    @RequestMapping(value ="/tpmMachineRegCompAdd", method = RequestMethod.POST)
    public Message tpmMachineRegCompAdd(HttpServletRequest req, TPM_MACHINE_REG_PLAN tmrp){
        return regItemService.tpmMachineRegCompAdd(req,tmrp);
    }

    @RequestMapping(value = "/tpmMachineRegAlarmGet", method = RequestMethod.POST)
    public RESTful tpmMachineRegAlarmGet(HttpServletRequest req, Page p) {
        return regItemService.tpmMachineRegAlarmGet(req, p);
    }

    @RequestMapping(value = "/tpmMachineRegAlarmAllGet", method = RequestMethod.POST)
    public List<TPM_MACHINE_REG_ALARM> tpmMachineRegAlarmAllGet(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra) {
        return regItemService.tpmMachineRegAlarmAllGet(req, tmra);
    }

    @RequestMapping(value ="/tpmMachineRegAlarmAdd", method = RequestMethod.POST)
    public Message tpmMachineRegAlarmAdd(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra){
        return regItemService.tpmMachineRegAlarmAdd(req,tmra);
    }
    @RequestMapping(value ="/tpmMachineRegAlarmDel", method = RequestMethod.POST)
    public Message tpmMachineRegAlarmDel(HttpServletRequest req, TPM_MACHINE_REG_ALARM tmra){
        return regItemService.tpmMachineRegAlarmDel(req,tmra);
    }

}
