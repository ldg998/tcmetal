package com.mes.mesOut.stock.DTO;

import lombok.Data;

@Data
public class OUTS_STOCK {
    private String outs_supp_code;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private int part_weight;
    private int qty;
    private String create_date;
    private String update_date;
    private String part_name;
    private String supp_name;
    private String outs_supp_name;
    private String outs_qc;

    private int out_qty;
    private int in_qty;
    private int prev_qty;

    private int rownum;
    private int rownum_page;
    private int rec_count;
}
