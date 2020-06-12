package com.mes.mesQms.Import.DTO;

import lombok.Data;

@Data
public class QMS_RECV {
    private String site_code;
    private String in_no;
    private String work_date;
    private String supp_code;
    private String user_code;
    private String status;
    private String remark;
    private String create_date;
    private String update_date;
    private String user_name;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private String status_name;
    private int rec_count;
    private String keyword;
}
