package com.mes.Mapper.mesQms.Middle;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.File.DTO.Files;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Middle.DTO.QMS_PROD_FILE;
import com.mes.mesQms.Middle.DTO.QMS_PROD_NG_SUM;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QmsMiddleMapper {

    List<QMS_PROD> qmsProdMiddleListGet(Page p);

    QMS_PROD qmsProdMiddleListOneGet(Page p);

    List<QMS_PROD> qmsProdMiddleSubGet(Page p);

    List<QMS_PROD_NG_SUM> qmsProdMiddleErrorListSumGet(Page p);

    Message qmsProdMiddleErrorManFileAdd(Files files);

    Message qmsProdMiddleErrorManAdd(Files files);

    List<QMS_PROD_FILE> qmsProdMiddleFileGet(Page p);

    Message qmsProdMiddleListDel(Page p);
}
