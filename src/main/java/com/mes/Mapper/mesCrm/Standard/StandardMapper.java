package com.mes.Mapper.mesCrm.Standard;


import com.mes.Common.DataTransferObject.Message;
import com.mes.mesCrm.mesCrm.DTO.CRM_SPART;
import org.springframework.stereotype.Repository;

@Repository
public interface StandardMapper {


    Message sysSpartCostAdd(CRM_SPART cs);
}
