package com.mes.mesImage;

import com.mes.Common.DataTransferObject.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MesImageController {
    @RequestMapping(value="/workFormBase")
    public String workFormBase(HttpServletRequest req, Page p) {
        return "workForm/workForm";
    }


    @RequestMapping(value="/workFormColumn")
    public String workFormColumn(HttpServletRequest req, Page p) {
        return "workForm/workFormColumn";
    }
}
