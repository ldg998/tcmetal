package com.mes.mesScm.Stock.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_SUM_DAY {
    private String site_code;
    private String cargo_code;
    private String part_type;
    private String part_type_name;
    private String part_grp_code;
    private String part_grp_code2;
    private String part_code;
    private String part_name;
    private int prev_qty;
    private int in_qty;
    private int out_qty;
    private int qty;
    private String part_grp_name;
    private String part_grp_name2;
    private String unit_name;
    private String spec;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
