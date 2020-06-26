package com.mes.mesWms.InOut;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WmsInOutController {
    @RequestMapping(value = "/wmsIn")
    public String wmsIn() { return "mesWms/InOut/wmsIn/wmsIn"; }
    @RequestMapping(value = "/wmsInList")
    public String wmsInList() { return "mesWms/InOut/wmsInList/wmsInList"; }
    @RequestMapping(value = "/wmsOutOrder")
    public String wmsOutOrder() {
        return "mesWms/InOut/wmsOutOrder/wmsOutOrder";
    }
    @RequestMapping(value = "/wmsOutList")
    public String wmsOutList() {
        return "mesWms/InOut/wmsOutList/wmsOutList";
    }
    @RequestMapping(value = "/wmsOutReady")
    public String wmsOutReady() {
        return "mesWms/InOut/wmsOutReady/wmsOutReady";
    }
    @RequestMapping(value = "/wmsStockReady")
    public String wmsStockReady() {
        return "mesWms/InOut/wmsStockReady/wmsStockReady";
    }
    @RequestMapping(value = "/wmsSumMonth")
    public String wmsSumMonth() {
        return "mesWms/InOut/wmsSumMonth/wmsSumMonth";
    }




}
