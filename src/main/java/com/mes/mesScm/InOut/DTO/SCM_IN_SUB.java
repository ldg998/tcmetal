package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IN_SUB {
    private String site_code;
    private String in_no;
    private String part_code;
    private String qc_result;
    private double qty;
    private String lot;
    private String pack_qty;
    private String part_grp_name;
    private String part_name;
    private String qc_level_name;
    private String ord_check;
    private String spec;
    private String spec_all;
    private String unit_name;
    private String work_date;
    private String remark;
    private String supp_code;
    private String supp_name;
    private int rownum;
    private String sub;
    private int rownum_page;
    private int rec_count;
    private String qc_result_name;
    private String mrb;
    private String status_name;
    private String user_name;
    private String update_date;
    private String ng_type_name;
    private String ng_name;
    private String act_type_name;

    private String file1;
    private String file2;
    private String file3;
    private String file1_name;
    private String file2_name;
    private String file3_name;

    private int qc_qty;
    private int ng_qty;

    private String act_type;
}
