package com.mes.mesManager.Master;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MasterController {
    @RequestMapping(value="/sysCommon")
    public String sysCommon() { return "mesManager/Master/sysCommon/sysCommon"; }

    @RequestMapping(value="/sysMsg")
    public String sysMsg(){
        return "mesManager/Master/sysMsg/sysMsg";
    }

    @RequestMapping(value="/sysBoard")
    public String sysBoard(){
        return "mesManager/Master/sysBoard/sysBoard";
    }

    @RequestMapping(value="/sysProdLine")
    public String sysProdLine(){
        return "mesManager/Master/sysProdLine/sysProdLine";
    }

    @RequestMapping(value="/sysCargo")
    public String sysCargo(){
        return "mesManager/Master/sysCargo/sysCargo";
    }

    @RequestMapping(value="/sysSupp")
    public String sysSupp() { return "mesManager/Master/sysSupp/sysSupp"; }

    @RequestMapping(value="/sysERate")
    public String sysERate() { return "mesManager/Master/sysERate/sysERate"; }
}
