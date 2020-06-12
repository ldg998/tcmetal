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
    private String name;
    private String board_code;
    private String board_idx;
}
