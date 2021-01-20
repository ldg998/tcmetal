package com.mes.Common;


import com.mes.Mapper.Home.Home.HomeMapper;
import com.mes.mesBoard.board.DTO.SYS_BOARD_FILE;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService {

    @Autowired
    private HomeMapper mapper;

    public List<POP_PLAN> monitoringGet() {
        return  mapper.monitoringGet();
    }

    public List<POP_PLAN> prodReport1Get() {
        return mapper.prodReport1Get();
    }

    public List<QMS_PROD> prodMiddleListGet() {
        return mapper.prodMiddleListGet();
    }

    public List<POP_PLAN> prodLeadTimeGet() {
        return mapper.prodLeadTimeGet();
    }

    public List<SYS_BOARD_FILE> boardListGet() {return mapper.boardListGet();
    }
}
