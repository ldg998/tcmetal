package com.mes.Mapper.Excel;

import com.mes.Common.Excel.DTO.Excel;
import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Orders.DTO.CRM_SHIPPING;
import com.mes.mesManager.Master.DTO.SYSSupp;
import com.mes.mesOut.inOut.DTO.OUTS_IO_SUB;
import com.mes.mesOut.stock.DTO.OUTS_STOCK;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Shipment.DTO.POP_MOLD_WASH;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IN_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IO;
import com.mes.mesScm.InOut.DTO.SCM_OUT;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_MONTH;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_REV;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExcelMapper {


    List<QMS_PROD_SUB> qmsAssyListDbList(Excel excel);

    List<SYSSupp> sysSuppListDbList(Excel excel);


    List<SCM_IN_ORD_SUB> scmOrderDbList(Excel excel);

    List<SCM_IN_SUB> scmInDbList(Excel excel);

    List<SCM_OUT> scmOutDbListGet(Excel excel);

    List<SCM_IO> scmIODbList(Excel excel);

    List<SCM_STOCK_SUM_DAY> scmStockSumDayDbList(Excel excel);

    List<SCM_STOCK_SUM_MONTH> scmStockSumMonthList(Excel excel);

    List<SCM_STOCK_REV> scmStockRevDbList(Excel excel);

    List<SCM_STOCK_REV_LIST> scmStockRevListDbList(Excel excel);

    List<WMS_IN_SUB> wmsInDbList(Excel excel);

    List<WMS_OUT_SUB> wmsOutListDbList(Excel excel);

    List<WMS_OUT_ORD_SUB> wmsOutReadyDbList(Excel excel);

    List<WMS_STOCK> wmsStockSumDbList(Excel excel);

    List<WMS_STOCK> wmsStockSumMonthDbList(Excel excel);

    List<WMS_STOCK_REV> wmsStockRevDbList(Excel excel);

    List<CRM_ORD_RECP> crmPerformDbList(Excel excel);

    List<CRM_SHIPPING> crmShippingList(Excel excel);

    List<QMS_RECV_SUB> qmsRecvListDbList(Excel excel);

    List<QMS_RECV_SUB> qmsRecvErrorListDbList(Excel excel);

    List<QMS_PROD> qmsProdMiddleDbList(Excel excel);

    List<QMS_PROD_SUB> qmsProdErrorListDbList(Excel excel);

    List<POP_MOLD_WASH> qmsMoldWashDbList(Excel excel);

    List<POP_PLAN> popProdRangeDbList(Excel excel);

    List<POP_PLAN> popProdList1DbList(Excel excel);

    List<POP_PLAN> popProdList2DbList(Excel excel);

    List<POP_PLAN> popProdReport1DbList(Excel excel);

    List<POP_PLAN> popSpectroDbList(Excel excel);

    List<OUTS_IO_SUB> outsInListDbList(Excel excel);

    List<OUTS_IO_SUB> outsIODbList(Excel excel);

    List<OUTS_STOCK> outsStockSumAllDbList(Excel excel);

    List<OUTS_STOCK> outsStockSumMonthDbList(Excel excel);

    List<POP_PLAN> popProdLeadTimeDBList(Excel excel);

    List<POP_PLAN> sysProdSumDB(Excel excel);
}
