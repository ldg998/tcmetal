package com.mes.mesCrm.Standard.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SYS_SPART_CD {

    private String supp_name;
    private String supp_code;
    private String part_kind;
    private String part_code;
    private String part_name;
    private String part_name2;
    private int part_weight;
    private int gross_weight;
    private String part_size;
    private int unit_cost;
    private String currency_code;
    private String currency_name;
    private String route_code;
    private String outs_supp_code;
    private String trans_code;
    private String use_yn;
    private String startup_date;
    private String wood_code1;
    private String wood_code2;
    private String wood_code3;
    private String outs_qc;
    private String file1;
    private String file2;
    private String file3;
    private String file4;

    private String file1_name;
    private String file2_name;
    private String file3_name;
    private String remark2;
    private String wood_type1;
    private String wood_type2;
    private String wood_type3;
    private String wood_type4;
    private String wood_supp_name;
    private String wood_in_date;
    private String wood_remark;
    private String keyword;
    private String keyword2;
    private String keyword3;
    private String outs_supp_name;
    private String route_name;
    private String start_date;
    private String create_date;
    private String user_name;
    private String cost_user_name;
    private String user_code;
    private int max_unit_cost;
    private int total_cost;
    private String update_date;
    private String cost_create_date;
    private String currency_type_name;


    private List<MultipartFile> files1;
    private List<MultipartFile> files2;
    private List<MultipartFile> files4;
    private int index;
    private String savefile;
    private long size;
    private String original_name;
    private String type;
    private String allpath;
    private String key_value;
    private int  file_ck;
    private int check1;
    private int check2;
    private int check4;


    private int rownum_page;
    private int rownum;
    private int rec_count;





}
