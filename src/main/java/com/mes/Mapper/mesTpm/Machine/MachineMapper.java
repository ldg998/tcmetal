package com.mes.Mapper.mesTpm.Machine;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_PART_CD;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MachineMapper {
    List<TPM_MACHINE_CD> tpmMCGet(Page p);
    List<TPM_MACHINE_CD> tpmMCFileGet(TPM_MACHINE_CD tmc);
    Message tpmMCAdd(TPM_MACHINE_CD tmc);

    TPM_MACHINE_CD tpmMCOneGet(TPM_MACHINE_CD tmc);

    Message tpmMCFileAdd(TPM_MACHINE_CD tmc2);

    Message tpmMCDel(TPM_MACHINE_CD tmc);

    List<TPM_MACHINE_PART_CD> tpmMCPartAllGet(Page p);

    Message tpmMCPartAdd(TPM_MACHINE_PART_CD tmpc);

    Message tpmMCPartDel(TPM_MACHINE_PART_CD tmpc);

    TPM_MACHINE_PART_CD tpmMCPartOneGet(TPM_MACHINE_PART_CD tmpc);
}
