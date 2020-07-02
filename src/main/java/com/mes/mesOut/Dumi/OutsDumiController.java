package com.mes.mesOut.Dumi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OutsDumiController {

    @RequestMapping(value = "out_1")
    public String out_1() { return "mesOut/dumi/dumi/out_1"; }
    @RequestMapping(value = "out_2")
    public String out_2() { return "mesOut/dumi/dumi/out_2"; }
    @RequestMapping(value = "out_3")
    public String out_3() { return "mesOut/dumi/dumi/out_3"; }
    @RequestMapping(value = "out_4")
    public String out_4() { return "mesOut/dumi/dumi/out_4"; }
    @RequestMapping(value = "out_5")
    public String out_5() { return "mesOut/dumi/dumi/out_5"; }
}
