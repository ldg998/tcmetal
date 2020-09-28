package com.mes.Mapper.Various;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Various.DTO.SYSPartType;
import com.mes.Common.Various.DTO.SYSSupp;
import com.mes.Common.Various.DTO.SYS_MENU_FAVORITES_CD;
import com.mes.Common.Various.DTO.SYS_QC_ITEM_CD;
import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import com.mes.mesManager.Master.DTO.SYSCommon;
import com.mes.mesManager.Master.DTO.SYSMsg;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesPop.Standard.DTO.POP_LINE_USER_CD;
import com.mes.mesPop.Standard.DTO.POP_ROUTE_CD;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
import com.mes.mesScm.Standard.DTO.sysLoc;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariousMapper {
    List<SYSSupp> sysSuppGet(Page p);


    List<sysLoc> sysLocAllGet(Page p);

    List<SYSCommon> sysCommonUnitGet(Page p);


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


    List<POP_ROUTE_CD> popRouteGroupAllGet(Page p);


    List<POP_LINE_USER_CD> popLineUserAllGet(Page p);

    List<SYS_PART_CD> sysPartAllGet(Page p);

    SYSMsg msgGet(Page p);

    Message sysMenuFavoritesAdd(SYS_MENU_FAVORITES_CD smfc);

    List<SYS_MENU_FAVORITES_CD> sysMenuFavoritesGet(SYS_MENU_FAVORITES_CD m);

    List<SYSSupp> suppAllGet(Page p);

    List<SYSSupp> suppDeliveryPlaceGet(Page p);

    List<sysLoc> syslineAllGroupGet(Page p);

    List<SYSProdLine> sysProdLineAllGet(Page p);

    List<SYS_QC_ITEM_CD> sysQcItemCdAll(Page p);

    List<SYSCommon> sysLineGroupAllGet(Page p);

    Message procedureLogAdd(Page p);
}
