package com.mes.mesQms.Shipment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsShipmentController {

    @RequestMapping(value = "/qmsProd")
    public String qmsProd() { return "mesQms/Shipment/qmsProd/qmsProd"; }

    @RequestMapping(value = "/qmsProdList")
    public String qmsProdList() { return "mesQms/Shipment/qmsProdList/qmsProdList"; }

    @RequestMapping(value = "/qmsProdErrorMan")
    public String qmsProdErrorMan() { return "mesQms/Shipment/qmsProdErrorMan/qmsProdErrorMan"; }

    @RequestMapping(value = "/qmsProdErrorList")
    public String qmsProdErrorList() { return "mesQms/Shipment/qmsProdErrorList/qmsProdErrorList"; }

    @RequestMapping(value ="/qmsProdMRB")
    public String qmsProdMRB() { return "mesQms/Shipment/qmsProdMRB/qmsProdMRB"; }

    @RequestMapping(value = "/qmsProdStd")
    public String qmsProdStd() { return "mesQms/Shipment/qmsProdStd/qmsProdStd"; }
}
