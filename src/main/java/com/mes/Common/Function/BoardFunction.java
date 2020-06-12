package com.mes.Common.Function;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
public class BoardFunction {
    public void setAttrSessionBCode(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html; charset=UTF-8");
        PrintWriter out = res.getWriter();
        HttpSession session = req.getSession();

        try {
            if(ObjectUtils.isEmpty(session.getAttribute("board_code"))){
                session.setAttribute("board_code",req.getParameter("idx"));
            }else{
                session.removeAttribute("board_code");
                session.setAttribute("board_code",req.getParameter("idx"));
            }
        } catch (Exception e) {
            log.debug("error : "+e);
        }
    }
}
