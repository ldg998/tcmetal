package com.mes.mesScm.InOut.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SCM_IN_SUB {
    private String in_no;
    private String part_type_name;
    private String part_code;
    private String qc_result;
    private String key_value;
    private  String ord_no;
    private double ord_qty;
    private double prev_qty;
    private double qty;
    private double in_qty;
    private String part_name;
    private String spec;
    private String unit_name;
    private String work_date;
    private String remark;
    private String supp_code;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String qc_result_name;
    private String status;
    private String status_name;
    private String user_name;
    private String update_date;
    private String ng_type;
    private String ng_type_name;
    private String ng_name;
    private String act_type_name;
    private String qc_level_name;
    private String file1;
    private String upload_path;

    private double qc_qty;
    private String act_type;

    private String file_path;
    private MultipartFile files;
}
