package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_IN_ORD_SUB_PDF {
    private String ord_no;
    private String part_code;
    private String spec;
    private int ord_qty;
    private int qty;
    private String remark;
    private String status;
    private String end_date;
    private String place_name;
    private int not_qty;
    private String part_name;
    private String unit_name;
    private String supp_name;
    private String fax_no;
    private String tel_no;
    private String work_date;
    private String payment;
    private String user_name;
    private String ord_remark;
    private String file1;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
