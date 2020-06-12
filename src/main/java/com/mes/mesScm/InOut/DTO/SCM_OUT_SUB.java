package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_OUT_SUB {
    private String site_code;
    private String out_no;
    private String part_code;
    private double qty;

    private String work_date;
    private String line_name;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String spec_all;
    private String unit_name;
    private String user_name;
    private String user_code;
    private String update_date;
    private String create_date;

    private int rownum;
    private int rec_count;
}
