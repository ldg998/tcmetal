package com.mes.Common.File.Function;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.File.DTO.Files;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Random;

@Slf4j
public class FileUploadFunction {
    /**
     * 업로드 파일을 가지고 타입 설정
     * */
    public String selectFileType(MultipartHttpServletRequest mtfRequest){
        String idx = null;
        if(mtfRequest.getFile("report").isEmpty()){
            idx = "improving";
        }else if(mtfRequest.getFile("improving").isEmpty()){
            idx = "report";
        }else {
            idx = "etc";
        }
        return idx;
    }

    /**
     * 업로드 부분
     * */
    public Message Uploader(MultipartHttpServletRequest mtfRequest) {
        String idx = selectFileType(mtfRequest);
        Files file = UploadSetFilePath(mtfRequest,idx);
        try {
            file.getFiles().transferTo(new File(file.getUpload_path()));
        } catch (IllegalStateException e) {
            e.printStackTrace();
            getMessage(1);
        } catch (IOException e) {
            e.printStackTrace();
            getMessage(1);
        }
        return getMessage(0);
    }

    /**
     * 파일 이름 설정
     * */
    public String MakeFileName(String idx){
        Date now = new Date();
        Random random = new Random();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String FileName;
        if(idx.equals("report"))
        {
            FileName = "R" + format.format(now) + random.nextInt(1000);
        }
        else if(idx.equals("improving"))
        {
            FileName = "I" + format.format(now) + random.nextInt(1000);
        }
        else
        {
            FileName = "E" + format.format(now) + random.nextInt(1000);
        }
        return FileName;
    }

    /**
     * 업로드 설정
     * */
    private Files UploadSetFilePath(MultipartHttpServletRequest mtfRequest, String idx){
        Files files = new Files();
        String FileName = MakeFileName(idx);
        String extension = files.getFiles().getOriginalFilename().split("\\.")[1];

        if(idx.equals("report"))
        {
            files.setFiles(mtfRequest.getFile(idx));
            files.setFile_volume(files.getFiles().getSize() / 1024);
            files.setFile_og_name(files.getFiles().getOriginalFilename());
            files.setFile_name(FileName);
            files.setUrl("uploads/report" + FileName);
            files.setUpload_path(mtfRequest.getSession().getServletContext().getRealPath("uploads/report") + '/' + FileName);
        }
        else if(idx.equals("improving"))
        {
            files.setFiles(mtfRequest.getFile(idx));
            files.setFile_volume(files.getFiles().getSize() / 1024);
            files.setFile_og_name(files.getFiles().getOriginalFilename());
            files.setFile_name(FileName);
            files.setUrl("uploads/improving" + FileName);
            files.setUpload_path(mtfRequest.getSession().getServletContext().getRealPath("uploads/report") + '/' + FileName);
        }
        else
        {
            files.setFiles(mtfRequest.getFile(idx));
            files.setFile_volume(files.getFiles().getSize() / 1024);
            files.setFile_og_name(files.getFiles().getOriginalFilename());
            files.setFile_name(FileName);
            files.setUrl("uploads/etc" + FileName);
            files.setUpload_path(mtfRequest.getSession().getServletContext().getRealPath("uploads/report") + '/' + FileName);
        }
        return files;
    }

    /**
     * 메세지
     * */
    private Message getMessage(int idx){
        Message msg = new Message();
        if(idx == 0){
            msg.setResult("OK");
            msg.setMessage("업로드가 완료되었습니다.");
        }else{
            msg.setResult("NG");
            msg.setMessage("업로드 실패");
        }
        return msg;
    }

    private void test(MultipartHttpServletRequest req){
        Iterator<String> fileNames = req.getFileNames();
        while (fileNames.hasNext()){
            String fileName = fileNames.next();
            MultipartFile mFile = req.getFile(fileName);
            File file = new File("path");
            if(mFile.getSize()!=0)
            {
                if(! file.exists())
                {
                    if(file.getParentFile().mkdirs())
                    {
                        try {
                            file.createNewFile();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
                try {
                    mFile.transferTo(file);
                } catch (IllegalStateException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
