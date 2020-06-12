package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_REQ_ORD {
    private String site_code;
    private String req_no;
    private String ord_no;
    private String work_date;
    private String part_code;
    private double qty;
    private String user_code;
    private String out_no;
    private String create_date;
    private String update_date;


    private String supp_name;
    private String end_supp_name;
    private String end_date;
    private String part_name;
    private String part_grp_name;
    private String spec;
    private String unit_name;

    private int rownum;
    private int rec_count;
    private String keyword;

    private String user_name;
}


