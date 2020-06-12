package com.mes.mesTpm.RegItem.DTO;

import lombok.Data;

@Data
public class TPM_REG_ITEM_CD {
    private String site_code;
    private String qc_code;
    private String qc_name;
    private String use_yn;
    private String user_code;
    private String create_date;
    private String update_date;
    private String user_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
