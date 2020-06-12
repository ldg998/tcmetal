package com.mes.mesCrm.mesCrm;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesCrm.mesCrm.CrmMapper;
import com.mes.mesCrm.mesCrm.DTO.*;
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
public class CrmService extends ReturnFunction {
    @Autowired
    private CrmMapper crmMapper;

    public RESTful crmOrderRecpGet( Page p) {
        List<CRM_ORD_RECP> rows = crmMapper.crmOrderRecpGet(p);
        return getListData(rows , p);
    }

    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, MultipartHttpServletRequest req) throws IOException {
        crmOrdRecp.setUser_code(getSessionData(req).getUser_code());
        Message m = crmMapper.crmOrderRecpAdd(crmOrdRecp);
        File dir = new File("C:/UploadFile/sound/crmOrderRecp");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        int delcheck = 0;
        MultipartFile uploadedFile = null;
        Page p2 = new Page();
        String FileName3="";
        String  fileImage = null;
        File file = null;
        if (!m.getResult().equals("NG")){

            crmOrdRecp.setOrd_no(m.getResult());
            CRM_IMAGE ci = crmMapper.crmImageGet(crmOrdRecp);



            for (int i =1 ; i <= 5; i++ ){
                fileImage = null;
                delcheck = Integer.parseInt(req.getParameter("delcheck"+i));

                uploadedFile = req.getFile("imageFile"+i);
                p2.setKeyword(crmOrdRecp.getOrd_no());
                p2.setPage(i);
                if (ci != null){
                    if (i == 1){
                        if (ci.getImage1()!= null){
                            file = new File(ci.getImage1());
                            fileImage = ci.getImage1();
                        }
                    } else if (i == 2){
                        if (ci.getImage2()!= null){
                            file = new File(ci.getImage2());
                            fileImage = ci.getImage2();
                        }
                    } else if (i == 3) {
                        if (ci.getImage3()!= null){
                            file = new File(ci.getImage3());
                            fileImage = ci.getImage3();
                        }
                    } else if (i == 4) {
                        if (ci.getImage4()!= null){
                            file = new File(ci.getImage4());
                            fileImage = ci.getImage4();
                        }
                    } else {
                        if (ci.getImage5()!= null){
                            file = new File(ci.getImage5());
                            fileImage = ci.getImage5();
                        }
                    }

                }


                if (!uploadedFile.isEmpty()){


                    Date now = new Date();
                    SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
                    String FileName = format.format(now) +"_"+ m.getResult()+"_"+i;
                    String[] name = uploadedFile.getOriginalFilename().split("\\.");
                    String FileName2 = FileName + "." + name[name.length -1];




                    if (fileImage != null){
                        file.delete();
                        crmMapper.crmImageDelete(p2);
                    }

                    file = new File("C:/UploadFile/sound/crmOrderRecp", FileName2);
                    //uploadedFile 을 file로 저장한다.
                    //물리적인 공간에 저장.
                    uploadedFile.transferTo(file);
                    FileName3 = "/uploadFile/crmOrderRecp/"+FileName2;

                    p2.setKeyword3(FileName3);
                    crmMapper.crmImageAdd(p2);
                }

                if (delcheck == 1){
                    if (!fileImage.equals("")){
                        File file2 = new File(fileImage);
                        file2.delete();
                        crmMapper.crmImageDelete(p2);
                    }
                }


            }


        }

        m.setResult("OK");

        return m;
    }

    public Message crmOrderRecpDel(CRM_ORD_RECP crmOrdRecp) {


        char ch = 5;
        String str = Character.toString(ch);
        String cList[] = crmOrdRecp.getKeyword().split(str);

        for (String c2: cList) {

            List<CRM_ORD_RECP_IMG> cori = crmMapper.crmImageAllGet(c2);
            File file = null;
            for (CRM_ORD_RECP_IMG c: cori) {
                file = new File("C:/UploadFile/sound"+c.getImg_file().substring(11));
                file.delete();
            }
            crmMapper.crmImageAllDel(c2);
        }

        return crmMapper.crmOrderRecpDel(crmOrdRecp);
    }

    public CRM_ORD_RECP crmOrderRecpOneGet(Page p) {
        return crmMapper.crmOrderRecpOneGet(p);

    }

//    public RESTful crmProdOrderGet(HttpServletRequest req, Page p) {
//        p.setSite_code(getSessionData(req).getSite_code());
//        List<CRM_ORD_RECP> rows = crmMapper.crmProdOrderGet(p);
//        return getListData(rows , p);
//    }
//
//    public CRM_ORD_RECP crmProdOrderOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
//        cor.setSite_code(getSessionData(req).getSite_code());
//        return crmMapper.crmProdOrderOneGet(cor);
//    }
//
//    public String crmRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req) {
//        // test
//        Random random = new Random();
//        crmOrdRecp.setOrd_no("CRM" + random.nextInt(9999));
//
//        crmOrdRecp.setSite_code(getSessionData(req).getSite_code());
//        crmOrdRecp.setUser_code(getSessionData(req).getUser_code());
//        return crmMapper.crmRecpAdd(crmOrdRecp).getMessage();
//    }
//
//    public RESTful crmWorkListGet(HttpServletRequest req, Page p) {
//        p.setSite_code(getSessionData(req).getSite_code());
//        List<CRM_ORD_RECP> rows = crmMapper.crmWorkListGet(p);
//        return getListData(rows, p);
//    }
//
//    public CRM_ORD_RECP crmWorkListOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
//        cor.setSite_code(getSessionData(req).getSite_code());
//        return crmMapper.crmWorkListOneGet(cor);
//    }
//
//    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req) {
//        crmOrdRecp.setSite_code(getSessionData(req).getSite_code());
//        crmOrdRecp.setUser_code(getSessionData(req).getUser_code());
//        return crmMapper.crmOrderRecpAdd(crmOrdRecp);
//    }
//
    public RESTful crmPlanGet(HttpServletRequest req, Page p) {
        List<CRM_PLAN> rows = crmMapper.crmPlanGet(p);
        return getListData(rows, p);
    }

    public CRM_PLAN crmPlanOneGet(CRM_PLAN cp) {
        return crmMapper.crmPlanOneGet(cp);
    }

    public Message crmPlanAdd(CRM_PLAN cp, HttpServletRequest req) {
        cp.setUser_code(getSessionData(req).getUser_code());
        return crmMapper.crmPlanAdd(cp);
    }

    public Message crmPlanDelete(CRM_PLAN cp) {
        return crmMapper.crmPlanDelete(cp);
    }

    public Message crmWorkListUpdate(CRM_PLAN cp,HttpServletRequest req) {
        cp.setUser_code(getSessionData(req).getUser_code());
        return crmMapper.crmWorkListUpdate(cp);
    }

    public RESTful crmMoneyGet(HttpServletRequest req, Page p) {
        p.setUser_code(getSessionData(req).getUser_code());
        List<CRM_ORD_RECP> rows = crmMapper.crmMoneyGet(p);
        return getListData(rows, p);
    }

    public CRM_ORD_RECP crmMoneyOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
        return crmMapper.crmMoneyOneGet(cor);
    }

    public Message crmMoneyAdd(HttpServletRequest req, CRM_ORD_RECP cor) {
        cor.setUser_code(getSessionData(req).getUser_code());
        return crmMapper.crmMoneyAdd(cor);
    }

    public Message crmMoneyComp(HttpServletRequest req, CRM_ORD_RECP cor) {
        return crmMapper.crmMoneyComp(cor);
    }

    public Message crmWeAddUpdate(CRM_WE cw, HttpServletRequest req) {
        cw.setUser_code(getSessionData(req).getUser_code());
        return crmMapper.crmWeAddUpdate(cw);
    }

    public RESTful crmWeList(Page p, HttpServletRequest req) {
        List<CRM_WE> rows = crmMapper.crmWeList(p);
        return getListData(rows, p);  }

    public RESTful crmWeOneGet(Page p, HttpServletRequest req) {

        List<CRM_WE> rows = crmMapper.crmWeOneGet(p); return getListData(rows, p);
    }

    public List<CRM_WE> crmWeListOneGet(Page p, HttpServletRequest req) {return crmMapper.crmWeListOneGet(p);}

    public Message crmWeDelete(Page p, HttpServletRequest req) { return crmMapper.crmWeDelete(p);
    }


//
//    public RESTful crmAssyCableGet(HttpServletRequest req, Page p) {
//        p.setSite_code(getSessionData(req).getSite_code());
//        List<SYS_ASSY_CABLE> rows = crmMapper.crmAssyCableGet(p);
//        return getListData(rows, p);
//    }
//
//    public Message crmAssyCableAdd(SYS_ASSY_CABLE sac, HttpServletRequest req) {
//        sac.setSite_code(getSessionData(req).getSite_code());
//        sac.setUser_code(getSessionData(req).getUser_code());
//        return crmMapper.crmAssyCableAdd(sac);
//    }
//
//    public Message crmAssyCableDel(SYS_ASSY_CABLE sac, HttpServletRequest req) {
//        sac.setSite_code(getSessionData(req).getSite_code());
//        return crmMapper.crmAssyCableDel(sac);
//    }
//
//    public RESTful crmOutListGet(HttpServletRequest req, Page p) {
//        p.setSite_code(getSessionData(req).getSite_code());
//        List<CRM_OUT_SUB> rows = crmMapper.crmOutListGet(p);
//        return getListData(rows , p);
//    }
//
//    public Message crmProdOrderAdd(CRM_ORD_RECP cor, HttpServletRequest req) {
//        cor.setSite_code(getSessionData(req).getSite_code());
//        cor.setUser_code(getSessionData(req).getUser_code());
//        return crmMapper.crmProdOrderAdd(cor);
//    }
//
//    public Message crmProdOrderDel(CRM_ORD_RECP cor, HttpServletRequest req) {
//        cor.setSite_code(getSessionData(req).getSite_code());
//        return crmMapper.crmProdOrderDel(cor);
//    }
//
//    public Message crmWorkListAdd(CRM_ORD_RECP cor, HttpServletRequest req) {
//        cor.setSite_code(getSessionData(req).getSite_code());
//        cor.setUser_code(getSessionData(req).getUser_code());
//        return crmMapper.crmWorkListAdd(cor);
//    }


}
