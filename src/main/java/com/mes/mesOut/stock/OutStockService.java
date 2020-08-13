package com.mes.mesOut.stock;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesOut.Stock.OutsStockMapper;
import com.mes.mesManager.Master.DTO.SYSCommon;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
