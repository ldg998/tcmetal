package com.mes.mesWms.Stock.DTO;

import lombok.Data;

@Data
public class WMS_STOCK {
    private String part_code;
    private int prev_qty;
    private int in_qty;
    private int out_qty;
    private int qty;
    private int prev_weight;
    private int in_weight;
    private int out_weight;
    private int weight;
    private String part_name;
    private int part_weight;
    private String supp_name;
    private String part_kind;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
