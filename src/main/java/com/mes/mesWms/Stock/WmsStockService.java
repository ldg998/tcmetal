package com.mes.mesWms.Stock;


import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesWms.Stock.WmsStockMapper;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class WmsStockService extends ReturnFunction {
    @Autowired
    private WmsStockMapper wmsStockMapper;

    public RESTful wmsStockListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN> rows = wmsStockMapper.wmsStockListGet(p);
        return getListData(rows, p);
    }

    public RESTful wmsStockSumDayListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<WMS_STOCK> rows = wmsStockMapper.wmsStockSumDayListGet(p);
        return getListData(rows, p);
    }

    public RESTful wmsStockSumMonthListGet(HttpServletRequest req, Page p) {
        List<WMS_STOCK> rows = wmsStockMapper.wmsStockSumMonthListGet(p);
        return getListData(rows, p);
    }

    public RESTful wmsStockSumGet(HttpServletRequest req, Page p) {
        List<WMS_STOCK> rows = wmsStockMapper.wmsStockSumGet(p);
        return getListData(rows, p);
    }
}
