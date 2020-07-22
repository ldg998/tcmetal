package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_IN_ORD {
    private String ord_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String status;
    private String status_name;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private String view_amount;
    private String t_payment;
    private String t_delivery;
    private String delivery;
    private String attachment;
    private String shipping_addr;
    private String remark;
    private String keyword;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String end_date;
    private String delivery_place;
    private String img_code;
    private String place_name;
    private String keyword2;
    private String payment;
    private String stop_date;
    private String save_type;

    private String ord_sub;
    private String crm_ord_no;
    private String img_no;
    private String delivery_date;

}
