package com.mes.Mapper.Home.Home;

import com.mes.mesBoard.board.DTO.SYS_BOARD_FILE;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Repository
public interface HomeMapper {

    List<POP_PLAN> monitoringGet(HttpServletRequest req);

    List<POP_PLAN> prodReport1Get(HttpServletRequest req);

    List<QMS_PROD> prodMiddleListGet(HttpServletRequest req);

    List<POP_PLAN> prodLeadTimeGet(HttpServletRequest req);

    List<SYS_BOARD_FILE> boardListGet(HttpServletRequest req);
}
