package com.mes.mesTpm.RegItem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RegItemController {
    @RequestMapping("/tpmMachineRegItem")
    public String tpmMachineRegItem(){
        return "mesTpm/RegItem/tpmMachineRegItem/tpmMachineRegItem";
    }
    @RequestMapping("/tpmMachineRegCycle")
    public String tpmMachineRegCycle(){
        return "mesTpm/RegItem/tpmMachineRegCycle/tpmMachineRegCycle";
}
    @RequestMapping("/tpmMachineRegComp")
    public String tpmMachineRegComp(){
        return "mesTpm/RegItem/tpmMachineRegComp/tpmMachineRegComp";
    }
    @RequestMapping("/tpmMachineRegAlarm")
    public String tpmMachineRegAlarm() { return "mesTpm/RegItem/tpmMachineRegAlarm/tpmMachineRegAlarm"; }
}
