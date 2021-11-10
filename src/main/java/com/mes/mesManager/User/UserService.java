package com.mes.mesManager.User;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Common.Interceptor.Session;
import com.mes.Mapper.mesManager.User.UserMapper;
import com.mes.mesManager.User.DTO.SYSDept;
import com.mes.mesManager.User.DTO.SYSUser;
import com.mes.mesManager.User.DTO.SYSUserSupp;
import com.mes.mesManager.User.DTO.SYS_USER_LOG_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class UserService extends ReturnFunction {

    @Autowired
    private UserMapper userMapper;

    
    public RESTful sysDeptGet(Page p , HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSDept> rows = userMapper.sysDeptGet(p);
        return getListData(rows , p);
    }

    public Message sysDeptAdd(SYSDept sdv , HttpServletRequest req){
        sdv.setUser_code(getSessionData(req).getUser_code());
        sdv.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysDeptAdd(sdv);
    }

    public Message sysDeptDelete(Page p, HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        p.setKeyword(p.getKeyword());
        return userMapper.sysDeptDelete(p);
    }

    public RESTful sysUserGet(Page p , HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSUser> rows = userMapper.sysUserGet(p);
        return getListData(rows , p);
    }

    public List<SYSDept> sysDeptAllGet(Page p , HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysDeptAllGet(p);
    }

    public Message sysUserAdd(SYSUser suv , HttpServletRequest req){
        suv.setUpdate_user(getSessionData(req).getUser_code());
        suv.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysUserAdd(suv);
    }

    public Message sysUserDelete(Page p){
        p.setKeyword(p.getKeyword());
        return userMapper.sysUserDelete(p);
    }

    
    public RESTful sysUserSuppGet(Page p , HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSUserSupp> rows = userMapper.sysUserSuppGet(p);
        return getListData(rows , p);
    }

    
    public Message sysUserSuppAdd(SYSUserSupp susv , HttpServletRequest req){

        susv.setUpdate_user(getSessionData(req).getUser_code());
        susv.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysUserSuppAdd(susv);
    }
    
    public Message sysUserSuppDelete(Page p){
        p.setKeyword(p.getKeyword());
        return userMapper.sysUserSuppDelete(p);
    }

    public Session loginAction(Session s) {
        return userMapper.loginAction(s);
    }

    public SYSUser sysUserOneGet(HttpServletRequest req, SYSUser su) {
        su.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysUserOneGet(su);
    }

    public SYSDept sysDeptOneGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysDeptOneGet(p);
    }

    public SYSUserSupp sysUserSuppOneGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysUserSuppOneGet(p);
    }

    public Message userInformationChange(Page p, HttpServletRequest req, HttpServletResponse res) {
        Message m = new Message();
        SYSUser u = new SYSUser();
        u.setUser_code(getSessionData(req).getUser_code());
        u.setUser_pwd(p.getPassword());
        int check = userMapper.userInformationCheck(u);

        if (check == 1){
            u.setUser_pwd(p.getPassword_new());
            check = userMapper.userInformationChange(u);

            if (check ==1){
                req.getSession().invalidate();
                m.setResult("OK");
                m.setMessage("비밀번호가 변경 되었습니다.\n 로그인페이지로 이동합니다.");
            } else {
                m.setResult("NG");
                m.setMessage("변경이 실패하였습니다.");
            }

        }else {
            m.setResult("NG");
            m.setMessage("비밀번호가 맞지 않습니다.");
        }
        return m;


    }

    public Message sysUserPwdReset(HttpServletRequest req, SYSUser su) {
        su.setUpdate_user(getSessionData(req).getUser_code());
        return userMapper.sysUserPwdReset(su);
    }

    public List<SYSDept> sysDeptAllGet2(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return userMapper.sysDeptAllGet2(p);
    }

    public List<SYSUser> sysUserAllGet(Page p, HttpServletRequest req) {
        return userMapper.sysUserAllGet(p);
    }

    public RESTful sysUserLogGet(Page p, HttpServletRequest req) {
        List<SYS_USER_LOG_CD> rows = userMapper.sysUserLogGet(p);
        return getListData(rows , p);
    }
}
