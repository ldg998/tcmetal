package com.mes.mesCrm.Standard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CrmStandardController {
    @RequestMapping(value = "/sysSPart")
    public String sysSPart(){return "mesCrm/Standard/sysSPart/sysSPart";}
    @RequestMapping(value = "/sysERate")
    public String sysERate(){return "mesCrm/Standard/sysERate/sysERate";}
    @RequestMapping(value = "/sysWood")
    public String sysWood(){return "mesCrm/Standard/sysWood/sysWood";}
    @RequestMapping(value = "/sysSPartCost")
    public String sysSPartCost(){return "mesCrm/Standard/sysSPartCost/sysSPartCost";}

}
