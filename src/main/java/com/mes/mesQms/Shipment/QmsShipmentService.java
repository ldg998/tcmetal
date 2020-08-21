package com.mes.mesQms.Shipment;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesQms.Shipment.QmsShipmentMapper;
import com.mes.mesQms.Shipment.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class QmsShipmentService extends UploadFunction {

    @Autowired
    private QmsShipmentMapper qmsShipmentMapper;

    public RESTful qmsProdErrorManGet(Page p, HttpServletRequest req) {
        List<QMS_PROD_SUB> rows = qmsShipmentMapper.qmsProdErrorManGet(p);
        return getListData(rows, p);
    }

    public RESTful qmsProdGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_PROD> rows = qmsShipmentMapper.qmsProdGet(p);
        return getListData(rows, p);
    }

    public RESTful qmsProdSubGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_PROD_SUB> rows = qmsShipmentMapper.qmsProdSubGet(p);
        return getListData(rows, p);
    }

    public List<QMS_PROD_SUB> qmsProdSubAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdSubGet(p);
    }

    public QMS_PROD_SUB qmsProdErrorManOneGet(QMS_PROD_SUB qmsProdSub, HttpServletRequest req) {
        qmsProdSub.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdErrorManOneGet(qmsProdSub);
    }

    public RESTful qmsProdMRBGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_PROD_SUB> rows = qmsShipmentMapper.qmsProdMRBGet(p);
        return getListData(rows, p);
    }

    public Message qmsProdMRBAdd(HttpServletRequest req, QMS_PROD_SUB qps) {
        qps.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdMRBAdd(qps);
    }

    public Message qmsProdMRBCancel(HttpServletRequest req, QMS_PROD_SUB qps) {
        qps.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdMRBCancel(qps);
    }

    public Message qmsProdAdd(HttpServletRequest req, QMS_PROD_SUB qps) {
        qps.setSite_code(getSessionData(req).getSite_code());
        qps.setUser_code(getSessionData(req).getUser_code());
        return qmsShipmentMapper.qmsProdAdd(qps);
    }

    public RESTful qmsProdListGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_PROD_SUB> rows = qmsShipmentMapper.qmsProdListGet(p);
        return getListData(rows, p);
    }

    public List<QMS_PROD_RPT> qmsProdListRPTGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdListRPTGet(p);
    }
    public void qmsProdErrorManAdd_NoneFile(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        qmsShipmentMapper.qmsProdErrorManAdd(files);
    }

    public void qmsProdErrorManAdd_File2(Files files, MultipartHttpServletRequest req, String path) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsProdErrorMan";
        Files newFiles = setQmsRecvErrorManFile2(page_name,req,path);
        files.setKey_value(newFiles.getKey_value());
        qmsShipmentMapper.qmsProdErrorManAdd2(files);
    }

    public void qmsProdErrorManAdd_File3(Files files, MultipartHttpServletRequest req, String path) {
        files.setUser_code(getSessionData(req).getUser_code());

        String page_name = "qmsProdErrorMan";
        Files newFiles = setQmsRecvErrorManFile3(page_name,req,path);
        files.setKey_value(newFiles.getKey_value());
        qmsShipmentMapper.qmsProdErrorManAdd3(files);
    }

    public void qmsProdErrorManAdd_AllFile(Files files, MultipartHttpServletRequest req,String path) {
        String page_name = "qmsProdErrorMan";
        for(int i=2; 4>i; i++){
            String Key = MakeFileName_new(page_name,i);
            Files newFiles = AllFile(files, req,Key,i,path);

            qmsShipmentMapper.qmsProdErrorManAdd_AllFile(newFiles);
        }
    }

    public List<QMS_PROD_NG_SUM> qmsProdErrorListSumGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsShipmentMapper.qmsProdErrorListSumGet(p);
    }


    public QMS_PROD_SUB qmsProdListOneGet(HttpServletRequest req, QMS_PROD_SUB qps) {
        return qmsShipmentMapper.qmsProdListOneGet(qps);
    }

    public void sysSPartFile1Add(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "sysSPartFile1Add";
        Files newFiles = sysSPartFile1Add(page_name,req,"C:/UploadFile/tcmetal/sysSPartFile1Add/");
        files.setKey_value(newFiles.getKey_value());
        qmsShipmentMapper.sysSPartFile1Add(files);
    }


    public RESTful qmsInspMachineGet(Page p, HttpServletRequest req) {
        List<QMS_INSP_MACHINE> rows = qmsShipmentMapper.qmsInspMachineGet(p);
        return getListData(rows, p);
    }

    public QMS_INSP_MACHINE qmsInspMachineOneGet(QMS_INSP_MACHINE qms_insp_machine, HttpServletRequest req) {
        return qmsShipmentMapper.qmsInspMachineOneGet(qms_insp_machine);
    }

    public Message qmsInspMachineAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsInspMachine";
        int check = Integer.parseInt(req.getParameter("check"));
        if (check == 1){
            Files newFiles = qmsInspMachineAdd(page_name,req,"C:/UploadFile/tcmetal/qmsInspMachine/");
            files.setKey_value(newFiles.getKey_value());
        }
        return qmsShipmentMapper.qmsInspMachineAdd(files);
    }

    public Message qmsInspMachineDel(Page p, HttpServletRequest req) {
        p.setKeyword(p.getKeyword());
        return qmsShipmentMapper.qmsInspMachineDel(p);
    }

    public RESTful qmsProdListModalGet(Page p, HttpServletRequest req) {
        List<QMS_PROD_SUB> rows = qmsShipmentMapper.qmsProdListModalGet(p);
        return getListData(rows, p);
    }


    public Message qmsProdListDel(Page p) { return qmsShipmentMapper.qmsProdListDel(p);
    }

    public Message qmsProdListUpload(QMS_PROD_SUB qps) {
        if(qps.getFiles() != null) {
            List<MultipartFile> fileList = qps.getFiles();
            int i = 1;
            for (MultipartFile mf : fileList) {
                qps.setIndex(i);
                qps.setSavefile(saveFile(mf));//파일을 업로드 하고 업로드한 파일 이름을 가져온다
                qps.setSize(mf.getSize());
                qps.setOriginal_name(mf.getOriginalFilename());
                qps.setType(mf.getContentType());

                i++;
            }
        }
        return  qmsShipmentMapper.qmsProdListUpload(qps);
    }


    private String saveFile(MultipartFile file){ //파일 업로드 소스
        String path = "C:/UploadFile/tcmetal/qmsOutsErrorMan";
        // 파일 이름 변경
        UUID uuid = UUID.randomUUID(); //랜덤 uuid
        String originalFilename = file.getOriginalFilename(); //파일에 진짜이름
        String saveName = uuid + "_" + originalFilename;
        // 저장할 File 객체를 생성(껍데기 파일)
        File saveFile = new File(path,saveName); // 저장할 폴더 이름, 저장할 파일 이름
        try {
            file.transferTo(saveFile); // 업로드 파일에 saveFile이라는 껍데기 입힘
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return saveName;
    }

}
