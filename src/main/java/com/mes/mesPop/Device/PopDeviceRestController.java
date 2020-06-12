package com.mes.mesPop.Device;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesPop.Device.DTO.POP_PC_CD;
import com.mes.mesPop.Standard.DTO.POP_TERMINAL_CD;
import com.mes.mesPop.Standard.DTO.POP_TERMINAL_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PopDeviceRestController {
    @Autowired
    private PopDeviceService popDeviceService;

    @RequestMapping(value = "/popPCGet", method = RequestMethod.POST)
    public RESTful popPCGet(HttpServletRequest req, Page p){
        return popDeviceService.popPCGet(req, p);
    }

    @RequestMapping(value = "/popPCOneGet", method = RequestMethod.POST)
    public POP_PC_CD popPCOneGet(HttpServletRequest req, Page p){
        return popDeviceService.popPCOneGet(req, p);
    }

    @RequestMapping(value = "/popPCAdd", method = RequestMethod.POST)
    public Message popPCAdd(HttpServletRequest req, POP_PC_CD ppc) {
        return popDeviceService.popPCAdd(req, ppc);
    }

    @RequestMapping(value = "/popPCDel", method = RequestMethod.POST)
    public Message popPCDel(HttpServletRequest req, POP_PC_CD ppc) {
        return popDeviceService.popPCDel(req,ppc);
    }

    @RequestMapping(value = "/popTerminalGet", method = RequestMethod.POST)
    public RESTful popTerminalGet(HttpServletRequest req, Page p){
        return popDeviceService.popTerminalGet(req, p);
    }

    @RequestMapping(value = "/popTerminalOneGet", method = RequestMethod.POST)
    public POP_TERMINAL_CD popTerminalOneGet(HttpServletRequest req, Page p) {
        return popDeviceService.popTerminalOneGet(req,p);
    }

    @RequestMapping(value = "/popTerminalAdd", method = RequestMethod.POST)
    public Message popTerminalAdd(HttpServletRequest req, POP_TERMINAL_CD ptc) {
        return popDeviceService.popTerminalAdd(req, ptc);
    }

    @RequestMapping(value ="/popTerminalDel", method = RequestMethod.POST)
    public Message popTerminalDel(HttpServletRequest req, POP_TERMINAL_CD ptc) {
        return popDeviceService.popTerminalDel(req, ptc);
    }

    @RequestMapping(value = "/popTerminalSubGet", method = RequestMethod.POST)
    public List<POP_TERMINAL_SUB> popTerminalSubGet(HttpServletRequest req, Page p){
        return popDeviceService.popTerminalSubGet(req, p);
    }

    @RequestMapping(value = "/popTerminalSubAdd", method = RequestMethod.POST)
    public Message popTerminalSubAdd(HttpServletRequest req, POP_TERMINAL_SUB pts) {
        return popDeviceService.popTerminalSubAdd(req, pts);
    }

    @RequestMapping(value ="/popTerminalSubDel", method = RequestMethod.POST)
    public Message popTerminalSubDel(HttpServletRequest req, POP_TERMINAL_SUB pts) {
        return popDeviceService.popTerminalSubDel(req, pts);
    }
}
