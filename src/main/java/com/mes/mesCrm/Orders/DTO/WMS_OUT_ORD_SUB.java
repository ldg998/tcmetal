package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class WMS_OUT_ORD_SUB {
    private String req_no;
    private String ord_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String part_kind;
    private String part_code;
    private String part_name;
    private String part_weight;
    private String po_no;
    private int ord_qty;
    private int prev_qty;
    private int qty;
    private int qty2;
    private String outs_supp_code;
    private String outs_supp_name;
    private String ship_date;
    private String status;
    private String status_sub;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private String delivery_place;
    private String keyword;
    private String keyword2;
    private String  ord_date;
    private String status_name;
    private String trans_code;
    private String trans_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
