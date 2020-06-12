package com.mes.Common.Function;

import com.mes.Common.Interceptor.Session;
import com.mes.Common.Auth.Auth;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class AuthFunction {

    public Session getSessionData(HttpServletRequest req)
    {
        return (Session) req.getSession().getAttribute("userData");
    }

    public ArrayList<List<Auth>> gb_list(List<Auth> rs)
    {
        int index = 0;
        int check = 99;
        ArrayList<Auth> topList = new ArrayList<>();
        ArrayList<Auth> underList = new ArrayList<>();

        for (Auth list : rs) {
            if (check == list.getLevel() && check != 3) {
                topList.remove(index-1);
                check = 99;
                --index;
            }

            if (list.getLevel() == 1) {
                topList.add(list);
            }else if(list.getLevel() == 2){
                topList.add(list);
                check = 2;
                ++index;
            }else if (list.getLevel() == 3) {
                underList.add(list);
                check = 3;
            }
        }
        ArrayList<List<Auth>> list = new ArrayList<>();
        list.add(topList);
        list.add(underList);
        return list;
    }
    public List<?> authAllSubSelect(ArrayList<List<Auth>> allSubList, ArrayList<List<Auth>> allSubList2){
        int index = 0;
        int index2 = 0;
        int check = 0;

        for (List<Auth> list : allSubList2) {
            for (Auth Auth : list) {
                if (Auth.getLevel() == check && check != 3) {
                    allSubList.get(index).remove(index2-1);
                    --index2;
                    check = 0;
                }

                if (Auth.getLevel() == 2) {
                    check = 2;
                }else {
                    check = 3;

                }
                ++index2;
            }
            ++index;
        }
        return allSubList;
    }
}
