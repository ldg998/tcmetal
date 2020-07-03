package com.mes.mesScm.Stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StockController {
    @RequestMapping(value = "/scmStockList")
    public String scmStockList() { return "mesScm/Stock/scmStockList/scmStockList"; }

    @RequestMapping(value ="/scmStockSumMonth")
    public String scmStockSumMonth() { return "mesScm/Stock/scmStockSumMonth/scmStockSumMonth"; }

    @RequestMapping(value ="/scmStockRev")
    public String scmStockRev() { return "mesScm/Stock/scmStockRev/scmStockRev"; }

    @RequestMapping(value ="/scmStockRevList")
    public String scmStockRevList() { return "mesScm/Stock/scmStockRevList/scmStockRevList"; }

}
