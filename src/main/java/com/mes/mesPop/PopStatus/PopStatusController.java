package com.mes.mesPop.PopStatus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopStatusController {
    @RequestMapping("popProdRange")
    public String popProdRange(){
        return "mesPop/PopStatus/popProdRange/popProdRange";
    }
    @RequestMapping("popProdLeadTime")
    public String popProdLeadTime(){ return "mesPop/PopStatus/popProdLeadTime/popProdLeadTime"; }
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

//    @RequestMapping("popProdList")
//    public String popProdList() { return  "mesPop/PopStatus/popProdList/popProdList";}

    @RequestMapping("sysSPartDrawing")
    public String sysSPartDrawing() { return  "mesPop/PopStatus/sysSPartDrawing/sysSPartDrawing";}

    @RequestMapping("sysSPartWood")
    public String sysSPartWood() { return  "mesPop/PopStatus/sysSPartWood/sysSPartWood";}

    @RequestMapping("popLotTracking")
    public String popLotTracking() { return  "mesPop/PopStatus/popLotTracking/popLotTracking";}

    @RequestMapping("popProdAnalysis")
    public String popProdAnalysis() { return  "mesPop/PopStatus/popProdAnalysis/popProdAnalysis";}

    @RequestMapping("popProdReport1")
    public String popProdReport1() { return  "mesPop/PopStatus/popProdReport1/popProdReport1";}

    @RequestMapping("popSpectro")
    public String popSpectro() { return  "mesPop/PopStatus/popSpectro/popSpectro";}

    @RequestMapping("sysProdHR")
    public String sysProdHR() { return  "mesPop/PopStatus/sysProdHR/sysProdHR";}

    @RequestMapping("sysProdSum")
    public String sysProdSum() { return  "mesPop/PopStatus/sysProdSum/sysProdSum";}



}
