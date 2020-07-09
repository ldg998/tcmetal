package com.mes.mesQms.Middle;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsMiddleController {

    @RequestMapping(value = "/qmsProdMiddleList")
    public String qmsProdMiddleList() { return "mesQms/Middle/qmsProdMiddleList/qmsProdMiddleList"; }

    @RequestMapping(value = "/qmsProdMiddleErrorMan")
    public String qmsProdMiddleErrorMan() { return "mesQms/Middle/qmsProdMiddleErrorMan/qmsProdMiddleErrorMan"; }

    @RequestMapping(value = "/qmsProdMiddleErrorList")
    public String qmsProdMiddleErrorList() { return "mesQms/Middle/qmsProdMiddleErrorList/qmsProdMiddleErrorList"; }




}
