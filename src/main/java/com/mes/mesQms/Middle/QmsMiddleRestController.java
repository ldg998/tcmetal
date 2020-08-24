package com.mes.mesQms.Middle;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Middle.DTO.QMS_PROD_NG_SUM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class QmsMiddleRestController {
    @Autowired
    private QmsMiddleService qmsMiddleService;

    @RequestMapping(value = "/qmsProdMiddleListGet", method = RequestMethod.POST)
    public RESTful qmsProdMiddleListGet(Page p) {
        return qmsMiddleService.qmsProdMiddleListGet(p);
    }

    @RequestMapping(value = "/qmsProdMiddleListOneGet", method = RequestMethod.POST)
    public QMS_PROD qmsProdMiddleListOneGet(Page p) {
        return qmsMiddleService.qmsProdMiddleListOneGet(p);
    }

    @RequestMapping(value = "/qmsProdMiddleSubGet", method = RequestMethod.POST)
    public List<QMS_PROD> qmsProdMiddleSubGet(Page p) {
        return qmsMiddleService.qmsProdMiddleSubGet(p);
    }

    @RequestMapping(value = "/qmsProdMiddleErrorListSumGet", method = RequestMethod.POST)
    public List<QMS_PROD_NG_SUM> qmsProdMiddleErrorListSumGet(Page p) {
        return qmsMiddleService.qmsProdMiddleErrorListSumGet(p);
    }
    @RequestMapping(value = "/qmsProdMiddleErrorManAdd", method = RequestMethod.POST)
    public Message qmsProdMiddleErrorManAdd(MultipartHttpServletRequest req){
        Files files = new Files();
        files.setKey1(req.getParameter("qc_no"));
        files.setKey2(req.getParameter("qc_result"));
        files.setKey3(req.getParameter("result2_code"));
        files.setKey4(req.getParameter("result3_code"));

        int check = Integer.parseInt(req.getParameter("check"));
        if(check == 1 ) {
            return qmsMiddleService.qmsProdMiddleErrorManFileAdd(files, req);
        } else {
            return qmsMiddleService.qmsProdMiddleErrorManAdd(files, req);
        }
    }

}
