package com.mes.mesPop.PopStatus;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.mesCrm.Standard.DTO.SYS_SPART_CD;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN_ORD_CD;
import com.mes.mesPop.PopStatus.DTO.POP_PROD_MHR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PopStatusRestController {
    @Autowired
    private PopStatusService popStatusService;

    @RequestMapping(value = "/popPlanOrderGet", method = RequestMethod.POST)
    public RESTful popPlanOrderGet(HttpServletRequest req, Page p) { return popStatusService.popPlanOrderGet(req,p);}

    @RequestMapping(value = "/popPlanOrderOrd", method = RequestMethod.POST)
    public List<POP_PLAN_ORD_CD> popPlanOrderOrd(HttpServletRequest req, Page p) { return popStatusService.popPlanOrderOrd(req, p); }

    @RequestMapping(value = "/popProdRangeGet", method = RequestMethod.POST)
    public RESTful popProdRangeGet(HttpServletRequest req, Page p) { return popStatusService.popProdRangeGet(req,p);}

    @RequestMapping(value = "/popProdList1Get", method = RequestMethod.POST)
    public RESTful popProdList1Get(HttpServletRequest req, Page p) { return popStatusService.popProdList1Get(req,p);}

    @RequestMapping(value = "/popProdList2Get", method = RequestMethod.POST)
    public RESTful popProdList2Get(HttpServletRequest req, Page p) { return popStatusService.popProdList2Get(req,p);}



    @RequestMapping(value = "/sysSPartDrawingAdd", method = RequestMethod.POST)
    public Message sysSPartDrawingAdd(MultipartHttpServletRequest req, SYS_SPART_CD ssc){

        return   popStatusService.sysSPartDrawingAdd3(req,ssc);
    }

    @RequestMapping(value = "/sysSPartWoodAdd", method = RequestMethod.POST)
    public String sysSPartWoodAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("supp_code"));
        files.setKey2(req.getParameter("part_kind"));
        files.setKey3(req.getParameter("part_code"));
        files.setWood_type1(req.getParameter("wood_type1"));
        files.setWood_type2(req.getParameter("wood_type2"));
        files.setWood_type3(req.getParameter("wood_type3"));
        files.setWood_type4(req.getParameter("wood_type4"));

        files.setWood_supp_name(req.getParameter("wood_supp_name"));
        files.setWood_in_date(req.getParameter("wood_in_date"));
        files.setWood_remark(req.getParameter("wood_remark"));
        int check = Integer.parseInt(req.getParameter("check"));
        if(check == 1 ) {
            popStatusService.sysSPartWoodAdd(files, req);
        } else {
            popStatusService.sysSPartWoodAdd2(files, req);
        }
        return "수정되었습니다.";
    }



    @RequestMapping(value = "/popProdListGet", method = RequestMethod.POST)
    public RESTful popProdListGet(HttpServletRequest req, Page p) {
        System.out.println(p);
        return popStatusService.popProdListGet(req,p);}


     @RequestMapping(value = "/popProdAnalysisGet", method = RequestMethod.POST)
    public RESTful popProdAnalysisGet(HttpServletRequest req, Page p) { return popStatusService.popProdAnalysisGet(req,p);}




    @RequestMapping(value = "/popProdReport1Get", method = RequestMethod.POST)
    public RESTful popProdReport1Get(HttpServletRequest req, Page p) { return popStatusService.popProdReport1Get(req,p);}



    @RequestMapping(value = "/popSpectroGet", method = RequestMethod.POST)
    public RESTful popSpectroGet(HttpServletRequest req, Page p) { return popStatusService.popSpectroGet(req,p);}


    @RequestMapping(value = "/sysProdHRGet", method = RequestMethod.POST)
    public RESTful sysProdHRGet(HttpServletRequest req, Page p) { return popStatusService.sysProdHRGet(req,p);}


    @RequestMapping(value = "/sysProdSumGet", method = RequestMethod.POST)
    public RESTful sysProdSumGet(HttpServletRequest req, Page p) { return popStatusService.sysProdSumGet(req,p);}

    @RequestMapping(value = "/popProdReportGet", method = RequestMethod.POST)
    public RESTful popProdReportGet(HttpServletRequest req, Page p) {
        System.out.println(p);
        return popStatusService.popProdReportGet(req,p);}

    @RequestMapping(value = "/popMonitoringGet", method = RequestMethod.POST)
    public RESTful popMonitoringGet(HttpServletRequest req, Page p) { return popStatusService.popMonitoringGet(req,p);}

     @RequestMapping(value = "/popLotTrackingGet", method = RequestMethod.POST)
     public RESTful popLotTrackingGet(HttpServletRequest req, Page p) { return popStatusService.popLotTrackingGet(req,p);}

     @RequestMapping(value = "/sysProdHrAdd", method = RequestMethod.POST)
     public Message sysProdHrAdd(HttpServletRequest req, POP_PROD_MHR ppm) { return popStatusService.sysProdHrAdd(req,ppm);}

     @RequestMapping(value = "/sysProdHrDel", method = RequestMethod.POST)
     public Message sysProdHrDel(HttpServletRequest req, POP_PROD_MHR ppm) { return popStatusService.sysProdHrDel(req,ppm);}

     @RequestMapping(value = "/popDownTimeGet", method = RequestMethod.POST)
     public RESTful popDownTimeGet(HttpServletRequest req, Page p) { return popStatusService.popDownTimeGet(req,p);}

     @RequestMapping(value = "/popSpectroAdd", method = RequestMethod.POST)
     public Message popSpectroAdd(HttpServletRequest req, POP_PLAN pp) { return popStatusService.popSpectroAdd(req,pp);}

    @RequestMapping(value = "/popProdMeltGet", method = RequestMethod.POST)
     public POP_PLAN popProdMeltGet(HttpServletRequest req, POP_PLAN pp) { return popStatusService.popProdMeltGet(req,pp);}

    @RequestMapping(value = "/sysProdHrDel2", method = RequestMethod.POST)
     public Message sysProdHrDel2(HttpServletRequest req, POP_PLAN pp) { return popStatusService.sysProdHrDel2(req,pp);}

     @RequestMapping(value = "/popProdList2SubGet", method = RequestMethod.POST)
     public RESTful popProdList2SubGet(Page p, POP_PLAN pp) { return popStatusService.popProdList2SubGet(p,pp);}

     @RequestMapping(value = "/popProdList2Add", method = RequestMethod.POST)
     public Message popProdList2Add(HttpServletRequest req,POP_PLAN pp) { return popStatusService.popProdList2Add(req,pp);}

    @RequestMapping(value = "/popProdLogAdd", method = RequestMethod.POST)
     public Message popProdLogAdd(HttpServletRequest req,POP_PLAN pp) {System.out.println(pp); return popStatusService.popProdLogAdd(req,pp);}





}
