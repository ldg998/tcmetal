package com.mes.mesWms.Stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WmsStockController {
    @RequestMapping(value = "/wmsStock")
    public String wmsStock() {
        return "mesWms/Stock/wmsStock/wmsStock";
    }
    @RequestMapping(value = "/wmsStockIOSumDay")
    public String wmsStockIOSumDay() {
        return "mesWms/Stock/wmsStockIOSumDay/wmsStockIOSumDay";
    }
    @RequestMapping(value = "/wmsStockIOSumMonth")
    public String wmsstockiosummonth() {
        return "mesWms/Stock/wmsStockIOSumMonth/wmsStockIOSumMonth";
    }
    @RequestMapping(value = "/wmsStockList")
    public String wmsStockList() { return  "mesWms/Stock/wmsStockList/wmsStockList"; }
    @RequestMapping(value = "/wmsStockReady")
    public String wmsStockReady() {
        return "mesWms/InOut/wmsStockReady/wmsStockReady";
    }
    @RequestMapping(value = "/wmsSumMonth")
    public String wmsSumMonth() {
        return "mesWms/InOut/wmsSumMonth/wmsSumMonth";
    }
    @RequestMapping(value = "/wmsSumRev")
    public String wmsSumRev() {
        return "mesWms/Stock/wmsSumRev/wmsSumRev";
    }



}
