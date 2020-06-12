package com.mes.mesScm.Stock.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_SUM_MONTH {
    private String part_type_name;
    private String part_grp_name;
    private String part_code;
    private String part_name;
    private String spec;
    private String unit_name;
    private double prev_qty;
    private double in_qty;
    private double out_qty;
    private double qty;
    private int rec_count;
    private String supp_name;


    private String part_grp_name1;
    private String part_grp_name2;
    private String part_grp_name3;
}
