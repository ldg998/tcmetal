package com.mes.Mapper.Various;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Various.DTO.*;
import com.mes.mesCrm.mesCrm.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.mesCrm.DTO.SYS_ASSY_CABLE;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import com.mes.mesManager.Master.DTO.SYSCargo;
import com.mes.mesManager.Master.DTO.SYSCommon;
import com.mes.mesManager.Master.DTO.SYSMsg;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesPop.Standard.DTO.POP_LINE_USER_CD;
import com.mes.mesPop.Standard.DTO.POP_ROUTE_CD;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import com.mes.mesScm.Standard.DTO.*;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_TOTAL;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VariousMapper {
    List<SYSSupp> sysSuppGet(Page p);

    List<sysBPartGroup> sysBPartGroupSelectGet(Page p);

    List<sysLoc> sysLocAllGet(Page p);

    List<SYSCommon> sysCommonUnitGet(Page p);

    List<sysBPart> sysBPartModalGet(Page p);

    List<sysBPart> sysBPartAllGet(Page p);

    List<SYSCommon> sysCommonAllGet(Page p);

    List<SYSPartType> sysPartTypeGet(Page p);

    List<SYS_QC_ITEM> qmsQcItemAllGet(Page p);

    List<TPM_MACHINE_CD> tpmMachineAllGet(Page p);
    List<SYSProdLine> getLine(Page p);

    List<TPM_REG_ITEM_CD> tpmMachineRegItemAllGet(Page p);

    SYSAuthProgram menuAuthGet(Page p);

    List<CRM_ORD_RECP> crmOrderModalGet(Page p);

    List<SYSSupp> suppModalGet(Page p);

    SYSPartType sysPartTypeOneGet(Page p);

    List<SYS_PART_GROUP> sysPartGroupAllGet(Page p);

    List<VT_PART_GROUP> partGroup1(Page p);

    List<VT_PART_GROUP> partGroup2(Page p);

    List<VT_PART_GROUP> partGroup3(Page p);

    List<SYS_ASSY_CABLE> crmAssyCableAllGet(Page p);

    List<SYS_COMMON2_CD> sysPartNameGroupAllGet(Page p);

    List<POP_ROUTE_CD> popRouteGroupAllGet(Page p);

    List<SYS_PART_NAME> sysPartNameAllGet(Page p);

    List<SYSProdLine> sysProdLineAllGet(Page p);

    List<POP_LINE_USER_CD> popLineUserAllGet(Page p);

    List<SYSCommon> sysCommonBoardGet(Page p);

    WMS_STOCK_TOTAL wmsStockTotalOneGet(Page p);

    List<SYSCargo> sysCargoAllGet(Page p);

    List<SYS_PROD_TYPE> sysProdTypeAllGet(Page p);

    List<SYS_PROD_CD> sysProdAllGet(Page p);

    List<SYS_PART_CD> sysPartAllGet(Page p);

    SYSMsg msgGet(Page p);

    List<SYS_PART_CD> sysPartNamePartAllGet(Page p);

    Message sysMenuFavoritesAdd(SYS_MENU_FAVORITES_CD smfc);

    List<SYS_MENU_FAVORITES_CD> sysMenuFavoritesGet(SYS_MENU_FAVORITES_CD m);
}
