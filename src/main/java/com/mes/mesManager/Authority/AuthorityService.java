package com.mes.mesManager.Authority;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesManager.Authority.AuthorityMapper;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@Slf4j
public class AuthorityService extends ReturnFunction {
    
    @Autowired // IoC 컨테이너 안 존 재 Bean 자동 주입 / 매퍼의 빈을 주입
    private AuthorityMapper authorityMapper;

    // 권한 관리
    public RESTful sysAuthGet(HttpServletRequest req, Page p) { //권한 조회
        List<SYSAuth> rows = authorityMapper.sysAuthGet(p);
        //System.out.println("1");
        return getListData(rows , p);
    }
    public SYSAuth sysAuthOneGet(HttpServletRequest req, Page p) {  //권한 조회(UPDATE - 하나의 컬럼 조회)
        return authorityMapper.sysAuthOneGet(p);
    }
    public Message sysAuthAU(HttpServletRequest req, SYSAuth sysAuth){ //권한 추가
        sysAuth.setUser_code(getSessionData(req).getUser_code());
        return authorityMapper.sysAuthAU(sysAuth);
    }
    public Message sysAuthDelete(HttpServletRequest req, Page p){  //권한 삭제
        p.setKeyword(p.getKeyword());
        return authorityMapper.sysAuthDelete(p);
    }

    // 권한그룹별 프로그램 설정
    public List<Page> sysAuthAllGet(HttpServletRequest ree, Page p) { //전체 권한그룹명 조회 / 좌측 그리드 조회
        return authorityMapper.sysAuthAllGet(p);
    }
    public List<SYSAuthProgram> sysAuthProgramGet(HttpServletRequest req, Page p) { //권한그룹명 업무분류에 맞는 메뉴별 권한 조회  / 우측 그리드 조회
        List<SYSAuthProgram> list=authorityMapper.sysAuthProgramGet(p);
        for (SYSAuthProgram sysAuthProgram : list) {
            if (sysAuthProgram.getLevel() == 1) {
                sysAuthProgram.setLeaf(false);
                sysAuthProgram.setExpanded(true);
            } else if (sysAuthProgram.getLevel() == 2) {
                sysAuthProgram.setLeaf(false);
                sysAuthProgram.setExpanded(true);
            } else {
                sysAuthProgram.setLeaf(true);
                sysAuthProgram.setExpanded(false);
            }
            sysAuthProgram.setAuth_code(p.getKeyword());
        }
        return list;
    }
    public Message sysAuthProgramAdd(HttpServletRequest req, List<SYSAuthProgram> checkList){ //메뉴별 권한 수정 우측그리드 체크변경사항 저장
        Page p = setProgram(req,checkList);
        return authorityMapper.sysAuthProgramAdd(p);
    }
    public List<Auth> menuAllGet(){
        return authorityMapper.menuAllGet();
    } //업무분류 select 데이터 조회
}
