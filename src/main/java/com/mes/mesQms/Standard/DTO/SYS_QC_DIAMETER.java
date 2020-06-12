package com.mes.mesQms.Standard.DTO;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SYS_QC_DIAMETER {
    private String site_code;
    @NotBlank(message = "공정을 입력하세요.")
    private String line_code;
    @NotBlank(message = "제품명을 입력하세요.")
    private String part_code;
    private String diameter1_start;
    private String diameter1_stop;
    private String diameter2_start;
    private String diameter2_stop;
    private String user_code;
    private String create_date;
    private String update_date;
    private String keyword;

    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String diameter1;
    private String diameter2;
    private String part_name;
    private String line_name;
    private String part_grp_name;
    private String user_name;

}
