package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IO {
    private int seq;
    private String part_type_name;
    private String part_grp_name;
    private String part_grp_name2;
    private String part_code;
    private String part_name;
    private String work_date;
    private double qty;
    private String spec;
    private String remark;
    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String unit_name;
}
