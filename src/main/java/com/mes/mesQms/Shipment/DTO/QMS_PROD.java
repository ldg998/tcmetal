package com.mes.mesQms.Shipment.DTO;

import lombok.Data;

@Data
public class QMS_PROD {
    private String site_code;
    private String in_no;
    private String work_date;
    private String status;
    private String remark;
    private String user_name;
    private String create_date;
    private String update_date;
    private String supp_code;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
