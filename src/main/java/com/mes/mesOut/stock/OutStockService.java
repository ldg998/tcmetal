package com.mes.mesOut.stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesOut.Stock.OutsStockMapper;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class OutStockService extends ReturnFunction {
    @Autowired
    private OutsStockMapper outsStockMapper;

    public RESTful outsStockSumGet(Page p) {
        List<OUTS_STOCK> rows = outsStockMapper.outsStockSumGet(p);
        return getListData(rows , p);
    }

    public List<OUTS_STOCK> outsStockSumAllGet(Page p) {

        return outsStockMapper.outsStockSumAllGet(p);
    }

    public RESTful outsStockSumMonthGet(Page p) {
        List<OUTS_STOCK> rows = outsStockMapper.outsStockSumMonthGet(p);
        return getListData(rows , p);
    }

    public RESTful outsErrorGet(Page p) {
        List<OUTS_STOCK> rows = outsStockMapper.outsErrorGet(p);
        return getListData(rows , p);
    }

    public List<OUTS_STOCK> outsSelectGet(Page p) {
        return outsStockMapper.outsSelectGet(p);
    }

    public Message outsErrorAdd(HttpServletRequest req, OUTS_STOCK os) {
        os.setUser_code(getSessionData(req).getUser_code());
        return outsStockMapper.outsErrorAdd(os);
    }

    public Message outsErrorDel(HttpServletRequest req, OUTS_STOCK os) {  return outsStockMapper.outsErrorDel(os);
    }
}
