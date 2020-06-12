package com.mes.Mapper.mesManager.Master;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.File.DTO.Files;
import com.mes.mesManager.Master.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
 public interface MasterMapper {

    //공통코드관리----------------------
    //공통코드관리 코드그룹 목록
    List<SYSCommon> getCommonGroup(Page p);
    //공통코드관리 그리드 리스트 조회
    List<SYSCommon> sysCommonGet(Page p);
    //공통코드관리 공통코드 추가
    Message sysCommonAdd(SYSCommon vo);
    //공통코드관리 공통코드 삭제
    Message sysCommonDelete(Page p);
    //공통코드관리 공통코드 수정 , 그리드에서 하나의 항목 값 조회
    SYSCommon sysCommonOneGet(Page p);

    //메세지관리-------------------------
    //메세지관리 메세지 목록
    List<SYSMsg> sysMsgGet(Page p);
    //메세지관리 메세지 추가
    Message sysMsgAdd(SYSMsg smv);
    //메세지관리 메세지 삭제
    Message sysMsgDelete(Page p);
    //메세지관리 메세지 수정 시 그리드에서 하나의 항목 값 조회
    SYSMsg sysMsgOneGet(Page p);


     List<SYSCommon> sysCommonDutyGet(Page p);
     List<SYSBoard> sysBoardGet(Page p);
     Message sysBoardAdd(SYSBoard sbv);
     Message sysBoardDelete(Page p);
     List<SYSProdLine> sysProdLineGet(Page p);
     Message sysProdLineAdd(SYSProdLine spv);
     Message sysProdLineDelete(Page p);
     List<SYSCargo> sysCargoGet(Page p);
     Message sysCargoAdd(SYSCargo scv);

    Message sysCargoDelete(Page p);

     List<SYSCargo> sysCargoBAllGet(Page p);





     List<SYSSupp> sysSuppListGet(Page p);

     Message sysSuppListDel(Page p);

     SYSSupp sysSuppOneGet(Page p);


     SYSBoard sysBoardOneGet(Page p);

     SYSProdLine sysProdLineOneGet(Page p);

     SYSCargo sysCargoOneGet(Page p);

    List<SYSSupp> autocomplete_Supp_Name(Page p);

    List<SYSSupp> autocomplete_Supp_no(Page p);

    Message sysSuppAdd(SYSSupp ssupp);

    void sysSuppFileUpdate(Files newFiles);

    void fileCdDelete(String file1);
}
