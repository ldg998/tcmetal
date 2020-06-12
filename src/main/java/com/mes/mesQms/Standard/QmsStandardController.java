package com.mes.mesQms.Standard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class QmsStandardController {

    @RequestMapping(value = "/qmsTestItem")
    public String qmsTestItem() { return "mesQms/Standard/qmsTestItem/qmsTestItem"; }

    @RequestMapping(value = "/qmsTestStd")
    public String qmsTestStd() { return "mesQms/Standard/qmsTestStd/qmsTestStd"; }

    @RequestMapping(value = "/qmsErrorType")
    public String qmsErrorType() { return "mesQms/Standard/qmsErrorType/qmsErrorType"; }
}
