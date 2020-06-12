package com.mes.mesTpm.Error;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
public class MachineErrorRestController extends UploadFunction {

    @Autowired
    private MachineErrorService machineErrorService;

    @RequestMapping(value = "/tpmMachineErrorGet", method = RequestMethod.POST)
    public RESTful tpmMachineErrorGet(Page p, HttpServletRequest req) { return machineErrorService.tpmMachineErrorGet(p,req); }

    @RequestMapping(value = "/tpmMachineErrorDelete", method = RequestMethod.POST)
    public Message tpmMachineErrorDelete(Page p, HttpServletRequest req) { return machineErrorService.tpmMachineErrorDelete(p,req); }

    @RequestMapping(value = "/tpmMachineErrorAdd", method = RequestMethod.POST)
    public Message tpmMachineErrorAdd(HttpServletRequest req, tpmMachineError tme) { return machineErrorService.tpmMachineErrorAdd(req,tme); }

    @RequestMapping(value = "/tpmMachineErrorOneGet", method = RequestMethod.POST)
    public tpmMachineError tpmMachineErrorOneGet(HttpServletRequest req, Page p){ return machineErrorService.tpmMachineErrorOneGet(req,p);}

}
