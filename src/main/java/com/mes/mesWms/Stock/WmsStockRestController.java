package com.mes.mesWms.Stock;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class WmsStockRestController {
    @Autowired
    private WmsStockService wmsStockService;

    @RequestMapping(value = "/wmsStockListGet" , method = RequestMethod.POST)
    public RESTful wmsStockListGet(HttpServletRequest req, Page p) {
        return wmsStockService.wmsStockListGet(req, p);
    }

    @RequestMapping(value = "/wmsStockSumDayListGet", method = RequestMethod.POST)
    public RESTful wmsStockSumDayListGet(HttpServletRequest req, Page p) { return wmsStockService.wmsStockSumDayListGet(req, p); }

    @RequestMapping(value = "/wmsStockSumMonthListGet", method = RequestMethod.POST)
    public RESTful wmsStockSumMonthListGet(HttpServletRequest req, Page p) { return wmsStockService.wmsStockSumMonthListGet(req, p); }
}
