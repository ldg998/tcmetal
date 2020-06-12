package com.mes.mesQms.Interim;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsInterimController {

    @RequestMapping(value = "/qmsAssyList")
    public String qmsAssyList() { return "mesQms/Interim/qmsAssyList/qmsAssyList"; }

    @RequestMapping(value = "/qmsAssyErrorMan")
    public String qmsAssyErrorMan() { return "mesQms/Interim/qmsAssyErrorMan/qmsAssyErrorMan"; }

    @RequestMapping(value = "/qmsAssyErrorList")
    public String qmsAssyErrorList() { return "mesQms/Interim/qmsAssyErrorList/qmsAssyErrorList"; }


}
