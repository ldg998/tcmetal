package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class CRM_INVOICE_SUB {
    private String req_no;
    private int seq;
    private String ord_no;
    private String po_no;
    private String supp_code;
    private String supp_name;
    private String part_kind;
    private String part_code;
    private String part_name;
    private int unit_cost;
    private String currency_name;
    private int price_amount;
    private int qty;
}
