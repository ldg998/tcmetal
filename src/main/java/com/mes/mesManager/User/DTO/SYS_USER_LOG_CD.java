package com.mes.mesManager.User.DTO;

import lombok.Data;

@Data
public class SYS_USER_LOG_CD {

    private String user_code;
    private String menu_code;
    private String log_date;

    private String user_name;
    private String menu_name;

    private int rownum;
    private int rownum_page;
    private int rec_count;

}
