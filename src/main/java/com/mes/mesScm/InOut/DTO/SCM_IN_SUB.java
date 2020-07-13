package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IN_SUB {
    private String in_no;
    private String part_type_name;
    private String part_code;
    private String qc_result;
    private double ord_qty;
    private double prev_qty;
    private double qty;
    private String part_name;
    private String spec;
    private String unit_name;
    private String work_date;
    private String remark;
    private String supp_code;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String qc_result_name;
    private String status;
    private String status_name;
    private String user_name;
    private String update_date;
    private String ng_type;
    private String ng_type_name;
    private String ng_name;
    private String act_type_name;

    private double qc_qty;


    private String act_type;
}
