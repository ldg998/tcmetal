package com.mes.mesQms.Standard.DTO;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SYS_QC_ITEM
{
    private String site_code;
    private String qc_group;
    private String qc_group_name;
    private String qc_type;
    private String qc_type_name;
    private String qc_code;
    private String use_yn;
    @NotBlank(message = "검사명를 입력하세요.")
    private String qc_name;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private String keyword;
    private int rownum;
    private int rec_count;
}
