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
    private String status;
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
    private int work_weight;
    private int wk_qty_hr;
    private int prod_mhr;
    private String qc_result_name;
    private String ret_name;

    private double qc_ratio;
    private int work_qty;
    private String stock_prev;
    private int work_seq;


    private int day1;
    private int day2;
    private int day3;
    private int day4;
    private int day5;
    private int day6;
    private int day7;
    private int day8;
    private int day9;
    private int day10;
    private int day11;
    private int day12;
    private int day13;
    private int day14;
    private int day15;
    private int day16;
    private int day17;
    private int day18;
    private int day19;
    private int day20;
    private int day21;
    private int day22;
    private int day23;
    private int day24;
    private int day25;
    private int day26;
    private int day27;
    private int day28;
    private int day29;
    private int day30;
    private int day31;

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
