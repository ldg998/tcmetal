package com.mes.mesPop.PopStatus.DTO;

import lombok.Data;

@Data
public class POP_PLAN_ORD_CD {
    private String site_code;
    private String req_no;
    private String ord_no;
    private String work_date;
    private String work_type;
    private String part_type;
    private String part_grp_code;
    private String part_grp_name;
    private String part_grp_code2;
    private String part_grp_name2;
    private String part_code;
    private String part_code1;
    private String part_name1;
    private String part_code2;
    private String part_name2;
    private String part_name;
    private String unit_type;
    private double qty;
    private String user_code;
    private String create_date;
    private String update_date;
    private String part_length;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String keyword;
    private String supp_code;
    private String supp_name;
    private String end_supp_code;
    private String end_supp_name;
    private String end_date;
    private String unit_name;
    private String ord_date;
    private String work_type_name;
}
