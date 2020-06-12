package com.mes.mesBoard.board;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.Function.BoardFunction;
import com.mes.mesBoard.board.DTO.SYS_BOARD_LIST;
import com.mes.mesBoard.board.DTO.SYS_BOARD_REPLY;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@Slf4j
public class MESBoardRestController extends BoardFunction {

    @Autowired
    private MESBoardService mesBoardService;

    @RequestMapping(value = "/getNM")
    public String getBoardName(String idx) {
        return mesBoardService.getBoardName(idx);
    }

    @RequestMapping(value = "/validCode")
    public void mesBoardValidCode(HttpServletRequest req, HttpServletResponse res) throws IOException {
        setAttrSessionBCode(req,res);
    }

    @RequestMapping(value = "/bdr_write", method = RequestMethod.POST)
    public int setBoardListData(SYS_BOARD_LIST boardList, MultipartHttpServletRequest req){
        int result = mesBoardService.setBoardListData(boardList,req);
        return result;
    }

    @RequestMapping("addReply")
    public String addReply(SYS_BOARD_REPLY sysBoardReply, HttpServletRequest req){
        String result = mesBoardService.addReply(sysBoardReply,req);
        return result;
    }
    @RequestMapping("delReply")
    public int delReply(@RequestParam("idx") String idx){
        return mesBoardService.delReply(idx);
    }

    @RequestMapping("delBoardList")
    public int delBoardList(@RequestParam("idx") String idx){
        return mesBoardService.delBoardList(idx);
    }

    @RequestMapping(value = "/boardFileUploader", method = RequestMethod.POST)
    public int testFile1(MultipartHttpServletRequest req){
        String result = mesBoardService.BoardFileUploader(req);
        return Integer.parseInt(result)-10;
    }

    @RequestMapping(value = "/addBoardList", method = RequestMethod.POST)
    public int addBoardList(SYS_BOARD_LIST boardList, HttpServletRequest req){
        String result = mesBoardService.addBoardList(boardList, req);
        return Integer.parseInt(result);
    }

    @RequestMapping(value = "/upBoardList", method = RequestMethod.POST)
    public int upBoardList(SYS_BOARD_LIST boardList, HttpServletRequest req){
        return mesBoardService.upBoardList(boardList, req);
    }

}
