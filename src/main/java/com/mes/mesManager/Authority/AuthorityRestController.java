package com.mes.mesManager.Authority;

        import com.mes.Common.Auth.Auth;
        import com.mes.Common.DataTransferObject.Message;
        import com.mes.Common.DataTransferObject.Page;
        import com.mes.Common.DataTransferObject.RESTful;
        import com.mes.mesManager.Authority.DTO.SYSAuth;
        import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestMethod;
        import org.springframework.web.bind.annotation.RestController;

        import javax.servlet.http.HttpServletRequest;
        import java.util.List;

@RestController
public class AuthorityRestController {

    @Autowired
    private AuthorityService authorityService;
    // 권한 관리
    @RequestMapping(value="/sysAuthGet" , method = RequestMethod.POST) //권한 조회 SP_SYS_AUTH_GROUP_GET
    public RESTful sysAuthGet(HttpServletRequest req, Page p){ return authorityService.sysAuthGet(req, p); }
    @RequestMapping(value="/sysAuthOneGet" , method = RequestMethod.POST)  //권한 조회(UPDATE - 하나의 컬럼 조회) SP_SYS_AUTH_GROUP_GET
    public SYSAuth sysAuthOneGet(HttpServletRequest req, Page p){ return authorityService.sysAuthOneGet(req, p); }
    @RequestMapping(value="/sysAuthGet2" , method = RequestMethod.POST) //권한 조회 SP_SYS_AUTH_GROUP_GET
    public RESTful sysAuthGet2(HttpServletRequest req, Page p){ return authorityService.sysAuthGet2(req, p); }
    @RequestMapping(value="/sysAuthOneGet2" , method = RequestMethod.POST)  //권한 조회(UPDATE - 하나의 컬럼 조회) SP_SYS_AUTH_GROUP_GET
    public SYSAuth sysAuthOneGet2(HttpServletRequest req, Page p){ return authorityService.sysAuthOneGet2(req, p); }
    @RequestMapping(value="/sysAuthAdd" , method = RequestMethod.POST)  //권한 추가 SP_SYS_AUTH_GROUP_ADD
    public Message sysAuthAU(HttpServletRequest request, SYSAuth sysAuth){ return authorityService.sysAuthAU(request, sysAuth); }
    @RequestMapping(value="/sysAuthDelete" , method = RequestMethod.POST)    //권한 삭제 SP_SYS_AUTH_GROUP_DEL
    public Message sysAuthDelete(HttpServletRequest req, Page p){ return authorityService.sysAuthDelete(req, p); }

    //권한그룹별 프로그램 설정
    @RequestMapping(value="/sysAuthAllGet" , method = RequestMethod.POST) //전체 권한그룹명 조회 / 좌측 그리드 조회
    public List<Page> sysAuthAllGet(HttpServletRequest req, Page p){ return authorityService.sysAuthAllGet(req, p); }
    @RequestMapping(value="/sysAuthProgramGet" , method = RequestMethod.POST) //권한그룹명 업무분류에 맞는 메뉴별 권한 조회  / 우측 그리드 조회
    public List<SYSAuthProgram> sysAuthProgramGet(HttpServletRequest req, Page p){ return authorityService.sysAuthProgramGet(req,p); }
    @RequestMapping(value="/sysAuthProgramAdd" , method = RequestMethod.POST) //메뉴별 권한 수정 우측그리드 체크변경사항 저장
    public Message sysAuthProgramAdd(HttpServletRequest req,@RequestBody List<SYSAuthProgram> checkList){ return authorityService.sysAuthProgramAdd(req,checkList); }
    @RequestMapping(value="/menuAllGet" , method = RequestMethod.POST) //업무분류 데이터 조회
    public List<Auth> menuAllGet(){
        return authorityService.menuAllGet();
    }
    @RequestMapping(value="/sysAuthProgramList" , method = RequestMethod.POST) // handler 재요청 방지용 코드
    public void sysAuthProgramGet(){}

}
