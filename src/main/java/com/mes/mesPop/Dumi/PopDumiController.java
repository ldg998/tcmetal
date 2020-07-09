package com.mes.mesPop.Dumi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopDumiController {
    @RequestMapping("pop_1")
    public String pop_1(){
        return "mesPop/Dumi/dumi/pop_1";
    }
    @RequestMapping("pop_2")
    public String pop_2(){
        return "mesPop/Dumi/dumi/pop_2";
    }
    @RequestMapping("pop_4")
    public String pop_4(){
        return "mesPop/Dumi/dumi/pop_4";
    }




}
