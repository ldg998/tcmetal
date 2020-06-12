package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_REQ_ORD_SUB {
    private String site_code;
    private String req_no;
    private String part_code;
    private double qty;
    private String part_name;
    private String spec;
    private String unit_name;
    private double ord_qty;
    private String work_date;
    private String end_date;
    private String user_code;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
