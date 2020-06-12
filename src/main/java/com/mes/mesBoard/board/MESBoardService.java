package com.mes.mesBoard.board;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesBoard.mesBoard.MesBoardMapper;
import com.mes.mesBoard.board.DTO.*;
import com.mes.mesManager.Master.DTO.SYSCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;

import static java.lang.Integer.parseInt;

@Service
@Slf4j
public class MESBoardService extends ReturnFunction {
    @Autowired
    private MesBoardMapper mesBoardMapper;
    UploadFunction uploadFunction = new UploadFunction();

    public String getBoardName(String idx) {
        return mesBoardMapper.getBoardName(idx);
    }

    public ModelAndView getBoardData(SYS_BOARD_CD sysBoard, HttpServletRequest req){
        ModelAndView mav = new ModelAndView();
        sysBoard.setSite_code(getSessionData(req).getSite_code());
        sysBoard.setUser_code(getSessionData(req).getUser_code());
        List<SYSCommon> sysCommons = mesBoardMapper.sysCommonBoardGet(sysBoard);
        mav.addObject("board_idx",mesBoardMapper.getBoardIdx());
        mav.addObject("common",sysCommons);
        mav.addObject("boardData",mesBoardMapper.getBoardData(sysBoard));
        mav.setViewName("mesBoard/mesBoard/mesBoard/mesBoardWrite");
        return mav;
    }

    public int setBoardListData(SYS_BOARD_LIST boardList,MultipartHttpServletRequest req) {
        int result;
        boardList.setSite_code(getSessionData(req).getSite_code());
        boardList.setUser_code(getSessionData(req).getUser_code());
        result = mesBoardMapper.setBoardListData(boardList);
        return result;
    }

    public List<SYS_BOARD_LIST> getBoardList(Pagination pageMaker, HttpServletRequest req) {
        HttpSession session = req.getSession();
        pageMaker.setSite_code(getSessionData(req).getSite_code());
        pageMaker.setUser_code(getSessionData(req).getUser_code());
        pageMaker.setBoard_code((String) session.getAttribute("board_code"));
        List<SYS_BOARD_LIST> data = mesBoardMapper.getBoardList(pageMaker);
        return data;
    }

    public int getCount(Pagination pageMaker, HttpServletRequest req) {
        HttpSession session = req.getSession();
        pageMaker.setSite_code(getSessionData(req).getSite_code());
        pageMaker.setUser_code(getSessionData(req).getUser_code());
        pageMaker.setBoard_code((String) session.getAttribute("board_code"));
        return mesBoardMapper.getCount(pageMaker);
    }

    public void upHits(String idx, HttpServletRequest req, HttpServletResponse res) {
        mesBoardMapper.upHits(idx);
    }

    public SYS_BOARD_LIST getInfoData(String idx) {
        return mesBoardMapper.getInfoData(idx);
    }

    public SYS_BOARD_LIST getPrev(String idx, int seq, HttpServletRequest req) {
        SYS_BOARD_LIST sysBoardList = new SYS_BOARD_LIST();
        HttpSession session = req.getSession();
        sysBoardList.setSeq(seq);
        sysBoardList.setBoard_idx(idx);
        sysBoardList.setBoard_code((String) session.getAttribute("board_code"));
        return mesBoardMapper.getPrev(sysBoardList);
    }

    public SYS_BOARD_LIST getNext(String idx, int seq, HttpServletRequest req) {
        SYS_BOARD_LIST sysBoardList = new SYS_BOARD_LIST();
        HttpSession session = req.getSession();
        sysBoardList.setSeq(seq);
        sysBoardList.setBoard_idx(idx);
        sysBoardList.setBoard_code((String) session.getAttribute("board_code"));
        return mesBoardMapper.getNext(sysBoardList);
    }

    public String addReply(SYS_BOARD_REPLY sysBoardReply, HttpServletRequest req) {
        sysBoardReply.setSite_code(getSessionData(req).getSite_code());
        sysBoardReply.setUser_code(getSessionData(req).getUser_code());
        return mesBoardMapper.addReply(sysBoardReply);
    }

    public List<SYS_BOARD_REPLY> getReplyData(String idx) {
        return mesBoardMapper.getReplyData(idx);
    }

    public int delReply(String idx) {
        return mesBoardMapper.delReply(idx);
    }

    public String BoardFileUploader(MultipartHttpServletRequest req) {
        String adf=null;
        String adc=null;
        String board_code = req.getParameter("board_code");
        String path = "C:/UploadFile/sound/board_"+board_code;
        int file_num = Integer.parseInt(req.getParameter("file_num"));

        try{
            Files files = setFileData(board_code,req,path,file_num);
            adf = mesBoardMapper.addBoardFile(files);
            Integer.parseInt(adf);
            adc = mesBoardMapper.addFileCD(files);
            Integer.parseInt(adc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return adf+adc;
    }

    public Files setFileData(String board_code,MultipartHttpServletRequest req,String path,int file_num){
        Files files = new Files();

        String names = req.getParameter("files");
        MultipartFile file = req.getFile(names);
        String keyValue = uploadFunction.MakeFileName_new("board_"+board_code,file_num);
        String hjj = keyValue+"."+file.getOriginalFilename().split("\\.")[1];

        files.setFiles(file);
        files.setFile_og_name(file.getOriginalFilename());
        files.setSite_code(getSessionData(req).getSite_code());
        files.setUser_code(getSessionData(req).getUser_code());
        files.setFile_size(file.getSize());
        files.setFile_volume(file.getSize()/1024);
        files.setFile_name(hjj);
        files.setKey_value(keyValue);
        files.setUpload_path(path+"/"+hjj);
        files.setUrl(hjj);
        files.setBoard_code(req.getParameter("board_code"));
        files.setBoard_idx(req.getParameter("board_idx"));

        setDir(files, req,path);
        return files;
    }

    public void setDir(Files files, MultipartHttpServletRequest req,String path){

        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
            try {
                files.getFiles().transferTo(new File(files.getUpload_path()));
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try {
                files.getFiles().transferTo(new File(files.getUpload_path()));
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public String addBoardList(SYS_BOARD_LIST boardList, HttpServletRequest req) {
        boardList.setSite_code(getSessionData(req).getSite_code());
        boardList.setUser_code(getSessionData(req).getUser_code());
        return mesBoardMapper.addBoardList(boardList);
    }

    public int delBoardList(String idx) {
        List<Files> sbfs = mesBoardMapper.getFileData2(idx);
        File file = null;
        for (Files f:sbfs) {
            file = new File(f.getUpload_path());
            file.delete();
            mesBoardMapper.deleteFileBoard(f.getKey_value());
            mesBoardMapper.deleteBoard_file(f.getKey_value());

        }


        mesBoardMapper.delBoardReply(idx);

        return mesBoardMapper.delBoardList(idx);
    }

    public List<SYS_BOARD_FILE> getFileData(String idx) {
        return mesBoardMapper.getFileData(idx);
    }

    public Object getInfoData2(String idx) {
        return mesBoardMapper.getInfoData2(idx);
    }

    public ModelAndView getBoardData2(SYS_BOARD_CD sysBoard, HttpServletRequest req) {
        ModelAndView mav = new ModelAndView();
        String idx = req.getParameter("board_idx");
        int    seq = parseInt(req.getParameter("seq"));
        sysBoard.setSite_code(getSessionData(req).getSite_code());
        sysBoard.setUser_code(getSessionData(req).getUser_code());
        //mav.addObject("boardData",getInfoData2(idx));
        List<SYSCommon> sysCommons = mesBoardMapper.sysCommonBoardGet(sysBoard);
        mav.addObject("board_idx",idx);
        mav.addObject("common",sysCommons);
        mav.addObject("board",getInfoData2(idx));
        mav.addObject("fileData", getFileData(idx));
        mav.addObject("boardData",mesBoardMapper.getBoardData(sysBoard));
        mav.addObject("seq", seq);
        mav.setViewName("mesBoard/mesBoard/mesBoard/mesBoardMod");

        return mav;
    }

    public int upBoardList(SYS_BOARD_LIST boardList, HttpServletRequest req) {
        return mesBoardMapper.upBoardList(boardList);
    }
}
