package com.mes.test;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesManager.User.DTO.SYSUser;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
public class TestRestController {

    @Autowired
    private TestService testService;


    @RequestMapping(value = "/test4", method = RequestMethod.POST)
    public String createImage(HttpServletRequest request) throws Exception {
        String binaryData = request.getParameter("imgSrc");
        FileOutputStream stream = null;
        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        try {
            System.out.println("binary file " + binaryData);
            if (binaryData == null || binaryData == "") {
                throw new Exception();
            }
            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);
            System.out.println("file :::::::: " + file + " || " + file.length);
            String fileName = UUID.randomUUID().toString();
            stream = new FileOutputStream("C:\\test2\\" + fileName + ".png");
            stream.write(file);
            stream.close();
            System.out.println("파일 작성 완료");
            //mav.addObject("msg", "ok");
            return "파일 작성 완료";
        } catch (Exception e) {
            System.out.println("파일이 정상적으로 넘어오지 않았습니다");
            //mav.addObject("msg", "no");
            return "파일이 정상적으로 넘어오지 않았습니다";
        } finally {
            stream.close();
        }
        //return mav;
    }

    @RequestMapping(value = "/mobileKey", method = RequestMethod.POST,produces = "application/json")
    public Message mobileKey(@RequestBody Page p)  {
        return testService.mobileKey(p);
    }


    private FileOutputStream fos;

    @RequestMapping(value = "/mobileImgUp", produces = "application/json", method = RequestMethod.POST)
    public void mobileImgUp( MultipartHttpServletRequest req) throws IOException {
        System.out.println("sss");

        File dir = new File("D:/UploadFile/sound/mobile/img");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
       String FileName = format.format(now)+".png";
        //byte fileData = Byte.parseByte(req.getParameter("file"));
       // System.out.println(fileData);
//        File lOutFile = new File("D:/UploadFile/sound/mobile/img/"+FileName);
//
//        FileOutputStream lFileOutputStream = new FileOutputStream(lOutFile);
//
//        lFileOutputStream.write(fileData);
//
//        lFileOutputStream.close();


//        System.out.println(fileData.toString());
//
//        fos = new FileOutputStream("D:/UploadFile/sound/mobile/img/" + FileName);
//
//        fos.write(fileData);



        System.out.println("1");
        MultipartFile uploadedFile = req.getFile("file");
        System.out.println(uploadedFile);
//        byte b = Byte.parseByte(req.getParameter("imageFile"));
//        System.out.println(b);
//
//
//        Date now = new Date();
//        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
//        String FileName = format.format(now)+".png";
//       // String[] name = uploadedFile.getOriginalFilename().split("\\.");
//        //String FileName2 = FileName + "." + name[name.length - 1];
//
//        File lOutFile = new File("D:/UploadFile/sound/mobile/img/"+FileName);
//
//        FileOutputStream lFileOutputStream = new FileOutputStream(lOutFile);
//
//        lFileOutputStream.write(b);
//
//        lFileOutputStream.close();



        File file = new File("D:/UploadFile/sound/mobile/img", FileName);
        //uploadedFile 을 file로 저장한다.
        //물리적인 공간에 저장.
        uploadedFile.transferTo(file);


    }



    @RequestMapping(value = "/mobileLogin", method = RequestMethod.POST,produces = "application/json")
    public SYSUser mobileLogin(@RequestBody SYSUser u)  {
        return testService.mobileLogin(u);
    }

//    @RequestMapping(value = "/test0609", method = RequestMethod.POST,produces = "application/json")
//    public List<?> test0609()  {
//        return testService.test0609();
//    }



}
