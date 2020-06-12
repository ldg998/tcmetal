package com.mes.mesOut.mesOut.DTO;

import lombok.Data;

@Data
public class OUTS_IO_CD {
    private String keyword;
    private String out_no;
    private String work_date;
    private String plan_no;
    private String status;
    private String out_user_name;
    private String in_user_name;
    private String in_date;
    private String expect_date;
    private String out_date;
    private String in_user_code;
    private String out_user_code;
    private String supp_name;
    private String place_name;
    private String prod_type_name;
    private String prod_name;
    private String plan_name;
    private String bcr_no;

    private int rownum;
    private int rownum_page;
    private int rec_count;

}
