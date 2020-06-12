package com.mes.mesBoard.board;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.Function.BoardFunction;
import com.mes.mesBoard.board.DTO.Pagination;
import com.mes.mesBoard.board.DTO.SYS_BOARD_CD;
import com.mes.mesBoard.board.DTO.SYS_BOARD_LIST;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static java.lang.Integer.parseInt;

@Controller
@Slf4j
public class MESBoardController extends BoardFunction {

    @Autowired
    private MESBoardService mesBoardService;
    private ModelAndView mav;

    @RequestMapping("/board1")
    public String mesBoard(SYS_BOARD_CD sysBoard) {
        return "mesBoard/mesBoard/mesBoard/mesBoardList";
    }

    @RequestMapping(value = "/bd_writeForm", method = RequestMethod.POST)
    public ModelAndView mesBoardWrite(SYS_BOARD_CD sysBoard, HttpServletRequest req) {
        return mesBoardService.getBoardData(sysBoard,req);
    }

    @RequestMapping("/board")
    public String getBoardList(@ModelAttribute("pageMaker") Pagination pageMaker, Model model, HttpServletRequest req){
        pageMaker.setTotalCount(mesBoardService.getCount(pageMaker,req));
        List<SYS_BOARD_LIST> ListData = mesBoardService.getBoardList(pageMaker,req);
        model.addAttribute("pageMaker", pageMaker);
        model.addAttribute("ListData", ListData);
        return "mesBoard/mesBoard/mesBoard/mesBoardList";
    }

    @RequestMapping("info")
    public ModelAndView info(HttpServletRequest req, HttpServletResponse res){
        String idx = req.getParameter("idx");
        int    seq = parseInt(req.getParameter("seq"));
        mav = new ModelAndView();
        mesBoardService.upHits(idx,req,res);
        mav.addObject("replyData",mesBoardService.getReplyData(idx));
        mav.addObject("InfoData",mesBoardService.getInfoData(idx));
        mav.addObject("prev",mesBoardService.getPrev(idx,seq,req));
        mav.addObject("next",mesBoardService.getNext(idx,seq,req));
        mav.addObject("fileData", mesBoardService.getFileData(idx));
        mav.addObject("seq", seq);
        mav.setViewName("mesBoard/mesBoard/mesBoard/mesBoardInfo");
        return mav;
    }

    @RequestMapping("/mod")
    public ModelAndView mod(SYS_BOARD_CD sysBoard,HttpServletRequest req, HttpServletResponse res){

        return mesBoardService.getBoardData2(sysBoard,req);
    }
}
