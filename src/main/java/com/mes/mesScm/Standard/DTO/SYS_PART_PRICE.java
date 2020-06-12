package com.mes.mesScm.Standard.DTO;

import lombok.Data;

@Data
public class SYS_PART_PRICE {
    private String site_code;
    private String supp_code;
    private String part_code;
    private String start_date;
    private String stop_date;
    private String currency_code;
    private double unit_price;
    private String user_code;
    private String create_date;
    private String update_date;
    private String part_name;
    private String user_name;
    private String supp_name;
    private String currency_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
}
