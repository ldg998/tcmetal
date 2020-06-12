package com.mes.mesTpm.Error.DTO;

import lombok.Data;

@Data
public class tpmMachineError {
    private String site_code;
    private String line_code;
    private String machine_code;
    private String work_date;
    private int seq;
    private String error_name;
    private String error_type;
    private String error_result;
    private String measure_name;
    private String stop_yn;
    private int stop_time;
    private String check_user_code;
    private String check_date;

    private int rec_count;
    private int rownum;
    private int rownum_page;

    private String line_name;
    private String machine_name;
    private String user_name;

    private String keyword;

    private String code_name1;
    private String cn;
}
