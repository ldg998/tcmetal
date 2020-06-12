package com.mes.mesScm.Order;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {
    @RequestMapping(value = "/scmReqOrder")
    public String scmReqOrder() { return "mesScm/Order/scmReqOrder/scmReqOrder"; }

    @RequestMapping(value = "/scmOrder")
    public String scmOrder() { return "mesScm/Order/scmOrder/scmOrder"; }

    @RequestMapping(value = "/scmOrderList")
    public String scmOrderList() { return "mesScm/Order/scmOrderList/scmOrderList"; }

    @RequestMapping(value = "/scmOrderImage")
    public String scmOrderImage() { return "mesScm/Order/scmOrderImage/scmOrderImage"; }
}
