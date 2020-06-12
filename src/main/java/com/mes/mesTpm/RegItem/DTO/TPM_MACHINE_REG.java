package com.mes.mesTpm.RegItem.DTO;

import lombok.Data;

@Data
public class TPM_MACHINE_REG {
    private String site_code;
    private String line_code;
    private String machine_code;
    private String qc_code;
    private String cycle_type;
    private int cycle_qty;
    private String start_date;
    private String user_code;
    private String create_date;
    private String update_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String machine_name;
    private String cycle_type_name;
    private String user_name;
    private String qc_name;
    private String keyword;

    private String line_name;
}
