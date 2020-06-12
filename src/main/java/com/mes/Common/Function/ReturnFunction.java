package com.mes.Common.Function;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Interceptor.Session;
import lombok.extern.slf4j.Slf4j;
import com.mes.Common.Auth.Auth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * <javadoc>
 * 호출 시 전달 받은 매개변수로
 * 계산하여 리턴하는 함수를 모아둔 클래스.
 * @author      김재일
 * @version     1.0
 * @since       2018-11-14
 **/
@Slf4j
public class ReturnFunction {
    /**
     * jqGrid 호출 시 페이지 블록처리를 위한 계산함수.r
     * @param   records
     * @param   rows
     **/
    public int CalcTotalPage(int records, int rows)
    {
        return (int)Math.ceil((double)records/(double)rows);
    }
    /**
     * Session에서 유저 데이터를 수집하기 위한 함수.
     * @param   req
     * @see     javax.servlet.http.HttpServletRequest
     **/
    public Session getSessionData(HttpServletRequest req)
    {
        return (Session) req.getSession().getAttribute("userData");
    }
    /**
     * ListData를 조회하는 함수.
     * @param   rows
     * @param   p
     * @see     java.util.List
     * @see     Page
     **/
    public RESTful getListData(List<?> rows , Page p)
    {
        int count=0;
        RESTful resTful = new RESTful();
        try{
            if(rows.size() != 0) {
                for (Field field : rows.get(0).getClass().getDeclaredFields()){
                    // private 접근해제
                    field.setAccessible(true);
                    if (field.getName().equals("rec_count")){
                        // rows 데이터 개 수 저장
                        count = (int) field.get(rows.get(0));
                    }
                }
            }

            resTful.setTotal(CalcTotalPage(count,p.getRows()));
            resTful.setRows(rows);
            resTful.setPage(p.getPage());
            resTful.setRecords(count);
            return resTful;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 권한그룹별 프로그램 등록
     * @param   req
     * @param   checkList
     * @see     javax.servlet.http.HttpServletRequest
     * @see     java.util.List
     * @see     SYSAuthProgram
     **/
    public Page setProgram(HttpServletRequest req, List<SYSAuthProgram> checkList)
    {
        Page p = new Page();
        p.setSite_code(getSessionData(req).getSite_code());
        p.setKeyword(checkList.get(0).getAuth_code());

        String keyword2 = "";
        int index = 0;
        for (SYSAuthProgram svl : checkList) {
            if (index == 0) {
                keyword2 = svl.getMenu_code()+"/"+svl.getCheck_get()+"/"+svl.getCheck_add()+"/"+svl.getCheck_edit()+"/"+svl.getCheck_del();
            }else{
                keyword2 = keyword2+","+svl.getMenu_code()+"/"+svl.getCheck_get()+"/"+svl.getCheck_add()+"/"+svl.getCheck_edit()+"/"+svl.getCheck_del();
            }
            ++index;
        }
        p.setKeyword2(keyword2);
        return p;
    }

    public Auth authMenu(HttpServletRequest req,ArrayList<List<Auth>> authAllSubSelect)
    {
        Auth av1 = null;
        boolean check = true;
        boolean check2 = true;

        int index = 0;
        int index2 = 0;

        while (check) { // 반복해서 체크
            while (check2) {
                if (req.getServletPath().substring(1).equals(authAllSubSelect.get(index).get(index2).getMenu_code())) { // 처음 메뉴값
                    av1 = authAllSubSelect.get(index).get(index2);
                    check2 = false;
                    check = false;
                    return av1;
                }

                if (authAllSubSelect.get(index).size() == index2 + 1) {
                    check2 = false;
                }
                ++index2;
            }
            check2 = true;
            index2 = 0;
            ++index;
        }
        return null;
    }


    public Auth boardMenu(String board_code,ArrayList<List<Auth>> authAllSubSelect)
    {
        Auth av1 = null;
        boolean check = true;
        boolean check2 = true;

        int index = 0;
        int index2 = 0;

        while (check) { // 반복해서 체크
            while (check2) {
                if (board_code.equals(authAllSubSelect.get(index).get(index2).getMenu_code())) { // 처음 메뉴값
                    av1 = authAllSubSelect.get(index).get(index2);
                    check2 = false;
                    check = false;
                    return av1;
                }

                if (authAllSubSelect.get(index).size() == index2 + 1) {
                    check2 = false;
                }
                ++index2;
            }
            check2 = true;
            index2 = 0;
            ++index;
        }
        return null;
    }


    public String MakeCodeList(String codeList)
    {
        codeList.trim();
        log.info("all data = " + codeList);
        log.info("substring(0,1) = " + codeList.substring(0,1));
        log.info("last substring = " + codeList.substring(codeList.length()-1));
        if(codeList.substring(0,1).equals("/")){
            log.info("첫번째 데이터 없음");
        }
        else if(codeList.substring(codeList.length()-1).equals("/")){
            log.info("마지막 데이터 없음");
        }
        else if(codeList.contains("//")){
            log.info("중간 데이터 없음");
        } else {
            String[] one = codeList.split("&");
            String[] two = codeList.split("|");
            String[] tree = codeList.split(",");
            int a = 0;

            for (int i = 0; i < one.length; i++) {
                a = tree[i].length();
                log.info("tree["+i+"] data 추출 = " + codeList.substring(a+1,a+2));
                log.info("one = " + one[i]);
            }
            for (int x = 0; x < two.length; x++) {
                log.info("two = " + two[x]);
            }
        }
        return null;
    }

}
