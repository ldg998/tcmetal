package com.mes.Mapper.mesTpm.Error;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErrorMapper {
    List<tpmMachineError> tpmMachineErrorGet(Page p);

    Message tpmMachineErrorDelete(Page p);

    Message tpmMachineErrorAdd(tpmMachineError tme);

    tpmMachineError tpmMachineErrorOneGet(Page p);
}
