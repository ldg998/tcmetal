package com.mes.mesPop.Pop.DTO;

import lombok.Data;

@Data
public class POP_PLAN {
    private String work_date;
    private String line_code;
    private String line_name;
    private int seq;
    private String supp_code;
    private String supp_name;
    private String part_kind;
    private String part_code;
    private String part_name;
    private int part_weight;
    private int plan_qty;
    private int prod_qty;
    private int weight;
    private String lot_no;
    private String user_code;
    private String user_name;
    private String create_date;
    private String work_user_code;
    private String work_user_name;
    private String keyword;
    private String keyword2;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
