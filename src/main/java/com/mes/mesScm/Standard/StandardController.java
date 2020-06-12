package com.mes.mesScm.Standard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StandardController {

    @RequestMapping(value = "/sysPart")
    public String sysPart() {
        return "mesScm/Standard/sysPart/sysPart";
    }

    @RequestMapping(value = "/sysPartName")
    public String sysPartName() { return "mesScm/Standard/sysPartName/sysPartName"; }


    @RequestMapping(value = "/sysLoc")
    public String sysLoc() {
        return "mesScm/Standard/sysLoc/sysLoc";
    }

}
