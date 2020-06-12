package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesScm.Order  .OrderMapper;
import com.mes.mesScm.Order.DTO.*;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
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
public class OrderService extends ReturnFunction {
    @Autowired
    private OrderMapper orderMapper;

    public RESTful scmOrderImageGet(HttpServletRequest req, Page p) {
        List<SYS_ORD_IMAGE_CD> rows = orderMapper.scmOrderImageGet(p);
        return getListData(rows, p);
    }
    public Message scmOrderImageAdd(MultipartHttpServletRequest req, SYS_ORD_IMAGE_CD soi) throws IOException {
        soi.setUser_code(getSessionData(req).getUser_code());
        soi.setFile1("");
        Message m = orderMapper.scmOrderImageAdd(soi);
        File dir = new File("C:/UploadFile/sound/scmOrderImage");
        if(!dir.exists()){
            dir.mkdirs();
        }
        if(!m.getResult().equals("NG")){
            int delCheck = Integer.parseInt(req.getParameter("delCheck"));
            MultipartFile uploadedFile = req.getFile("files");

            Page p2 = new Page();
            p2.setKeyword(m.getResult());

            SYS_ORD_IMAGE_CD soi2 = orderMapper.scmOrderImageOneGet(p2);
            String FileName3 = "";
            if(!uploadedFile.isEmpty()){
                Date now = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
                String FileName = format.format(now)+"_"+soi.getImg_code();
                String[] name = uploadedFile.getOriginalFilename().split("\\.");
                String FileName2 = FileName + "." + name[name.length-1];

                File file = new File(soi.getFile1());
                file.delete();

                file = new File("C:/UploadFile/sound/scmOrderImage", FileName2);
                uploadedFile.transferTo(file);
                FileName3 = "C:/UploadFile/sound/scmOrderImage/"+FileName2;
                p2.setKeyword2(FileName3);
                orderMapper.scmOrderImageUpdate(p2);
            }

            if(delCheck == 1) {
                if(!soi2.getFile1().equals("")){
                    File file = new File(soi2.getFile1());
                    file.delete();
                    p2.setKeyword2("");
                    orderMapper.scmOrderImageUpdate(p2);
                }
            }
        }
        return m;
    }
    public Message scmOrderImageDel(HttpServletRequest req, SYS_ORD_IMAGE_CD soi) throws IOException {
        char gu1 = 4;
        char gu2 = 5;
        String ids1 = Character.toString(gu1);
        String ids2 = Character.toString(gu2);
        String list[] = soi.getKeyword().split(ids1);
        soi.setKeyword(list[0]);
        if(list.length == 2) {
            String list2[] = list[1].split(ids2);
            for(String f : list2){
                if(!f.equals("")){
                    File file = new File(f);
                    file.delete();
                }
            }
        }
        return orderMapper.scmOrderImageDel(soi);
    }

    public RESTful scmOrderGet(HttpServletRequest req, Page p) {
        List<SCM_IN_ORD> rows = orderMapper.scmOrderGet(p);
        return getListData(rows, p);
    }
    public RESTful scmOrderSubGet(HttpServletRequest req, Page p) {
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderSubGet(p);
        return getListData(rows, p);
    }
    public Message scmOrderAdd(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderAdd(sio);
    }
    public List<SCM_IN_ORD_SUB> scmOrderPartOneGet(HttpServletRequest req, SCM_IN_ORD_SUB sios) {
        return orderMapper.scmOrderPartOneGet(sios);
    }
    public Message scmOrderDel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderDel(sio);
    }
    public Message scmOrderComp(HttpServletRequest req, SCM_IN_ORD sio) { return orderMapper.scmOrderComp(sio); }
    public RESTful scmOrderListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderListGet(p);
        return getListData(rows, p);
    }

    public Message scmOrderReady(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderReady(sio);
    }



    public RESTful scmReqOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REQ_ORD> rows = orderMapper.scmReqOrderGet(p);
        return getListData(rows, p);
    }










    public RESTful scmOrderSub1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderSub1Get(p);
        return getListData(rows, p);
    }

    public List<SCM_IN_ORD_SUB> scmOrderSub2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmOrderSub1Get(p);
    }

    public Message scmReqOrderAdd(HttpServletRequest req, SCM_REQ_ORD_SUB sros) {
        sros.setSite_code(getSessionData(req).getSite_code());
        sros.setUser_code(getSessionData(req).getUser_code());
        return  orderMapper.scmReqOrderAdd(sros);
    }

    public Message scmOrderAdd2(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderAdd2(sio);
    }

    public RESTful scmReqOrderSubGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REQ_ORD_SUB> rows = orderMapper.scmReqOrderSubGet(p);
        return getListData(rows, p);
    }

    public List<SCM_REQ_ORD_SUB> scmReqOrderSubAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmReqOrderSubGet(p);
    }

    public Message scmReqOrderDel(HttpServletRequest req, SCM_REQ_ORD sro) {
        sro.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmReqOrderDel(sro);
    }

    public Message scmOrderCancel(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderCancel(sio);
    }


    public SYS_ORD_IMAGE_CD scmOrderImageOneGet(HttpServletRequest req, Page p) {
        return orderMapper.scmOrderImageOneGet(p);
    }


    public List<SYS_ORD_IMAGE_CD> scmOrderImageList(HttpServletRequest req, SYS_ORD_IMAGE_CD soi) {
        return orderMapper.scmOrderImageList(soi);
    }


    public SCM_IN_ORD scmOrderOneGet(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderOneGet(sio);
    }


    public List<SCM_IN_ORD_SUB_PDF> scmOrderSubPdfGet(Page p) {
        return orderMapper.scmOrderSubPdfGet(p);
    }

    public RESTful scmOrderPartGet(HttpServletRequest req, Page p) {
        List<SYS_PART_CD> rows = orderMapper.scmOrderPartGet(p);
        return getListData(rows, p);
    }
}
