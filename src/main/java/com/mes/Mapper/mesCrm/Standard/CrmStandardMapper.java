package com.mes.Mapper.mesCrm.Standard;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE_CD;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesCrm.Standard.DTO.SYS_WOOD_CD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrmStandardMapper {


    Message sysSpartCostAdd(SYS_SPART_CD cs);

    Message sysSPartDel(SYS_SPART_CD cs);

    Message sysSPartCostDel(SYS_SPART_CD cs);

    Message sysERateAdd(SYS_ERATE_CD se);

    List<SYS_ERATE_CD> sysERateGet(Page p);

    List<SYS_ERATE_CD> sysERateOneGet(Page p);

    Message sysERateDel(Page p);

    List<SYS_SPART_CD> sysSpartAllGet(Page p);

    SYS_SPART_CD sysSpartOneGet(Page p);


    Message sysWoodAdd(SYS_WOOD_CD wo);

    List<SYS_WOOD_CD> sysWoodGet(Page p);

    List<SYS_WOOD_CD> sysWoodOneGet(Page p);

    Message sysWoodDelete(SYS_WOOD_CD wo);

    List<SYS_WOOD_CD> sysWoodAllGet(SYS_WOOD_CD wo);

    Message sysSpartAdd(SYS_SPART_CD cs);

    List<SYS_SPART_CD> sysSpartGet(Page p);

    List<SYS_SPART_CD> partKindGet(Page p);

    List<SYS_SPART_CD> sysSpartCostGet(Page p);
}
