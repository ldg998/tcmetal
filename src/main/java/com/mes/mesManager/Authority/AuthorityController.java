package com.mes.mesManager.Authority;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// 지정 url 뷰에 모델객체를 넘겨주는 컨트롤러
@Controller
public class AuthorityController {

    @RequestMapping(value = "/sysAuth") // 권한그룹관리 페이지
    public String sysAuthList() { return "mesManager/AuthorityManagement/sysAuth/sysAuth"; }

    @RequestMapping(value = "/sysAuthProgram") // 권한그룹별 프로그램 관리 페이지지
   public String sysAuthProgram() { return "mesManager/AuthorityManagement/sysAuthProgram/sysAuthProgram"; }

}
