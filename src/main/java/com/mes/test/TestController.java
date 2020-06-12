package com.mes.test;

import com.mes.Common.DataTransferObject.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class TestController {
    @RequestMapping(value = "/test")
    public String sysPart() {
        return "Test/test1/test/test";
    }

    @RequestMapping(value = "/test2")
    public String test2(HttpServletRequest req) {
        req.setAttribute("ok","ok");
        return "test2";
    }
    @RequestMapping(value="/test3")
    public String test3(HttpServletRequest req, Page p) {
        req.setAttribute("keyword",p.getKeyword());

        return "test3";
    }
}
