package com.mes.mesBoard.board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.UUID;

@Controller
public class Ckeditor {
    @RequestMapping("/ImgUpload")
    public void CkeditorImgUpload(HttpServletRequest request, HttpServletResponse response, @RequestParam MultipartFile upload)throws Exception{

        OutputStream out = null;
        PrintWriter printWriter = null;
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        try{
            File dir = new File("D:/UploadFile/tcmetal/image_board/");
            if (!dir.exists()) {
                dir.mkdirs();
            }


            String fileName = upload.getOriginalFilename();
            fileName = UUID.randomUUID().toString();

            //String uploadPath = request.getSession().getServletContext().getRealPath("uploads/etc") + '/' +fileName;//저장경로
            String uploadPath = "D:/UploadFile/tcmetal/image_board" + '/' +fileName;//저장경로
            String fileUrl = "uploadFile/image_board/"+fileName;//url경로
            byte[] bytes = upload.getBytes();
            String callback = request.getParameter("CKEditorFuncNum");

            out = new FileOutputStream(new File(uploadPath));
            out.write(bytes);

            printWriter = response.getWriter();
            printWriter.println(
                    "<script>window.parent.CKEDITOR.tools.callFunction("
                    + callback
                    + ",'"
                    + fileUrl
                    + "'"
                    + ")</script>");
            printWriter.flush();

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
        return;
    }

}