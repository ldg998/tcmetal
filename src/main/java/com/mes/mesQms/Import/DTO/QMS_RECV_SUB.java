package com.mes.mesQms.Import.DTO;

import lombok.Data;

@Data
public class QMS_RECV_SUB {
    private String in_no;
    private String part_code;
    private String lot;
    private String qc_result;
    private int in_qty;
    private int qc_qty;
    private int ng_qty;
    private String ng_type;
    private String ng_name;
    private String act_type;
    private String file1;
    private String file2;
    private String file3;
    private String mrb;
    private String mrb_date;
    private String ord_no;
    private String spec;
    private String supp_name;
    private String part_name;
    private String part_type_name;
    private String unit_name;
    private String work_date;
    private String update_date;
    private String ng_type_name;
    private String user_name;
    private String user_code;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String qc_result_name;
    private String qc_level_name;
    private String act_type_name;

}
