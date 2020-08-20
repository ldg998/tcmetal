package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class CRM_SHIPPING {
    private String out_no;
    private int ship_cost;
    private int port_cost1;
    private int port_cost2;
    private int port_cost3;
    private int port_cost4;
    private int port_cost5;
    private int unloading_cost;
    private int landing_ost;
    private int harbor_facility;
    private int local_cost;
    private int customs_fee;
    private int wood_cost1;
    private int wood_cost2;
    private int wood_cost3;
    private int total_cost;
    private int weight;
    private int unit_cost;
    private String wood_code1;
    private String wood_code2;
    private String wood_code3;
    private int wood_qty1;
    private int wood_qty2;
    private int wood_qty3;
    private String keyword;
    private String user_code;
    private String supp_name;
    private String user_name;
    private String trans_name;
    private String ship_date;
    private String out_date;
    private String update_date;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
