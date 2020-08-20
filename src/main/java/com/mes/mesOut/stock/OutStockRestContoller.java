package com.mes.mesOut.stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class OutStockRestContoller {
    @Autowired
    private OutStockService outStockService;


    @RequestMapping(value="/outsStockSumGet", method = RequestMethod.POST)
    public RESTful outsStockSumGet(Page p){
        return outStockService.outsStockSumGet( p);
    }

    @RequestMapping(value="/outsStockSumAllGet", method = RequestMethod.POST)
    public List<OUTS_STOCK> outsStockSumAllGet(Page p){
        return outStockService.outsStockSumAllGet( p);
    }

    @RequestMapping(value="/outsStockSumMonthGet", method = RequestMethod.POST)
    public RESTful outsStockSumMonthGet(Page p){
        return outStockService.outsStockSumMonthGet(p);
    }

    @RequestMapping(value="/outsErrorGet", method = RequestMethod.POST)
    public RESTful outsErrorGet(Page p){
        return outStockService.outsErrorGet(p);
    }

    @RequestMapping(value="/outsSelectGet", method = RequestMethod.POST)
    public List<OUTS_STOCK> outsSelectGet(Page p){
        return outStockService.outsSelectGet(p);
    }

    @RequestMapping(value="/outsErrorAdd", method = RequestMethod.POST)
    public Message outsErrorAdd(HttpServletRequest req,OUTS_STOCK os){ return outStockService.outsErrorAdd(req,os); }

   @RequestMapping(value="/outsErrorDel", method = RequestMethod.POST)
    public Message outsErrorDel(HttpServletRequest req,OUTS_STOCK os){ return outStockService.outsErrorDel(req,os); }




}
