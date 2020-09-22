package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class CRM_INVOICE_SUB1 {
    private String req_no;
    private int seq;
    private String ord_no;
    private String supp_code;
    private String supp_name;
    private String part_kind;
    private String part_code;
    private String part_name;
    private String part_size;
    private int qty;
    private int part_weight;
    private int gross_weight;
    private int part_weight_sum;
    private int gross_weight_sum;
}
