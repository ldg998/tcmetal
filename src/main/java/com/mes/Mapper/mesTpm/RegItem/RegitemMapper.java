package com.mes.Mapper.mesTpm.RegItem;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_ALARM;
import com.mes.mesTpm.RegItem.DTO.TPM_MACHINE_REG_PLAN;
import com.mes.mesTpm.RegItem.DTO.TPM_REG_ITEM_CD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegitemMapper {

    List<TPM_REG_ITEM_CD> tpmMachineRegItemGet(Page p);

    TPM_REG_ITEM_CD tpmMachineRegItemOneGet(Page p);

    Message tpmMachineRegItemAdd(TPM_REG_ITEM_CD tric);

    Message tpmMachineRegItemDel(TPM_REG_ITEM_CD tric);

    List<TPM_MACHINE_REG> tpmMachineRegGet(Page p);

    Message tpmMachineRegDel(TPM_MACHINE_REG tmr);

    Message tpmMachineRegAdd(TPM_MACHINE_REG tmr);

    TPM_MACHINE_REG tpmMachineRegOneGet(Page p);

    List<TPM_MACHINE_REG_PLAN> tpmMachineRegCompGet(Page p);

    TPM_MACHINE_REG_PLAN tpmMachineRegCompOneGet(Page p);

    Message tpmMachineRegCompAdd(TPM_MACHINE_REG_PLAN tmrp);

    List<TPM_MACHINE_REG_ALARM> tpmMachineRegAlarmGet(Page p);

    List<TPM_MACHINE_REG_ALARM> tpmMachineRegAlarmAllGet(TPM_MACHINE_REG_ALARM tmra);

    Message tpmMachineRegAlarmAdd(TPM_MACHINE_REG_ALARM tmra);

    Message tpmMachineRegAlarmDel(TPM_MACHINE_REG_ALARM tmra);
}
