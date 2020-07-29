package com.mes.Mapper.mesCrm.Standard;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Standard.DTO.SYS_ERATE;
import com.mes.mesCrm.mesCrm.DTO.CRM_SPART;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StandardMapper {


    Message sysSpartCostAdd(CRM_SPART cs);

    Message sysSPartDel(CRM_SPART cs);

    Message sysSPartCostDel(CRM_SPART cs);

    Message sysERateAdd(SYS_ERATE se);

    List<SYS_ERATE> sysERateGet(Page p);

    List<SYS_ERATE> sysERateOneGet(Page p);

    Message sysERateDel(Page p);
}
