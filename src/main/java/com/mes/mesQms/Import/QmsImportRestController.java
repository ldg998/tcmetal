package com.mes.mesQms.Import;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IN_SUB;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@Slf4j
public class QmsImportRestController extends UploadFunction {

    @Autowired
    private QmsImportService qmsImportService;

    @RequestMapping(value = "/qmsRecvGet", method = RequestMethod.POST)
    public RESTful qmsRecvGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvGet(p, req);
    }
    @RequestMapping(value = "/qmsRecvSubGet", method = RequestMethod.POST)
    public RESTful qmsRecvSubGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvSubGet(p, req);
    }

    @RequestMapping(value = "/qmsRecvAdd", method = RequestMethod.POST)
    public Message qmsRecvAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {
        return qmsImportService.qmsRecvAdd(req, qrs);
    }

    @RequestMapping(value ="/FileUploads", method = RequestMethod.POST)
    public void FileUploads(Files files, HttpServletRequest request, HttpServletResponse response) throws IOException {
        FileDownloads(files,request,response);
    }

    @RequestMapping(value ="/qmsRecvErrorManGet", method = RequestMethod.POST)
    public RESTful qmsRecvErrorManGet(Page p,HttpServletRequest req) { return qmsImportService.qmsRecvErrorManGet(p, req); }

    @RequestMapping(value ="/qmsRecvErrorManOneGet", method = RequestMethod.POST)
    public QMS_RECV_SUB qmsRecvErrorManOneGet(QMS_RECV_SUB qmsRecvSub, HttpServletRequest req){
        return qmsImportService.qmsRecvErrorManOneGet(qmsRecvSub, req);
    }

    @RequestMapping(value = "/qmsRecvSubAllGet", method = RequestMethod.POST)
    public List<QMS_RECV_SUB> qmsRecvSubAllGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvSubAllGet(p, req);
    }

    @RequestMapping(value = "/qmsRecvFileAdd", method = RequestMethod.POST)
    public Message qmsRecvFileAdd(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest req) {
        return qmsImportService.qmsRecvFileAdd(multipartHttpServletRequest, req);

    }

    @RequestMapping(value = "/qmsRecvErrorManAdd", method = RequestMethod.POST)
    public String qmsRecvErrorManAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("in_no"));
        files.setKey2(req.getParameter("part_code"));
        files.setKey3(req.getParameter("act_type"));
        int check1 = Integer.parseInt(req.getParameter("check1"));
        int check2 = Integer.parseInt(req.getParameter("check2"));
        int check3 = Integer.parseInt(req.getParameter("check3"));

        if(check1+check2+check3 == 0)
        {
            qmsImportService.qmsRecvErrorManAdd_NoneFile(files, req);
        }
        if( check3 == 1)
        {
            qmsImportService.qmsRecvErrorManAdd_File3(files, req);
        }
        if( check2 == 1 )
        {
            qmsImportService.qmsRecvErrorManAdd_File2(files, req);
        }
        if(check1 == 1 )
        {
            qmsImportService.qmsRecvErrorManAdd_File1(files, req);
        }
        if(check1+check2+check3 == 3)
        {
            qmsImportService.qmsRecvErrorManAdd_AllFile(files, req);
        }
        return "?????????????????????.";
    }

    @RequestMapping(value = "/qmsRecvListGet", method = RequestMethod.POST)
    public RESTful qmsRecvListGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvListGet(p, req);
    }

    @RequestMapping(value = "/qmsRecvErrorListGet", method = RequestMethod.POST)
    public RESTful qmsRecvErrorListGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvErrorListGet(p, req);
    }

    @RequestMapping(value = "/qmsRecvMRBGet", method = RequestMethod.POST)
    public RESTful qmsRecvMRBGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvMRBGet(p, req);
    }

    @RequestMapping(value = "/qmsRecvMRBAdd", method = RequestMethod.POST)
    public Message qmsRecvMRBAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {
        return qmsImportService.qmsRecvMRBAdd(req, qrs);
    }
    @RequestMapping(value = "/qmsRecvMRBCancel", method = RequestMethod.POST)
    public Message qmsRecvMRBCancel(HttpServletRequest req, QMS_RECV_SUB qrs) {
        return qmsImportService.qmsRecvMRBCancel(req, qrs);
    }


    @RequestMapping(value = "/qmsRecvErrorListSumGet", method = RequestMethod.POST)
    public List<QMS_RECV_NG_SUM> qmsRecvErrorListSumGet(Page p, HttpServletRequest req) {
        return qmsImportService.qmsRecvErrorListSumGet(p, req);
    }
    @RequestMapping(value = "/qmsRecvListOneGet", method = RequestMethod.POST)
    public SCM_IN_SUB qmsRecvListOneGet(HttpServletRequest req, SCM_IN_SUB sis) {
        return qmsImportService.qmsRecvListOneGet(req,sis);
    }
    @RequestMapping(value = "/qmsRecvList_File_Upload", method = RequestMethod.POST)
    public Message qmsRecvList_File_Upload(MultipartHttpServletRequest req,Files file) {
        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyyMMddHHmmss");
        Date time = new Date();
        String time1 = format1.format(time);                //????????????

        file.setKey1(req.getParameter("in_no"));        //
        file.setKey2(req.getParameter("part_code"));
        file.setKey3(req.getParameter("ord_no"));
        String del_path  = req.getParameter("upload_path");
        file.setKey_value(req.getParameter("key_value"));
        file.setFiles(req.getFile("files"));
        String fileName = file.getFiles().getOriginalFilename();   //?????? ????????? ??????
        String uploadPath = "D:/UploadFile/tcmetal/";   //?????? ????????????
        int type = fileName.lastIndexOf(".");
        String ext = fileName.substring(type + 1);       //?????? ?????????
        file.setUrl("qmsRecvList_"+time1+"."+ext);
        file.setUpload_path(uploadPath+"qmsRecvList_"+time1+"."+ext);      //????????????
        file.setFile_size(file.getFiles().getSize());             //???????????????
        file.setFile_name("qmsRecvList_"+time1+"."+ext);//?????? ????????????
        file.setFile_og_name(fileName);                 // ?????? ????????? ??????
        if(file.getKey_value().equals("") || file.getKey_value().equals(null) ){
            file.setKey_value("qmsRecvList_"+time1+"."+ext);
        }
        try {
            File file_del = new File(del_path);
            if(file_del.exists()){
                file_del.delete();
            }
            File file1 = new File(file.getUpload_path());
            file.getFiles().transferTo(file1);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return qmsImportService.qmsRecvList_File_Upload(req,file);
    }

    @RequestMapping(value = "/qmsRecvListFileAdd", method = RequestMethod.POST)
    public Message qmsRecvListFileAdd(HttpServletRequest req, QMS_RECV_SUB qrs) {
        return qmsImportService.qmsRecvListFileAdd(req,qrs);
    }


}
