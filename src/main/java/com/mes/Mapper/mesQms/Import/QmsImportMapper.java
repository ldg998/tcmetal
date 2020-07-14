package com.mes.Mapper.mesQms.Import;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesQms.Import.DTO.QMS_RECV;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.Common.File.DTO.Files;
import com.mes.mesScm.InOut.DTO.SCM_IN_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QmsImportMapper {
    List<QMS_RECV> qmsRecvGet(Page p);

    List<QMS_RECV_SUB> qmsRecvSubGet(Page p);

    List<QMS_RECV_SUB> qmsRecvErrorManGet(Page p);

    QMS_RECV_SUB qmsRecvErrorManOneGet(QMS_RECV_SUB qmsRecvSub);

    Message qmsRecvAdd(QMS_RECV_SUB qrs);

    Message qmsRecvFileAdd(QMS_RECV qr);

    List<QMS_RECV_SUB> qmsRecvMRBGet(Page p);

    Message qmsRecvMRBAdd(QMS_RECV_SUB qrs);

    Message qmsRecvMRBCancel(QMS_RECV_SUB qrs);

    List<SCM_IN_SUB> qmsRecvListGet(Page p);

    int qmsRecvErrorManAdd(Files files);

    int qmsRecvErrorManAdd_AllFile(Files files);

    int qmsRecvErrorManAdd3(Files newFiles);

    int qmsRecvErrorManAdd2(Files newFiles);

    List<QMS_RECV_NG_SUM> qmsRecvErrorListSumGet(Page p);

    SCM_IN_SUB qmsRecvListOneGet(SCM_IN_SUB sis);

    int qmsRecvErrorManAdd1(Files files);

    Message qmsRecvList_File_Upload(Files file);
}
