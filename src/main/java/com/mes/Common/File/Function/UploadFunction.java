package com.mes.Common.File.Function;

import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.FileUploadService;
import com.mes.Common.Function.ReturnFunction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Slf4j
public class UploadFunction extends ReturnFunction {

    @Autowired
    FileUploadService fileUploadService;

    public Files setQmsRecv(String page_name, Files files, HttpServletRequest req, int i) {
        Files newFile = uploadSettQmsRecvPath(page_name,files.getFiles(), req,i);
        try {
            newFile.getFiles().transferTo(new File(newFile.getUpload_path()));
            fileUploadService.setOneFile(newFile, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newFile;
    }



    private Files uploadSettQmsRecvPath(String page_name,MultipartFile multipartFile, HttpServletRequest req,int i) {
        File f = new File("C:/UploadFile/sensorview/qmsRecv/");
        if (!f.exists()) {
            f.mkdirs();
        }

        Files files = new Files();
        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameQmsRecv(page_name,i) + "." + name[name.length -1];
        String Key = FileName;

        files.setKey_value(Key);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path("C:/UploadFile/sensorview/qmsRecv/" + FileName);
        return files;
    }

    public String MakeFileNameQmsRecv(String page_name,int i) {
        Date now = new Date();

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String FileName = page_name +"_"+  format.format(now) +"_1_"+ (i+1);

        return FileName;
    }

//    public Files setOneFile(Files files, HttpServletRequest req,int i) {
//        Files newFile = UploadSetFilePath(files.getFiles(), req,i);
//        try {
//            newFile.getFiles().transferTo(new File(newFile.getUpload_path()));
//            fileUploadService.setOneFile(newFile, req);
//        } catch (IllegalStateException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return newFile;
//    }

//    private Files UploadSetFilePath(MultipartFile multipartFile, HttpServletRequest req,int i) {
//        Files files = new Files();
//        String FileName = MakeFileName_new(i) + "." + multipartFile.getOriginalFilename().split("\\.")[1];
//        String Key = FileName;
//
//        files.setKey_value(Key);
//        files.setFiles(multipartFile);
//        files.setFile_size(multipartFile.getSize());
//        files.setFile_volume(multipartFile.getSize() / 1024);
//        files.setFile_og_name(multipartFile.getOriginalFilename());
//        files.setFile_name(FileName);
//        files.setUrl(FileName);
//        files.setUpload_path("C:/UploadFile/sensorview/qmsRecv/" + FileName);
//        return files;
//    }

    public String MakeFileName() {
        Date now = new Date();
        Random random = new Random();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String FileName = (char) ((Math.random() * 26) + 65) + format.format(now) + random.nextInt(10);
        return FileName;
    }


    public String MakeFileName_new(String page_name,int i) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String FileName =  page_name + "_" + format.format(now) + "_" + i;
        return FileName;
    }

    public void FileDownloads(Files files, HttpServletRequest request, HttpServletResponse response)throws IOException{
        Files fileData = fileUploadService.FileDownloads(files);
        File file = null;
        InputStream is = null;
        OutputStream os = null;
        String mime = "application/x-msdownload";
        response.setContentType(mime);
        try {
            setDisposition(fileData.getFile_og_name(), request, response);
            file = new File(fileData.getUpload_path());
            is = new FileInputStream(file);
            os = response.getOutputStream();

            byte b[] = new byte[(int) file.length()];
            int len = 0;

            while((len = is.read(b)) > 0){
                os.write(b,0,len);
            }
            is.close();
            os.close();
        } catch (Exception e) {
            log.info("error code : " + e);
            e.printStackTrace();
        }
    }
    private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String browser = getBrowser(request);
        String dispositionPrefix = "attachment; filename=";
        String encodedFilename = null;

        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll(
                    "\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\""
                    + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\""
                    + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else {
            throw new IOException("Not supported browser");
        }
        response.setHeader("Content-Disposition", dispositionPrefix
                + encodedFilename);

        if ("Opera".equals(browser)) {
            response.setContentType("application/octet-stream;charset=UTF-8");
        }
    }
    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.indexOf("MSIE") > -1) {
            return "MSIE";
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        } else if (header.indexOf("Firefox") > -1) {
            return "Firefox";
        } else if (header.indexOf("Mozilla") > -1) {
            if (header.indexOf("Firefox") > -1) {
                return "Firefox";
            }else{
                return "MSIE";
            }
        }
        return "MSIE";
    }

    public Files setQmsRecvErrorManFile1(String page_name,MultipartHttpServletRequest req,String ad) {
        Files files = UploadSetFilePath1(page_name,req.getFile("file1"), req,ad);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            fileUploadService.setQmsRecvErrorManFile(files, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }

    public Files setQmsRecvErrorManFile2(String page_name,MultipartHttpServletRequest req,String ad) {
        Files files = UploadSetFilePath2(page_name,req.getFile("file2"), req,ad);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            fileUploadService.setQmsRecvErrorManFile(files, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }

    public Files setQmsRecvErrorManFile3(String page_name,MultipartHttpServletRequest req,String ad) {
        Files files = UploadSetFilePath3(page_name,req.getFile("file3"), req,ad);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            fileUploadService.setQmsRecvErrorManFile(files, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }

    private Files UploadSetFilePath1(String page_name,MultipartFile multipartFile, HttpServletRequest req,String ad) {
        File f = new File(ad);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files files = new Files();

        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameNew2(page_name,1) + "." + name[name.length-1];
        String Key = MakeFileName();

        files.setKey_value(Key);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path(ad+ FileName);
        return files;
    }


    private Files UploadSetFilePathSupp(String page_name,MultipartFile multipartFile, HttpServletRequest req,String ad) {
        File f = new File(ad);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files files = new Files();

        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameNew2(page_name,1) + "." + name[name.length-1];
        String Key = MakeFileName();

        files.setKey_value(FileName);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path(ad+ FileName);
        return files;
    }

    private Files UploadSetFilePath2(String page_name,MultipartFile multipartFile, HttpServletRequest req,String ad) {
        File f = new File(ad);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files files = new Files();
        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameNew2(page_name,2) + "." + name[name.length - 1];
        String Key = MakeFileName();

        files.setKey_value(Key);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path(ad+ FileName);
        return files;
    }

    private Files UploadSetFilePath3(String page_name,MultipartFile multipartFile, HttpServletRequest req,String ad) {
        File f = new File(ad);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files files = new Files();
        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameNew2(page_name,3) + "." + name[name.length - 1];
        String Key = MakeFileName();

        files.setKey_value(Key);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path(ad+ FileName);
        return files;
    }


    public String MakeFileNameNew2(String page_name,int i) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String FileName = page_name +"_"+ format.format(now) +"_"+ i;
        return FileName;
    }


    public Files AllFile(Files files, MultipartHttpServletRequest req, String Key, int i,String ad) {
        Files NewFiles = UploadSetAllFilePath(req, Key, i,ad);
        try {
            NewFiles.getFiles().transferTo(new File(NewFiles.getUpload_path()));
            fileUploadService.setAllFile(NewFiles, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        NewFiles.setKey1(files.getKey1());
        NewFiles.setKey2(files.getKey2());
        NewFiles.setKey3(files.getKey3());
        return NewFiles;
    }

    private Files UploadSetAllFilePath(MultipartHttpServletRequest req, String Key, int i,String ad) {
        File f = new File(ad);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files files = new Files();
        String[] name = req.getFile("file"+i).getOriginalFilename().split("\\.");
        String FileName = Key + "." + name[name.length-1];
        files.setKey_value(Key);
        files.setFiles(req.getFile("file"+i));
        files.setFile_size(req.getFile("file"+i).getSize());
        files.setFile_volume(req.getFile("file"+i).getSize() / 1024);
        files.setFile_og_name(req.getFile("file"+i).getOriginalFilename());
        files.setFile_name(FileName);
        if(i == 2){
            files.setName("FILE2");
            files.setUrl(FileName);
            files.setUpload_path(ad+ FileName);
        }else if(i == 3){
            files.setName("FILE3");
            files.setUrl(FileName);
            files.setUpload_path(ad+FileName);
        }
        return files;
    }
    public String tpmMCFileAdd(String page_name,String code,MultipartHttpServletRequest req,int index){
        Files files = UploadSetFilePathTpmMC(page_name,req.getFile("file"+index), req,index,code);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            return files.getUrl();
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return "";
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }










    private Files UploadSetFilePathTpmMC(String page_name,MultipartFile multipartFile, HttpServletRequest req,int index,String code) {
        Files files = new Files();
        String[] name = multipartFile.getOriginalFilename().split("\\.");
        String FileName = MakeFileNameNew(page_name,getSessionData(req).getSite_code(),index,code) + "." + name[name.length -1];
        String Key = MakeFileName();
        files.setKey_value(Key);
        files.setFiles(multipartFile);
        files.setFile_size(multipartFile.getSize());
        files.setFile_volume(multipartFile.getSize() / 1024);
        files.setFile_og_name(multipartFile.getOriginalFilename());
        files.setFile_name(FileName);
        files.setUrl(FileName);
        files.setUpload_path( "C:/UploadFile/sound/tpmMC/" + FileName);
        return files;
    }

    public String MakeFileNameNew(String page_name,String site_code,int index,String code) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        String FileName = page_name +"_"+site_code+"_"+code+"_"+index+"_"+ format.format(now);
        return FileName;
    }



    public Files setSysSuppFile(String page_name,MultipartHttpServletRequest req,String ad) {
        Files files = UploadSetFilePathSupp(page_name,req.getFile("file"), req,ad);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            fileUploadService.setQmsRecvErrorManFile(files, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }

    public Files setSysSPartDrawingAdd(String page_name,MultipartHttpServletRequest req,String ad) {
        Files files = UploadSetFilePath1(page_name,req.getFile("file2"), req,ad);
        try {
            files.getFiles().transferTo(new File(files.getUpload_path()));
            fileUploadService.setSysSPartDrawingFile(files, req);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }

}
