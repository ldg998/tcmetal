package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_RET_SUB {
    private String site_code;
    private String ret_no;
    private String part_code;
    private double qty;
    private String end_date;
    private String user_name;
    private String supp_name;
    private String part_name;
    private String spec;
    private String spec_all;
    private String unit_name;
    private String work_date;
    private String update_date;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
