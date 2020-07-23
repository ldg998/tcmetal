package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_IN_ORD_SUB {
    private String ord_no;
    private String part_code;
    private String qc_result;
    private int ord_qty;
    private int qty;
    private String end_date;
    private String qc_level_name;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String spec_all;
    private String unit_name;
    private String status;
    private String status_name;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private int not_qty;
    private int in_qty;
    private String result_check;
    private int rownum;
    private int rec_count;
    private String i_standard_name;
    private String view_amount;
    private String t_payment;
    private String t_delivery;
    private String delivery;
    private String attachment;
    private String shipping_addr;
    private String remark;
    private String keyword;
    private String part_type_name;

    private int rownum_page;

    private String direction;
}
