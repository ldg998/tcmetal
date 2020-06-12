package com.mes.mesQms.Interim;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesQms.Interim.QmsInterimMapper;
import com.mes.mesQms.Interim.DTO.QMS_ASSY;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
public class QmsInterimService extends UploadFunction {

    @Autowired
    private QmsInterimMapper qmsInterimMapper;

    public RESTful qmsAssyListGet(Page p, HttpServletRequest req) {
        List<QMS_ASSY> rows = qmsInterimMapper.qmsAssyListGet(p);
        return getListData(rows , p);
    }

    public RESTful qmsAssyErrorManGet(Page p, HttpServletRequest req) {
        List<QMS_ASSY> rows = qmsInterimMapper.qmsAssyErrorManGet(p);
        return getListData(rows, p);

    }

    public QMS_ASSY qmsAssyErrorManOneGet(Page p, HttpServletRequest req) {
        return qmsInterimMapper.qmsAssyErrorManOneGet(p);
    }

    public void qmsAssyErrorManAdd_NoneFile(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        qmsInterimMapper.qmsAssyErrorManAdd_NoneFile(files);
    }

    public void qmsAssyErrorManAdd_File2(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsAssyErrorMan";
        Files newFiles = setQmsRecvErrorManFile2(page_name,req,"C:/UploadFile/sensorview/qmsAssyErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        qmsInterimMapper.qmsAssyErrorManAdd_File2(files);
    }

    public void qmsAssyErrorManAdd_File3(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsAssyErrorMan";
        Files newFiles = setQmsRecvErrorManFile1(page_name,req,"C:/UploadFile/sensorview/qmsAssyErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        qmsInterimMapper.qmsAssyErrorManAdd_File3(files);
    }

    public void qmsAssyErrorManAdd_AllFile(Files files, MultipartHttpServletRequest req) {
        String page_name = "qmsAssyErrorMan";
        for(int i=2; 4>i; i++){
            String Key = MakeFileName_new(page_name,i);
            Files newFiles = AllFile(files, req,Key,i,"C:/UploadFile/sensorview/qmsAssyErrorMan/");
            qmsInterimMapper.qmsAssyErrorManAdd_AllFile(newFiles);
        }
    }


    public List<QMS_ASSY_NG_SUM> qmsAssyErrorListSumGet(Page p, HttpServletRequest req) {
        return qmsInterimMapper.qmsAssyErrorListSumGet(p);
    }
}
