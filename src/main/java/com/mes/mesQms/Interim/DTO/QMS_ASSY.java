package com.mes.mesQms.Interim.DTO;

import lombok.Data;

@Data
public class QMS_ASSY {

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


    private String qc_no;
    private String req_no;
    private String place_name;
    private String plan_name;
    private String qc_type_name;
    private String ng_type_name;
    private String qc_result;
    private String ng_type;
    private String ng_name;
    private String act_type_name;
    private String file2_name;
    private String file3_name;

    private String qc_result_name;

    private String qc_name;
}
