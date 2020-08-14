package com.mes.mesPop.PopStatus;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN_ORD_CD;
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

    @RequestMapping(value = "/sysSPartDrawingAdd", method = RequestMethod.POST)
    public String sysSPartDrawingAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("supp_code"));
        files.setKey2(req.getParameter("part_kind"));
        files.setKey3(req.getParameter("part_code"));
        files.setRemark2(req.getParameter("remark2"));
        int check = Integer.parseInt(req.getParameter("check"));
        if(check == 1 ) {
            popStatusService.sysSPartDrawingAdd(files, req);
        } else {
            popStatusService.sysSPartDrawingAdd2(files, req);
        }
        return "수정되었습니다.";
    }
}
