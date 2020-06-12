package com.mes.Mapper.mesQms.Interim;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.File.DTO.Files;
import com.mes.mesQms.Interim.DTO.QMS_ASSY;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QmsInterimMapper {

    List<QMS_ASSY> qmsAssyListGet(Page p);
    List<QMS_ASSY> qmsAssyErrorManGet(Page p);
    QMS_ASSY qmsAssyErrorManOneGet(Page p);
    void qmsAssyErrorManAdd_NoneFile(Files files);
    void qmsAssyErrorManAdd_File2(Files files);
    void qmsAssyErrorManAdd_File3(Files files);
    void qmsAssyErrorManAdd_AllFile(Files newFiles);
    List<QMS_ASSY_NG_SUM> qmsAssyErrorListSumGet(Page p);
}
