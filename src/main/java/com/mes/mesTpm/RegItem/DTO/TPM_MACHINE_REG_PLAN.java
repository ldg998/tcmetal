package com.mes.mesTpm.RegItem.DTO;

import lombok.Data;

@Data
public class TPM_MACHINE_REG_PLAN {
    private String site_code;
    private String line_code;
    private String machine_code;
    private String qc_code;
    private String work_date;
    private String check_yn;
    private String measure_name;
    private String check_user_code;
    private String check_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String line_name;
    private String machine_name;
    private String qc_name;
    private String check_code;
    private String keyword;

    private String user_name;
    private String code_name1;
}
