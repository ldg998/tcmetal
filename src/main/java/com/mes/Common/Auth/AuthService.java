package com.mes.Common.Auth;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Function.AuthFunction;
import com.mes.Common.Interceptor.Session;
import com.mes.Common.Various.DTO.SYS_MENU_FAVORITES_CD;
import com.mes.Mapper.Auth.AuthMapper;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * <javadoc>
 * 메뉴구성 service
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Service
public class AuthService extends AuthFunction {

    @Autowired
    private AuthMapper authMapper;

    public List<Auth> authMainSelect(HttpServletRequest req) {
        return authMapper.authMainSelect(getSessionData(req));
    }

    public List<?> authSubSelect(HttpServletRequest req, String keyword) {
        Session session = getSessionData(req);
        session.setKeyword(keyword);
        List<Auth> avList =  authMapper.authSubSelect(session);
        return gb_list(avList);
    }

    public List<?> authAllSubSelect(HttpServletRequest req) {
        Session session = getSessionData(req);
        List<Auth> avList = authMapper.authMainSelect(session);
        ArrayList<List<Auth>> allSubList = new ArrayList<>();
        ArrayList<List<Auth>> allSubList2 = new ArrayList<>();

        for (Auth Auth : avList) {
            session.setKeyword(Auth.getMenu_code());
            allSubList.add(authMapper.authSubSelect(session));
            allSubList2.add(authMapper.authSubSelect(session));
        }
        return  authAllSubSelect(allSubList,allSubList2);
    }


    public List<?> menuFavoritesGet(HttpServletRequest req) {
        Session session = getSessionData(req);
        return  authMapper.menuFavoritesGet(session);

    }


    public void model_menu_setting(HttpServletRequest req, String page_name, String top_menu_name, String under_name) {
        List<Auth> main_auth = authMainSelect(req);


        req.setAttribute("page_name",page_name);
        req.setAttribute("top_active",under_name);
        req.setAttribute("under_active",page_name);
        req.setAttribute("main_list",main_auth);
//        req.setAttribute("allSub_list",authAllSubSelect(req));
        req.setAttribute("favorites_list",menuFavoritesGet(req));


        req.setAttribute("left_list",authSubSelect(req, top_menu_name));
        req.setAttribute("bestTop_name",top_menu_name);
    }

    public void model_menu_setting(HttpServletRequest req){
        req.setAttribute("main_list",authMainSelect(req));
        req.setAttribute("allSub_list",authAllSubSelect(req));
        req.setAttribute("under_active","");
        req.setAttribute("favorites_list",menuFavoritesGet(req));
    }

    public SYSAuthProgram menuAuth(HttpServletRequest req, Page p){
        p.setUser_code(getSessionData(req).getUser_code());
        p.setSite_code(getSessionData(req).getSite_code());
        return authMapper.menuAuth(p);
    }

    public int menuFavoritesCheck(HttpServletRequest req, String page_name) {
        SYS_MENU_FAVORITES_CD smfc = new SYS_MENU_FAVORITES_CD();
        smfc.setUser_code(getSessionData(req).getUser_code());
        smfc.setMenu_code(page_name);
        return authMapper.menuFavoritesCheck(smfc);
    }
}
