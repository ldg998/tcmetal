package com.mes.mesPop.Standard.DTO;

import lombok.Data;

@Data
public class POP_LINE_USER_CD {
    private String site_code;
    private String line_code;
    private String user_code;
    private String create_date;
    private String update_date;
    private String user_name;
    private String line_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
