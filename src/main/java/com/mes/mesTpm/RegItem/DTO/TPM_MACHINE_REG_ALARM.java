package com.mes.mesTpm.RegItem.DTO;

import lombok.Data;

@Data
public class TPM_MACHINE_REG_ALARM {
    private String site_code;
    private String line_code;
    private String machine_code;
    private String user_code;
    private int alarm_day;
    private String create_date;
    private String alarm_user_code;
    private String user_name;
    private String line_name;
    private String alarm_user_name;
    private String machine_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;

}
