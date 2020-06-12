package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IN {
    private String site_code;
    private String in_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String status;
    private String status_name;
    private String user_code;
    private String user_name;
    private String close_yn;
    private String remark;
    private String create_date;
    private String update_date;
    private String code_list;
    private int rownum;
    private int rec_count;
    private String keyword;
    private String keyword2;
    private String keyword3;

    private String part_code;
    private String part_name;
    private String spec;
    private int qty;
    private String lot;
    private String qc_level_name;
    private String qc_result_name;
    private String unit_name;

}
