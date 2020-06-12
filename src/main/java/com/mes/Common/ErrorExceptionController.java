package com.mes.Common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@Slf4j
public class ErrorExceptionController implements ErrorController {

    private static final String ERROR_PATH = "/error";

    public String getDate(){
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy년 MM월 dd일 hh시 mm분");
        String date = format.format(now);
        return date;
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        HttpStatus httpStatus = HttpStatus.valueOf(Integer.valueOf(status.toString()));

        if(status.toString().equals("404"))
        {
            log.info("########## ErrorExceptionController ##########");
            log.info("에러 구분  : " + status.toString());
            log.info("에러 메세지 : " + httpStatus.getReasonPhrase());
            log.info("발생일     : " +  getDate());
            log.info("##############################################");
            return "error/404";
        }
        else
        {
            log.info("########## ErrorExceptionController ##########");
            log.info("에러 구분  : " + status.toString());
            log.info("에러 메세지 : " + httpStatus.getReasonPhrase());
            log.info("발생일     : " +  getDate());
            log.info("##############################################");
            return "error/500";
        }
    }
}
