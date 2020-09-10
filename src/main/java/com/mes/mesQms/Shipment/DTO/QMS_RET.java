package com.mes.mesQms.Shipment.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QMS_RET {

    private String ret_no ;
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
    private String type_code;
    private String supp_name;
    private String user_name;
    private String ret_user_name;
    private String part_name;
    private String act_type_name;

    private String file1_code;
    private String file2_code;
    private String file1_ck;
    private String file2_ck;

    private List<MultipartFile> file1;
    private List<MultipartFile> file2;
    private int index;
    private String savefile;
    private long size;
    private String original_name;
    private String type;
    private String allpath;
    private String key_value;
    private String key_value2;


    private int  file_ck1;
    private int  file_ck2;

    private String file_key;
    private String file_key2;

    private int rownum;
    private int rownum_page;
    private int rec_count;

}
