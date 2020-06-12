package com.mes.mesTpm.Machine;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MachineController {
    @RequestMapping("/tpmMC")
    public String tpmMachine(){
        return "mesTpm/Standard/tpmMC/tpmMC";
    }
}
