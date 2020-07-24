package com.mes.mesOut.mesOut.DTO;

import lombok.Data;

@Data
public class OUTS_IN_SUB {
    private String site_code;
    private String in_no;
    private String part_code;
    private int out_qty;
    private int out_loss;
    private int qc_loss;
    private int qty;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String unit_name;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String user_name;
    private String update_date;
    private String out_date;
    private String in_date;
    private String supp_name2;
    private String part_kind;
    private String outs_qc;

    private int part_weight;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
