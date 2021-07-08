package com.mes.mesQms.Middle;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesQms.Middle.QmsMiddleMapper;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Middle.DTO.QMS_PROD_FILE;
import com.mes.mesQms.Middle.DTO.QMS_PROD_NG_SUM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@Service
public class QmsMiddleService extends UploadFunction {
    @Autowired
    private QmsMiddleMapper qmsMiddleMapper;

    public RESTful qmsProdMiddleListGet(Page p) {
        List<QMS_PROD> rows = qmsMiddleMapper.qmsProdMiddleListGet(p);
        return getListData(rows , p);
    }

    public QMS_PROD qmsProdMiddleListOneGet(Page p) {
        return qmsMiddleMapper.qmsProdMiddleListOneGet(p);
    }

    public List<QMS_PROD> qmsProdMiddleSubGet(Page p) {
        return qmsMiddleMapper.qmsProdMiddleSubGet(p);
    }

    public List<QMS_PROD_NG_SUM> qmsProdMiddleErrorListSumGet(Page p) {
        return qmsMiddleMapper.qmsProdMiddleErrorListSumGet(p);
    }

    public Message qmsProdMiddleErrorManFileAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsProdMiddleErrorMan";
        Files newFiles = sysSPartFile5Add(page_name,req,"D:/UploadFile/tcmetal/qmsProdMiddleErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        return qmsMiddleMapper.qmsProdMiddleErrorManFileAdd(files);
    }

    public Message qmsProdMiddleErrorManAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        files.setKey_value("");
        return qmsMiddleMapper.qmsProdMiddleErrorManAdd(files);
    }

    public List<QMS_PROD_FILE> qmsProdMiddleFileGet(Page p) {
        return qmsMiddleMapper.qmsProdMiddleFileGet(p);
    }

    public Message qmsProdMiddleListDel(Page p) {
        return qmsMiddleMapper.qmsProdMiddleListDel(p);
    }
}
