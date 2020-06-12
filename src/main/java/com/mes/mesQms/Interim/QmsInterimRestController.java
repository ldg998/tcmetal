package com.mes.mesQms.Interim;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.mesQms.Interim.DTO.QMS_ASSY;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
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
public class QmsInterimRestController extends UploadFunction {

    @Autowired
    private QmsInterimService qmsInterimService;

    @RequestMapping(value = "/qmsAssyListGet", method = RequestMethod.POST)
    public RESTful qmsAssyListGet(Page p, HttpServletRequest req) {
        return qmsInterimService.qmsAssyListGet(p, req);
    }

    @RequestMapping(value = "/qmsAssyErrorManGet", method = RequestMethod.POST)
    public RESTful qmsAssyErrorManGet(Page p, HttpServletRequest req) {return  qmsInterimService.qmsAssyErrorManGet(p, req); }

    @RequestMapping(value = "/qmsAssyErrorManOneGet", method = RequestMethod.POST)
    public QMS_ASSY qmsAssyErrorManOneGet(Page p, HttpServletRequest req) {return  qmsInterimService.qmsAssyErrorManOneGet(p, req); }




    @RequestMapping(value = "/qmsAssyErrorListSumGet", method = RequestMethod.POST)
    public List<QMS_ASSY_NG_SUM> qmsAssyErrorListSumGet(Page p, HttpServletRequest req) {
        return qmsInterimService.qmsAssyErrorListSumGet(p, req);
}



}
