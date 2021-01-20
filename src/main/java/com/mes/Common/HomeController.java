package com.mes.Common;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Function.ReturnFunction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Controller
@Slf4j
public class HomeController extends ReturnFunction {

    @Autowired
    private HomeService homeService;

    @RequestMapping("/login")
    public String home()
    {
        log.info("ASC ll = "+(char) 4);
        String data = "a/b/c/,d/e&f/g/h/,i/j&k/n/m/,l/o";
        MakeCodeList(data);
        return "login";
    }

    @RequestMapping(value="/")
    public String index(HttpServletRequest req){
        req.setAttribute("home","home");
        return "index";
    }
    @RequestMapping(value="/index2")
    public String index2(HttpServletRequest req, Page p){

        return "index2";
    }



    @RequestMapping(value = "/testFile" , method = RequestMethod.POST)
    public void testFile(@RequestParam("testFile") MultipartFile upload, HttpServletResponse response){
        String uploadPath   = "C:/UploadFile/sensorview";

        OutputStream out = null;
        PrintWriter printWriter = null;
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        try{
            File dir = new File(uploadPath);

            if (!dir.exists()) {
                dir.mkdirs();
                String fileName     = upload.getOriginalFilename();
                String fullPath     = uploadPath+"/"+fileName;

                byte[] bytes = upload.getBytes();

                out = new FileOutputStream(new File(fullPath));
                out.write(bytes);

                printWriter = response.getWriter();
                printWriter.println("<script>alert('디렉토리 생성 후 업로드 성공.');</script>");
                printWriter.flush();
            } else {
                String fileName     = upload.getOriginalFilename();
                String fullPath     = uploadPath+"/"+fileName;

                byte[] bytes = upload.getBytes();

                out = new FileOutputStream(new File(fullPath));
                out.write(bytes);

                printWriter = response.getWriter();
                printWriter.println("<script>alert('기존 디렉토리에 성공.');</script>");
                printWriter.flush();
            }
        }catch(IOException e){
            e.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (printWriter != null) {
                    printWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest req, HttpServletResponse res)
    {
        req.getSession().invalidate();
//        Cookie[] cookies = req.getCookies();
//        if (cookies != null) {
//            for (Cookie c : cookies) {
//                if (c.getName().equals("senUserData")) {
//                    c.setValue(null);
//                    c.setMaxAge(0);
//                    res.addCookie(c);
//                    break;
//                }
//            }
//        }


        return "logout";
    }
}
