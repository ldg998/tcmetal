package com.mes.mesScm.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV_LIST;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class StockRestController {

    @Autowired
    private StockService stockService;

    @RequestMapping(value = "/scmStockSumDayListGet", method = RequestMethod.POST)
    public RESTful scmStockSumDayListGet(HttpServletRequest req, Page p) { return stockService.scmStockSumDayListGet(req, p); }

    @RequestMapping(value = "/scmStockListGet", method = RequestMethod.POST)
    public RESTful scmStockListGet(HttpServletRequest req, Page p) { return stockService.scmStockListGet(req, p); }

    @RequestMapping(value = "/scmStockSumMonthListGet", method = RequestMethod.POST)
    public RESTful scmStockSumMonthListGet(HttpServletRequest req, Page p) { return stockService.scmStockSumMonthListGet(req, p); }

    @RequestMapping(value = "/scmStockRevListGet", method = RequestMethod.POST)
    public RESTful scmStockRevListGet(HttpServletRequest req, Page p) { return stockService.scmStockRevListGet(req, p); }

    @RequestMapping(value = "/scmStockRevGet", method = RequestMethod.POST)
    public RESTful scmStockRevGet(HttpServletRequest req, Page p ) {return  stockService.scmStockRevGet(req,p); }

    @RequestMapping(value = "/scmStockRevOneGet", method = RequestMethod.POST)
    public SCM_STOCK_REV_LIST scmStockRevOneGet(HttpServletRequest req, Page p) {
        return stockService.scmStockRevOneGet(req, p); }

    @RequestMapping(value = "/scmStockRevAdd", method = RequestMethod.POST)
    public Message scmStockRevAdd(HttpServletRequest req, SCM_STOCK_REV_LIST scm_stock_rev_list) {
        return stockService.scmStockRevAdd(req, scm_stock_rev_list);
        }






}
