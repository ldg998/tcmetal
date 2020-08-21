package com.mes.Mapper.mesQms.Shipment;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesQms.Shipment.DTO.*;
import com.mes.Common.File.DTO.Files;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QmsShipmentMapper {
    List<QMS_PROD_SUB> qmsProdErrorManGet(Page p);

    List<QMS_PROD> qmsProdGet(Page p);

    List<QMS_PROD_SUB> qmsProdSubGet(Page p);

    QMS_PROD_SUB qmsProdErrorManOneGet(QMS_PROD_SUB qmsProdSub);

    List<QMS_PROD_SUB> qmsProdMRBGet(Page p);

    Message qmsProdMRBAdd(QMS_PROD_SUB qps);

    Message qmsProdMRBCancel(QMS_PROD_SUB qps);

    Message qmsProdAdd(QMS_PROD_SUB qps);

    List<QMS_PROD_SUB> qmsProdListGet(Page p);

    List<QMS_PROD_RPT> qmsProdListRPTGet(Page p);

    List<QMS_PROD_NG_SUM> qmsProdErrorListSumGet(Page p);

    QMS_PROD_SUB qmsProdListOneGet(QMS_PROD_SUB qps);


    void qmsProdErrorManAdd(Files files);
    void qmsProdErrorManAdd2(Files files);
    void qmsProdErrorManAdd3(Files files);
    void qmsProdErrorManAdd_AllFile(Files newFiles);


    void sysSPartFile1Add(Files files);

    List<QMS_INSP_MACHINE> qmsInspMachineGet(Page p);
    QMS_INSP_MACHINE qmsInspMachineOneGet(QMS_INSP_MACHINE qms_insp_machine);
    Message qmsInspMachineAdd(Files files);
    Message qmsInspMachineDel(Page p);

    List<QMS_PROD_SUB> qmsProdListModalGet(Page p);

    Message qmsProdListDel(Page p);

    Message qmsProdListUpload(QMS_PROD_SUB qps);
}
