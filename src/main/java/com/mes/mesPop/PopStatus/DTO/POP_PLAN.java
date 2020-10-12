package com.mes.mesPop.PopStatus.DTO;

import lombok.Data;

import java.util.List;

@Data
public class POP_PLAN {

    private int idx;
    private String work_name;
    private String work_no;
    private String work_date;
    private String line_code;
    private String charge;
    private int seq;
    private String work_date_key;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String part_weight;
    private String plan_qty;
    private String prod_qty;
    private String weight;
    private String lot_no;
    private String prev_lot;
    private String user_code;
    private String create_date;
    private String work_user_code;
    private String keyword;
    private String keyword2;
    private String in_date;
    private String out_date;
    private String part_name;
    private String supp_name;
    private String user_name;
    private String work_user_name;
    private String prod_date;
    private String status_name;
    private int qty;
    private String plan_code;
    private String line_name;
    private String dept_name;
    private String ck;
    private double read_time;
    private String gu_name;
    private String date1;
    private String date2;
    private String date3;


    private double test_value1;
    private double test_value2;
    private double test_value3;
    private double test_value4;
    private double test_value5;
    private double test_value6;
    private double test_value7;
    private double test_value8;
    private double test_value9;

    private int page;
    private int rows;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    List<POP_PROD_MELT> pop_prod_melt;
    List<POP_PROD_MELT_SUB1> pop_prod_melt_sub1;
    List<POP_PROD_MELT_SUB2> pop_prod_melt_sub2;
    List<POP_PROD_MELT_SUB3> pop_prod_melt_sub3;


}
