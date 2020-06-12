package com.mes.mesScm.Standard.DTO;

import lombok.Data;

@Data
public class sysBPart {
    private String site_code = "";
    private String part_grp_code = "";
    private String part_code = "";
    private String part_name = "";
    private String cargo_code = "";
    private String cargo_name = "";
    private String loc_code = "";
    private String supp_code = "";
    private String spec = "";
    private String unit_code = "";
    private int pack_qty = 0;
    private int max_qty = 0;
    private int min_qty = 0;
    private String qc_level;
    private String user_code = "";
    private String create_date = "";
    private String update_date = "";
    private String part_grp_name = "";
    private String supp_name = "";
    private String user_name = "";
    private String unit_name = "";
    private String loc_name = "";
    private int rownum = 0;
    private int rec_count = 0;
    private String keyword = "";
    private String i_standard = "";
    private String i_standard_name = "";
    private String i_category = "";
    private String i_category_name = "";
    private String qc_level_name = "";
    private String part_type_code;
    private String part_type_name;
}
