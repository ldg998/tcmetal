package com.mes.Mapper.mesOut.Stock;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutsStockMapper {

    List<OUTS_STOCK> outsStockSumGet(Page p);

    List<OUTS_STOCK> outsStockSumAllGet(Page p);
}
