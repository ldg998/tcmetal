package com.mes.Mapper.mesBoard.mesBoard;

import com.mes.Common.File.DTO.Files;
import com.mes.mesBoard.board.DTO.*;
import com.mes.mesManager.Master.DTO.SYSCommon;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesBoardMapper {
    String getBoardName(String idx);
    SYS_BOARD_CD getBoardData(SYS_BOARD_CD sysBoard);
    int setBoardListData(SYS_BOARD_LIST boardList);

    List<SYS_BOARD_LIST> getBoardList(Pagination pageMaker);

    int getCount(Pagination pageMaker);

    SYS_BOARD_LIST getInfoData(String idx);

    SYS_BOARD_LIST getNext(SYS_BOARD_LIST sysBoardList);

    SYS_BOARD_LIST getPrev(SYS_BOARD_LIST sysBoardList);

    void upHits(String idx);

    String addReply(SYS_BOARD_REPLY sysBoardReply);

    List<SYS_BOARD_REPLY> getReplyData(String idx);

    int delReply(String idx);

    List<SYSCommon> sysCommonBoardGet(SYS_BOARD_CD sysBoard);

    String addBoardFile(Files files);

    String addFileCD(Files files);

    String addBoardList(SYS_BOARD_LIST boardList);

    String getBoardIdx();

    int delBoardList(String idx);

    List<SYS_BOARD_FILE> getFileData(String idx);


    List<Files> getFileData2(String idx);

    void deleteFileBoard(String key_value);

    void deleteBoard_file(String key_value);

    void delBoardReply(String idx);

    Object getInfoData2(String idx);

    int upBoardList(SYS_BOARD_LIST boardList);
}
