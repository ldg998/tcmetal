package com.mes.mesQms.Shipment;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.mesQms.Shipment.DTO.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Slf4j
public class QmsShipmentRestController extends UploadFunction {

    @Autowired
    private QmsShipmentService qmsShipmentService;

    @RequestMapping(value ="/qmsProdErrorManGet", method = RequestMethod.POST)
    public RESTful qmsProdErrorManGet(Page p, HttpServletRequest req) { return qmsShipmentService.qmsProdErrorManGet(p, req); }

    @RequestMapping(value = "/qmsProdGet", method = RequestMethod.POST)
    public RESTful qmsProdGet(Page p, HttpServletRequest req) {
        return qmsShipmentService.qmsProdGet(p, req);
    }
    @RequestMapping(value = "/qmsProdSubGet", method = RequestMethod.POST)
    public RESTful qmsProdSubGet(Page p, HttpServletRequest req) {
        return qmsShipmentService.qmsProdSubGet(p, req);
    }
    @RequestMapping(value = "/qmsProdSubAllGet", method = RequestMethod.POST)
    public List<QMS_PROD_SUB> qmsProdSubAllGet(Page p, HttpServletRequest req) {
        return qmsShipmentService.qmsProdSubAllGet(p, req);
    }
    @RequestMapping(value = "/qmsProdAdd", method = RequestMethod.POST)
    public Message qmsProdAdd(HttpServletRequest req, QMS_PROD_SUB qps) {
        return qmsShipmentService.qmsProdAdd(req, qps);
    }

    @RequestMapping(value = "/qmsProdListGet", method = RequestMethod.POST)
    public RESTful qmsProdListGet(Page p, HttpServletRequest req) { return qmsShipmentService.qmsProdListGet(p, req); }

    @RequestMapping(value = "/qmsProdListRPTGet", method = RequestMethod.POST)
    public List<QMS_PROD_RPT> qmsProdListRPTGet(Page p, HttpServletRequest req) { return qmsShipmentService.qmsProdListRPTGet(p, req); }

    @RequestMapping(value ="/qmsProdErrorManOneGet", method = RequestMethod.POST)
    public QMS_PROD_SUB qmsProdErrorManOneGet(QMS_PROD_SUB qmsProdSub, HttpServletRequest req){
        return qmsShipmentService.qmsProdErrorManOneGet(qmsProdSub, req);
    }

    @RequestMapping(value = "/qmsProdMRBGet", method = RequestMethod.POST)
    public RESTful qmsProdMRBGet(Page p, HttpServletRequest req){ return qmsShipmentService.qmsProdMRBGet(p, req); }

    @RequestMapping(value = "/qmsProdMRBAdd", method = RequestMethod.POST)
    public Message qmsProdMRBAdd(HttpServletRequest req, QMS_PROD_SUB qps) {
        return qmsShipmentService.qmsProdMRBAdd(req, qps);
    }

    @RequestMapping(value = "/qmsProdMRBCancel", method = RequestMethod.POST)
    public Message qmsProdMRBCancel(HttpServletRequest req, QMS_PROD_SUB qps) {
        return qmsShipmentService.qmsProdMRBCancel(req, qps);
    }

    @RequestMapping(value = "/qmsProdErrorManAdd", method = RequestMethod.POST)
    public String qmsProdErrorManAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("qc_no"));
        files.setKey3(req.getParameter("act_type"));
        String p = "C:/UploadFile/sound/qmsProdErrorMan/";
        int check2 = Integer.parseInt(req.getParameter("check2"));
        int check3 = Integer.parseInt(req.getParameter("check3"));
        if(check2+check3 == 0)
        {
            qmsShipmentService.qmsProdErrorManAdd_NoneFile(files, req);
        }
        if (check2+check3 != 2) {
            if(check3 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File3(files, req, p);
            }
            if(check2 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File2(files, req, p);
            }

        } else if(check2+check3 == 2) {
            qmsShipmentService.qmsProdErrorManAdd_AllFile(files, req, p);
        }
        return "수정되었습니다.";
    }

    @RequestMapping(value = "/qmsAssyErrorManAdd", method = RequestMethod.POST)
    public String qmsAssyErrorManAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("qc_no"));
        files.setKey3(req.getParameter("act_type"));
        String p = "C:/UploadFile/sound/qmsAssyErrorMan/";
        int check2 = Integer.parseInt(req.getParameter("check2"));
        int check3 = Integer.parseInt(req.getParameter("check3"));
        if(check2+check3 == 0)
        {
            qmsShipmentService.qmsProdErrorManAdd_NoneFile(files, req);
        }
        if (check2+check3 != 2) {
            if(check3 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File3(files, req, p);
            }
            if(check2 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File2(files, req, p);
            }

        } else if(check2+check3 == 2) {
            qmsShipmentService.qmsProdErrorManAdd_AllFile(files, req, p);
        }
        return "수정되었습니다.";
    }

    @RequestMapping(value = "/qmsOutsErrorManAdd", method = RequestMethod.POST)
    public String qmsOutsErrorManAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("qc_no"));
        files.setKey3(req.getParameter("act_type"));
        String p = "C:/UploadFile/sound/qmsOutsErrorMan/";
        int check2 = Integer.parseInt(req.getParameter("check2"));
        int check3 = Integer.parseInt(req.getParameter("check3"));
        if(check2+check3 == 0)
        {
            qmsShipmentService.qmsProdErrorManAdd_NoneFile(files, req);
        }
        if (check2+check3 != 2) {
            if(check3 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File3(files, req, p);
            }
            if(check2 == 1)
            {
                qmsShipmentService.qmsProdErrorManAdd_File2(files, req, p);
            }

        } else if(check2+check3 == 2) {
            qmsShipmentService.qmsProdErrorManAdd_AllFile(files, req, p);
        }
        return "수정되었습니다.";
    }

    @RequestMapping(value = "/qmsProdErrorListSumGet", method = RequestMethod.POST)
    public List<QMS_PROD_NG_SUM> qmsProdErrorListSumGet(Page p, HttpServletRequest req) {
        return qmsShipmentService.qmsProdErrorListSumGet(p, req);
    }

    @RequestMapping(value = "/qmsProdListOneGet", method = RequestMethod.POST)
    public QMS_PROD_SUB qmsProdListOneGet(HttpServletRequest req, QMS_PROD_SUB qps) {
        return qmsShipmentService.qmsProdListOneGet(req,qps);
    }

    @RequestMapping(value = "/sysSPartFile1Add", method = RequestMethod.POST)
    public String sysSPartFile1Add(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("supp_code"));
        files.setKey2(req.getParameter("part_kind"));
        files.setKey3(req.getParameter("part_code"));

        int check = Integer.parseInt(req.getParameter("check"));
        if(check == 1 ) {
            qmsShipmentService.sysSPartFile1Add(files, req);
        }
        return "수정되었습니다.";
    }


    @RequestMapping(value ="/qmsInspMachineGet", method = RequestMethod.POST)
    public RESTful qmsInspMachineGet(Page p, HttpServletRequest req) { return qmsShipmentService.qmsInspMachineGet(p, req); }

    @RequestMapping(value ="/qmsInspMachineOneGet", method = RequestMethod.POST)
    public QMS_INSP_MACHINE qmsInspMachineOneGet(QMS_INSP_MACHINE qms_insp_machine, HttpServletRequest req){
        return qmsShipmentService.qmsInspMachineOneGet(qms_insp_machine, req);
    }

    @RequestMapping(value ="/qmsInspMachineAdd", method = RequestMethod.POST)
    public Message qmsInspMachineAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setMachine_code(req.getParameter("machine_code"));
        files.setMachine_name(req.getParameter("machine_name"));
        files.setDevice_no(req.getParameter("device_no"));
        files.setCapa(req.getParameter("capa"));
        files.setSpec(req.getParameter("spec"));
        files.setCorrect_corp_name(req.getParameter("correct_corp_name"));
        files.setCorrect_date(req.getParameter("correct_date"));
        files.setEnd_date(req.getParameter("end_date"));
        files.setAlarm_day(Integer.parseInt(req.getParameter("alarm_day")));
        files.setKeyword(req.getParameter("keyword"));
        return qmsShipmentService.qmsInspMachineAdd(files, req);
    }

    @RequestMapping(value="/qmsInspMachineDel")
    public Message qmsInspMachineDel(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsInspMachineDel(p,req);
    }

      @RequestMapping(value="/qmsProdListModalGet")
    public RESTful qmsProdListModalGet(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsProdListModalGet(p,req);
    }

     @RequestMapping(value="/qmsProdListDel")
    public Message qmsProdListDel(Page p){
        return qmsShipmentService.qmsProdListDel(p);
    }


    @RequestMapping(value = "/qmsProdListUpload", method = RequestMethod.POST)
    public Message qmsProdListUpload(MultipartHttpServletRequest req,QMS_PROD_SUB qps){
        return qmsShipmentService.qmsProdListUpload(req,qps);
    }


     @RequestMapping(value = "/qmsProdErrorReqAdd", method = RequestMethod.POST)
    public Message qmsProdErrorReqAdd(MultipartHttpServletRequest req, QMS_RET qr){
        return qmsShipmentService.qmsProdErrorReqAdd(req,qr);
    }


     @RequestMapping(value = "/qmsProdErrorReqGet", method = RequestMethod.POST)
    public RESTful qmsProdErrorReqGet(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsProdErrorReqGet(p,req);
    }

    @RequestMapping(value = "/qmsProdErrorReqDel", method = RequestMethod.POST)
    public Message qmsProdErrorReqDel(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsProdErrorReqDel(p,req);
    }

     @RequestMapping(value = "/qmsMoldWashAdd", method = RequestMethod.POST)
    public Message qmsMoldWashAdd(POP_MOLD_WASH pmw,HttpServletRequest req){
        return qmsShipmentService.qmsMoldWashAdd(pmw,req);
    }

     @RequestMapping(value = "/qmsMoldWashGet", method = RequestMethod.POST)
    public RESTful qmsMoldWashGet(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsMoldWashGet(p,req);
    }

    @RequestMapping(value = "/qmsMoldWashDel", method = RequestMethod.POST)
    public Message qmsMoldWashDel(Page p,HttpServletRequest req){
        return qmsShipmentService.qmsMoldWashDel(p,req);
    }




}
