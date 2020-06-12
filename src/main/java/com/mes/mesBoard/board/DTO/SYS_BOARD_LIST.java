package com.mes.mesBoard.board.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SYS_BOARD_LIST {
    private String site_code;
    private String user_code;
    private String board_code;
    private String board_idx;
    private String subject;
    private String description;
    private int read_count;
    private String create_date;
    private String update_date;
    private String type;

    private MultipartFile file_0;
    private MultipartFile file_1;
    private MultipartFile file_2;
    private MultipartFile file_3;
    private MultipartFile file_4;

    private int seq;
    private String user_name;
    private int reply_cnt;
    private int file_cnt;
    private String file_upload_cnt;
}
