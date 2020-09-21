package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class WMS_OUT_ORD_SUB_UPDATE {
    private String req_no;
    private String ord_no;
    private String po_no;
    private String supp_name;
    private String supp_code;
    private String part_kind;
    private String part_name;
    private String part_code;
    private String part_weight;
    private String user_code;
    private int ord_qty;
    private int prev_qty;
    private int wms_qty;
    private int comp_qty;
    private int qty;
    private int update_qty;
}
