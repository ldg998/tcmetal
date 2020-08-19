package com.mes.mesWms.Stock.DTO;

import lombok.Data;

@Data
public class WMS_STOCK_REV {
    private String outs_supp_code;
    private String outs_supp_name;
    private String rev_no;
    private String work_date;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String lot_no;
    private String status;
    private String rev_code;
    private String user_code;
    private String create_date;
    private String update_date;
    private String keyword;
    private String user_name;
    private String part_name;
    private String supp_name;
    private int part_weight;
    private int stock_qty_prev;
    private int stock_qty;
    private String rev_name;
    private String status_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
