package com.mes.mesScm.Stock.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_LIST {
    private String part_type_name;
    private String part_name;
    private String spec;
    private String unit_name;
    private double min_qty;
    private double max_qty;
    private double qty;
    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String supp_name;

    private String site_code;
    private String cargo_code;
    private String part_code;

    private String part_grp_name;
    private String part_grp_name2;

    private String part_type;
    private String part_grp_code;
    private String part_grp_code2;
    private String create_date;
    private String update_date;


}
