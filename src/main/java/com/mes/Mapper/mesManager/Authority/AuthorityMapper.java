package com.mes.Mapper.mesManager.Authority;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AuthorityMapper {
    // 권한 관리
    List<SYSAuth> sysAuthGet(Page p); //권한 조회
    SYSAuth sysAuthOneGet(Page p);  //권한 조회(UPDATE - 하나의 컬럼 조회)
    Message sysAuthAU(SYSAuth sysAuth);  //권한 추가
    Message sysAuthDelete(Page p);  //권한 삭제

    // 권한그룹별 프로그램 설정
    List<Page> sysAuthAllGet(Page p); // 권한그룹명 조회
    List<SYSAuthProgram> sysAuthProgramGet(Page p); // 메뉴별 권한 조회
    Message sysAuthProgramAdd(Page p); // 메뉴별 권한 수정
    List<Auth> menuAllGet(); // 업무분류 조회
}
