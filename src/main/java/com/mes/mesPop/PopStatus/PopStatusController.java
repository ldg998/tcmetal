package com.mes.mesPop.PopStatus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopStatusController {
    @RequestMapping("popProdRange")
    public String popProdRange(){
        return "mesPop/PopStatus/popProdRange/popProdRange";
    }
    @RequestMapping("popProdList1")
    public String popProdList1(){
        return "mesPop/PopStatus/popProdList1/popProdList1";
    }
    @RequestMapping("popProdList2")
    public String popProdList2(){
        return "mesPop/PopStatus/popProdList2/popProdList2";
    }

    @RequestMapping("popPlanOrder")
    public String popPlanOrder() { return "mesPop/PopStatus/popPlanOrder/popPlanOrder"; }

    @RequestMapping("popMonitoring")
    public String popMonitoring() { return "mesPop/PopStatus/popMonitoring/popMonitoring"; }

    @RequestMapping("popLot")
    public String popLot() { return "mesPop/PopStatus/popLot/popLot"; }

    @RequestMapping("popErrList")
    public String popErrList() { return "mesPop/PopStatus/popErrList/popErrList"; }

    @RequestMapping("popProdReport")
    public String popProdReport() { return  "mesPop/PopStatus/popProdReport/popProdReport";}

}
