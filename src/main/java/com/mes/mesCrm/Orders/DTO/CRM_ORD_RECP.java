package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class CRM_ORD_RECP  {

    private String ord_no;
    private String work_date;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String part_name;
    private int part_weight;
    private int unit_cost;
    private int qty;
    private int price_amount;
    private int ord_qty;
    private int  prev_qty;
    private String outs_supp_code;
    private String ship_date;
    private String user_code;
    private String create_date;
    private String update_date;
    private String keyword;
    private String user_name;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;

}
