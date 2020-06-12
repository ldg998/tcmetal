package com.mes.mesWms.InOut.DTO;

import lombok.Data;

@Data
public class WMS_OUT_ORD {
    private String site_code;
    private String req_no;
    private String work_date;
    private String ord_no;
    private String supp_code;
    private String out_no;
    private String user_code;
    private String create_date;
    private String update_date;
    private String status;
    private String user_name;
    private String out_user_name;
    private String out_update_date;
    private String supp_name;
    private String rownum;
    private int rownum_page;
    private String status_name;
    private int rec_count;
    private String keyword;
    private String place_name;
    private String part_code;
    private String part_name;
    private String plan_name;
    private String plan_no;
}
