package com.mes.mesPop.Pop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopController {
    @RequestMapping("popPlan")
    public String popPlan(){ return "mesPop/Pop/popPlan/popPlan"; }
    @RequestMapping("popProdPlanManual")
    public String popProdPlanManual(){
        return "mesPop/Pop/popProdPlanManual/popProdPlanManual";
    }
    @RequestMapping("popProdPlan")
    public String popProdPlan(){ return "mesPop/Pop/popProdPlan/popProdPlan";  }


    @RequestMapping("popPlan1")
    public String popPlan1() { return "mesPop/Pop/popPlan1/popPlan1"; }
    @RequestMapping("popPlan2")
    public String popPlan2() { return "mesPop/Pop/popPlan2/popPlan2"; }
    @RequestMapping("popPlan3")
    public String popPlan3() { return "mesPop/Pop/popPlan3/popPlan3"; }
    @RequestMapping("popPlanSub")
    public String popPlanSub() { return "mesPop/Pop/popPlanSub/popPlanSub"; }
    @RequestMapping("popPlanASSY")
    public String popPlanASSY() { return "mesPop/Pop/popPlanASSY/popPlanASSY"; }


    @RequestMapping("popPlanList")
    public String popPlanList() { return "mesPop/Pop/popPlanList/popPlanList"; }
    @RequestMapping("popPlanCheck")
    public String popPlanCheck() { return "mesPop/Pop/popPlanCheck/popPlanCheck"; }

    @RequestMapping("popPlanMelt")
    public String popPlanMelt() { return "mesPop/Pop/popPlanMelt/popPlanMelt"; }



}
