package com.mes.mesScm.Stock.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_REV {
    private String part_type_name;
    private String part_grp_name1;
    private String part_grp_name2;
    private String part_grp_name3;
    private String part_code;
    private String part_name;
    private String spec;
    private String unit_name;
    private double bcr;
    private double stock_qty_prev;
    private double stock_qty;
    private double aaaa;
    private String rev_code;
    private String user_name;
    private String update_date;
    private int rec_count;
    private String supp_code;
    private String qty;
    private String supp_name;
}
