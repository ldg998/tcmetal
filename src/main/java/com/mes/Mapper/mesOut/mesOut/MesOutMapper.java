package com.mes.Mapper.mesOut.mesOut;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesOut.inOut.DTO.OUTS_IO_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MesOutMapper {

    List<OUTS_IO_SUB> outsOutListGet(Page p);

    List<OUTS_IN_SUB> outsInListGet(Page p);

    List<OUTS_IO_CD> outsInReadyGet(Page p);

    List<OUTS_IO_CD> outsIOListGet(Page p);

    List<OUTS_IO_SUB> outsOutModalListGet(Page p);

    List<OUTS_IO_SUB> outsOutGet(Page p);

    Message outsOutAdd(OUTS_IO_SUB ois);
}
