package com.mes.mesQms.Shipment.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QMS_RET {

    private int ret_no ;
    private String work_date;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String lot_no;
    private String ng_type;
    private String ng_name;
    private String report_type;
    private String report_date;
    private String measuer_name;
    private String act_type;
    private String act_date;
    private String ret_dept_code;
    private String ret_user_code;
    private String user_code;
    private String create_date;
    private String update_date;
    private String keyword;


    private List<MultipartFile> file1;
    private List<MultipartFile> file2;
    private int index;
    private String savefile;
    private long size;
    private String original_name;
    private String type;
    private String allpath;
    private String key_value;


    private int  file_ck1;
    private int  file_ck2;

    private String file_key;


}
