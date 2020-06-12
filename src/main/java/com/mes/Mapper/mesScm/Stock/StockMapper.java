package com.mes.Mapper.mesScm.Stock;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Stock.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface StockMapper {

    List<SCM_STOCK_LIST> scmStockListGet(Page p);

    List<SCM_STOCK_SUM_DAY> scmStockSumDayListGet(Page p);

    List<SCM_STOCK_SUM_MONTH> scmStockSumMonthListGet(Page p);

    List<SCM_STOCK_REV_LIST> scmStockRevListGet(Page p);

    List<SCM_STOCK_REV> scmStockRevGet(Page p);

    SCM_STOCK_REV_LIST scmStockRevOneGet(Page p);

    Message scmStockRevAdd(SCM_STOCK_REV_LIST scm_stock_rev_list);
}
