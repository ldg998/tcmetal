package com.mes.mesOut.inOut;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OutInOutController {

    @RequestMapping(value = "/outsIOList")
    public String outsIOList() { return "mesOut/inOut/outsIOList/outsIOList"; }

    @RequestMapping(value = "/outsInList")
    public String outsInList() { return "mesOut/inOut/outsInList/outsInList"; }

    @RequestMapping(value = "/outsOut")
    public String outsOut() { return "mesOut/inOut/outsOut/outsOut"; }

}
