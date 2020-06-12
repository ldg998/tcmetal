package com.mes.mesScm.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesScm.Stock.StockMapper;
import com.mes.mesScm.Stock.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class StockService extends ReturnFunction {

    @Autowired
    private StockMapper stockMapper;

    public RESTful scmStockListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_LIST> rows = stockMapper.scmStockListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmStockSumDayListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_SUM_DAY> rows = stockMapper.scmStockSumDayListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmStockSumMonthListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_SUM_MONTH> rows = stockMapper.scmStockSumMonthListGet(p);
        return  getListData(rows, p);
    }

    public RESTful scmStockRevListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_REV_LIST> rows = stockMapper.scmStockRevListGet(p);
        return  getListData(rows, p);
    }

    public RESTful scmStockRevGet(HttpServletRequest req, Page p) {
        List<SCM_STOCK_REV> rows = stockMapper.scmStockRevGet(p);
        return  getListData(rows, p);
    }

    public SCM_STOCK_REV_LIST scmStockRevOneGet(HttpServletRequest req, Page p) {
        return stockMapper.scmStockRevOneGet(p);
    }

    public Message scmStockRevAdd(HttpServletRequest req, SCM_STOCK_REV_LIST scm_stock_rev_list) {
        scm_stock_rev_list.setUser_code(getSessionData(req).getUser_code());
        return stockMapper.scmStockRevAdd(scm_stock_rev_list);
    }

}
