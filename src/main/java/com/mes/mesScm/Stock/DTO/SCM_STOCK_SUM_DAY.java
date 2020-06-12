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
    private double prev_qty;
    private double in_qty;
    private double out_qty;
    private double qty;
    private String part_grp_name;
    private String part_grp_name2;
    private String unit_name;
    private String spec;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
