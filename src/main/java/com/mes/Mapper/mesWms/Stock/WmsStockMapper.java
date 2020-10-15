package com.mes.Mapper.mesWms.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_REV;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WmsStockMapper {
    List<POP_PLAN> wmsStockListGet(Page p);

    List<WMS_STOCK> wmsStockSumDayListGet(Page p);

    List<WMS_STOCK> wmsStockSumMonthListGet(Page p);

    List<WMS_STOCK> wmsStockSumGet(Page p);

    Message wmsStockRevAdd(WMS_STOCK_REV wsr);

    List<WMS_STOCK_REV> wmsStockRevGet(Page p);

    WMS_STOCK_REV wmsStockRevOneGet(Page p);

    int wmsOutsStockGet(Page p);

    List<WMS_STOCK> wmsStockGet(Page p);

    WMS_STOCK wmsStockOneGet(Page p);

    List<WMS_STOCK> wmsAllStockListGet(Page p);
}
