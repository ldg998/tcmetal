package com.mes.mesOut.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OutStockController {

    @RequestMapping(value = "/outsError")
    public String outsError() { return "mesOut/stock/outsError/outsError"; }

    @RequestMapping(value = "/outsStockSum")
    public String outsStockSum() { return "mesOut/stock/outsStockSum/outsStockSum"; }

    @RequestMapping(value = "/outsStockSumMonth")
    public String outsStockSumMonth() { return "mesOut/stock/outsStockSumMonth/outsStockSumMonth"; }

}
