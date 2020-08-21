package com.mes.mesQms.Middle;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Middle.DTO.QMS_PROD_NG_SUM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

}
