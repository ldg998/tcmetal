package com.mes.Mapper.Home.Home;

import com.mes.mesBoard.board.DTO.SYS_BOARD_FILE;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeMapper {

    List<POP_PLAN> monitoringGet();

    List<POP_PLAN> prodReport1Get();

    List<QMS_PROD> prodMiddleListGet();

    List<POP_PLAN> prodLeadTimeGet();

    List<SYS_BOARD_FILE> boardListGet();
}
