package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IN_ORD_MODAL {
    private String ord_no;
    private String part_code;
    private double ord_qty;
    private double qty;
    private String remark;
    private String status;
    private String qc_result;
    private String ng_type;
    private String act_type;
    private String spec;
    private String unit_name;
    private String end_date;
    private String work_date;
    private String part_name;
    private String part_type_name;
    private String status_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
