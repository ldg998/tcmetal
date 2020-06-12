package com.mes.mesTpm.Machine;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_PART_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class MachineRestController {
    @Autowired
    private MachineService machineService;

    @RequestMapping(value = "/tpmMCGet", method = RequestMethod.POST)
    public RESTful tpmMCGet(HttpServletRequest req, Page p) {
        return machineService.tpmMCGet(req, p);
    }

    @RequestMapping(value = "/tpmMCAdd", method = RequestMethod.POST)
    public Message tpmMCAdd(MultipartHttpServletRequest req, TPM_MACHINE_CD tmc) {
       return machineService.tpmMCAdd(req, tmc);
    }

    @RequestMapping(value = "/tpmMCOneGet", method = RequestMethod.POST)
    public TPM_MACHINE_CD tpmMCOneGet(HttpServletRequest req, TPM_MACHINE_CD tmc) {
        return machineService.tpmMCOneGet(req, tmc);
    }

    @RequestMapping(value = "/tpmMCDel", method = RequestMethod.POST)
    public Message tpmMCDel(HttpServletRequest req, TPM_MACHINE_CD tmc) {
        return machineService.tpmMCDel(req, tmc);
    }

    @RequestMapping(value = "/tpmMCPartAllGet", method = RequestMethod.POST)
    public List<TPM_MACHINE_PART_CD> tpmMCPartAllGet(HttpServletRequest req, Page p) {
        return machineService.tpmMCPartAllGet(req, p);
    }

    @RequestMapping(value = "/tpmMCPartOneGet", method = RequestMethod.POST)
    public TPM_MACHINE_PART_CD tpmMCPartOneGet(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        return machineService.tpmMCPartOneGet(req, tmpc);
    }

    @RequestMapping(value = "/tpmMCPartAdd", method = RequestMethod.POST)
    public Message tpmMCPartAdd(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        return machineService.tpmMCPartAdd(req, tmpc);
    }

    @RequestMapping(value = "/tpmMCPartDel", method = RequestMethod.POST)
    public Message tpmMCPartDel(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        return machineService.tpmMCPartDel(req, tmpc);
    }


}
