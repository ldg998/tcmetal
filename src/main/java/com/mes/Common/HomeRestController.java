package com.mes.Common;

import com.mes.mesBoard.board.DTO.SYS_BOARD_FILE;
import com.mes.mesPop.PopStatus.DTO.POP_PLAN;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeRestController {

    @Autowired
    private HomeService homeService;

    @RequestMapping(value = "/monitoringGet", method = RequestMethod.POST)
    public List<POP_PLAN> monitoringGet(){
        return homeService.monitoringGet();
    }


     @RequestMapping(value = "/prodReport1Get", method = RequestMethod.POST)
    public List<POP_PLAN> prodReport1Get(){
        return homeService.prodReport1Get();
    }


     @RequestMapping(value = "/prodMiddleListGet", method = RequestMethod.POST)
    public List<QMS_PROD> prodMiddleListGet(){
        return homeService.prodMiddleListGet();
    }


     @RequestMapping(value = "/prodLeadTimeGet", method = RequestMethod.POST)
    public List<POP_PLAN> prodLeadTimeGet(){
        return homeService.prodLeadTimeGet();
    }

 @RequestMapping(value = "/boardListGet", method = RequestMethod.POST)
    public List<SYS_BOARD_FILE> boardListGet(){
        return homeService.boardListGet();
    }




}
