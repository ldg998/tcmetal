package com.mes.mesPop.Standard.DTO;

import lombok.Data;

@Data
public class POP_BCR_FORM {
    private String site_code;
    private String bcr_form_code;
    private String bcr_form_name;
    private String bcr_contents;
    private String user_code;
    private String remark;
    private String create_date;
    private String update_date;

    private int rownum;
    private int rownum_page;
    private int rec_count;

    private String user_name;
    private String keyword;
}
