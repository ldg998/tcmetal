package com.mes.mesWms.InOut;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WmsInOutController {
    @RequestMapping(value = "/wmsInList")
    public String wmsInList() { return "mesWms/InOut/wmsInList/wmsInList"; }
    @RequestMapping(value = "/wmsOutList")
    public String wmsOutList() {
        return "mesWms/InOut/wmsOutList/wmsOutList";
    }
    @RequestMapping(value = "/wmsOutReady")
    public String wmsOutReady() {
        return "mesWms/InOut/wmsOutReady/wmsOutReady";
    }








}
