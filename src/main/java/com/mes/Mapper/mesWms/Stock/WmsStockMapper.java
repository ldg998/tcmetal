package com.mes.Mapper.mesWms.Stock;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WmsStockMapper {
    List<POP_PLAN> wmsStockListGet(Page p);

    List<WMS_STOCK> wmsStockSumDayListGet(Page p);

    List<WMS_STOCK> wmsStockSumMonthListGet(Page p);
}
