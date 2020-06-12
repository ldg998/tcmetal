package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_OUT_ORD_SUB {
    private String site_code;
    private String ord_no;
    private String part_code;
    private double qty;
    private double out_qty;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String spec_all;
    private String unit_name;
    private String work_date;
    private String cargo_code_to;
    private String usage;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
