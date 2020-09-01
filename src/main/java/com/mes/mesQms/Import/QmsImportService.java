package com.mes.mesQms.Import;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesQms.Import.QmsImportMapper;
import com.mes.mesQms.Import.DTO.QMS_RECV;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IN_SUB;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@Slf4j
public class QmsImportService  extends UploadFunction {

    @Autowired
    private QmsImportMapper qmsImportMapper;

    public RESTful qmsRecvGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_RECV> rows = qmsImportMapper.qmsRecvGet(p);
        return getListData(rows , p);
    }

    public RESTful qmsRecvSubGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_RECV_SUB> rows = qmsImportMapper.qmsRecvSubGet(p);
        return getListData(rows , p);
    }

    public RESTful qmsRecvErrorManGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_RECV_SUB> rows =qmsImportMapper.qmsRecvErrorManGet(p);
        return getListData(rows , p);
    }

    public List<QMS_RECV_SUB> qmsRecvSubAllGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsImportMapper.qmsRecvSubGet(p);
    }

    public QMS_RECV_SUB qmsRecvErrorManOneGet(QMS_RECV_SUB qmsRecvSub, HttpServletRequest req) {

        return qmsImportMapper.qmsRecvErrorManOneGet(qmsRecvSub);
    }

    public Message qmsRecvAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {

        qrs.setUser_code(getSessionData(req).getUser_code());
        return qmsImportMapper.qmsRecvAdd(qrs);
    }

    public Message qmsRecvFileAdd(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest req) {
        Message msg = new Message();
        int index = Integer.parseInt(req.getParameter("index"));
        Files files = new Files();
        Files files2 = new Files();
        QMS_RECV qr = new QMS_RECV();
        String page_name = "qmsRecv";
        char a = (char) 5;
        char b = (char) 4;
        for (int i = 0 ; i <index;i++){
            files.setKey1(multipartHttpServletRequest.getParameter("file_in_no"+i));
            files.setKey2(multipartHttpServletRequest.getParameter("file_part_code"+i));
            files.setFiles(multipartHttpServletRequest.getFile("file"+i));
            files2 =setQmsRecv(page_name,files,req,i);
                if ( i ==0 ){
                    qr.setKeyword(files.getKey1()+b+files.getKey2()+b+files2.getKey_value());
                }else {
                    qr.setKeyword(qr.getKeyword()+a+files.getKey1()+b+files.getKey2()+b+files2.getKey_value());
                }


        }
        qr.setSite_code(getSessionData(req).getSite_code());

        return qmsImportMapper.qmsRecvFileAdd(qr);
    }

    public RESTful qmsRecvMRBGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<QMS_RECV_SUB> rows = qmsImportMapper.qmsRecvMRBGet(p);
        return getListData(rows , p);
    }

    public Message qmsRecvMRBAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {

        return qmsImportMapper.qmsRecvMRBAdd(qrs);
    }

    public Message qmsRecvMRBCancel(HttpServletRequest req, QMS_RECV_SUB qrs) {

        return qmsImportMapper.qmsRecvMRBCancel(qrs);
    }

    public RESTful qmsRecvListGet(Page p, HttpServletRequest req) {
        List<QMS_RECV_SUB> rows = qmsImportMapper.qmsRecvListGet(p);
        return getListData(rows , p);
    }

    public void qmsRecvErrorManAdd_NoneFile(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        qmsImportMapper.qmsRecvErrorManAdd(files);
    }

    public void qmsRecvErrorManAdd_File1(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsRecvErrorMan";
        Files newFiles = setQmsRecvErrorManFile1(page_name,req,"C:/UploadFile/sound/qmsRecvErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        qmsImportMapper.qmsRecvErrorManAdd1(files);
    }

    public void qmsRecvErrorManAdd_File2(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsRecvErrorMan";
        Files newFiles = setQmsRecvErrorManFile2(page_name,req,"C:/UploadFile/sound/qmsRecvErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        qmsImportMapper.qmsRecvErrorManAdd2(files);
    }

    public void qmsRecvErrorManAdd_File3(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "qmsRecvErrorMan";
        Files newFiles = setQmsRecvErrorManFile3(page_name,req,"C:/UploadFile/sound/qmsRecvErrorMan/");
        files.setKey_value(newFiles.getKey_value());
        qmsImportMapper.qmsRecvErrorManAdd3(files);
    }

    public void qmsRecvErrorManAdd_AllFile(Files files, MultipartHttpServletRequest req) {
        String page_name = "qmsRecvErrorMan";
        for(int i=1; 4>i; i++){
            String Key = MakeFileName_new(page_name,i);
            Files newFiles = AllFile(files, req,Key,i,"C:/UploadFile/sound/qmsRecvErrorMan/");
            qmsImportMapper.qmsRecvErrorManAdd_AllFile(newFiles);
        }
    }

    public List<QMS_RECV_NG_SUM> qmsRecvErrorListSumGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return qmsImportMapper.qmsRecvErrorListSumGet(p);
    }

    public SCM_IN_SUB qmsRecvListOneGet(HttpServletRequest req, SCM_IN_SUB sis) {
        return qmsImportMapper.qmsRecvListOneGet(sis);
    }

    public Message qmsRecvList_File_Upload(MultipartHttpServletRequest req,Files file) {
        file.setUser_code(getSessionData(req).getUser_code());

        return qmsImportMapper.qmsRecvList_File_Upload(file);
    }

    public RESTful qmsRecvErrorListGet(Page p, HttpServletRequest req) {
        List<QMS_RECV_SUB> rows = qmsImportMapper.qmsRecvErrorListGet(p);
        return getListData(rows , p);
    }

    public Message qmsRecvListFileAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {
        String path = "C:/UploadFile/tcmetal/qmsqmsImport";
        qrs.setUser_code(getSessionData(req).getUser_code());
        qrs.setKey_value(file_key_retrun(qrs,path));
        System.out.println(qrs);
       return qmsImportMapper.qmsRecvListFileAdd(qrs);
    }



    private String file_key_retrun (QMS_RECV_SUB qrs, String path){
        if(qrs.getFiles1() != null) {
            List<MultipartFile> fileList = qrs.getFiles1();
            int i = 1;
            for (MultipartFile mf : fileList) {
                qrs.setIndex(i);
                qrs.setType(mf.getContentType());
                int pos = qrs.getType().lastIndexOf( "/" );
                String ext = qrs.getType().substring( pos + 1 );
                qrs.setSavefile(saveFile(mf,ext,path));//파일을 업로드 하고 업로드한 파일 이름을 가져온다
                qrs.setSize(mf.getSize());
                qrs.setOriginal_name(mf.getOriginalFilename());
                qrs.setAllpath(path+"/"+qrs.getSavefile());
                if(qrs.getFile_ck1() == 1) {
                    qrs.setKey_value("qms_"+qrs.getSavefile());
                }else {
                    qrs.setKey_value(qrs.getFile1_code());
                }
                i++;
            }
            qmsImportMapper.qmsFileAdd(qrs);
            return qrs.getKey_value();
        }
        return "";
    }



    private String saveFile(MultipartFile file,String ext,String path){ //파일 업로드 소스
        // 파일 이름 변경
        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyyMMddHHmmss");
        String originalFilename = file.getOriginalFilename(); //파일에 진짜이름
        String saveName =  "qmsImport_"+ format1.format (System.currentTimeMillis())+"."+ext ;
        // 저장할 File 객체를 생성(껍데기 파일)
        File saveFile = new File(path,saveName); // 저장할 폴더 이름, 저장할 파일 이름
        if(! saveFile.exists())
        {
            if(saveFile.getParentFile().mkdirs())
            {
                try {
                    saveFile.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        try {
            file.transferTo(saveFile);
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return saveName;
    }


}
