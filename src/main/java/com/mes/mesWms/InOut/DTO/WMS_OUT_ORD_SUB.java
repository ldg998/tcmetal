package com.mes.mesWms.InOut.DTO;

import lombok.Data;

@Data
public class WMS_OUT_ORD_SUB {
    private String site_code;
    private String req_no;
    private String part_code;
    private double ord_qty;
    private double comp_qty;
    private double ready_qty;
    private double req_qty;
    private double qty;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String part_desc;
    private String unit_name;
    private String work_date;
    private String user_name;
    private String supp_code;
    private String supp_name;
    private String user_code;
    private String update_date;
    private String ord_no;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String plan_no;
    private String place_name;
    private String prod_type_name;
    private String prod_name;
    private String plan_name;
    private String status_name;
    private String keyword;
    private String code_list;
}
