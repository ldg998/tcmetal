package com.mes.mesCrm.mesCrm.DTO;

import lombok.Data;

@Data
public class CRM_ORD_RECP extends  CRM_IMAGE {

    private String ord_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String place_name;
    private String emp_name;
    private String emp_tel;
    private String ord_name;
    private String status;
    private String status_name;
    private String target_date;
    private String end_date;
    private int order_amount;
    private int amount1;
    private int amount2;
    private int amount3;
    private int amount4;
    private int balance;
    private String remark;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;

    private String in_date1;
    private String in_date2;
    private String in_date3;
    private String in_date4;
}
