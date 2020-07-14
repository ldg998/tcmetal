package com.mes.Mapper.mesScm.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.PartType;
import com.mes.mesScm.Standard.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ScmStandardMapper {

    List<sysLoc> sysLocGet(Page p);
    Message sysLocAdd(sysLoc vo);
    Message sysLocDelete(Page p);
    List<PartType> getPartType(String site_code);

    sysLoc sysLocOneGet(Page p);


    List<SYS_PART_CD> sysPartGet(Page p);

    SYS_PART_CD sysPartOneGet(Page p);

    Message sysPartAdd(SYS_PART_CD spc);

    Message sysPartDel(SYS_PART_CD spc);

    List<SYS_PART_CD> sysPartSuppGet(Page p);

}
