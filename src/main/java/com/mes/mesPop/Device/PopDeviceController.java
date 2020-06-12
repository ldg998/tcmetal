package com.mes.mesPop.Device;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopDeviceController {

    @RequestMapping(value = "/popPC")
    public String popPC() { return "mesPop/Device/popPC/popPC"; }

    @RequestMapping(value = "/popTerminal")
    public String popTerminal() { return "mesPop/Device/popTerminal/popTerminal"; }
}
