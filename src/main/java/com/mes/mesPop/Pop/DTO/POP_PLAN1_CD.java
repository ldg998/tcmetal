package com.mes.mesPop.Pop.DTO;


import lombok.Data;

@Data
public class POP_PLAN1_CD {
    private String site_code;
    private String plan_date;
    private String plan_no1;
    private String part_type;
    private String part_grp_code;
    private String part_grp_code2;
    private String part_code;
    private String part_name;
    private String status;
    private String prod_type;
    private String prod_dept;
    private double plan_qty;
    private double work_qty;
    private String end_date;
    private String route_code;
    private String user_code;
    private String remark;
    private String remark1;
    private String create_date;
    private String update_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String user_name;
    private String prod_dept_name;
    private String route_name;
    private String status_name;
    private String prod_type_name;

    private String part_grp_name1;
    private String part_grp_name2;
    private String keyword;
}
