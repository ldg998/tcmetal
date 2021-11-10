package com.mes.mesManager.User;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.LogFunction;
import com.mes.Common.Interceptor.Session;
import com.mes.mesManager.User.DTO.SYSDept;
import com.mes.mesManager.User.DTO.SYSUser;
import com.mes.mesManager.User.DTO.SYSUserSupp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
public class UserRestController extends LogFunction {

    @Autowired
    private UserService userService;

    @RequestMapping("/loginAction")
    public Session loginAction(Session s, HttpServletRequest request , HttpServletResponse res) throws UnsupportedEncodingException {
        HttpSession session = request.getSession();
        Session data = userService.loginAction(s);


        data.setSite_code("S0001");

        if (!data.getUser_code().equals(""))
        {
            data.setIp(getClientIP(request));
            session.setAttribute("userData", data);
            session.setMaxInactiveInterval(60*60*24);
            apiLogSend(session,"접속");
        }
//
//
//        Cookie loginId = new Cookie("senUserData", data.getUser_code());
//        loginId.setMaxAge(60*60);
//        res.addCookie(loginId);




        return data;
    }

    @RequestMapping(value = "/userInformationChange", method = RequestMethod.POST)
    public Message userInformationChange(Page p, HttpServletRequest req, HttpServletResponse res){
        return userService.userInformationChange(p, req,res);
    }

    @RequestMapping(value = "/sysDeptGet", method = RequestMethod.POST)
    public RESTful sysDeptGet(Page p, HttpServletRequest req) {
        return userService.sysDeptGet(p, req);
    }
    @RequestMapping(value = "/sysDeptOneGet", method = RequestMethod.POST)
    public SYSDept sysDeptOneGet(Page p, HttpServletRequest req) {
        return userService.sysDeptOneGet(p, req);
    }

    @RequestMapping(value = "/sysDeptAllGet", method = RequestMethod.POST)
    public List<SYSDept> sysDeptAllGet(Page p, HttpServletRequest req) {
        return userService.sysDeptAllGet(p, req);
    }

    @RequestMapping(value = "/sysDeptAllGet2", method = RequestMethod.POST)
    public List<SYSDept> sysDeptAllGet2(Page p, HttpServletRequest req) {
        return userService.sysDeptAllGet2(p, req);
    }



    @RequestMapping(value = "/sysDeptAdd", method = RequestMethod.POST)
    public Message sysDeptAdd(SYSDept sdv, HttpServletRequest req) {
        return userService.sysDeptAdd(sdv, req);
    }

    @RequestMapping(value = "/sysDeptDelete", method = RequestMethod.POST)
    public Message sysDeptDelete(Page p, HttpServletRequest req) {
        return userService.sysDeptDelete(p,req);
    }

    @RequestMapping(value = "/sysUserGet", method = RequestMethod.POST)
    public RESTful sysUserGet(Page p, HttpServletRequest req) {
        return userService.sysUserGet(p, req);
    }

     @RequestMapping(value = "/sysUserAllGet", method = RequestMethod.POST)
    public List<SYSUser> sysUserAllGet(Page p, HttpServletRequest req) {
        return userService.sysUserAllGet(p, req);
    }

    @RequestMapping(value="/sysUserOneGet" , method = RequestMethod.POST)
    public SYSUser sysUserOneGet(HttpServletRequest req, SYSUser su) throws Exception{
        return userService.sysUserOneGet(req, su);
    }

    @RequestMapping(value = "/sysUserAdd", method = RequestMethod.POST)
    public Message sysUserAdd(SYSUser suv, HttpServletRequest req) {
        return userService.sysUserAdd(suv, req);
    }

    @RequestMapping(value = "/sysUserDelete", method = RequestMethod.POST)
    public Message sysUserDelete(Page p) {
        return userService.sysUserDelete(p);
    }

    @RequestMapping(value = "/sysUserSuppGet", method = RequestMethod.POST)
    public RESTful sysUserSuppGet(Page p, HttpServletRequest req) {
        return userService.sysUserSuppGet(p, req);
    }
     @RequestMapping(value = "/sysUserLogGet", method = RequestMethod.POST)
    public RESTful sysUserLogGet(Page p, HttpServletRequest req) {
        return userService.sysUserLogGet(p, req);
    }


    @RequestMapping(value = "/sysUserSuppOneGet", method = RequestMethod.POST)
    public SYSUserSupp sysUserSuppOneGet(Page p, HttpServletRequest req) {
        return userService.sysUserSuppOneGet(p, req);
    }

    @RequestMapping(value = "/sysUserSuppAdd", method = RequestMethod.POST)
    public Message sysUserSuppAdd(SYSUserSupp susv, HttpServletRequest req) {
        return userService.sysUserSuppAdd(susv, req);
    }

    @RequestMapping(value = "/sysUserSuppDelete", method = RequestMethod.POST)
    public Message sysUserSuppDelete(Page p) {
        return userService.sysUserSuppDelete(p);
    }

    @RequestMapping(value = "/sysUserPwdReset", method=RequestMethod.POST)
    public Message sysUserPwdReset(HttpServletRequest req, SYSUser su) {
        return userService.sysUserPwdReset(req,su);
    }


}
