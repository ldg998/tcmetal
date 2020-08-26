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
    private int ng_qty;

    private String work_date;
    private String create_date;
    private String update_date;
    private String part_name;
    private String supp_name;
    private String outs_supp_name;
    private String outs_qc;
    private String qc_result;
    private String result_code2;
    private String result_code3;
    private String user_code;
    private String keyword;
    private String ng_no;
    private String lot_no;
    private String qc_result_name;
    private String result_code2_name;
    private String result_code3_name;
    private String user_name;

    private int out_qty;
    private int in_qty;
    private int prev_qty;

    private int rownum;
    private int rownum_page;
    private int rec_count;
}
