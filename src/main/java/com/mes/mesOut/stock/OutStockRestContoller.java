package com.mes.mesOut.stock;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesOut.mesOut.OutsOutService;
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
}
