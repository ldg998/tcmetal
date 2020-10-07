package com.mes.mesQms.Middle.DTO;

import lombok.Data;

@Data
public class QMS_PROD {
    private String qc_no;
    private String work_date;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String lot_no;
    private String qc_result;
    private String result2_code;
    private String result3_code;
    private String act_type;
    private String file2;
    private String file2_yn;
    private String file3;
    private String user_code;
    private String create_date;
    private String update_date;
    private String part_name;
    private int part_weight;
    private String supp_name;
    private String result3_name;
    private String user_name;
    private String qc_result_name;
    private String result2_name;
    private String act_type_name;
    private String qc_name;
    private String status;
    private String status_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String upload_path;
}
