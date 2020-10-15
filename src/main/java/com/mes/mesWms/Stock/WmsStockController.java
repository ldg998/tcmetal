package com.mes.mesWms.Stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WmsStockController {

    @RequestMapping(value = "/wmsStockIOSumMonth")
    public String wmsstockiosummonth() {
        return "mesWms/Stock/wmsStockIOSumMonth/wmsStockIOSumMonth";
    }
    @RequestMapping(value = "/wmsStockList")
    public String wmsStockList() { return  "mesWms/Stock/wmsStockList/wmsStockList"; }


    @RequestMapping(value = "/wmsStockSum")
    public String wmsStockSum() {
        return "mesWms/Stock/wmsStockSum/wmsStockSum";
    }

    @RequestMapping(value = "/wmsStockSumMonth")
    public String wmsStockSumMonth() {
        return "mesWms/Stock/wmsStockSumMonth/wmsStockSumMonth";
    }

    @RequestMapping(value = "/wmsStockRev")
    public String wmsStockRev() {
        return "mesWms/Stock/wmsStockRev/wmsStockRev";
    }

    @RequestMapping(value = "/wmsStockRevList")
    public String wmsStockRevList() {
        return "mesWms/Stock/wmsStockRevList/wmsStockRevList";
    }

    @RequestMapping(value = "/wmsAllStockList")
    public String wmsAllStockList() {
        return "mesWms/Stock/wmsAllStockList/wmsAllStockList";
    }



}
