package com.mes.mesScm.InOut.DTO;

import lombok.Data;

@Data
public class SCM_IN {
    private String site_code;
    private String in_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String status;
    private String status_name;
    private String user_code;
    private String user_name;
    private String remark;
    private String create_date;
    private String update_date;
    private int rownum;
    private int rec_count;
    private String keyword;

}
