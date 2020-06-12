package com.mes.mesBoard.board.DTO;

import lombok.Data;

@Data
public class SYS_BOARD_REPLY {
    private String site_code;
    private String user_code;
    private String board_code;
    private String board_idx;
    private String reply_idx;
    private String reply_desc;
    private String create_date;
    private String user_name;
}
