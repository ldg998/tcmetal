package com.mes.mesOut.mesOut;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OutsOutController {

    @RequestMapping(value = "/outsOutList")
    public String outsOutList() { return "mesOut/mesOut/outsOutList/outsOutList"; }

    @RequestMapping(value = "/outsInList")
    public String outsInList() { return "mesOut/mesOut/outsInList/outsInList"; }

    @RequestMapping(value = "/outsInReady")
    public String outsInReady() { return "mesOut/mesOut/outsInReady/outsInReady"; }

    @RequestMapping(value = "/outsIOList")
    public String outsIOList() { return "mesOut/mesOut/outsIOList/outsIOList"; }
}
