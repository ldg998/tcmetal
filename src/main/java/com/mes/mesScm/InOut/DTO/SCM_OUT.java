package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_OUT {
    private String out_no;
    private String work_date;
    private String cargo_code_to;
    private String user_code;
    private String remark;
    private String ord_no;
    private String create_date;
    private String update_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String part_code;
    private String part_name;
    private String spec;
    private String user_name;
    private String unit_name;

    private double qty;


}
