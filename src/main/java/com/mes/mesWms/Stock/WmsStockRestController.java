package com.mes.mesWms.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesManager.User.DTO.SYSDept;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_REV;
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

 @RequestMapping(value = "/wmsStockSumGet" , method = RequestMethod.POST)
    public RESTful wmsStockSumGet(HttpServletRequest req, Page p) {
        return wmsStockService.wmsStockSumGet(req, p);
    }

    @RequestMapping(value = "/wmsStockSumDayListGet", method = RequestMethod.POST)
    public RESTful wmsStockSumDayListGet(HttpServletRequest req, Page p) { return wmsStockService.wmsStockSumDayListGet(req, p); }

    @RequestMapping(value = "/wmsStockSumMonthListGet", method = RequestMethod.POST)
    public RESTful wmsStockSumMonthListGet(HttpServletRequest req, Page p) { return wmsStockService.wmsStockSumMonthListGet(req, p); }

    @RequestMapping(value = "/wmsStockRevAdd", method = RequestMethod.POST)
    public Message wmsStockRevAdd(WMS_STOCK_REV wsr, HttpServletRequest req) {
        return wmsStockService.wmsStockRevAdd(wsr, req);
    }

    @RequestMapping(value = "/wmsStockRevGet", method = RequestMethod.POST)
    public RESTful wmsStockRevGet(HttpServletRequest req, Page p) { return wmsStockService.wmsStockRevGet(req, p); }

    @RequestMapping(value = "/wmsStockRevOneGet", method = RequestMethod.POST)
    public WMS_STOCK_REV wmsStockRevOneGet(Page p) { return wmsStockService.wmsStockRevOneGet(p);}

    @RequestMapping(value = "/wmsOutsStockGet", method = RequestMethod.POST)
    public int wmsOutsStockGet(Page p) { return wmsStockService.wmsOutsStockGet(p);}

    @RequestMapping(value = "/wmsStockGet", method = RequestMethod.POST)
    public RESTful wmsStockGet(Page p) { return wmsStockService.wmsStockGet(p); }

    @RequestMapping(value = "/wmsStockOneGet", method = RequestMethod.POST)
    public WMS_STOCK wmsStockOneGet(Page p) { return wmsStockService.wmsStockOneGet(p); }
}
