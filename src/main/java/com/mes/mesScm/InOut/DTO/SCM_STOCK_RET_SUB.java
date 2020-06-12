package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_RET_SUB {
    private String site_code;
    private String ret_no;
    private String part_code;
    private double qty;

    private String work_date;
    private String supp_name;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String unit_name;
    private String user_name;
    private String update_date;
    private String create_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
