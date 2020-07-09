package com.mes.mesQms.Shipment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsShipmentController {

    @RequestMapping(value = "/qmsInspMachine")
    public String qmsInspMachine() { return "mesQms/Shipment/qmsInspMachine/qmsInspMachine"; }
    @RequestMapping(value = "/qmsMoldWash")
    public String qmsMoldWash() { return "mesQms/Shipment/qmsMoldWash/qmsMoldWash"; }
    @RequestMapping(value = "/qmsProdErrorList")
    public String qmsProdErrorList() { return "mesQms/Shipment/qmsProdErrorList/qmsProdErrorList"; }
    @RequestMapping(value = "/qmsProdErrorReq")
    public String qmsProdErrorReq() { return "mesQms/Shipment/qmsProdErrorReq/qmsProdErrorReq"; }
    @RequestMapping(value = "/qmsProdHistory")
    public String qmsProdHistory() { return "mesQms/Shipment/qmsProdHistory/qmsProdHistory"; }
    @RequestMapping(value = "/qmsProdList")
    public String qmsProdList() { return "mesQms/Shipment/qmsProdList/qmsProdList"; }
}
