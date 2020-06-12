package com.mes.Mapper.Test;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesManager.User.DTO.SYSUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Test {
    int mobileKey(Page p);

    SYSUser mobileLogin(SYSUser u);

    List<SYSProdLine> mobileLine();

    List<List<Object>> test0609();
}
