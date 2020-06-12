package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SYS_ORD_IMAGE_CD {
    private String img_code;
    private String img_name;
    private String file1;
    private String remark;
    private String user_code;
    private String create_date;
    private String update_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String user_name;

    private String keyword;
    private String keyword2;

}
