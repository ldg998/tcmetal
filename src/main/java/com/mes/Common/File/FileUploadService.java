package com.mes.Common.File;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.File.FileMapper;
import com.mes.Common.File.DTO.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

@Service
public class FileUploadService extends ReturnFunction {
    @Autowired
    private FileMapper fileMapper;

    public Message setOneFile(Files files, HttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        return fileMapper.setOneFile(files);
    }

    public Files FileDownloads(Files files) {
        return fileMapper.FileDownloads(files);
    }

    public void setQmsRecvErrorManFile(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        fileMapper.setOneFile(files);
    }

    public void setAllFile(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        fileMapper.setOneFile(files);
    }
}
