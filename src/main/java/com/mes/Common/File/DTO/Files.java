package com.mes.Common.File.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class Files {
    private String key1;
    private String key2;
    private String key3;
    private String key_value;
    private String key_value2;
    private String site_code;
    private String user_code;
    private String file_name;
    private String file_og_name;
    private long file_size;
    private long file_volume;
    private String upload_path;
    private String url;
    private MultipartFile files;
    private MultipartFile file;
    private String name;
    private String board_code;
    private String board_idx;
    private String remark2;
    private String wood_type1;
    private String wood_type2;
    private String wood_type3;
    private String wood_supp_name;
    private String wood_in_date;
    private String wood_remark;
    private String machine_code;
    private String machine_name;
    private String device_no;
    private String capa;
    private String spec;
    private String correct_corp_name;
    private String correct_date;
    private String end_date;
    private int alarm_day;
    private String keyword;
}
