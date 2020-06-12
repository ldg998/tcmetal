package com.mes.mesManager.Master;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesManager.Master.MasterMapper;
import com.mes.mesManager.Master.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Service
public class MasterService extends UploadFunction {

    @Autowired
    private MasterMapper masterMapper;

    //공통코드관리
    //공통코드관리 코드그룹 목록
    public List<SYSCommon> getCommonGroup(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.getCommonGroup(p);
    }
    //공통코드관리 코드그룹 목록
    public RESTful sysCommonGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSCommon> rows = masterMapper.sysCommonGet(p);
        return getListData(rows , p);
    }
    //공통코드관리 공통코드 추가
    public Message sysCommonAdd(HttpServletRequest req, SYSCommon vo) {
        vo.setSite_code(getSessionData(req).getSite_code());
        vo.setUser_code(getSessionData(req).getUser_code());
        return masterMapper.sysCommonAdd(vo);
    }
    //공통코드관리 공통코드 삭제
    public Message sysCommonDelete(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCommonDelete(p);
    }
    //공통코드관리 공통코드 수정 , 그리드에서 하나의 항목 값 조회
    public SYSCommon sysCommonOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCommonOneGet(p);
    }

    //메세지관리
    //메세지관리 메세지 목록
    public RESTful sysMsgGet(Page p){
        List<SYSMsg> rows = masterMapper.sysMsgGet(p);
        return getListData(rows , p);
    }
    //메세지관리 메세지 추가
    public Message sysMsgAdd(HttpServletRequest req, SYSMsg smv){
        smv.setUser_code(getSessionData(req).getUser_code());
        return masterMapper.sysMsgAdd(smv);
    }
    //메세지관리 메세지 삭제
    public Message sysMsgDelete(Page p){
        p.setKeyword(p.getKeyword());
        return masterMapper.sysMsgDelete(p);
    }
    //메세지관리 메세지 수정 시 그리드에서 하나의 항목 값 조회
    public SYSMsg sysMsgOneGet(Page p) {
        return masterMapper.sysMsgOneGet(p);
    }


    
    public List<SYSCommon> sysCommonDutyGet(HttpServletRequest req, Page p){
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCommonDutyGet(p);
    }

    public RESTful sysBoardGet(Page p, HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSBoard> rows = masterMapper.sysBoardGet(p);
        return getListData(rows , p);
    }
    
    public Message sysBoardAdd(HttpServletRequest req, SYSBoard sbv){
        sbv.setSite_code(getSessionData(req).getSite_code());
        sbv.setUser_code(getSessionData(req).getUser_code());
        return masterMapper.sysBoardAdd(sbv);
    }

    public Message sysBoardDelete(Page p,HttpServletRequest req){
            p.setSite_code(getSessionData(req).getSite_code());
            p.setKeyword(p.getKeyword());
        return masterMapper.sysBoardDelete(p);
    }

    public RESTful sysProdLineGet(Page p, HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSProdLine> rows = masterMapper.sysProdLineGet(p);
        return getListData(rows , p);
    }

    public Message sysProdLineAdd(HttpServletRequest req, SYSProdLine spv){
        spv.setSite_code(getSessionData(req).getSite_code());
        spv.setUser_code(getSessionData(req).getUser_code());
        return masterMapper.sysProdLineAdd(spv);
    }

    public Message sysProdLineDelete(Page p, HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        p.setKeyword(p.getKeyword());
        return masterMapper.sysProdLineDelete(p);
    }

    public RESTful sysCargoGet(Page p, HttpServletRequest req){
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSCargo> rows = masterMapper.sysCargoGet(p);
        return getListData(rows , p);
    }

    public Message sysCargoAdd(HttpServletRequest req, SYSCargo scv){
        scv.setSite_code(getSessionData(req).getSite_code());
        scv.setUser_code(getSessionData(req).getUser_code());
        return masterMapper.sysCargoAdd(scv);
    }

    public Message sysCargoDelete(HttpServletRequest req,Page p){
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCargoDelete(p);
    }

    public List<SYSCargo> sysCargoBAllGet(HttpServletRequest req,Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCargoBAllGet(p);
    }





    public RESTful sysSuppListGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSSupp> rows = masterMapper.sysSuppListGet(p);
        return getListData(rows , p);
    }



    public SYSSupp sysSuppOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysSuppOneGet(p);
    }




    public SYSBoard sysBoardOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysBoardOneGet(p);
    }

    public SYSProdLine sysProdLineOneGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysProdLineOneGet(p);
    }

    public SYSCargo sysCargoOneGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        return masterMapper.sysCargoOneGet(p);
    }

    public List<SYSSupp> autocomplete_Supp_Name(Page p) {return masterMapper.autocomplete_Supp_Name(p);}
    public List<SYSSupp> autocomplete_Supp_no(Page p) {return masterMapper.autocomplete_Supp_no(p);}

    public Message sysSuppAdd(MultipartHttpServletRequest req, SYSSupp ssupp) {
        ssupp.setUser_code(getSessionData(req).getUser_code());
        Message msg = masterMapper.sysSuppAdd(ssupp);
        int check1 = Integer.parseInt(req.getParameter("check1"));
        MultipartFile up = req.getFile("file");
        if(!msg.getResult().equals("NG")){
            if (ssupp.getKeyword().equals("I")){
                if (up != null) {
                    String page_name = "sysSupp";
                    Files newFiles = setSysSuppFile(page_name,req,"C:/UploadFile/sound/sysSupp/");
                    newFiles.setKey1(msg.getResult()); //supp_code
                    masterMapper.sysSuppFileUpdate(newFiles);
                    // newFiles.getKey_value()   file1  업데이트
                }
            } else {
                // supp_cd  oneGet
                Page p = new Page();
                p.setKeyword(msg.getResult());
                p.setKeyword2("");
                SYSSupp s = masterMapper.sysSuppOneGet(p);
                if (check1 == 0) {
                    // 기존의 데이터 삭제 후
                    if (!s.getFile1().equals("")){
                        File file = new File("C:/UploadFile/sound/sysSupp/"+s.getFile1());
                        file.delete();
                        // file_cd  key  delete
                        masterMapper.fileCdDelete(s.getFile1());
                    }


                    String page_name = "sysSupp";
                    Files newFiles = setSysSuppFile(page_name,req,"C:/UploadFile/sound/sysSupp/");
                    newFiles.setKey1(msg.getResult()); //supp_code
                    masterMapper.sysSuppFileUpdate(newFiles);
                    // newFiles.getKey_value()   file1  업데이트

                } else {
                    // 파일만 삭제 후
                    //s.getFile1();
                    if (!s.getFile1().equals("")){
                        File file = new File("C:/UploadFile/sound/sysSupp/"+s.getFile1());
                        file.delete();
                        masterMapper.fileCdDelete(s.getFile1());
                    }
                    Files newFiles = new Files();
                    newFiles.setKey1(msg.getResult());
                    newFiles.setKey_value("");
                    masterMapper.sysSuppFileUpdate(newFiles);
                    // File1 업데이트
                }
            }
        }
        return  msg;
    }

    public Message sysSuppListDel(Page p) {

        String gu5 = "";
        char sp_gu5 = 5;
        gu5 = Character.toString(sp_gu5);


        String s[] = p.getKeyword2().split(gu5);
        for (String s1 : s) {
            File file = new File("C:/UploadFile/sound/sysSupp/"+s1);
            file.delete();
        }
        return masterMapper.sysSuppListDel(p);
    }

}

