package com.mes.mesQms.Outs;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsOutsController{

    @RequestMapping(value = "/qmsOutsList")
    public String qmsAssyList() { return "mesQms/Outs/qmsOutsList/qmsOutsList"; }

    @RequestMapping(value = "/qmsOutsErrorMan")
    public String qmsAssyErrorMan() { return "mesQms/Outs/qmsOutsErrorMan/qmsOutsErrorMan"; }

    @RequestMapping(value = "/qmsOutsErrorList")
    public String qmsAssyErrorList() { return "mesQms/Outs/qmsOutsErrorList/qmsOutsErrorList"; }


}
