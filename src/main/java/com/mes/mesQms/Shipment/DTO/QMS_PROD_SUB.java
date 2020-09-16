package com.mes.mesQms.Shipment.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QMS_PROD_SUB {

    private String site_code;
    private String in_no;
    private String part_code;
    private int in_qty;
    private int qc_qty;
    private int ng_qty;
    private int hard1;
    private int hard2;
    private int hard3;
    private String ng_type;
    private String ng_name;
    private String act_type;
    private String file2;
    private String file3;
    private String mrb;

    private String work_date;
    private String supp_name;
    private String part_grp_name;
    private String part_name;
    private String spec;
    private String code_name1;
    private String qc_result_name;
    private String qc_name;
    private String ng_type_name;
    private String act_type_name;
    private String file2_name;
    private String file3_name;
    private String user_name;
    private String user_code;
    private String update_date;
    private String qc_result;
    private String unit_name;
    private String qc_level_name;
    private String upload_path;
    private String filename;


    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String mrb_date;
    private String keyword;
    private String keyword2;
    private String file1_name;
    private String file1;
    private String file_key;

    private String qc_no;
    private String plan_no;
    private String place_name;
    private String plan_name;
    private String part_kind;
    private int part_weight;
    private String lot_no;
    private String create_date;
    private String result2_name;

    /*파일 영역*/
    private List<MultipartFile> files;
    private int index;
    private String savefile;
    private long size;
    private String original_name;
    private String type;
    private String allpath;
    private String key_value;
    private int  file_ck;
}
