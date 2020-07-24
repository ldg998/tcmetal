package com.mes.Mapper.mesCrm.mesCrm;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.mesCrm.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CrmMapper {

    List<CRM_ORD_RECP> crmOrderRecpGet(Page p);

    Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp);

    Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp);

    CRM_ORD_RECP crmOrderRecpOneGet(Page p);

    CRM_IMAGE crmImageGet(CRM_ORD_RECP crmOrdRecp);

    void crmImageUpdate(Page p2);

    void crmImageDelete(Page p2);

    void crmImageAdd(Page p2);

    List<CRM_ORD_RECP_IMG> crmImageAllGet(String c2);

    void crmImageAllDel(String c2);

    //List<CRM_ORD_RECP> crmProdOrderGet(Page p);

//    CRM_ORD_RECP crmProdOrderOneGet(CRM_ORD_RECP cor);
//
//    Message crmRecpAdd(CRM_ORD_RECP crmOrdRecp);
//
//    List<CRM_ORD_RECP> crmWorkListGet(Page p);
//
//    CRM_ORD_RECP crmWorkListOneGet(CRM_ORD_RECP cor);
//
//    Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp);

    List<CRM_PLAN> crmPlanGet(Page p);
    CRM_PLAN crmPlanOneGet(CRM_PLAN cp);
    Message crmPlanAdd(CRM_PLAN cp);

    Message crmPlanDelete(CRM_PLAN cp);

    Message crmWorkListUpdate(CRM_PLAN cp);

    List<CRM_ORD_RECP> crmMoneyGet(Page p);

    CRM_ORD_RECP crmMoneyOneGet(CRM_ORD_RECP cor);

    Message crmMoneyAdd(CRM_ORD_RECP cor);

    Message crmMoneyComp(CRM_ORD_RECP cor);

    Message crmWeAddUpdate(CRM_WE cw);

    List<CRM_WE> crmWeList(Page p);

    List<CRM_WE> crmWeOneGet(Page p);

    List<CRM_WE> crmWeListOneGet(Page p);

    Message crmWeDelete(Page p);

    Message sysWoodAdd(CRM_WOOD wo);

    List<CRM_WOOD> sysWoodGet(Page p);

    List<CRM_WOOD> sysWoodOneGet(Page p);

    Message sysWoodDelete(CRM_WOOD wo);

    List<CRM_WOOD> sysWoodAllGet(CRM_WOOD wo);

    Message sysSpartAdd(CRM_SPART cs);

    List<CRM_SPART> sysSpartGet(Page p);


//    List<SYS_ASSY_CABLE> crmAssyCableGet(Page p);
//
//    Message crmAssyCableAdd(SYS_ASSY_CABLE sac);
//
//    Message crmAssyCableDel(SYS_ASSY_CABLE sac);
//
//    List<CRM_OUT_SUB> crmOutListGet(Page p);
//
//    Message crmProdOrderAdd(CRM_ORD_RECP cor);
//
//    Message crmProdOrderDel(CRM_ORD_RECP cor);
//
//    Message crmWorkListAdd(CRM_ORD_RECP cor);
//

}
