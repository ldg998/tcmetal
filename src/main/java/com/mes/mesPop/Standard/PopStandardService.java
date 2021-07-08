package com.mes.mesPop.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesPop.Standard.MesPopMapper;
import com.mes.mesManager.User.DTO.SYSUser;
import com.mes.mesPop.Standard.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PopStandardService extends ReturnFunction {

    @Autowired
    private MesPopMapper mesPopMapper;


    public RESTful popRouteGet(HttpServletRequest req, Page p) {
        List<POP_ROUTE_CD> rows = mesPopMapper.popRouteGet(p);
        return getListData(rows,p);
    }

    public POP_ROUTE_CD popRouteOneGet(HttpServletRequest req, POP_ROUTE_CD pr) {
        return mesPopMapper.popRouteOneGet(pr);
    }

    public Message popRouteAdd(HttpServletRequest req, POP_ROUTE_CD pr) {
        pr.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popRouteAdd(pr);
    }

    public Message popRouteDel(HttpServletRequest req, POP_ROUTE_CD pr) {
        return mesPopMapper.popRouteDel(pr);
    }




    public RESTful popBcrFormGet(HttpServletRequest req, Page p) {
        List<POP_BCR_FORM> rows = mesPopMapper.popBcrFormGet(p);
        return getListData(rows, p);
    }

    public POP_BCR_FORM popBcrFormOneGet(HttpServletRequest req, POP_BCR_FORM pbf) {
        return mesPopMapper.popBcrFormOneGet(pbf);
    }

    public Message popBcrFormAdd(HttpServletRequest req, POP_BCR_FORM pbf) {
        pbf.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popBcrFormAdd(pbf);
    }

    public Message popBcrFormDel(HttpServletRequest req, POP_BCR_FORM pbf) {
        return mesPopMapper.popBcrFormDel(pbf);
    }




    public RESTful popLineUserGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_LINE_USER_CD> rows = mesPopMapper.popLineUserGet(p);
        return getListData(rows,p);
    }

    public Message popLineUserAdd(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        pluc.setSite_code(getSessionData(req).getSite_code());
        pluc.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popLineUserAdd(pluc);
    }

    public Message popLineUserDel(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        pluc.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popLineUserDel(pluc);
    }

    public Message popErrorTypeAdd(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        plec.setSite_code(getSessionData(req).getSite_code());
        plec.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popErrorTypeAdd(plec);
    }

    public RESTful popErrorTypeGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_LINE_ERROR_CD> rows = mesPopMapper.popErrorTypeGet(p);
        return getListData(rows,p);
    }

    public Message popErrorTypeDel(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        plec.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popErrorTypeDel(plec);
    }

    public RESTful popSpecGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_SPEC> rows = mesPopMapper.popSpecGet(p);
        return getListData(rows,p);
    }

    public Message popSpecAdd(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        ps.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popSpecAdd(ps);

    }

    public POP_SPEC popSpecOneGet(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popSpecOneGet(ps);
    }

    public Message popSpecDel(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popSpecDel(ps);
    }

    public RESTful popReportSpecGet(HttpServletRequest req, Page p) {
        List<SYS_PROD_REPORT_SPEC> rows = mesPopMapper.popReportSpecGet(p);
        return getListData(rows,p);
    }

    public SYS_PROD_REPORT_SPEC popReportSpecOneGet(HttpServletRequest req, Page p) {
        return mesPopMapper.popReportSpecOneGet(p);
    }

    public Message popReportSpecAdd(MultipartHttpServletRequest req, SYS_PROD_REPORT_SPEC sprs) throws IOException {
        sprs.setUser_code(getSessionData(req).getUser_code());

        Message m = mesPopMapper.popReportSpecAdd(sprs);
        File dir = new File("D:/UploadFile/sound/popReportSpec");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        if (m.getResult().equals("OK")){

            int delcheck = Integer.parseInt(req.getParameter("delcheck"));

            MultipartFile uploadedFile = req.getFile("imageFile");




            Page p2 = new Page();
            p2.setKeyword(sprs.getProd_type());
            p2.setKeyword2(sprs.getProd_code());

            SYS_PROD_REPORT_SPEC sprs2 = mesPopMapper.popReportSpecOneGet(p2);
            String FileName3 = "";
            if (!uploadedFile.isEmpty()){


                Date now = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
                String FileName = format.format(now) +"_"+ sprs.getProd_type() + "_" + sprs.getProd_code();
                String[] name = uploadedFile.getOriginalFilename().split("\\.");
                String FileName2 = FileName + "." + name[name.length -1];

                File file = new File(sprs2.getImage());
                file.delete();

                file = new File("D:/UploadFile/sound/popReportSpec", FileName2);
                //uploadedFile 을 file로 저장한다.
                //물리적인 공간에 저장.
                uploadedFile.transferTo(file);
                FileName3 = "D:/UploadFile/sound/popReportSpec/"+FileName2;
                p2.setKeyword3(FileName3);
                mesPopMapper.popReportSpecImageUpdate(p2);
            }

            if (delcheck == 1){
                if (!sprs2.getImage().equals("")){
                    File file = new File(sprs2.getImage());
                    file.delete();
                    p2.setKeyword3("");
                    mesPopMapper.popReportSpecImageUpdate(p2);
                }
            }


        }
        return  m;

    }

    public RESTful sysUserGet2(HttpServletRequest req, Page p) {
        List<SYSUser> rows = mesPopMapper.sysUserGet2(p);
        return getListData(rows,p);
    }
}
