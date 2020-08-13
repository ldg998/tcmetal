package com.mes.mesQms.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Vaild.ValidFunction;
import com.mes.mesQms.Standard.DTO.SYS_QC_DIAMETER;
import com.mes.mesQms.Standard.DTO.SYS_QC_ITEM;
import com.mes.mesQms.Standard.DTO.SYS_SPART_MELT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class QmsStandardRestController extends ValidFunction {

    @Autowired
    private QmsStandardService qmsStandardService;

    @RequestMapping(value = "/qmsQcItemAdd", method = RequestMethod.POST)
    public Message qmsQcItemAdd(SYS_QC_ITEM sysQcItem, HttpServletRequest req)
    {
        return qmsStandardService.qmsQcItemAdd(req, sysQcItem);

    }

    @RequestMapping(value = "/qmsQcItemGet", method = RequestMethod.POST)
    public RESTful qmsQcItemGet(Page p, HttpServletRequest req) {
        return qmsStandardService.qmsQcItemGet(p, req);
    }

    @RequestMapping(value = "/qmsQcItemOneGet", method = RequestMethod.POST)
    public SYS_QC_ITEM qmsQcItemOneGet(SYS_QC_ITEM sysQcItem, HttpServletRequest req) {
        return qmsStandardService.qmsQcItemOneGet(sysQcItem, req);
    }

    @RequestMapping(value = "/qmsQcItemDel", method = RequestMethod.POST)
    public Message qmsQcItemDel(Page p, HttpServletRequest req) {
        return qmsStandardService.qmsQcItemDel(p, req);
    }

    @RequestMapping(value = "/qmsTestStdGet", method = RequestMethod.POST)
    public RESTful qmsTestStdGet(Page p,HttpServletRequest req) {
        return qmsStandardService.qmsTestStdGet(p, req);
    }

    @RequestMapping(value = "/qmsTestStdAdd", method = RequestMethod.POST)
    public Message qmsTestStdAdd(@Valid SYS_QC_DIAMETER sys_qc_diameter, BindingResult errors, HttpServletRequest req)
    {
        if(ValidData(errors).getResult().equals("OK")){
            return qmsStandardService.qmsTestStdAdd(req, sys_qc_diameter);
        }else {
            return ValidData(errors);
        }
    }

    @RequestMapping(value ="/qmsTestStdOneGet", method = RequestMethod.POST)
    public SYS_QC_DIAMETER qmsTestStdOneGet(SYS_QC_DIAMETER vo, HttpServletRequest req) {
        return qmsStandardService.qmsTestStdOneGet(vo, req);
    }

    @RequestMapping(value = "/qmsTestStdDelete", method = RequestMethod.POST)
    public Message qmsTestStdDelete(Page p, HttpServletRequest req) {
        return qmsStandardService.qmsTestStdDelete(p, req);
    }

    @RequestMapping(value = "/qmsMeltSpecGet", method = RequestMethod.POST)
    public RESTful qmsMeltSpecGet(Page p, HttpServletRequest req) {
        return qmsStandardService.qmsMeltSpecGet(p, req);
    }

 @RequestMapping(value = "/qmsMeltSpecOneGet", method = RequestMethod.POST)
    public List<SYS_SPART_MELT> qmsMeltSpecOneGet(SYS_SPART_MELT ssm, HttpServletRequest req) {
        return qmsStandardService.qmsMeltSpecOneGet(ssm, req);
    }
@RequestMapping(value = "/qmsMeltSpecAdd", method = RequestMethod.POST)
    public Message qmsMeltSpecAdd(SYS_SPART_MELT ssm, HttpServletRequest req) {
        return qmsStandardService.qmsMeltSpecAdd(ssm, req);
    }



}
