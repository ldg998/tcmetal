package com.mes.Mapper.mesOut.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutsStockMapper {

    List<OUTS_STOCK> outsStockSumGet(Page p);

    List<OUTS_STOCK> outsStockSumAllGet(Page p);

    List<OUTS_STOCK> outsStockSumMonthGet(Page p);

    List<OUTS_STOCK> outsErrorGet(Page p);

    List<OUTS_STOCK> outsSelectGet(Page p);

    Message outsErrorAdd(OUTS_STOCK os);
}
